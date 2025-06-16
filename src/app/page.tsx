'use client';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface Post {
    id: string;
    title: string;
    content: string;
    imageUrl: string;
    createdAt: Date;
    authorId: string;
}

export default function Home() {
    const [posts, setPosts] = useState<Post[]>([]);

    return (
        <div className="container mx-auto py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Latest Post</h1>
                <Link href="/create">
                    <Button variant="default">
                        <Pencil className="w-5 h-5" />
                        Create Post
                    </Button>
                </Link>
            </div>
        </div>
    );
}
