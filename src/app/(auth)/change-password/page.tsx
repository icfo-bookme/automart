'use client';

import { useState } from 'react';
import {
    Lock,
    Loader2,
    CheckCircle,
    AlertCircle,
    ShieldCheck,
    Eye,
    EyeOff,
} from 'lucide-react';

import { useAuth } from '@/context/AuthContext';
import PrivateRoute from '@/components/PrivateRoute/PrivateRoute';
import Field from '@/components/ui/FormField';
import SectionHeader from '@/components/ui/SectionHeader';

export default function ChangePasswordPage() {
    return (
        <PrivateRoute>
            <ChangePasswordForm />
        </PrivateRoute>
    );
}

function ChangePasswordForm() {
    const { updatePassword } = useAuth();

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    const [show, setShow] = useState({
        current: false,
        password: false,
        confirm: false,
    });

    const [form, setForm] = useState({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    // simple validators (you can replace with your VALIDATORS file)
    const validate = (name: string, value: string) => {
        if (!value) return 'This field is required';

        if (name === 'password' && value.length < 6) {
            return 'Password must be at least 6 characters';
        }

        if (
            name === 'password_confirmation' &&
            value !== form.password
        ) {
            return 'Passwords do not match';
        }

        return '';
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        setForm((prev) => ({ ...prev, [name]: value }));
        setTouched((prev) => ({ ...prev, [name]: true }));

        const msg = validate(name, value);

        setFieldErrors((prev) => {
            const next = { ...prev };
            if (msg) next[name] = msg;
            else delete next[name];
            return next;
        });

        setError('');
        setSuccess('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newTouched = {
            current_password: true,
            password: true,
            password_confirmation: true,
        };
        setTouched(newTouched);

        const errors: Record<string, string> = {};
        Object.entries(form).forEach(([k, v]) => {
            const msg = validate(k, v);
            if (msg) errors[k] = msg;
        });

        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            setError('Please fix the errors below before continuing.');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            await updatePassword(form);

            setSuccess('Password updated successfully!');
            setForm({
                current_password: '',
                password: '',
                password_confirmation: '',
            });
            setFieldErrors({});
            setTouched({});
        } catch (err: any) {
            setError(err?.message || 'Failed to update password');
        } finally {
            setLoading(false);
        }
    };

    const fe = (name: string) =>
        touched[name] ? fieldErrors[name] : undefined;

    return (
        <div className="min-h-screen bg-[#f4f6fb] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">

                {/* Header */}
                <div className="mb-8 flex items-center gap-3">
                    <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-red-600 shadow">
                        <ShieldCheck className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-extrabold text-gray-900">
                            Change Password
                        </h1>
                        <p className="text-sm text-gray-500">
                            Keep your account secure by updating your password
                        </p>
                    </div>
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-4 flex items-start gap-2 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-red-700 text-sm">
                        <AlertCircle className="h-4 w-4 mt-0.5" />
                        {error}
                    </div>
                )}

                {/* Success */}
                {success && (
                    <div className="mb-4 flex items-start gap-2 rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-green-700 text-sm">
                        <CheckCircle className="h-4 w-4 mt-0.5" />
                        {success}
                    </div>
                )}

                {/* Card */}
                <div className="bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden">
                    <form onSubmit={handleSubmit} className="p-6 sm:p-8">

                        <SectionHeader
                            title="Security Settings"
                            subtitle="Update your password securely"
                        />

                        <div className="space-y-5 mt-6">

                            {/* Current Password */}
                            <div className="relative">
                                <Field
                                    label="Current Password"
                                    name="current_password"
                                    type={show.current ? 'text' : 'password'}
                                    value={form.current_password}
                                    onChange={handleChange}
                                    error={fe('current_password')}
                                    icon={<Lock className="h-4 w-4" />}
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShow((p) => ({
                                            ...p,
                                            current: !p.current,
                                        }))
                                    }
                                    className="absolute right-3 top-9 text-gray-500"
                                >
                                    {show.current ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </button>
                            </div>

                            {/* New Password */}
                            <div className="relative">
                                <Field
                                    label="New Password"
                                    name="password"
                                    type={show.password ? 'text' : 'password'}
                                    value={form.password}
                                    onChange={handleChange}
                                    error={fe('password')}
                                    icon={<Lock className="h-4 w-4" />}
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShow((p) => ({
                                            ...p,
                                            password: !p.password,
                                        }))
                                    }
                                    className="absolute right-3 top-9 text-gray-500"
                                >
                                    {show.password ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </button>
                            </div>

                            {/* Confirm Password */}
                            <div className="relative">
                                <Field
                                    label="Confirm Password"
                                    name="password_confirmation"
                                    type={show.confirm ? 'text' : 'password'}
                                    value={form.password_confirmation}
                                    onChange={handleChange}
                                    error={fe('password_confirmation')}
                                    icon={<Lock className="h-4 w-4" />}
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShow((p) => ({
                                            ...p,
                                            confirm: !p.confirm,
                                        }))
                                    }
                                    className="absolute right-3 top-9 text-gray-500"
                                >
                                    {show.confirm ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="mt-8 flex justify-end border-t pt-5">
                            <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex items-center gap-2 rounded-xl bg-blue-950 px-6 py-3 text-white text-sm font-semibold hover:bg-blue-700 transition disabled:opacity-60"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Updating...
                                    </>
                                ) : (
                                    <>
                                        <ShieldCheck className="h-4 w-4" />
                                        Update Password
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}