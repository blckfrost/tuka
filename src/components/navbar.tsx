import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';

export default async function Navbar() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    return (
        <nav className="py-6">
            <ul className="flex justify-between items-center">
                <li>
                    <Link href="/" className="hover:underline flex gap-2 items-center text-xl">
                        Tuka
                    </Link>
                </li>
                <li>
                    {!session ? (
                        <Link href="/login">
                            <Button>Login</Button>
                        </Link>
                    ) : (
                        <div>
                            <Link href="/profile">
                                <Image width={30} height={30} src={session.user.image as string} alt={`${session.user.name} image`} className="rounded-full" />
                            </Link>
                        </div>
                    )}
                </li>
            </ul>
        </nav>
    );
}
