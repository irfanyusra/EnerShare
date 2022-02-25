#!/bin/bash
export FABRIC_CFG_PATH=${PWD}/configtx
export PATH=${PWD}/../bin:$PATH
export FABRIC_CA_CLIENT_HOME=${PWD}/organizations/peerOrganizations/org1.example.com/

NEW_PEER=${1}

fabric-ca-client register --caname ca-org1 --id.name ${NEW_PEER} --id.secret ${NEW_PEER}pw --id.type peer --tls.certfiles ${PWD}/organizations/fabric-ca/org1/tls-cert.pem
mkdir -p organizations/peerOrganizations/org1.example.com/peers/${NEW_PEER}.org1.example.com
fabric-ca-client enroll -u https://${NEW_PEER}:${NEW_PEER}pw@localhost:7054 --caname ca-org1 -M ${PWD}/organizations/peerOrganizations/org1.example.com/peers/${NEW_PEER}.org1.example.com/msp --csr.hosts ${NEW_PEER}.org1.example.com --tls.certfiles ${PWD}/organizations/fabric-ca/org1/tls-cert.pem
cp ${PWD}/organizations/peerOrganizations/org1.example.com/msp/config.yaml ${PWD}/organizations/peerOrganizations/org1.example.com/peers/${NEW_PEER}.org1.example.com/msp/config.yaml
fabric-ca-client enroll -u https://${NEW_PEER}:${NEW_PEER}pw@localhost:7054 --caname ca-org1 -M ${PWD}/organizations/peerOrganizations/org1.example.com/peers/${NEW_PEER}.org1.example.com/tls --enrollment.profile tls --csr.hosts ${NEW_PEER}.org1.example.com --csr.hosts localhost --tls.certfiles ${PWD}/organizations/fabric-ca/org1/tls-cert.pem
cp ${PWD}/organizations/peerOrganizations/org1.example.com/peers/${NEW_PEER}.org1.example.com/tls/tlscacerts/* ${PWD}/organizations/peerOrganizations/org1.example.com/peers/${NEW_PEER}.org1.example.com/tls/ca.crt
cp ${PWD}/organizations/peerOrganizations/org1.example.com/peers/${NEW_PEER}.org1.example.com/tls/signcerts/* ${PWD}/organizations/peerOrganizations/org1.example.com/peers/${NEW_PEER}.org1.example.com/tls/server.crt
cp ${PWD}/organizations/peerOrganizations/org1.example.com/peers/${NEW_PEER}.org1.example.com/tls/keystore/* ${PWD}/organizations/peerOrganizations/org1.example.com/peers/${NEW_PEER}.org1.example.com/tls/server.key