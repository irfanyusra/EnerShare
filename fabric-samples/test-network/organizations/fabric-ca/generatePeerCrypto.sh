#!/bin/bash
export FABRIC_CFG_PATH=${PWD}/configtx
export PATH=${PWD}/../bin:$PATH
export FABRIC_CA_CLIENT_HOME=${PWD}/organizations/peerOrganizations/org1.example.com/

fabric-ca-client register --caname ca-org1 --id.name peer3 --id.secret peer3pw --id.type peer --tls.certfiles ${PWD}/organizations/fabric-ca/org1/tls-cert.pem
mkdir -p organizations/peerOrganizations/org1.example.com/peers/peer3.org1.example.com
fabric-ca-client enroll -u https://peer3:peer3pw@localhost:7054 --caname ca-org1 -M ${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer3.org1.example.com/msp --csr.hosts peer3.org1.example.com --tls.certfiles ${PWD}/organizations/fabric-ca/org1/tls-cert.pem
cp ${PWD}/organizations/peerOrganizations/org1.example.com/msp/config.yaml ${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer3.org1.example.com/msp/config.yaml
fabric-ca-client enroll -u https://peer3:peer3pw@localhost:7054 --caname ca-org1 -M ${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer3.org1.example.com/tls --enrollment.profile tls --csr.hosts peer3.org1.example.com --csr.hosts localhost --tls.certfiles ${PWD}/organizations/fabric-ca/org1/tls-cert.pem
cp ${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer3.org1.example.com/tls/tlscacerts/* ${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer3.org1.example.com/tls/ca.crt
cp ${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer3.org1.example.com/tls/signcerts/* ${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer3.org1.example.com/tls/server.crt
cp ${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer3.org1.example.com/tls/keystore/* ${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer3.org1.example.com/tls/server.key