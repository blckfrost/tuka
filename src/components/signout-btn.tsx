'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { signOut } from '@/lib/auth-client';
import { toast } from 'sonner';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function SignOutBtn() {
    const router = useRouter();
    const [pending, setIsPending] = useState(false);

    async function handleClick() {
        await signOut({
            fetchOptions: {
                onResponse: () => {
                    setIsPending(false);
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message);
                },
                onSuccess: () => {
                    toast.success("You've logged out. See you soon");
                    router.push('/');
                },
                onRequest: () => {
                    setIsPending(true);
                },
            },
        });
    }

    return (
        <Button size="sm" onClick={handleClick} variant="destructive" disabled={pending}>
            {pending ? <Loader2 size={16} className="animate-spin" /> : 'Sign Out'}
        </Button>
    );
}
