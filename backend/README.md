
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

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```
 
##
Use Prisma CLI to apply migrations and generate the Prisma client:

```bash
npx prisma migrate dev
npx prisma generate
```

### Seed the Cafes and Employees (add dummy data)


While the docker container/db server is running run the following:
```bash
npx prisma db seed

or 

pnpm run seed
```

Then just to be sure run again...

```prisma
npx prisma migrate dev
```

Afterwards, seed data is in db already.


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
  id            Int      @id @default(autoincrement())
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  name          String
  email_address String
  phone_number  String
  days_worked   Int
  cafe          Cafes    @relation(fields: [cafesId], references: [id])
  cafesId       Int
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

### Sample

**Create Cafes**
<img src="screenshots/cafe.png" />
Request:
```json
{
  "name": "Cafe2",
  "description": "Some desc",
  "employees": 2,
  "logo": "somelogo.png",
  "location": "sg"
}

```

Response
```json
{
  "id": 3,
  "name": "Cafe2",
  "description": "Some desc",
  "employees": 2,
  "logo": "somelogo.png",
  "location": "sg"
}
```
----
**Create Employees**
<img src="screenshots/employee.png" />

Request:
```json
{
  "name": "Employee1",
  "email_address": "test@test.com",
  "phone_number": "+658888888",
  "days_worked":   1,
  "cafe": "Cafe1"
}

```

Response
```json
{
  "id": 1,
  "name": "Employee1",
  "email_address": "test@test.com",
  "phone_number": "+658888888",
  "days_worked": 1,
  "cafe": "Cafe1"
}
```


## License

Nest is [MIT licensed](LICENSE).
