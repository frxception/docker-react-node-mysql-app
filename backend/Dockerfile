FROM node:20.11-alpine

WORKDIR /app

COPY package.json .

RUN npm install -g pnpm
RUN pnpm install

COPY . .


#RUN pnpm run build
EXPOSE 8888

#CMD ["node","dist/main.js"]
CMD ["pnpm", "run", "start"]
