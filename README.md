curl -X POST -d "num=9999999" http://127.0.0.1:8001/run/memory

curl -X POST -d "seconds=10" http://127.0.0.1:8001/run/cpu

curl -X POST -d "seconds=2" http://127.0.0.1:8001/run/io


curl -X POST -d "seconds=2" http://192.168.99.100:31045/run/io
curl -X POST -d "seconds=10" http://192.168.99.100:31045/run/cpu
curl -X POST -d "num=9999999" http://192.168.99.100:31045/run/memory

curl -X POST http://192.168.99.102:31045/run/clearmemory



CPU
then needs to go back to a steady state
High Memory
then needs to go back to a steady state
High I/O

Careful that it scales back down to the default first !!





for i in {1..1000}; do curl -X POST -d "seconds=5" http://192.168.99.100:32628/run/io; done
only sending in sequence, need to do in parallel



curl -X POST -d "seconds=1" http://192.168.99.100:32628/run/io


autocannon -b "seconds=1" http://192.168.99.100:32628/run/io

autocannon -a 1000 -m 'POST' -b "seconds=0.001" http://192.168.99.100:32628/run/io

autocannon -p 10 -c 1000 -a 100000 -m 'POST' -b "seconds=0.1" http://192.168.99.100:32628/run/io

autocannon -p 10 -c 100 -a 100000 -m 'POST' -b "seconds=0.1" http://192.168.99.100:32628/run/io

autocannon -p 2 -c 2 -a 10000  http://localhost:8001/run/io?seconds=3

autocannon -p 1 -c 1 -a 100 http://192.168.99.100:31443/run/cpu?seconds=2

curl -X POST -d "seconds=10" http://192.168.99.100:31045/run/cpu






