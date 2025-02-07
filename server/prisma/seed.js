import PrismaClient from '../database/PrismaClient.js';
import bcryptjs from 'bcryptjs';
import { faker } from '@faker-js/faker';

const password = 'Passwordss%1';

const grades = [
  'V0',
  'V1',
  'V2',
  'V3',
  'V4',
  'V5',
  'V6',
  'V7',
  'V8',
  'V9',
  'V10',
  'V11',
  'V12',
];

function generateNote() {
  return {
    content: faker.word.words({ count: { min: 5, max: 25 } }),
  };
}

function generateNotes() {
  return faker.helpers.multiple(() => generateNote(), {
    count: { min: 1, max: 3 },
  });
}

function generateClimb() {
  return {
    grade: faker.helpers.arrayElement(grades),
    location: faker.location.streetAddress(),
    completed: faker.datatype.boolean({ probability: 0.5 }),
    notes: {
      create: generateNotes(),
    },
  };
}

function generateClimbs() {
  return faker.helpers.multiple(() => generateClimb(), {
    count: { min: 1, max: 3 },
  });
}

async function main() {
  for (let i = 0; i < 50; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    let email = faker.internet.email({ firstName, lastName });
    email = `${email}`;
    await PrismaClient.user.create({
      data: {
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: await bcryptjs.hash(password, 10),
        climbs: {
          create: generateClimbs(),
        },
      },
    });
  }
}

main()
  .then(async () => {
    await PrismaClient.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await PrismaClient.$disconnect();
    process.exit(1);
  });
