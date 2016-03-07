#!/bin/bash

id=$(vagrant global-status | awk 'NR==3{print $1}')

echo 'ps cax | grep obc-peer' | vagrant ssh $id > /dev/null
if [ $? -eq 0 ]; then
  echo true
else
  echo false
fi
