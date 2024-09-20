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
echo "===========[ Run prisma migrate in backend...] ============"
cd backend
pwd
# npx prisma db seed
npx prisma migrate dev

echo "===========[ Setup complete! ] ============"
