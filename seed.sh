#!/bin/bash

echo "===========[ Run backend seeding...] ============ ${pwd}"

# Navigate back to backend directory and run Prisma migrations
cd backend

#echo "===========[ Clean all existing backend dbdata...] ============ ${pwd}"
#rm -rf  dbdata


echo "===========[ Run prisma migrate ...] ============ ${pwd}"
# npx prisma db seed
npx prisma migrate dev


echo "===========[  Run prisma seeding db...] ============ ${pwd}"
npx prisma db seed


echo "===========[ Seeding Done! ] ============"

echo "To test backend API service endpoint: "
echo "http: //localhost:8888/"

