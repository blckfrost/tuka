'use server';

import { z } from 'zod';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { prisma } from '@/lib/prisma';

const FormSchema = z.object({
    title: z.string().min(1),
    content: z.string().optional(),
    imageUrl: z.string().url(),
});

export type State = {
    errors?: {
        title?: string[];
        content?: string[];
        imageUrl?: string[];
    };
    message?: string | null;
};

export async function CreatePostAction(formData: FormData): Promise<State> {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user?.email) {
        return { message: 'Not authenticated' };
    }

    const validatedFields = FormSchema.safeParse({
        title: formData.get('title'),
        content: formData.get('content')?.toString() || '',
        imageUrl: formData.get('imageUrl')?.toString() || '',
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to create Post',
        };
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        });

        if (!user) {
            return { message: 'User not found.' };
        }

        await prisma.post.create({
            data: {
                title: validatedFields.data.title,
                content: validatedFields.data.content || '',
                image: validatedFields.data.imageUrl,
                authorId: user.id,
                createdAt: new Date(),
            },
        });

        return {
            message: 'Post created succesfully',
        };
    } catch (error) {
        console.error(error);
        return {
            message: 'Database error. Failed to create Post',
        };
    }
}
