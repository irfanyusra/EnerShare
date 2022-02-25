const yaml = require('js-yaml')
const fs = require('fs');
const { syncBuiltinESMExports } = require('module');
const exec = require('child_process').execSync;

var newPeerName = 'chris'
console.log(newPeerName+".org1.example.com")



/* this would ideally be function that new peer calls*/

function createNewPeer(newPeerName, newPeerCorePort){
    //const myShellScript = exec('./organizations/fabric-ca/generatePeerCrypto.sh '+newPeerName); //pass newPeerName as argument to the bash script
    var peerAbbreviation = newPeerName+'.org1.example.com'
    let new_peer_data = {
        version: '3.7',
        volumes: {
            "peerAbbreviation":null
        }, //this line is causing me problems

        networks: { test: { name: 'fabric_test' } },
        services:{
            peerAbbreviation:{
                container_name: peerAbbreviation,
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
                'CORE_PEER_ID='+peerAbbreviation,
                'CORE_PEER_ADDRESS='+peerAbbreviation+':'+newPeerCorePort,
                'CORE_PEER_LISTENADDRESS=0.0.0.0:'+newPeerCorePort,
                'CORE_PEER_CHAINCODEADDRESS='+peerAbbreviation+':'+newPeerCorePort+1,
                'CORE_PEER_CHAINCODELISTENADDRESS=0.0.0.0:'+newPeerCorePort+1,
                'CORE_PEER_GOSSIP_BOOTSTRAP='+peerAbbreviation+':'+newPeerCorePort,
                'CORE_PEER_GOSSIP_EXTERNALENDPOINT='+peerAbbreviation+':'+newPeerCorePort,
                'CORE_PEER_LOCALMSPID=Org1MSP',
                'CORE_OPERATIONS_LISTENADDRESS=0.0.0.0:'+newPeerCorePort+10000
                ],
                volumes: [
                //'/var/run/:/host/var/run/docker.sock',
                '/var/run/docker.sock:/host/var/run/docker.sock',
                '../organizations/peerOrganizations/org1.example.com/peers/'+peerAbbreviation+'/msp:/etc/hyperledger/fabric/msp',
                '../organizations/peerOrganizations/org1.example.com/peers/'+peerAbbreviation+'/tls:/etc/hyperledger/fabric/tls',
                peerAbbreviation+':/var/hyperledger/production'
                ],
                working_dir: '/opt/gopath/src/github.com/hyperledger/fabric/peer',
                command: 'peer node start',
                ports: [ newPeerCorePort+':'+newPeerCorePort, (10000+newPeerCorePort)+':'+(newPeerCorePort+10000) ],
                networks: [ 'test' ]
                }
        }
    }

    //create the new yaml file
    fs.writeFileSync('./docker/docker-compose-'+newPeerName+'.yaml', yaml.dump(new_peer_data,{lineWidth: -1}), (err) => {
        if (err) {
            console.log(err);
        }
    });
    const newCmd = exec('export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp');
    //bring up the new peer container
    exec('docker-compose -f ./docker/docker-compose-'+newPeerName+'.yaml up -d',
    function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
             console.log('exec error: ' + error);
        }
    });

    //join the channel and install chaincode on new peer
    const joinChannelCmd = exec('./scripts/dynamicPeerJoinChannel.sh '+newPeerName+" "+newPeerCorePort);

}




createNewPeer('peer3',9051)

/* USE BELOW FOR TESTING FOR NOW, AUTO CREATES PEER CALLED PEER3, FOR APP WE DONT WANNA HARDCODE PEER NAME*/
/*
try{

    
    
    const myShellScript = exec('./organizations/fabric-ca/generatePeerCrypto.sh'); //TODO: pass new peer name instead of hardcoded peer3
    
    
    
    
    

    
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
    
    
    
    
    exec('docker-compose -f ./docker/docker-compose-newpeer.yaml up -d',
    function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
             console.log('exec error: ' + error);
        }
    });

    
    
    


    const joinChannelCmd = exec('./scripts/dynamicPeerJoinChannel.sh');

    

    
    
    
}catch(e){
    console.log(e)
}
*/
/* REMEMBER TO REMOVE VOLUME WHEN YOU ARE DONE WITH IT!*/
