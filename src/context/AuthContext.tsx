'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';


interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    user_type: string;
    country: string;
    district: string;
    city: string;
    thana: string;
    area: string;
    road_no: string | null;
    house_no: string | null;
    flat_no: string | null;
    address: string;
    full_name: string;
    created_at: string;
    updated_at: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (phone: string, password: string) => Promise<void>;
    register: (userData: any) => Promise<void>;
    logout: () => Promise<void>;
    updateProfile: (userData: any) => Promise<void>;
    updatePassword: (data: {
        current_password: string;
        password: string;
        password_confirmation: string;
    }) => Promise<void>;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE = 'https://mvrezab.com/admin';

const getCookie = (name: string): string => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return decodeURIComponent(parts.pop()?.split(';').shift() || '');
    }
    return '';
};


const getCsrf = async (): Promise<void> => {
    await fetch(`${API_BASE}/sanctum/csrf-cookie`, {
        credentials: 'include',
    });
};


const mutationHeaders = (): HeadersInit => ({
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
});


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        (async () => {
            await checkUser();
            setLoading(false);
        })();
    }, []);

    const checkUser = async (): Promise<void> => {
        try {
            const res = await fetch(`${API_BASE}/api/user`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    Accept: 'application/json',
                },
            });

            if (!res.ok) {
                setUser(null);
                return;
            }

            const data = await res.json();
            setUser(data?.user ?? null);
        } catch {
            setUser(null);
        }
    };

    const login = async (phone: string, password: string): Promise<void> => {
        await getCsrf();

        const res = await fetch(`${API_BASE}/api/login`, {
            method: 'POST',
            credentials: 'include',
            headers: mutationHeaders(),
            body: JSON.stringify({ phone, password }),
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Login failed');
        }

        await checkUser();
        router.push('/dashboard');
    };

    const register = async (userData: any): Promise<void> => {
        await getCsrf();

        const res = await fetch(`${API_BASE}/api/register`, {
            method: 'POST',
            credentials: 'include',
            headers: mutationHeaders(),
            body: JSON.stringify(userData),
        });

        const data = await res.json();

        if (!res.ok) {
            // Surface validation errors if present
            const msg =
                data?.errors
                    ? Object.values(data.errors as Record<string, string[]>)
                        .flat()
                        .join(' ')
                    : data?.message || 'Registration failed';
            throw new Error(msg);
        }

        await checkUser();
        router.push('/dashboard');
    };

    const logout = async (): Promise<void> => {
        try {
            await fetch(`${API_BASE}/api/logout`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    Accept: 'application/json',
                    'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
                },
            });
        } catch (err) {
            console.error('Logout error', err);
        } finally {
            setUser(null);
            router.push('/signin');
        }
    };


    const updateProfile = async (userData: any): Promise<void> => {
        const res = await fetch(`${API_BASE}/api/profile`, {
            method: 'PUT',
            credentials: 'include',
            headers: mutationHeaders(),
            body: JSON.stringify(userData),
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data?.message || 'Update failed');
        }

        setUser(data.user);
    };

    const updatePassword = async (data: {
        current_password: string;
        password: string;
        password_confirmation: string;
    }): Promise<void> => {
        const res = await fetch(`${API_BASE}/api/change-password`, {
            method: 'PUT',
            credentials: 'include',
            headers: mutationHeaders(),
            body: JSON.stringify(data),
        });

        const result = await res.json();

        if (!res.ok) {
            const msg =
                result?.errors
                    ? Object.values(result.errors as Record<string, string[]>)
                        .flat()
                        .join(' ')
                    : result?.message || 'Password update failed';
            throw new Error(msg);
        }
    };

    return (
        <AuthContext.Provider
            value={{ user, loading, login, register, logout, updateProfile, updatePassword }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};