'use client';

import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
    return (
        <div>
            <h1>Hey</h1>

            <div className="absolute bottom-4 right-7">
                <Link href="/create">
                    <Button variant="default">
                        <Pencil className="w-5 h-5" />
                    </Button>
                </Link>
            </div>
        </div>
    );
}
