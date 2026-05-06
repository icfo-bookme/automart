'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface SignUpFormData {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    password_confirmation: string;
    phone: string;
    address: string;
    country: string;
    district: string;
    city: string;
    thana: string;
    area: string;
    road_no: string;
    house_no: string;
    flat_no: string;
    nid: string;
}

export default function SignUpPage() {
    const router = useRouter();
    const { register } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
    const [passwordStrength, setPasswordStrength] = useState(0);

    const [formData, setFormData] = useState<SignUpFormData>({
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear field error when user starts typing
        if (fieldErrors[name]) {
            setFieldErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }

        // Calculate password strength
        if (name === 'password') {
            let strength = 0;
            if (value.length >= 8) strength++;
            if (value.match(/[a-z]/) && value.match(/[A-Z]/)) strength++;
            if (value.match(/[0-9]/)) strength++;
            if (value.match(/[^a-zA-Z0-9]/)) strength++;
            setPasswordStrength(strength);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setFieldErrors({});

        // Client-side validation
        if (formData.password !== formData.password_confirmation) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            await register(formData);
        } catch (err: any) {
            setError('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const getPasswordStrengthColor = () => {
        switch (passwordStrength) {
            case 0:
                return 'bg-gray-200';
            case 1:
                return 'bg-red-500';
            case 2:
                return 'bg-orange-500';
            case 3:
                return 'bg-yellow-500';
            case 4:
                return 'bg-green-500';
            default:
                return 'bg-gray-200';
        }
    };

    const getPasswordStrengthText = () => {
        switch (passwordStrength) {
            case 0:
                return 'Enter password';
            case 1:
                return 'Weak';
            case 2:
                return 'Fair';
            case 3:
                return 'Good';
            case 4:
                return 'Strong';
            default:
                return '';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold text-gray-900">Create Your Account</h2>
                    <p className="mt-2 text-sm text-gray-600">Join our community</p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10">
                    {error && (
                        <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Personal Information Section */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Personal Information</h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* First Name */}
                                <div>
                                    <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                                        First Name *
                                    </label>
                                    <div className="mt-1 relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <input
                                            id="first_name"
                                            name="first_name"
                                            type="text"
                                            required
                                            value={formData.first_name}
                                            onChange={handleChange}
                                            className={`pl-10 block w-full border ${
                                                fieldErrors.first_name ? 'border-red-500' : 'border-gray-300'
                                            } rounded-lg py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                            placeholder="John"
                                        />
                                    </div>
                                    {fieldErrors.first_name && (
                                        <p className="mt-1 text-xs text-red-500">{fieldErrors.first_name}</p>
                                    )}
                                </div>

                                {/* Last Name */}
                                <div>
                                    <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                                        Last Name *
                                    </label>
                                    <div className="mt-1 relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <input
                                            id="last_name"
                                            name="last_name"
                                            type="text"
                                            required
                                            value={formData.last_name}
                                            onChange={handleChange}
                                            className={`pl-10 block w-full border ${
                                                fieldErrors.last_name ? 'border-red-500' : 'border-gray-300'
                                            } rounded-lg py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                            placeholder="Doe"
                                        />
                                    </div>
                                    {fieldErrors.last_name && (
                                        <p className="mt-1 text-xs text-red-500">{fieldErrors.last_name}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email Address *
                                    </label>
                                    <div className="mt-1 relative">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={`pl-10 block w-full border ${
                                                fieldErrors.email ? 'border-red-500' : 'border-gray-300'
                                            } rounded-lg py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                            placeholder="you@example.com"
                                        />
                                    </div>
                                    {fieldErrors.email && (
                                        <p className="mt-1 text-xs text-red-500">{fieldErrors.email}</p>
                                    )}
                                </div>

                                {/* Phone */}
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                        Phone Number *
                                    </label>
                                    <div className="mt-1 relative">
                                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            required
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className={`pl-10 block w-full border ${
                                                fieldErrors.phone ? 'border-red-500' : 'border-gray-300'
                                            } rounded-lg py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                            placeholder="01234567890"
                                        />
                                    </div>
                                    {fieldErrors.phone && (
                                        <p className="mt-1 text-xs text-red-500">{fieldErrors.phone}</p>
                                    )}
                                </div>
                            </div>

                            {/* NID Number */}
                            <div>
                                <label htmlFor="nid" className="block text-sm font-medium text-gray-700">
                                    NID Number *
                                </label>
                                <div className="mt-1 relative">
                                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        id="nid"
                                        name="nid"
                                        type="text"
                                        required
                                        value={formData.nid}
                                        onChange={handleChange}
                                        className={`pl-10 block w-full border ${
                                            fieldErrors.nid ? 'border-red-500' : 'border-gray-300'
                                        } rounded-lg py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                        placeholder="Enter your NID number"
                                    />
                                </div>
                                {fieldErrors.nid && (
                                    <p className="mt-1 text-xs text-red-500">{fieldErrors.nid}</p>
                                )}
                            </div>
                        </div>

                        {/* Security Section */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Security Settings</h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Password */}
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Password *
                                    </label>
                                    <div className="mt-1 relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <input
                                            id="password"
                                            name="password"
                                            type={showPassword ? 'text' : 'password'}
                                            required
                                            value={formData.password}
                                            onChange={handleChange}
                                            className={`pl-10 pr-10 block w-full border ${
                                                fieldErrors.password ? 'border-red-500' : 'border-gray-300'
                                            } rounded-lg py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-5 w-5 text-gray-400" />
                                            ) : (
                                                <Eye className="h-5 w-5 text-gray-400" />
                                            )}
                                        </button>
                                    </div>
                                    {fieldErrors.password && (
                                        <p className="mt-1 text-xs text-red-500">{fieldErrors.password}</p>
                                    )}
                                </div>

                                {/* Confirm Password */}
                                <div>
                                    <label
                                        htmlFor="password_confirmation"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Confirm Password *
                                    </label>
                                    <div className="mt-1 relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <input
                                            id="password_confirmation"
                                            name="password_confirmation"
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            required
                                            value={formData.password_confirmation}
                                            onChange={handleChange}
                                            className={`pl-10 pr-10 block w-full border ${
                                                fieldErrors.password_confirmation ? 'border-red-500' : 'border-gray-300'
                                            } rounded-lg py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff className="h-5 w-5 text-gray-400" />
                                            ) : (
                                                <Eye className="h-5 w-5 text-gray-400" />
                                            )}
                                        </button>
                                    </div>
                                    {formData.password_confirmation &&
                                        formData.password !== formData.password_confirmation && (
                                            <p className="mt-1 text-xs text-red-500">Passwords do not match</p>
                                        )}
                                </div>
                            </div>

                            {/* Password Strength */}
                            {formData.password && (
                                <div className="mt-2">
                                    <div className="flex gap-1 mb-1">
                                        {[1, 2, 3, 4].map((level) => (
                                            <div
                                                key={level}
                                                className={`h-1 flex-1 rounded-full transition-colors ${
                                                    level <= passwordStrength
                                                        ? getPasswordStrengthColor()
                                                        : 'bg-gray-200'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-xs text-gray-500">
                                        Password Strength: {getPasswordStrengthText()}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Address Information Section */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Address Information</h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Country */}
                                <div>
                                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                        Country *
                                    </label>
                                    <div className="mt-1 relative">
                                        <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <input
                                            id="country"
                                            name="country"
                                            type="text"
                                            required
                                            value={formData.country}
                                            onChange={handleChange}
                                            className={`pl-10 block w-full border ${
                                                fieldErrors.country ? 'border-red-500' : 'border-gray-300'
                                            } rounded-lg py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                            placeholder="Bangladesh"
                                        />
                                    </div>
                                    {fieldErrors.country && (
                                        <p className="mt-1 text-xs text-red-500">{fieldErrors.country}</p>
                                    )}
                                </div>

                                {/* District */}
                                <div>
                                    <label htmlFor="district" className="block text-sm font-medium text-gray-700">
                                        District *
                                    </label>
                                    <div className="mt-1 relative">
                                        <Map className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <input
                                            id="district"
                                            name="district"
                                            type="text"
                                            required
                                            value={formData.district}
                                            onChange={handleChange}
                                            className={`pl-10 block w-full border ${
                                                fieldErrors.district ? 'border-red-500' : 'border-gray-300'
                                            } rounded-lg py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                            placeholder="e.g., Dhaka"
                                        />
                                    </div>
                                    {fieldErrors.district && (
                                        <p className="mt-1 text-xs text-red-500">{fieldErrors.district}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* City */}
                                <div>
                                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                        City *
                                    </label>
                                    <div className="mt-1 relative">
                                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <input
                                            id="city"
                                            name="city"
                                            type="text"
                                            required
                                            value={formData.city}
                                            onChange={handleChange}
                                            className={`pl-10 block w-full border ${
                                                fieldErrors.city ? 'border-red-500' : 'border-gray-300'
                                            } rounded-lg py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                            placeholder="e.g., Dhaka"
                                        />
                                    </div>
                                    {fieldErrors.city && (
                                        <p className="mt-1 text-xs text-red-500">{fieldErrors.city}</p>
                                    )}
                                </div>

                                {/* Thana */}
                                <div>
                                    <label htmlFor="thana" className="block text-sm font-medium text-gray-700">
                                        Thana/Upazila *
                                    </label>
                                    <div className="mt-1 relative">
                                        <Navigation className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <input
                                            id="thana"
                                            name="thana"
                                            type="text"
                                            required
                                            value={formData.thana}
                                            onChange={handleChange}
                                            className={`pl-10 block w-full border ${
                                                fieldErrors.thana ? 'border-red-500' : 'border-gray-300'
                                            } rounded-lg py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                            placeholder="e.g., Mirpur"
                                        />
                                    </div>
                                    {fieldErrors.thana && (
                                        <p className="mt-1 text-xs text-red-500">{fieldErrors.thana}</p>
                                    )}
                                </div>
                            </div>

                            {/* Area */}
                            <div>
                                <label htmlFor="area" className="block text-sm font-medium text-gray-700">
                                    Area/Locality *
                                </label>
                                <div className="mt-1 relative">
                                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        id="area"
                                        name="area"
                                        type="text"
                                        required
                                        value={formData.area}
                                        onChange={handleChange}
                                        className={`pl-10 block w-full border ${
                                            fieldErrors.area ? 'border-red-500' : 'border-gray-300'
                                        } rounded-lg py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                        placeholder="e.g., Mirpur-10"
                                    />
                                </div>
                                {fieldErrors.area && (
                                    <p className="mt-1 text-xs text-red-500">{fieldErrors.area}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {/* Road No */}
                                <div>
                                    <label htmlFor="road_no" className="block text-sm font-medium text-gray-700">
                                        Road No.
                                    </label>
                                    <input
                                        id="road_no"
                                        name="road_no"
                                        type="text"
                                        value={formData.road_no}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Road No"
                                    />
                                </div>

                                {/* House No */}
                                <div>
                                    <label htmlFor="house_no" className="block text-sm font-medium text-gray-700">
                                        House No.
                                    </label>
                                    <input
                                        id="house_no"
                                        name="house_no"
                                        type="text"
                                        value={formData.house_no}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="House No"
                                    />
                                </div>

                                {/* Flat No */}
                                <div>
                                    <label htmlFor="flat_no" className="block text-sm font-medium text-gray-700">
                                        Flat No.
                                    </label>
                                    <input
                                        id="flat_no"
                                        name="flat_no"
                                        type="text"
                                        value={formData.flat_no}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Flat No"
                                    />
                                </div>
                            </div>

                            {/* Full Address */}
                            <div>
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                    Full Address *
                                </label>
                                <textarea
                                    id="address"
                                    name="address"
                                    rows={3}
                                    required
                                    value={formData.address}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full border ${
                                        fieldErrors.address ? 'border-red-500' : 'border-gray-300'
                                    } rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                    placeholder="Enter your complete address"
                                />
                                {fieldErrors.address && (
                                    <p className="mt-1 text-xs text-red-500">{fieldErrors.address}</p>
                                )}
                            </div>
                        </div>

                        {/* Terms and Conditions */}
                        <div className="flex items-start">
                            <input
                                id="terms"
                                name="terms"
                                type="checkbox"
                                required
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                            />
                            <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                                I agree to the{' '}
                                <Link href="/terms" className="text-blue-600 hover:text-blue-500">
                                    Terms of Service
                                </Link>{' '}
                                and{' '}
                                <Link href="/privacy" className="text-blue-600 hover:text-blue-500">
                                    Privacy Policy
                                </Link>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end ">
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-8 cursor-pointer py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 text-lg font-medium"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="animate-spin h-5 w-5" />
                                        Creating Account...
                                    </>
                                ) : (
                                    <>
                                        Create Account
                                        <ArrowRight className="h-5 w-5" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Sign In Link */}
                    <p className="mt-6 text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link href="/signin" className="font-medium text-blue-600 hover:text-blue-500">
                            Sign in here
                        </Link>
                    </p>

                    {/* Trust Badges */}
                    <div className="mt-6 flex items-center justify-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>Secure</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>Encrypted</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>Trusted</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}