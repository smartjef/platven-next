const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient()

async function main() {
    // Read from environment variables
    const email = process.env.SUPERUSER_EMAIL
    const password = process.env.SUPERUSER_PASSWORD
    const name = process.env.SUPERUSER_NAME
    const identificationNumber = process.env.SUPERUSER_ID_NUMBER
    const phoneNumber = process.env.SUPERUSER_PHONE
    const type = process.env.SUPERUSER_TYPE

    // Check if required environment variables are set
    if (!email || !password || !name || !identificationNumber || !type) {
        console.error('Missing required environment variables')
        process.exit(1)
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                identificationNumber,
                phoneNumber,
                type,
                isActive: true,
                isStaff: true,
                isSuperUser: true,
                accountVerified: true,
                address: process.env.SUPERUSER_ADDRESS,
                image: process.env.SUPERUSER_IMAGE,
            },
        })

        console.log(`Superuser created: ${user.email}`)
    } catch (error) {
        console.error('Error creating superuser:', error)
    } finally {
        await prisma.$disconnect()
    }
}

main()