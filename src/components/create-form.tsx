import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Pencil } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { CldUploadWidget } from 'next-cloudinary';
import { useState } from 'react';

export default function CreatePostForm() {
    const [imageUrl, setImageUrl] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant="default">
                        <Pencil className="w-5 h-5" />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create Post</DialogTitle>
                        <DialogDescription>Fill in the information below to create a post.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div>
                            <CldUploadWidget
                                uploadPreset="glossymoss"
                                onUpload={(result) => {
                                    if (result.event === 'success') {
                                        setImageUrl(result.info?.secure_url);
                                    }
                                }}
                            >
                                {({ open }) => (
                                    <Button type="button" onClick={() => open()} variant="secondary">
                                        Upload Image
                                    </Button>
                                )}
                            </CldUploadWidget>
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Post Title</Label>
                            <Input
                                id="name"
                                value={title}
                                placeholder="Post title"
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                }}
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="username-1">Post Content</Label>
                            <Textarea
                                id="content"
                                value={content}
                                onChange={(e) => {
                                    setContent(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                </DialogContent>
            </form>
        </Dialog>
    );
}
