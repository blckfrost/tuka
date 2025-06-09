import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Link from 'next/link';
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
                <li>{!session ? <Button>Login</Button> : null}</li>
            </ul>
        </nav>
    );
}
