export default function ProfileLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div lang="en">
            <div className="antialiased mx-4 lg:mx-24">{children}</div>
        </div>
    );
}
