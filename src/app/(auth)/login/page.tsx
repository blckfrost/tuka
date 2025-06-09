import Login from '@/components/auth/login';

export const metadata = {
    title: 'Login - Markr',
};
export default function LoginPag() {
    return (
        <div className="min-h-screen flex justify-center items-center px-4">
            <div className="w-full max-w-md">
                <Login />
            </div>
        </div>
    );
}
