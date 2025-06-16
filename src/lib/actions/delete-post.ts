'use server';

import { prisma } from '@/lib/prisma';
import { getSession } from './session';

export async function DeletePostAction(postId: string) {
    try {
        const session = await getSession();

        if (!session?.user?.id) {
            return { message: 'Unauthorized' };
        }

        const post = await prisma.post.findUnique({
            where: { id: postId },
            select: { authorId: true },
        });

        if (!post) {
            return { message: 'Post not found' };
        }

        await prisma.post.delete({
            where: { id: postId },
        });

        return { message: 'Post deleted succesfully' };
    } catch (error) {
        console.error('Error deleting post:', error);
        return { message: 'Failed to delete post' };
    }
}
