FROM node:18

WORKDIR /backend

COPY package.json .
COPY package*.json ./
COPY tsconfig*.json ./

RUN npm install -g pnpm
RUN pnpm install

COPY . .

COPY ./waitForIt.sh ./
COPY ./migratePrisma.sh ./

# run prisma
RUN npx prisma generate
RUN chmod +x waitForIt.sh
RUN chmod +x migratePrisma.sh


# RUN pnpm run build
EXPOSE $NODE_DOCKER_PORT


CMD ["./waitForIt.sh", "db:3306", "--", "./migratePrisma.sh"]

CMD ["npx","prisma", "migrate", "dev"]
CMD ["pnpm", "run", "start"]

#CMD ["node","dist/main.js"]
