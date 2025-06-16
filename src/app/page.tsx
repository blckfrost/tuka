'use client';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import PostCard from '@/components/post-card';
import { getSession } from '@/lib/actions/session';
import { Post } from '@/generated/prisma';

export default function Home() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);

    useEffect(() => {
        async function fetchPosts() {
            const response = await fetch('/api/posts');
            const data = await response.json();
            setPosts(data);
        }

        async function getCurrentUser() {
            // const session = await auth.api.getSession({ headers: await headers() });
            const session = await getSession();
            setCurrentUserId(session?.user.id || null);
        }

        fetchPosts();
        getCurrentUser();
    }, []);

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <PostCard key={post.id} {...post} currentUserId={currentUserId || ''} />
                ))}
            </div>
        </div>
    );
}
