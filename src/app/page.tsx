'use client';

import CreatePostForm from '@/components/create-form';

export default function Home() {
    return (
        <div>
            <h1>Hey</h1>

            <div className="absolute bottom-4 right-7">
                <CreatePostForm />
            </div>
        </div>
    );
}
