const yaml = require('js-yaml')
const fs = require('fs');
const { syncBuiltinESMExports } = require('module');
const exec = require('child_process').execSync;


/* THIS FUNCTION CREATES, ENROLLS a new peer and installs chaincode on that peer and it joins the channel*/
exports.createNewPeer = async function (newPeerName, newPeerCorePort) {

    const myShellScript = exec('cd ../../test-network/ && ./organizations/fabric-ca/generatePeerCrypto.sh ' + newPeerName); //pass newPeerName as argument to the bash script

    //const myShellScript = exec('bash ../../test-network/organizations/fabric-ca/dummyScript.sh');

    var peerAbbreviation = newPeerName + '.org1.example.com'
    let new_peer_data = {
        version: '3.7',
        volumes: {
            [peerAbbreviation]: null
        }, //this line is causing me problems

        networks: { test: { name: 'fabric_test' } },
        services: {
            [peerAbbreviation]: {
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
                    'CORE_PEER_ID=' + peerAbbreviation,
                    'CORE_PEER_ADDRESS=' + peerAbbreviation + ':' + newPeerCorePort,
                    'CORE_PEER_LISTENADDRESS=0.0.0.0:' + newPeerCorePort,
                    'CORE_PEER_CHAINCODEADDRESS=' + peerAbbreviation + ':' + (newPeerCorePort + 1),
                    'CORE_PEER_CHAINCODELISTENADDRESS=0.0.0.0:' + (newPeerCorePort + 1),
                    'CORE_PEER_GOSSIP_BOOTSTRAP=' + peerAbbreviation + ':' + newPeerCorePort,
                    'CORE_PEER_GOSSIP_ENDPOINT=' + peerAbbreviation + ':' + newPeerCorePort,
                    'CORE_PEER_GOSSIP_USELEADERELECTION=true',
                    'CORE_PEER_GOSSIP_ORGLEADER=false',
                    'CORE_PEER_LOCALMSPID=Org1MSP',
                    'CORE_OPERATIONS_LISTENADDRESS=0.0.0.0:' + (newPeerCorePort + 10000),
                    'CORE_METRICS_PROVIDER=prometheus'
                ],
                volumes: [
                    //'/var/run/:/host/var/run/docker.sock',
                    '/var/run/docker.sock:/host/var/run/docker.sock',
                    '../organizations/peerOrganizations/org1.example.com/peers/' + peerAbbreviation + '/msp:/etc/hyperledger/fabric/msp',
                    '../organizations/peerOrganizations/org1.example.com/peers/' + peerAbbreviation + '/tls:/etc/hyperledger/fabric/tls',
                    peerAbbreviation + ':/var/hyperledger/production'
                ],
                working_dir: '/opt/gopath/src/github.com/hyperledger/fabric/peer',
                command: 'peer node start',
                ports: [newPeerCorePort + ':' + newPeerCorePort, (10000 + newPeerCorePort) + ':' + (10000 + newPeerCorePort)],
                networks: ['test']
            }
        }
    }

    //create the new yaml file
    fs.writeFileSync('../../test-network/docker/docker-compose-' + newPeerName + '.yaml', yaml.dump(new_peer_data, { lineWidth: -1 }), (err) => {
        if (err) {
            console.log(err);
        }
    });
    const newCmd = exec('export CORE_PEER_MSPCONFIGPATH=${PWD}../../test-network/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp');
    //bring up the new peer container

    exec('docker-compose -f ../../test-network/docker/docker-compose-' + newPeerName + '.yaml up -d',
        function (error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });

    //join the channel and install chaincode on new peer
    const joinChannelCmd = exec('cd ../../test-network/ && ./scripts/dynamicPeerJoinChannel.sh ' + newPeerName + " " + newPeerCorePort);
    //TODO: bring down grafana server, update its yaml with the new peer and RESTART IT!!

}

//dont forget to remove volume when u r done



/* THIS FUNCTION SHOULD BRING UP AN ALREADY EXISTING AND ENROLLED PEER BACK TO THE NETWORK*/
exports.bringUpPeer = async function (peerName) {
    //basically just have to run a docker compose up and it should recreate the peer
    const startCmd = exec('cd ../../test-network/ && docker start ' + peerName);
}

/* THIS FUNCTION SHOULD BRINGDOWN AN ALREADY EXISTING AND ENROLLED PEER */
exports.bringDownPeer = async function (peerName) {
    //basically just have to run a docker compose down and it should bring down peer
    const stopCmd = exec('cd ../../test-network/ && docker stop ' + peerName);
}

/* THIS FUNCTION SHOULD BRING UP AN ALREADY EXISTING ORDERER BACK TO THE NETWORK*/
exports.bringUpOrderer = async function (ordererName) {
    //basically just have to run a docker compose up and it should recreate the orderer
    const startCmd = exec('cd ../../test-network/ && docker start ' + ordererName);
}

/* THIS FUNCTION SHOULD BRINGDOWN AN ALREADY EXISTING ORDERER */
exports.bringDownOrderer = async function (ordererName) {
    //basically just have to run a docker compose down and it should bring down orderer
    const stopCmd = exec('cd ../../test-network/ && docker stop ' + ordererName);
}

exports.getDockerContainers = async function () {
    exec(`docker ps -a | awk '!/basic/ && /example.com/' > containers.txt`);
    let lines = []
    try {

        const file = fs.readFileSync('containers.txt', 'utf-8')
        file.split(/\r?\n/).forEach(function (line) {
            lines.push(line.split('  '))
        })

        let filteredLines = []
        for (let i = 0; i < lines.length; i++) {
            filteredLines[i] = lines[i].filter(function (value, index, arr) {
                return value != '';
            });
        }

        filteredLines.forEach(a => a.splice(1, 1)); //removing image column
        filteredLines.forEach(a => a.splice(1, 1)); //removing command column

        let data = []
        for (let i = 0; i < filteredLines.length - 1; i++) {
            data.push({ "CONTAINER_ID": filteredLines[i][0], "CREATED": filteredLines[i][1], "STATUS": filteredLines[i][2], "PORTS": filteredLines[i][3], "NAMES": filteredLines[i][4] })
            if (data[i]["NAMES"] === undefined){
                data[i]["NAMES"] = data[i]["PORTS"]
                data[i]["PORTS"] = "" 
            }
        }
        return data;

    } catch (err) {
        console.error(err)
    }

}