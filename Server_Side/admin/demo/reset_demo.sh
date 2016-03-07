#!/bin/bash

killall xterm
xterm -iconic -hold -e 'sh /home/ibm/Documents/Demo/Server_Side/admin/demo/reset_peer.sh' & xterm -iconic -hold -e 'sh /home/ibm/Documents/Demo/Server_Side/admin/demo/reset_ca.sh'
