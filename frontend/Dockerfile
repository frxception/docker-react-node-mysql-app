FROM node:18-alpine AS vite-app
#ENV NODE_ENV production
WORKDIR /frontend


COPY . .
#COPY package*.json ./
#COPY tsconfig*.json ./
#COPY index.html ./
#COPY vite.config.ts ./

RUN npm install -g pnpm

RUN pnpm install
COPY . .


RUN pnpm run build

FROM nginx:alpine

#COPY /nginx ./etc/nginx
#ADD nginx /etc/nginx
#WORKDIR /frontend/dist

WORKDIR /usr/share/nginx/
RUN rm -rf html
RUN mkdir html
WORKDIR /

#RUN rm -rf *


#COPY --from=builder /frontend/dist .
#COPY --from=builder /frontend/dist /etc/nginx/html
COPY nginx/nginx.conf /etc/nginx
COPY --from=vite-app  /frontend/dist /usr/share/nginx/html
#STOPSIGNAL SIGTERM
#EXPOSE 3000

ENTRYPOINT ["nginx", "-g", "daemon off;"]

