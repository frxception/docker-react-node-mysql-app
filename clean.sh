#!/bin/bash

echo "===========[ Clean environment...] ============ ${pwd}"

./stop.sh

echo "===========[ Clean docker containers...] ============ ${pwd}"
docker container ls -f 'status=exited' -f 'status=dead' -f 'status=created'

docker stop $(docker ps --filter "status=exited" -q)
docker container rm $(docker container ls -q -f 'status=exited' -f 'exited=0')
docker rm -v $(docker ps --filter status=exited -q)


# Navigate back to backend directory and run Prisma migrations
cd backend

echo "===========[ Clean all existing backend dbdata...] ============ ${pwd}"
rm -rf  dbdata node_modules


echo "===========[ Clean environment done! ] ============"

echo "You can now run a clean start by running ./start.sh"


