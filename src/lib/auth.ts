import { betterAuth } from 'better-auth';
import { prisma } from '@/lib/prisma';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { nextCookies } from 'better-auth/next-js';

export const auth = betterAuth({
    database: prismaAdapter(prisma, { provider: 'postgresql' }),
    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        },
    },
    plugins: [nextCookies()],

    session: {
        expiresIn: 60 * 60 * 24 * 7,
    },
});
