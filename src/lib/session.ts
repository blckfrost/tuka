'use server';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function getSession() {
    try {
        const session = await auth.api.getSession({ headers: await headers() });
        return session;
    } catch (error) {
        console.error('Failed to get session', error);
        return null;
    }
}

export async function getUser() {
    try {
        const session = await getSession();
        return session?.user;
    } catch (error) {
        console.error('Error getting user', error);
        return null;
    }
}
