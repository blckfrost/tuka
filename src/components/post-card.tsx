import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { DeletePostAction } from '@/lib/actions/delete-post';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface PostCardProps {
    id: string;
    title: string;
    content: string;
    image: string;
    createdAt: Date;
    authorId: string;
    currentUserId: string;
    visibity?: string;
}

export default function PostCard({ id, title, content, image, createdAt, currentUserId, authorId, visibity }: PostCardProps) {
    const isAuthor = authorId === currentUserId;
    const router = useRouter();

    async function handleDelete() {
        try {
            const result = await DeletePostAction(id);
            if (result.message === 'Post deleted succesfully') {
                toast.success('Post deleted succesfully.');
                router.refresh();
            } else {
                toast.error(result.message || 'Failed to delete post');
            }
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong');
        }
    }
    return (
        <Card className="w-full">
            <CardHeader>
                <h2 className="text-xl font-semibold">{title}</h2>
                <p className="text-sm text-gray-500">{new Date(createdAt).toLocaleString()}</p>
            </CardHeader>
            <CardContent>
                <div>
                    <Image src={image} alt={title} className="object-cover rounded-lg" width={300} height={300} />
                </div>
                <p className="text-gray-700 line-clamp-3">{content}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Link href={`/post/${id}`}>
                    <Button>Read More</Button>
                </Link>
                {isAuthor && (
                    <Button variant="destructive" onClick={handleDelete}>
                        <Trash2 className="h-4 w-4" />
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}
