import type { Post } from '@/generated/prisma';
import Image from 'next/image';

export default function Posts({ posts }: { posts: Post[] }) {
    return (
        <div className="space-y-4">
            <h1>All Your Posts</h1>
            <div>
                {posts.map((post) => (
                    <div key={post.id}>
                        <h2>{post.title}</h2>
                        <p>by {post.authorId}</p>
                        <Image src={post.image} width={100} height={400} alt={post.title} className="rounded-md mt-2" />
                        <p className="mt-2">{post.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
