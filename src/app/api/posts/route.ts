import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const posts = await prisma.post.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                author: {
                    select: {
                        name: true,
                        image: true,
                    },
                },
            },
        });
        if (!posts) {
            return NextResponse.json({ error: 'Posts not found' }, { status: 404 });
        }

        return NextResponse.json(posts);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
