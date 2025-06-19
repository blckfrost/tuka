'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { CalendarDays, MessageCircle, User } from 'lucide-react';

interface Post {
    id: string;
    title: string;
    content: string;
    image: string;
    createdAt: Date;
    authorId: string;
    author: {
        id: string;
        name: string;
        email: string;
    };
    _count: {
        comments: number;
    };
}

export default function PostPage() {
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const params = useParams();

    useEffect(() => {
        async function fetchPost() {
            try {
                const response = await fetch(`/api/posts/${params.id}`);
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Failed to fetch post');
                }
                const postData = await response.json();
                setPost(postData);
            } catch (error) {
                setError(error instanceof Error ? error.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        }

        if (params.id) {
            fetchPost();
        }
    }, [params.id]);

    if (loading) {
        return (
            <div className="container mx-auto py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="animate-pulse space-y-6">
                        <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-64 bg-gray-200 rounded-lg"></div>
                        <div className="space-y-3">
                            <div className="h-4 bg-gray-200 rounded"></div>
                            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto py-8">
                <Card className="max-w-md mx-auto">
                    <CardContent className="text-center py-8">
                        <div className="text-red-500 text-lg font-medium mb-2">Error</div>
                        <p className="text-gray-600">{error}</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="container mx-auto py-8">
                <Card className="max-w-md mx-auto">
                    <CardContent className="text-center py-8">
                        <div className="text-gray-500 text-lg font-medium mb-2">Not Found</div>
                        <p className="text-gray-600">The post you're looking for doesn't exist.</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <article className="max-w-4xl mx-auto">
                {/* Hero Image */}
                {post.image && (
                    <div className="aspect-video relative overflow-hidden rounded-xl mb-8 shadow-lg">
                        <Image src={post.image} alt={post.title} fill className="object-cover" priority />
                    </div>
                )}

                {/* Article Header */}
                <header className="mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">{post.title}</h1>

                    <div className="flex flex-wrap items-center gap-6 text-gray-600">
                        <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                                <AvatarFallback className="text-sm font-medium">{post.author.name.charAt(0).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="flex items-center gap-1">
                                <User className="h-4 w-4" />
                                <span className="font-medium">{post.author.name}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-1">
                            <CalendarDays className="h-4 w-4" />
                            <time className="text-sm">
                                {new Date(post.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </time>
                        </div>

                        <div className="flex items-center gap-1">
                            <MessageCircle className="h-4 w-4" />
                            <span className="text-sm">
                                {post._count.comments} {post._count.comments === 1 ? 'comment' : 'comments'}
                            </span>
                        </div>
                    </div>
                </header>

                {/* Article Content */}
                <Card className="shadow-sm border-0 bg-white">
                    <CardContent className="p-8">
                        <div className="prose prose-lg max-w-none">
                            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">{post.content}</div>
                        </div>
                    </CardContent>
                </Card>
            </article>
        </div>
    );
}
