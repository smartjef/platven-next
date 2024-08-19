import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function ensureSingleClickRecord() {
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
                data: { count: clickRecord.count + 1 },
            });
        }

        console.log('Click record updated:', clickRecord);
        return clickRecord;
    } catch (error) {
        console.error('Error ensuring single Click record:', error);
        throw error;
    }
}

ensureSingleClickRecord().catch((error) => console.error('Unexpected error:', error));
