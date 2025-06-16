import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        if (!id) {
            return Response.json({ error: 'Post ID is required' }, { status: 400 });
        }

        const post = await prisma.post.findUnique({
            where: { id },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                    },
                },
                _count: {
                    select: {
                        comments: true,
                    },
                },
            },
        });

        if (!post) {
            return Response.json({ error: 'Post not found' }, { status: 404 });
        }
        return Response.json(post);
    } catch (error) {
        console.error('Error fetching post', error);
        return Response.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
