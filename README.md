curl -X POST -d "num=9999999" http://127.0.0.1:8001/run/memory

curl -X POST -d "seconds=10" http://127.0.0.1:8001/run/cpu

curl -X POST -d "seconds=2" http://127.0.0.1:8001/run/io


curl -X POST -d "seconds=2" http://192.168.99.102:31045/run/io
curl -X POST -d "seconds=10" http://192.168.99.102:31045/run/cpu
curl -X POST -d "num=9999999" http://192.168.99.102:31045/run/memory

curl -X POST http://192.168.99.102:31045/run/clearmemory



CPU
then needs to go back to a steady state
High Memory
then needs to go back to a steady state
High I/O

Careful that it scales back down to the default first !!