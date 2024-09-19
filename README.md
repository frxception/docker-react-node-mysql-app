
# Frontend+Backend Docker Demo




## Installation



### Run and Deploy Instantly 
```bash
$ docker-compose up

or

$ docker-compose up --build
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


----

### DEMO  
![Screenshot 2024-09-20 at 05.27.53.png](screenshots/Screenshot%202024-09-20%20at%2005.27.53.png)
![Screenshot 2024-09-20 at 05.28.07.png](screenshots/Screenshot%202024-09-20%20at%2005.28.07.png)
![Screenshot 2024-09-20 at 05.28.14.png](screenshots/Screenshot%202024-09-20%20at%2005.28.14.png)
![Screenshot 2024-09-20 at 05.28.27.png](screenshots/Screenshot%202024-09-20%20at%2005.28.27.png)
![Screenshot 2024-09-20 at 05.28.38.png](screenshots/Screenshot%202024-09-20%20at%2005.28.38.png)
![Screenshot 2024-09-20 at 05.28.46.png](screenshots/Screenshot%202024-09-20%20at%2005.28.46.png)
![Screenshot 2024-09-20 at 05.28.53.png](screenshots/Screenshot%202024-09-20%20at%2005.28.53.png)
