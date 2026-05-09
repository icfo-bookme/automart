'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    Eye,
    EyeOff,
    Mail,
    Lock,
    User,
    Phone,
    MapPin,
    Building,
    Loader2,
    CheckCircle,
    ArrowRight,
    Globe,
    Map,
    Navigation,
    CreditCard,
    AlertCircle,
    ShieldCheck,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { IUser } from '@/types/Iuser';
import Field from '@/components/ui/FormField';
import SectionHeader from '@/components/ui/SectionHeader';
import { VALIDATORS } from '@/lib/validators';



function validateAll(data: IUser): Record<string, string> {
    const errors: Record<string, string> = {};
    for (const key of Object.keys(VALIDATORS)) {
        const msg = VALIDATORS[key]((data as any)[key] ?? '', data);
        if (msg) errors[key] = msg;
    }
    return errors;
}

export default function SignUpPage() {
    const { register } = useAuth();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [termsError, setTermsError] = useState('');

    const [formData, setFormData] = useState<IUser>({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: '',
        country: 'Bangladesh',
        district: '',
        city: '',
        thana: '',
        area: '',
        road_no: '',
        house_no: '',
        flat_no: '',
        nid: '',
        address: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({ ...prev, [name]: value }));
        setTouched((prev) => ({ ...prev, [name]: true }));

        if (error) setError('');
        if (success) setSuccess('');

        // Live validate once touched
        const msg = VALIDATORS[name]?.(value, { ...formData, [name]: value }) ?? null;
        setFieldErrors((prev) => {
            const next = { ...prev };
            if (msg) next[name] = msg;
            else delete next[name];

            // Re-validate confirmation when password changes
            if (name === 'password' && formData.password_confirmation) {
                const confMsg =
                    VALIDATORS['password_confirmation']?.(formData.password_confirmation, {
                        ...formData,
                        [name]: value,
                    }) ?? null;
                if (confMsg) next['password_confirmation'] = confMsg;
                else delete next['password_confirmation'];
            }

            return next;
        });

        // Password strength
        if (name === 'password') {
            let strength = 0;
            if (value.length >= 8) strength++;
            if (value.match(/[a-z]/) && value.match(/[A-Z]/)) strength++;
            if (value.match(/[0-9]/)) strength++;
            if (value.match(/[^a-zA-Z0-9]/)) strength++;
            setPasswordStrength(strength);
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
        const msg = VALIDATORS[name]?.(value, formData) ?? null;
        setFieldErrors((prev) => {
            const next = { ...prev };
            if (msg) next[name] = msg;
            else delete next[name];
            return next;
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Mark all as touched
        const allTouched = Object.keys(VALIDATORS).reduce<Record<string, boolean>>(
            (acc, k) => ({ ...acc, [k]: true }),
            {}
        );
        setTouched(allTouched);

        const errors = validateAll(formData);

        if (!termsAccepted) {
            setTermsError('You must accept the Terms of Service and Privacy Policy.');
        } else {
            setTermsError('');
        }

        if (Object.keys(errors).length > 0 || !termsAccepted) {
            setFieldErrors(errors);
            setError(
                `Please fix the ${Object.keys(errors).length + (!termsAccepted ? 1 : 0)} error(s) highlighted below before continuing.`
            );
            const firstKey = Object.keys(errors)[0];
            if (firstKey) document.getElementById(firstKey)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');
        setFieldErrors({});

        try {
            await register(formData);
            setSuccess('Account created successfully! Redirecting…');
        } catch (err: any) {
            setError(err?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const strengthMeta = [
        { label: 'Weak', color: 'bg-red-500' },
        { label: 'Fair', color: 'bg-orange-500' },
        { label: 'Good', color: 'bg-yellow-500' },
        { label: 'Strong', color: 'bg-green-500' },
    ];

    // Show field error only after touched
    const fe = (name: string) => (touched[name] ? fieldErrors[name] : undefined);

    return (
        <div className="min-h-screen bg-[#f4f6fb] py-12 px-4 sm:px-6 lg:px-8 font-[system-ui,sans-serif]">
            <div className="max-w-3xl mx-auto">

                {/* ── Page Header ── */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-1">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600 shadow">
                            <ShieldCheck className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">Create Your Account</h1>
                            <p className="text-sm text-gray-500">Join our community — it only takes a minute</p>
                        </div>
                    </div>
                </div>

                {/* ── Global Messages ── */}
                {error && (
                    <div
                        role="alert"
                        className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-sm"
                    >
                        <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" />
                        <span>{error}</span>
                    </div>
                )}

                {success && (
                    <div
                        role="status"
                        className="mb-5 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 shadow-sm"
                    >
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                        <span>{success}</span>
                    </div>
                )}

                {/* ── Form Card ── */}
                <div className="rounded-2xl bg-white shadow-sm border border-gray-100 overflow-hidden">
                    <form onSubmit={handleSubmit} noValidate>

                        {/* Personal Information */}
                        <section className="p-6 sm:p-8">
                            <SectionHeader
                                title="Personal Information"
                                subtitle="Your basic identity details"
                            />

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <Field
                                    label="First Name"
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={fe('first_name')}
                                    icon={<User className="h-4 w-4" />}
                                    placeholder="John"
                                    required
                                />
                                <Field
                                    label="Last Name"
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={fe('last_name')}
                                    icon={<User className="h-4 w-4" />}
                                    placeholder="Doe"
                                    required
                                />
                                <Field
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={fe('email')}
                                    icon={<Mail className="h-4 w-4" />}
                                    placeholder="you@example.com"
                                    required
                                />
                                <Field
                                    label="Phone Number"
                                    name="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={fe('phone')}
                                    icon={<Phone className="h-4 w-4" />}
                                    placeholder="01XXXXXXXXX"
                                    required
                                />
                            </div>

                            <div className="mt-5">
                                <Field
                                    label="NID Number"
                                    name="nid"
                                    value={formData.nid ?? ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={fe('nid')}
                                    icon={<CreditCard className="h-4 w-4" />}
                                    placeholder="10 or 17 digit NID"

                                />
                            </div>
                        </section>

                        <div className="mx-6 sm:mx-8 h-px bg-gray-100" />

                        {/* Security Settings */}
                        <section className="p-6 sm:p-8">
                            <SectionHeader
                                title="Security Settings"
                                subtitle="Choose a strong password to protect your account"
                            />

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <Field
                                    label="Password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password ?? ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={fe('password')}
                                    icon={<Lock className="h-4 w-4" />}
                                    placeholder="••••••••"
                                    required
                                    rightElement={
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword((p) => !p)}
                                            className="text-gray-400 hover:text-gray-600 transition-colors"
                                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                                        >
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    }
                                />
                                <Field
                                    label="Confirm Password"
                                    name="password_confirmation"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={formData.password_confirmation ?? ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={fe('password_confirmation')}
                                    icon={<Lock className="h-4 w-4" />}
                                    placeholder="••••••••"
                                    required
                                    rightElement={
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword((p) => !p)}
                                            className="text-gray-400 hover:text-gray-600 transition-colors"
                                            aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                                        >
                                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    }
                                />
                            </div>

                            {/* Password strength meter */}
                            {formData.password && (
                                <div className="mt-4">
                                    <div className="flex gap-1.5 mb-1.5">
                                        {[1, 2, 3, 4].map((level) => (
                                            <div
                                                key={level}
                                                className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${level <= passwordStrength
                                                    ? strengthMeta[passwordStrength - 1]?.color
                                                    : 'bg-gray-200'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-xs text-gray-500">
                                        Password strength:{' '}
                                        <span
                                            className={`font-semibold ${passwordStrength <= 1
                                                ? 'text-red-500'
                                                : passwordStrength === 2
                                                    ? 'text-orange-500'
                                                    : passwordStrength === 3
                                                        ? 'text-yellow-600'
                                                        : 'text-green-600'
                                                }`}
                                        >
                                            {strengthMeta[passwordStrength - 1]?.label ?? 'Enter password'}
                                        </span>
                                    </p>
                                </div>
                            )}
                        </section>

                        <div className="mx-6 sm:mx-8 h-px bg-gray-100" />

                        {/* Address Information */}
                        <section className="p-6 sm:p-8">
                            <SectionHeader
                                title="Address Information"
                                subtitle="Your current residential address in Bangladesh"
                            />

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <Field
                                    label="Country"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={fe('country')}
                                    icon={<Globe className="h-4 w-4" />}

                                />
                                <Field
                                    label="District"
                                    name="district"
                                    value={formData.district}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={fe('district')}
                                    icon={<Map className="h-4 w-4" />}
                                    placeholder="e.g. Chattogram"

                                />
                                <Field
                                    label="City"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={fe('city')}
                                    icon={<Building className="h-4 w-4" />}
                                    placeholder="e.g. Chittagong"

                                />
                                <Field
                                    label="Thana / Upazila"
                                    name="thana"
                                    value={formData.thana}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={fe('thana')}
                                    icon={<Navigation className="h-4 w-4" />}
                                    placeholder="e.g. Kotwali"

                                />
                            </div>

                            <div className="mt-5">
                                <Field
                                    label="Area / Locality"
                                    name="area"
                                    value={formData.area}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={fe('area')}
                                    icon={<MapPin className="h-4 w-4" />}
                                    placeholder="e.g. Agrabad"

                                />
                            </div>

                            <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-5">
                                <Field
                                    label="Road No"
                                    name="road_no"
                                    value={formData.road_no ?? ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={fe('road_no')}
                                    placeholder="e.g. 5"
                                />
                                <Field
                                    label="House No"
                                    name="house_no"
                                    value={formData.house_no ?? ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={fe('house_no')}
                                    placeholder="e.g. 12A"
                                />
                                <Field
                                    label="Flat No"
                                    name="flat_no"
                                    value={formData.flat_no ?? ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={fe('flat_no')}
                                    placeholder="e.g. 3B"
                                />
                            </div>

                            <div className="mt-5">
                                <Field
                                    label="Full Address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={fe('address')}
                                    placeholder="Enter your complete mailing address…"
                                    textarea
                                    rows={3}
                                    required
                                />
                            </div>
                        </section>

                        {/* Footer / Submit */}
                        <div className="border-t border-gray-100 bg-gray-50 px-6 sm:px-8 py-5 space-y-4">
                            {/* Terms */}
                            <div>
                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={termsAccepted}
                                        onChange={(e) => {
                                            setTermsAccepted(e.target.checked);
                                            if (e.target.checked) setTermsError('');
                                        }}
                                        className="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-600">
                                        I agree to the{' '}
                                        <Link href="/terms" className="font-medium text-blue-600 hover:text-blue-500 underline underline-offset-2">
                                            Terms of Service
                                        </Link>{' '}
                                        and{' '}
                                        <Link href="/privacy" className="font-medium text-blue-600 hover:text-blue-500 underline underline-offset-2">
                                            Privacy Policy
                                        </Link>
                                    </span>
                                </label>
                                {termsError && (
                                    <p role="alert" className="mt-1.5 flex items-center gap-1 text-xs text-red-500">
                                        <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                                        {termsError}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="flex items-center gap-4 text-xs text-gray-400">
                                    <span className="flex items-center gap-1">
                                        <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                                        Secure
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                                        Encrypted
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                                        Trusted
                                    </span>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="inline-flex items-center gap-2 rounded-xl bg-blue-950 px-8 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-blue-700 hover:shadow-lg active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Creating Account…
                                        </>
                                    ) : (
                                        <>
                                            Create Account
                                            <ArrowRight className="h-4 w-4" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                <p className="mt-6 text-center text-sm text-gray-500">
                    Already have an account?{' '}
                    <Link href="/signin" className="font-semibold text-blue-600 hover:text-blue-500 underline underline-offset-2">
                        Sign in here
                    </Link>
                </p>

                <p className="mt-3 text-center text-xs text-gray-400">
                    Fields marked with <span className="text-red-500 font-semibold">*</span> are required.
                </p>
            </div>
        </div>
    );
}