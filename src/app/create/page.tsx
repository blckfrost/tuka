'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CldUploadWidget } from 'next-cloudinary';
import { useState } from 'react';
import { CreatePostAction } from '@/lib/actions/create-post';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CreatePostPage() {
    const [imageUrl, setImageUrl] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('content', content);
            formData.append('imageUrl', imageUrl);

            const result = await CreatePostAction(formData);

            if (result.message === 'Post created succesfully') {
                toast.success('Post created successfully');
                router.push('/');
            } else {
                toast.error(result.message || 'Failed to create post');
            }
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="max-w-2xl mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <CldUploadWidget
                        uploadPreset="glossymoss"
                        onUpload={(result) => {
                            if (result.event === 'success') {
                                setImageUrl(result.info?.secure_url);
                                toast.success('Image uploaded successfully');
                            }
                        }}
                    >
                        {({ open }) => (
                            <Button type="button" onClick={() => open()} variant="secondary">
                                Upload Image
                            </Button>
                        )}
                    </CldUploadWidget>
                    {imageUrl && (
                        <div className="mt-4">
                            <img src={imageUrl} alt="Preview" className="w-full h-64 object-cover rounded-lg" />
                        </div>
                    )}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="title">Post Title</Label>
                    <Input
                        id="title"
                        value={title}
                        placeholder="Post title"
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="content">Post Content</Label>
                    <Textarea
                        id="content"
                        value={content}
                        placeholder="Write your post content here..."
                        onChange={(e) => setContent(e.target.value)}
                        required
                        className="min-h-[200px]"
                    />
                </div>
                <div className="flex gap-4">
                    <Button type="submit" disabled={isLoading || !imageUrl || !title || !content}>
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Creating...
                            </>
                        ) : (
                            'Create Post'
                        )}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => router.push('/')}>
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
}
