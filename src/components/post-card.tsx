import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface PostCardProps {
    id: string;
    title: string;
    content: string;
    imageUrl: string;
    createdAt: Date;
    authorId: string;
    currentUserId: string;
}

export default function PostCard({ id, title, content, imageUrl, createdAt, currentUserId, authorId }: PostCardProps) {
    const isAuthor = authorId === currentUserId;
    return (
        <Card className="w-full">
            <CardHeader>
                <h2 className="text-xl font-semibold">{title}</h2>
                <p className="text-sm text-gray-500">{new Date(createdAt).toLocaleString()}</p>
            </CardHeader>
            <CardContent>
                <div>
                    <img src={imageUrl} alt={title} className="object-cover rounded-lg w-full h-full" />
                </div>
                <p className="text-gray-700 line-clamp-3">{content}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Link href={`/post/${id}`}>
                    <Button>Read More</Button>
                </Link>
                {isAuthor && (
                    <Button variant="destructive">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}
