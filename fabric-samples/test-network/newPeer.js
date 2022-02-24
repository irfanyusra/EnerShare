const yaml = require('js-yaml')
const fs = require('fs');
const { syncBuiltinESMExports } = require('module');
const exec = require('child_process').execSync;

try{

    
    /* STEP 1 GENERATE CRYPTO MATERIAL FOR NEW PEER */
    //const myShellScript = exec('./organizations/fabric-ca/generatePeerCrypto.sh');
    
    
    /* STEP 2 CREATE CONFIGURATION FOR THE NEW PEER*/
    
    

    
    let new_peer_data = {
        version: '3.7',
        volumes: {'peer3.org1.example.com':null},

        networks: { test: { name: 'fabric_test' } },
        services:{
            'peer3.org1.example.com':{
                container_name: 'peer3.org1.example.com',
                image: 'hyperledger/fabric-peer:latest',
                labels: { service: 'hyperledger-fabric' },
                environment: [
                'CORE_VM_ENDPOINT=unix:///host/var/run/docker.sock',
                'CORE_VM_DOCKER_HOSTCONFIG_NETWORKMODE=fabric_test',
                'FABRIC_LOGGING_SPEC=INFO',
                'CORE_PEER_TLS_ENABLED=true',
                'CORE_PEER_PROFILE_ENABLED=false',
                'CORE_PEER_TLS_CERT_FILE=/etc/hyperledger/fabric/tls/server.crt',
                'CORE_PEER_TLS_KEY_FILE=/etc/hyperledger/fabric/tls/server.key',
                'CORE_PEER_TLS_ROOTCERT_FILE=/etc/hyperledger/fabric/tls/ca.crt',
                'CORE_PEER_ID=peer3.org1.example.com',
                'CORE_PEER_ADDRESS=peer3.org1.example.com:9051',
                'CORE_PEER_LISTENADDRESS=0.0.0.0:9051',
                'CORE_PEER_CHAINCODEADDRESS=peer3.org1.example.com:9052',
                'CORE_PEER_CHAINCODELISTENADDRESS=0.0.0.0:9052',
                'CORE_PEER_GOSSIP_BOOTSTRAP=peer3.org1.example.com:9051',
                'CORE_PEER_GOSSIP_EXTERNALENDPOINT=peer3.org1.example.com:9051',
                'CORE_PEER_LOCALMSPID=Org1MSP',
                'CORE_OPERATIONS_LISTENADDRESS=0.0.0.0:19051'
                ],
                volumes: [
                //'/var/run/:/host/var/run/docker.sock',
                '/var/run/docker.sock:/host/var/run/docker.sock',
                '../organizations/peerOrganizations/org1.example.com/peers/peer3.org1.example.com/msp:/etc/hyperledger/fabric/msp',
                '../organizations/peerOrganizations/org1.example.com/peers/peer3.org1.example.com/tls:/etc/hyperledger/fabric/tls',
                'peer3.org1.example.com:/var/hyperledger/production'
                ],
                working_dir: '/opt/gopath/src/github.com/hyperledger/fabric/peer',
                command: 'peer node start',
                ports: [ '9051:9051', '19051:19051' ],
                networks: [ 'test' ]
                }
        }
       
      
            
            
    }
    
    //create the new yaml file
    fs.writeFileSync('./docker/docker-compose-newpeer.yaml', yaml.dump(new_peer_data,{lineWidth: -1}), (err) => {
        if (err) {
            console.log(err);
        }
    });

    const newCmd = exec('export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp');
    
    //const dockerSockCmd = exec('SOCK="${DOCKER_HOST:-/var/run/docker.sock}" && DOCKER_SOCK="${SOCK##unix://}"')
    /* STEP 3 BRING UP CONTAINER FOR NEW PEER*/
    
    exec('docker-compose -f ./docker/docker-compose-newpeer.yaml up -d',
    function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
             console.log('exec error: ' + error);
        }
    });

    
    /* STEP 4 - join the new peer to the channel AND INSTALL chaincode*/
    


    const joinChannelCmd = exec('./scripts/dynamicPeerJoinChannel.sh');

    

    
    /* REMEMBER TO REMOVE VOLUME WHEN YOU ARE DONE WITH IT!*/
    
}catch(e){
    console.log(e)
}


