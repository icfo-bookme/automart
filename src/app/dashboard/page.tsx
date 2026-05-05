'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { 
    User, 
    Mail, 
    Phone, 
    MapPin, 
    CreditCard,
    LogOut,
    Home,
    ShoppingBag,
    Heart,
    Settings
} from 'lucide-react';

export default function DashboardPage() {
    const { user, loading, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/signin');
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>
                        <button
                            onClick={logout}
                            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                            <LogOut className="h-4 w-4" />
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Card */}
                <div className="bg-white rounded-lg shadow p-6 mb-8">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Welcome back, {user.full_name || user.first_name}!
                    </h2>
                    <p className="text-gray-600 mt-1">
                        Manage your account and view your activity
                    </p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center gap-4">
                            <div className="bg-blue-100 p-3 rounded-full">
                                <ShoppingBag className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Total Orders</p>
                                <p className="text-2xl font-bold text-gray-900">0</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center gap-4">
                            <div className="bg-red-100 p-3 rounded-full">
                                <Heart className="h-6 w-6 text-red-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Wishlist</p>
                                <p className="text-2xl font-bold text-gray-900">0</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center gap-4">
                            <div className="bg-green-100 p-3 rounded-full">
                                <CreditCard className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Saved Cards</p>
                                <p className="text-2xl font-bold text-gray-900">0</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Profile Information */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="px-6 py-4 bg-gray-50 border-b">
                        <h3 className="text-lg font-semibold text-gray-800">Profile Information</h3>
                    </div>
                    
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <User className="h-5 w-5 text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-500">Full Name</p>
                                        <p className="text-gray-900 font-medium">
                                            {user.first_name} {user.last_name}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 mb-4">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-500">Email Address</p>
                                        <p className="text-gray-900 font-medium">{user.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 mb-4">
                                    <Phone className="h-5 w-5 text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-500">Phone Number</p>
                                        <p className="text-gray-900 font-medium">{user.phone}</p>
                                    </div>
                                </div>

                                {/* <div className="flex items-center gap-3">
                                    <CreditCard className="h-5 w-5 text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-500">NID Number</p>
                                        <p className="text-gray-900 font-medium">{user.nid || 'Not provided'}</p>
                                    </div>
                                </div> */}
                            </div>

                            <div>
                                <div className="flex items-start gap-3">
                                    <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                                    <div>
                                        <p className="text-sm text-gray-500">Address</p>
                                        <p className="text-gray-900 font-medium">
                                            {user.address || 'Not provided'}<br />
                                            {user.area && `${user.area}, `}{user.thana && `${user.thana}, `}<br />
                                            {user.city && `${user.city}, `}{user.district && `${user.district}, `}<br />
                                            {user.country || 'Bangladesh'}
                                            {(user.road_no || user.house_no || user.flat_no) && (
                                                <>
                                                    <br />
                                                    <span className="text-sm text-gray-600">
                                                        {user.house_no && `House: ${user.house_no}`}
                                                        {user.road_no && `, Road: ${user.road_no}`}
                                                        {user.flat_no && `, Flat: ${user.flat_no}`}
                                                    </span>
                                                </>
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                    <Link href="/profile" className="bg-white rounded-lg shadow p-4 text-center hover:shadow-md transition-shadow">
                        <User className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                        <span className="text-sm font-medium text-gray-700">Edit Profile</span>
                    </Link>

                    <Link href="/orders" className="bg-white rounded-lg shadow p-4 text-center hover:shadow-md transition-shadow">
                        <ShoppingBag className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                        <span className="text-sm font-medium text-gray-700">My Orders</span>
                    </Link>

                    <Link href="/wishlist" className="bg-white rounded-lg shadow p-4 text-center hover:shadow-md transition-shadow">
                        <Heart className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                        <span className="text-sm font-medium text-gray-700">Wishlist</span>
                    </Link>

                    <Link href="/settings" className="bg-white rounded-lg shadow p-4 text-center hover:shadow-md transition-shadow">
                        <Settings className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                        <span className="text-sm font-medium text-gray-700">Settings</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}