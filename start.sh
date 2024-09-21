#!/bin/bash

# Install pnpm globally
echo "===========[ Install local pnpm globally...] ============ ${pwd}"
npm install -g pnpm

# Navigate to backend directory and install dependencies
echo "===========[ Install backend deps...] ============"
cd backend
pwd
pnpm install

# Return to the root directory and start Docker containers
echo "===========[ Run main docker command...] ============"
cd ..
pwd
docker-compose up --build -d

# Navigate back to backend directory and run Prisma migrations
cd backend
echo "===========[ Have some tea first...] ============ ${pwd}"
./waitForIt.sh --host=db --port=3306 --strict --timeout=30
echo "===========[ Run prisma migrate in backend...] ============ ${pwd}"
# npx prisma db seed
npx prisma migrate dev

echo "===========[ Setup complete! ] ============"


echo "To test backend API service endpoint: "
echo "http: //localhost:8888/"

echo "---------------"

echo "To view frontend app open browser:"
echo "http: //localhost:8080"


