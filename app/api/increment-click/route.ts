import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';


export const GET = async (request: NextRequest) => {
    try {
        const click = await prisma.click.findFirst();

        if (!click) {
            return NextResponse.json({ error: 'Click record not found' }, { status: 404 });
        }

        return NextResponse.json({ count: click.count });
    } catch (error) {
        console.error('Failed to fetch click count:', error);
        return NextResponse.json({ error: 'Failed to fetch click count' }, { status: 500 });
    }
};

export const POST = async (request: NextRequest) => {
    try {
        const clickRecord = await prisma.click.findFirst();
        if (!clickRecord) {
            const newClick = await prisma.click.create({ data: { count: 1 } });
            return NextResponse.json({ count: newClick.count });
        }

        const updatedClick = await prisma.click.update({
            where: { id: clickRecord.id },
            data: { count: { increment: 1 } },
        });

        return NextResponse.json({ count: updatedClick.count });
    } catch (error) {
        console.error('Failed to update click count:', error);
        return NextResponse.json({ error: 'Failed to update click count' }, { status: 500 });
    }
};
