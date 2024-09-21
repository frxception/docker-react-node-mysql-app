
# Docker+Frontend+Backend  Demo


## Overview

### Backend
* NestJS
* Prisma
* Docker
* Mysql
* Vite
* Pnpm
* Typescript


### Frontend
* React
* Typescript
* Material-UI,
* Tanstack React Query
* Tanstack React Router
* Tailwind
* Vite
* Pnpm
* Docker
* Nginx

## Setup

### Run and Deploy Instantly

### This would run the script to install and setup backend and frontend apps
```bash
$ chmod +x start.sh
$ chmod +x stop.sh
```


#### Start the docker apps
```bash
$ ./start.sh
```


#### Stop the docker apps
```bash
$ ./stop.sh
```

<br>


---

### Run Manually

#### 1) Backend (default url http://localhost:8888)

```bash
$ cd backend

# install deps
$ pnpm install

# run mysql db server
$ docker-compose up --build

# run prisma migration
$ npx prisma migrate dev

# (optional) add predefined data to db
$ npx prisma db seed

# run backend app
$ pnpm run start
or
$ pnpm run start:dev
````


#### 2) Frontend (default url http://localhost:8080)
```bash
$ cd frontend
$ pnpm install
$ pnpm run dev
````



## Other useful scripts

### Backend
```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod

# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```
---
> NOTE: Remember any db schema change you need to run migrate
```bash
$ npx prisma migrate dev
$ npx prisma generate
```

```bash
# Docker commands
$ docker ps -a
$ docker system prune -a
$ docker ps -a
$ docker rm <id>


# db only
docker-compose up db

# frontend only
docker-compose up frontend

# backend only
docker-compose up backend

```

----
### Frontend
###
To know check out the guideline [Read more](./frontend/README.md)


----
