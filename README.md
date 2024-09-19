
# Frontend+Backend Docker Demo




## Installation



### Run and Deploy Instantly 
```bash
$ docker-compose up
```

### Run Individually

#### 1) Backend (default url http://localhost:8888)

```bash
$ cd backend
$ pnpm install
$ docker-compose up
````


#### 2) Frontend (default url http://localhost:3000)
```bash
$ cd frontend
$ pnpm install
$ pnpm run start
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
