import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const post = await prisma.post.findUnique({
            where: { id: params.id },
            include: {
                author: {
                    select: {
                        name: true,
                        image: true,
                    },
                },
            },
        });

        if (!post) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }
    } catch (error) {
        console.error('Error fetching post', error);
        return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
    }
}
