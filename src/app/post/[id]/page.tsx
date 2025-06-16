'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

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
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!post) return <div>Post not found</div>;

    return (
        <div className="container mx-auto py-8">
            <article className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

                <div className="mb-6 text-gray-600">
                    <p>By: {post.author.name}</p>
                    <p>Published: {new Date(post.createdAt).toLocaleDateString()}</p>
                    <p>{post._count.comments} comments</p>
                </div>

                {post.image && <img src={post.image} alt={post.title} className="w-full h-64 object-cover rounded-lg mb-6" />}

                <div className="prose max-w-none">
                    <p>{post.content}</p>
                </div>
            </article>
        </div>
    );
}
