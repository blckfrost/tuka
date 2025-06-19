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
}

export default function PostCard({ id, title, content, image, createdAt, currentUserId, authorId }: PostCardProps) {
    const isAuthor = authorId === currentUserId;
    const router = useRouter();

    async function handleDelete() {
        try {
            const result = await DeletePostAction(id);
            if (result.message === 'Post deleted successfully') {
                toast.success('Post deleted successfully.');
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
        <Card className="w-full max-w-md mx-auto shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader className="pb-3">
                <h2 className="text-xl font-semibold text-gray-900 line-clamp-2 leading-tight">{title}</h2>
                <p className="text-sm text-gray-500 mt-1">
                    {new Date(createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </p>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="aspect-video relative overflow-hidden rounded-lg bg-gray-100">
                    <Image src={image} alt={title} fill className="object-cover transition-transform duration-200 hover:scale-105" />
                </div>
                <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">{content}</p>
            </CardContent>

            <CardFooter className="flex justify-between items-center pt-4">
                <Link href={`/post/${id}`}>
                    <Button variant="default" size="sm" className="font-medium">
                        Read More
                    </Button>
                </Link>
                {isAuthor && (
                    <Button variant="outline" size="sm" onClick={handleDelete} className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}
