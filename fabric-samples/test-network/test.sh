./network.sh down

rm -rf ../asset-transfer-basic/application-javascript/wallet


echo "deleted wallets"
./network.sh up createChannel -c mychannel -ca
./network.sh deployCC -ccn basic -ccp ../asset-transfer-basic/chaincode-javascript/ -ccl javascript

echo "chaincode deployed"


 node ../asset-transfer-basic/application-javascript/app.js > ../asset-transfer-basic/application-javascript/test.txt
 echo "ledger initialized"

 node ../asset-transfer-basic/application-javascript/app-test.js >> ../asset-transfer-basic/application-javascript/test.txt

 echo "test done"
