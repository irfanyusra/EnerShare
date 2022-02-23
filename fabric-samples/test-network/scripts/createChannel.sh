#!/bin/bash

# imports  
. scripts/envVar.sh
. scripts/utils.sh

CHANNEL_NAME="$1"
DELAY="$2"
MAX_RETRY="$3"
VERBOSE="$4"
: ${CHANNEL_NAME:="mychannel"}
: ${DELAY:="3"}
: ${MAX_RETRY:="5"}
: ${VERBOSE:="false"}

if [ ! -d "channel-artifacts" ]; then
	mkdir channel-artifacts
fi

createChannelGenesisBlock() {
	which configtxgen
	if [ "$?" -ne 0 ]; then
		fatalln "configtxgen tool not found."
	fi
	set -x
	configtxgen -profile TwoOrgsApplicationGenesis -outputBlock ./channel-artifacts/${CHANNEL_NAME}.block -channelID $CHANNEL_NAME
	res=$?
	{ set +x; } 2>/dev/null
  verifyResult $res "Failed to generate channel configuration transaction..."
}

createChannel() {
	setGlobals 1
	# Poll in case the raft leader is not set yet
	local rc=1
	local COUNTER=1
	while [ $rc -ne 0 -a $COUNTER -lt $MAX_RETRY ] ; do
		sleep $DELAY
		set -x
		osnadmin channel join --channelID $CHANNEL_NAME --config-block ./channel-artifacts/${CHANNEL_NAME}.block -o localhost:7053 --ca-file "$ORDERER_CA" --client-cert "$ORDERER_ADMIN_TLS_SIGN_CERT" --client-key "$ORDERER_ADMIN_TLS_PRIVATE_KEY" >&log.txt
		res=$?
		osnadmin channel join --channelID $CHANNEL_NAME --config-block ./channel-artifacts/${CHANNEL_NAME}.block -o localhost:8053 --ca-file ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer2.example.com/msp/tlscacerts/tlsca.example.com-cert.pem --client-cert ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer2.example.com/tls/server.crt --client-key ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer2.example.com/tls/server.key >&log.txt
		res=$?
		osnadmin channel join --channelID $CHANNEL_NAME --config-block ./channel-artifacts/${CHANNEL_NAME}.block -o localhost:9053 --ca-file ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer3.example.com/msp/tlscacerts/tlsca.example.com-cert.pem --client-cert ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer3.example.com/tls/server.crt --client-key ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer3.example.com/tls/server.key >&log.txt
		res=$?
		{ set +x; } 2>/dev/null
		let rc=$res
		COUNTER=$(expr $COUNTER + 1)
	done
	cat log.txt
	verifyResult $res "Channel creation failed"
}

# joinChannel ORG
joinChannel() {
  FABRIC_CFG_PATH=$PWD/../config/
  ORG=$1
  setGlobals $ORG
	local rc=1
	local COUNTER=1
	## Sometimes Join takes time, hence retry
	while [ $rc -ne 0 -a $COUNTER -lt $MAX_RETRY ] ; do
    sleep $DELAY
    set -x
    peer channel join -b $BLOCKFILE >&log.txt
    export CORE_PEER_ADDRESS=localhost:8051
    peer channel join -b $BLOCKFILE >&log.txt
    export CORE_PEER_ADDRESS=localhost:7051
    res=$?
    { set +x; } 2>/dev/null
		let rc=$res
		COUNTER=$(expr $COUNTER + 1)
	done
	cat log.txt
	verifyResult $res "After $MAX_RETRY attempts, peer0.org${ORG} has failed to join channel '$CHANNEL_NAME' "
}

setAnchorPeer() {
  ORG=$1
  docker exec cli ./scripts/setAnchorPeer.sh $ORG $CHANNEL_NAME 
}

FABRIC_CFG_PATH=${PWD}/configtx

## Create channel genesis block
infoln "Generating channel genesis block '${CHANNEL_NAME}.block'"
createChannelGenesisBlock

FABRIC_CFG_PATH=$PWD/../config/
BLOCKFILE="./channel-artifacts/${CHANNEL_NAME}.block"

## Create channel
infoln "Creating channel ${CHANNEL_NAME}"
createChannel
successln "Channel '$CHANNEL_NAME' created"

## Join all the peers to the channel
infoln "Joining org1 peer to the channel..."
joinChannel 1

## Set the anchor peers for each org in the channel
infoln "Setting anchor peer for org1..."
setAnchorPeer 1

successln "Channel '$CHANNEL_NAME' joined"
