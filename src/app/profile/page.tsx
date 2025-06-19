import SignOutButton from '@/components/signout-btn';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Mail, Calendar } from 'lucide-react';

export default async function ProfilePage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.session?.userId) {
        redirect('/login');
    }

    const user = session.user;

    return (
        <main className="container mx-auto py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Your Dashboard</h1>
                    <p className="text-gray-600 text-lg">Manage your profile and account settings</p>
                </div>

                {/* Profile Card */}
                <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50">
                    <CardHeader className="text-center pb-6">
                        <div className="flex flex-col items-center space-y-4">
                            {/* Profile Avatar */}
                            <div className="relative">
                                <Avatar className="h-32 w-32 border-4 border-white shadow-xl">
                                    <AvatarImage src={user.image || ''} alt={`${user.name} profile picture`} className="object-cover" />
                                    <AvatarFallback className="text-3xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                                        {user.name?.charAt(0)?.toUpperCase() || 'U'}
                                    </AvatarFallback>
                                </Avatar>
                            </div>

                            {/* User Name */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-1">{user.name || 'Anonymous User'}</h2>
                                <p className="text-gray-500 font-medium">Welcome back!</p>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {/* User Information */}
                        <div className="grid gap-4 md:grid-cols-2">
                            {user.email && (
                                <div className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-gray-100">
                                    <div className="flex-shrink-0">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Email Address</p>
                                        <p className="text-gray-900 font-medium">{user.email}</p>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-gray-100">
                                <div className="flex-shrink-0">
                                    <Calendar className="h-5 w-5 text-gray-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Member Since</p>
                                    <p className="text-gray-900 font-medium">
                                        {new Date().toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Action Section */}
                        <div className="pt-6 border-t border-gray-100">
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <SignOutButton />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Stats or Additional Cards can go here */}
                <div className="mt-8 grid gap-6 md:grid-cols-3">
                    <Card className="text-center p-6 hover:shadow-md transition-shadow">
                        <CardContent className="pt-6">
                            <div className="text-3xl font-bold text-blue-600 mb-2">0</div>
                            <p className="text-gray-600 font-medium">Posts Created</p>
                        </CardContent>
                    </Card>

                    <Card className="text-center p-6 hover:shadow-md transition-shadow">
                        <CardContent className="pt-6">
                            <div className="text-3xl font-bold text-green-600 mb-2">0</div>
                            <p className="text-gray-600 font-medium">Comments Made</p>
                        </CardContent>
                    </Card>

                    <Card className="text-center p-6 hover:shadow-md transition-shadow">
                        <CardContent className="pt-6">
                            <div className="text-3xl font-bold text-purple-600 mb-2">0</div>
                            <p className="text-gray-600 font-medium">Likes Received</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    );
}
