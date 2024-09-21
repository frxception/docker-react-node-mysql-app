FROM node:18

WORKDIR /backend

RUN echo "Set working directory for backend ===  $(pwd)"

COPY package.json .
COPY package*.json ./
COPY tsconfig*.json ./

RUN echo "Install deps within ===  $(pwd)"

RUN npm install -g pnpm
RUN pnpm install

COPY . .

COPY ./waitForIt.sh ./
COPY ./migratePrisma.sh ./

# run prisma
RUN echo "Running prisma ===  $(pwd)"
RUN npx prisma generate
RUN chmod +x waitForIt.sh
RUN chmod +x migratePrisma.sh

# RUN pnpm run build
EXPOSE $NODE_DOCKER_PORT

CMD ["./waitForIt.sh", "--host=db", "--port=3306"]

RUN echo "Running prisma migration ===  $(pwd)"

#CMD ["./migratePrisma.sh"]

CMD ["npx","prisma", "migrate", "dev"]

RUN echo "Running backend server ===  $(pwd)"

CMD ["pnpm", "run", "start"]

#CMD ["node","dist/main.js"]
