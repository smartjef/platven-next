const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();
type Constiuency = {
  name: string;
  code: string;
};

type County = {
  name: string;
  number: string;
  capital: string;
  constituencies: Constiuency[];
};

async function seedKenyanDemographicUnits() {
  const counties = require('./counties.json') as County[];
  console.log('[+] Clearing demographic unit tables ....');
  await prisma.county.deleteMany({
    where: { code: { in: counties.map((c) => c.number) } },
  });
  console.log('[+] Cleared demographic unit tables ....');

  const tasks = counties.map(({ capital, constituencies, name, number }) =>
    prisma.county.create({
      data: {
        capital,
        code: number,
        name,
        subscounties: {
          createMany: { data: constituencies },
        },
      },
    }),
  );
  return await Promise.all(tasks);
}

async function createSuperUser() {
  const args = process.argv.slice(2);
  const [_flag, email, password, name, identificationNumber, phoneNumber] = args;

  if (!email || !password || !name || !identificationNumber) {
    console.error('Missing required command-line arguments');
    console.error('Usage: npm run createsuperuser <email> <password> <name> <identificationNumber> <phoneNumber>');
    process.exit(1);
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        identificationNumber,
        phoneNumber,
        type: 'Individual',
        isActive: true,
        isStaff: true,
        isSuperUser: true,
        accountVerified: true,
      },
    });

    console.log(`Superuser created: ${user.email}`);
  } catch (error) {
    console.error('Error creating superuser:', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function resetClicks() {
  try {

    let clickRecord = await prisma.click.findFirst();

    if (!clickRecord) {

      clickRecord = await prisma.click.create({
        data: {
          count: 1,
        },
      });
    } else {

      clickRecord = await prisma.click.update({
        where: { id: clickRecord.id },
        data: { count: 0 },
      });
    }

    console.log('Click record updated:', clickRecord);
    return clickRecord;
  } catch (error) {
    console.error('Error ensuring single Click record:', error);
    throw error;
  }
}

async function main() {
  const args = process.argv.slice(2);
  const isCreatingSuperUser = args.includes('-c');
  const isSeeding = args.includes('-s');
  const isTemp = args.includes('-t');

  if (isSeeding) {
    try {
      console.log('[+] Starting seed ...');
      const counties = await seedKenyanDemographicUnits();
      console.log(`[+] Finished. Seeded ${counties.length} counties`);
    } catch (error) {
      console.log(`[+] Failed to seed counties: ${error}`);
    }
  }

  if (isCreatingSuperUser) {
    try {
      console.log('[+] Creating superuser ...');
      await createSuperUser();
      console.log(`[+] Superuser created`);
    } catch (error) {
      console.error(`[+] Failed to create superuser: ${error}`)
    }
  }

  if (isTemp) {
    resetClicks().catch((error) => console.error('Unexpected error:', error));
  }
}

main().catch((err) => {
  console.error('An error occurred:', err);
});
