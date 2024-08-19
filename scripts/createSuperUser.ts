const { PrismaClient_ } = require("@prisma/client");
const { UserType } = require("@prisma/client");
const bcrypt = require('bcrypt');

async function createSuperUser() {
    const prisma = new PrismaClient_();
    const args = process.argv.slice(2);
    const [email, password, name, identificationNumber, phoneNumber, type, address, image] = args;

    if (!email || !password || !name || !identificationNumber || !type) {
        console.error('Missing required command-line arguments');
        console.error('Usage: node createSuperuser.js <email> <password> <name> <identificationNumber> <phoneNumber>');
        process.exit(1);
    }

    const validTypes = ['ADMIN', 'USER', 'GUEST'];
    if (!validTypes.includes(type.toUpperCase())) {
        console.error('Invalid user type');
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
                type: UserType.Individual,
                isActive: true,
                isStaff: true,
                isSuperUser: true,
                accountVerified: true,
                address: address || null,
                image: image || null,
            },
        });

        console.log(`Superuser created: ${user.email}`);
    } catch (error) {
        console.error('Error creating superuser:', error);
    } finally {
        await prisma.$disconnect();
    }
}
