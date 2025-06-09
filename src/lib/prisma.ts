import { PrismaClient } from '@/generated/prisma';

const globalForSchema = global as unknown as { prisma: PrismaClient };

export const prisma = globalForSchema.prisma || new PrismaClient();

if (process.env.NODE_ENV === 'production') globalForSchema.prisma = prisma;
