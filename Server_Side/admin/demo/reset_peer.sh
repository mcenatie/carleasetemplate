#!/bin/bash

id=$(vagrant global-status | awk 'NR==3{print $1}')

echo 'killall obc-peer' | vagrant ssh $id > /dev/null 
echo 'rm -r /var/openchain/production/db' | vagrant ssh $id > /dev/null 
echo 'cp -r /openchain/obc-dev-env/db /var/openchain/production' | vagrant ssh $id > /dev/null 
echo 'Hyperledger Peer Background Process...'
(echo 'cd /opt/gopath/src/github.com/openblockchain/obc-peer'; echo './obc-peer peer') | vagrant ssh $id > /dev/null 
