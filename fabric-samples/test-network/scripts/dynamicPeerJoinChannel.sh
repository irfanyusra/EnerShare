#!/bin/bash


export FABRIC_CFG_PATH=${PWD}/../config/ 
export PATH=$PATH:${PWD}/../bin/ 

NEW_PEER=${1}
NEW_PEER_PORT=${2}

export CORE_PEER_TLS_ENABLED=true 
export CORE_PEER_PROFILE_ENABLED=false 
export CORE_PEER_LOCALMSPID="Org1MSP" 
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org1.example.com/peers/${NEW_PEER}.org1.example.com/tls/ca.crt 
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp 
export CORE_PEER_ADDRESS=localhost:${NEW_PEER_PORT} 
export CORE_VM_ENDPOINT=unix:///host/var/run/docker.sock
peer channel join -b ./channel-artifacts/mychannel.block
peer lifecycle chaincode install basic.tar.gz