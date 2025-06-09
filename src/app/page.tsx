'use client';

import { CldUploadButton } from 'next-cloudinary';
import { CldImage } from 'next-cloudinary';

export default function Home() {
    return (
        <div>
            <h1>Hey</h1>
            <div>
                <CldUploadButton
                    uploadPreset="glossymoss"
                    onUpload={(result) => {
                        console.log(result);
                    }}
                />
                <CldImage width="960" height="600" src="tgxnbojyk4atkuqt2ysc" sizes="100vw" alt="Description of my image" />
            </div>
        </div>
    );
}
