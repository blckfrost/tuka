export async function uploadToCloudinary(file: File): Promise<string | null> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'glossymoss');

    try {
        const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/upload`, {
            method: 'POST',
            body: formData,
        });

        const data = await res.json();
        return data.secure_url as string;
    } catch (error) {
        console.error('Cloudinary Upload failed.', error);
        return null;
    }
}
