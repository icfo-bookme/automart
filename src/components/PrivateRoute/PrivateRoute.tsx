'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import LoadingSpinner from '../ui/LoadingSpinner';

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
    const { user, loading, } = useAuth();
    const router = useRouter();
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner />
            </div>
        );
    }
    useEffect(() => {
        if (!loading && !user) {
            router.replace('/signin');
        }
    }, [user, loading, router]);



    if (!user) return null;

    return <>{children}</>;
};