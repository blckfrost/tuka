import SignOutButton from '@/components/signout-btn';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Image from 'next/image';

export default async function ProfilePage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    return (
        <main>
            <section className="flex flex-col items-center gap-2">
                <Image width={100} height={100} src={session?.user.image as string} alt={`${session?.user.name} image`} className="rounded-md" />
                <p>{session?.user.name}</p>
                <SignOutButton />
            </section>
        </main>
    );
}
