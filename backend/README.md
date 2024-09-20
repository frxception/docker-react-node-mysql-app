
# Backend 

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```


> Once backend mysql db is running we need to run Prisma CLI to apply migrations and generate the Prisma client:

```bash
$ npx prisma migrate dev

$ npx prisma generate
```


## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```
 

### Seed the Cafes and Employees (add dummy data)


While the docker container/db server is running run the following:
```bash
$ npx prisma db seed
# or 
$ pnpm run seed
```

Then just to be sure run again...

```sh
$ npx prisma migrate dev
```

After that, seeded data is now planted in the db ;-)


## API



### Schema (Entity Relationship)
```prisma
model Cafes {
  id          Int         @id @default(autoincrement())
  name        String      @unique
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
  description String
  logo        String
  location    String
  employees   Employees[]
}

model Employees {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  name      String
  cafesId   Int
  days      Int
  email     String
  phone     String
  gender    String
  cafe      Cafes    @relation(fields: [cafesId], references: [id])
}


```

### Default service api url
http://location:8888

> CRUD Operations:
### Employees

* READ: /employees (GET)
* READ: /employees/:id (GET)
* CREATE: /employees (POST)
* UPDATE: /employees/:id (PATCH)
* DELETE: /employees/:id (DELETE)

### Cafes

* READ: /cafes (GET)
* READ: /cafes/:id (GET)
* CREATE: /cafes (POST)
* UPDATE: /cafes/:id (PATCH)
* DELETE: /cafes/:id (DELETE)

## Sample Data

### Cafes (http://localhost:8888/cafes)
```json
[
  {
    "id": 1,
    "name": "Digong Cafe",
    "createdAt": "2024-09-19T21:26:04.929Z",
    "updatedAt": "2024-09-19T21:26:04.929Z",
    "description": "Lorem ipsum dolor sit amet",
    "logo": "https://gravatar.com/avatar/ef7b90c86c01dea8b4313dbb1cd0d015?s=400&d=robohash&r=x",
    "location": "Tampines",
    "employees": [
      {
        "id": 1,
        "createdAt": "2024-09-19T21:26:04.975Z",
        "updatedAt": "2024-09-19T21:26:04.975Z",
        "name": "Alice Guo",
        "cafesId": 1,
        "days": 7,
        "email": "alice.guo@prisma.io",
        "phone": "+6588888888",
        "gender": "F"
      },
      {
        "id": 2,
        "createdAt": "2024-09-19T21:26:04.992Z",
        "updatedAt": "2024-09-19T21:26:04.992Z",
        "name": "Cassandra Ong",
        "cafesId": 1,
        "days": 7,
        "email": "cass.ong@prisma.io",
        "phone": "+6588888888",
        "gender": "F"
      }
    ]
  },
  {
    "id": 2,
    "name": "Farm Cafe",
    "createdAt": "2024-09-19T21:26:04.957Z",
    "updatedAt": "2024-09-19T21:26:04.957Z",
    "description": "Lorem ipsum dolor sit amet",
    "logo": "https://gravatar.com/avatar/24f7432224dd89ca643bec40d21861a7?s=400&d=robohash&r=x",
    "location": "Jurong",
    "employees": [
      {
        "id": 4,
        "createdAt": "2024-09-19T21:26:05.011Z",
        "updatedAt": "2024-09-19T21:26:05.011Z",
        "name": "Monkey D. Luffy",
        "cafesId": 2,
        "days": 7,
        "email": "1piece@prisma.io",
        "phone": "+6588888888",
        "gender": "M"
      }
    ]
  },
  {
    "id": 3,
    "name": "Pogo Cafe",
    "createdAt": "2024-09-19T21:26:04.966Z",
    "updatedAt": "2024-09-19T21:26:04.966Z",
    "description": "Lorem ipsum dolor sit amet",
    "logo": "https://gravatar.com/avatar/1db0c9ee9a6da87ee2416ea23dfab10d?s=400&d=robohash&r=x",
    "location": "Raffles",
    "employees": [
      {
        "id": 3,
        "createdAt": "2024-09-19T21:26:05.002Z",
        "updatedAt": "2024-09-19T21:26:05.002Z",
        "name": "Bratanila SD",
        "cafesId": 3,
        "days": 365,
        "email": "sd@prisma.io",
        "phone": "+6588888888",
        "gender": "F"
      }
    ]
  }
]
```

----

### Employees (http://localhost:8888/employees)

```json
[
  {
    "id": 1,
    "createdAt": "2024-09-19T21:26:04.975Z",
    "updatedAt": "2024-09-19T21:26:04.975Z",
    "name": "Alice Guo",
    "cafesId": 1,
    "days": 7,
    "email": "alice.guo@prisma.io",
    "phone": "+6588888888",
    "gender": "F",
    "cafe": {
      "id": 1,
      "name": "Digong Cafe",
      "createdAt": "2024-09-19T21:26:04.929Z",
      "updatedAt": "2024-09-19T21:26:04.929Z",
      "description": "Lorem ipsum dolor sit amet",
      "logo": "https://gravatar.com/avatar/ef7b90c86c01dea8b4313dbb1cd0d015?s=400&d=robohash&r=x",
      "location": "Tampines"
    }
  },
  {
    "id": 2,
    "createdAt": "2024-09-19T21:26:04.992Z",
    "updatedAt": "2024-09-19T21:26:04.992Z",
    "name": "Cassandra Ong",
    "cafesId": 1,
    "days": 7,
    "email": "cass.ong@prisma.io",
    "phone": "+6588888888",
    "gender": "F",
    "cafe": {
      "id": 1,
      "name": "Digong Cafe",
      "createdAt": "2024-09-19T21:26:04.929Z",
      "updatedAt": "2024-09-19T21:26:04.929Z",
      "description": "Lorem ipsum dolor sit amet",
      "logo": "https://gravatar.com/avatar/ef7b90c86c01dea8b4313dbb1cd0d015?s=400&d=robohash&r=x",
      "location": "Tampines"
    }
  },
  {
    "id": 3,
    "createdAt": "2024-09-19T21:26:05.002Z",
    "updatedAt": "2024-09-19T21:26:05.002Z",
    "name": "Bratanila SD",
    "cafesId": 3,
    "days": 365,
    "email": "sd@prisma.io",
    "phone": "+6588888888",
    "gender": "F",
    "cafe": {
      "id": 3,
      "name": "Pogo Cafe",
      "createdAt": "2024-09-19T21:26:04.966Z",
      "updatedAt": "2024-09-19T21:26:04.966Z",
      "description": "Lorem ipsum dolor sit amet",
      "logo": "https://gravatar.com/avatar/1db0c9ee9a6da87ee2416ea23dfab10d?s=400&d=robohash&r=x",
      "location": "Raffles"
    }
  },
  {
    "id": 4,
    "createdAt": "2024-09-19T21:26:05.011Z",
    "updatedAt": "2024-09-19T21:26:05.011Z",
    "name": "Monkey D. Luffy",
    "cafesId": 2,
    "days": 7,
    "email": "1piece@prisma.io",
    "phone": "+6588888888",
    "gender": "M",
    "cafe": {
      "id": 2,
      "name": "Farm Cafe",
      "createdAt": "2024-09-19T21:26:04.957Z",
      "updatedAt": "2024-09-19T21:26:04.957Z",
      "description": "Lorem ipsum dolor sit amet",
      "logo": "https://gravatar.com/avatar/24f7432224dd89ca643bec40d21861a7?s=400&d=robohash&r=x",
      "location": "Jurong"
    }
  }
]
```


## License

Nest is [MIT licensed](LICENSE).
