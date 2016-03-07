#!/bin/bash

id=$(vagrant global-status | awk 'NR==3{print $1}')

echo 'killall obcca-server' | vagrant ssh $id > /dev/null 
echo 'Hyperledger CA Background Process...'
(echo 'cd /opt/gopath/src/github.com/openblockchain/obc-peer/obc-ca'; echo './obcca-server') | vagrant ssh $id > /dev/null 
