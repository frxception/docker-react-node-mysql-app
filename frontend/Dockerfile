FROM node:lts-alpine AS builder

WORKDIR /app

RUN npm install -g pnpm

COPY . /app

RUN pnpm install
RUN pnpm run build


FROM nginx:1-alpine

ADD nginx /etc/nginx
WORKDIR /app/dist

RUN rm -rf *

COPY --from=builder /app/dist .

STOPSIGNAL SIGTERM

ENTRYPOINT ["nginx", "-g", "daemon off;"]
#COPY --from=builder /app/dist /etc/nginx/html
#COPY nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
