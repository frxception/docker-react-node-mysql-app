import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  console.log(`Start seeding ...`);

  const caf1 = await prisma.cafes.create({
    data: {
      id: 1,
      name: 'Digong Cafe',
      description: 'Lorem ipsum dolor sit amet',
      location: 'Tampines',
      logo: 'https://gravatar.com/avatar/ef7b90c86c01dea8b4313dbb1cd0d015?s=400&d=robohash&r=x',
    },
  });
  const caf2 = await prisma.cafes.create({
    data: {
      id: 2,
      name: 'Farm Cafe',
      description: 'Lorem ipsum dolor sit amet',
      location: 'Jurong',
      logo: 'https://gravatar.com/avatar/24f7432224dd89ca643bec40d21861a7?s=400&d=robohash&r=x',
    },
  });

  const caf3 = await prisma.cafes.create({
    data: {
      id: 3,
      name: 'Pogo Cafe',
      description: 'Lorem ipsum dolor sit amet',
      logo: 'https://gravatar.com/avatar/1db0c9ee9a6da87ee2416ea23dfab10d?s=400&d=robohash&r=x',
      location: 'Raffles',
    },
  });

  const emp1 = await prisma.employees.create({
    data: {
      email: 'alice.guo@prisma.io',
      name: 'Alice Guo',
      phone: '+6588888888',
      days: 7,
      cafesId: 1,
      gender: 'F',
    },
  });
  const emp2 = await prisma.employees.create({
    data: {
      email: 'cass.ong@prisma.io',
      name: 'Cassandra Ong',
      phone: '+6588888888',
      days: 7,
      cafesId: 1,
      gender: 'F',
    },
  });

  const emp3 = await prisma.employees.create({
    data: {
      email: 'sd@prisma.io',
      name: 'Bratanila SD',
      phone: '+6588888888',
      days: 365,
      cafesId: 3,
      gender: 'F',
    },
  });

  const emp4 = await prisma.employees.create({
    data: {
      email: '1piece@prisma.io',
      name: 'Monkey D. Luffy',
      phone: '+6588888888',
      days: 7,
      cafesId: 2,
      gender: 'M',
    },
  });

  console.log('Creates: ', { emp1, emp2, emp3, emp4, caf1, caf2, caf3 });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
