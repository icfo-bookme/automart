'use client';

import { useEffect, useState } from 'react';
import {
    Mail,
    User,
    Phone,
    MapPin,
    Building,
    Loader2,
    CheckCircle,
    Globe,
    Map,
    Navigation,
    Save,
    AlertCircle,
    ShieldCheck,
} from 'lucide-react';

import { useAuth } from '@/context/AuthContext';
import { IUser } from '@/types/Iuser';
import Field from '@/components/ui/FormField';
import SectionHeader from '@/components/ui/SectionHeader';
import { VALIDATORS } from '@/lib/validators';
import PrivateRoute from '@/components/PrivateRoute/PrivateRoute';



const REQUIRED_FIELDS = [
    'first_name',
    'last_name',
    'email',
    'phone',
    'country',
    'district',
    'city',
    'thana',
    'area',
    'address',
];

function validateAll(data: IUser): Record<string, string> {
    const errors: Record<string, string> = {};
    for (const key of Object.keys(VALIDATORS)) {
        const msg = VALIDATORS[key]((data as any)[key] ?? '');
        if (msg) errors[key] = msg;
    }
    return errors;
}




export default function UpdateProfilePage() {
    const { user, updateProfile } = useAuth();

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    const [formData, setFormData] = useState<IUser>({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        address: '',
        country: 'Bangladesh',
        district: '',
        city: '',
        thana: '',
        area: '',
        road_no: '',
        house_no: '',
        flat_no: '',
        nid: '',
    });

    useEffect(() => {
        if (user) {
            setFormData({
                first_name: user.first_name || '',
                last_name: user.last_name || '',
                email: user.email || '',
                phone: user.phone || '',
                address: user.address || '',
                country: user.country || 'Bangladesh',
                district: user.district || '',
                city: user.city || '',
                thana: user.thana || '',
                area: user.area || '',
                road_no: user.road_no || '',
                house_no: user.house_no || '',
                flat_no: user.flat_no || '',
            });
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({ ...prev, [name]: value }));
        setTouched((prev) => ({ ...prev, [name]: true }));

        // Live validate on change once a field has been touched
        const msg = VALIDATORS[name]?.(value) ?? null;
        setFieldErrors((prev) => {
            const next = { ...prev };
            if (msg) next[name] = msg;
            else delete next[name];
            return next;
        });

        // Clear global error/success on any edit
        if (error) setError('');
        if (success) setSuccess('');
    };



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Mark all fields as touched so errors show
        const allTouched = Object.keys(VALIDATORS).reduce<Record<string, boolean>>(
            (acc, k) => ({ ...acc, [k]: true }),
            {}
        );
        setTouched(allTouched);

        const errors = validateAll(formData);
        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            setError(`Please fix the ${Object.keys(errors).length} error(s) highlighted below before saving.`);
            // Scroll to first error
            const firstKey = Object.keys(errors)[0];
            document.getElementById(firstKey)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');
        setFieldErrors({});

        try {
            await updateProfile(formData);
            setSuccess('Your profile has been updated successfully.');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (err: any) {
            setError(err?.message || 'Failed to update profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Show field error only after it has been touched
    const fe = (name: string) => (touched[name] ? fieldErrors[name] : undefined);

    const completedFields = REQUIRED_FIELDS.filter((f) => {
        const v = (formData as any)[f];
        return v && v.toString().trim() !== '' && !fieldErrors[f];
    }).length;
    const progress = Math.round((completedFields / REQUIRED_FIELDS.length) * 100);

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
                            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">Account Profile</h1>
                            <p className="text-sm text-gray-500">Keep your information accurate and up to date</p>
                        </div>
                    </div>
                </div>

                {/* ── Progress bar ── */}
                <div className="mb-6 rounded-2xl bg-white p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-gray-600">Profile Completeness</span>
                        <span
                            className={`text-xs font-bold ${progress === 100 ? 'text-green-600' : progress >= 60 ? 'text-blue-600' : 'text-amber-600'
                                }`}
                        >
                            {progress}%
                        </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                        <div
                            className={`h-2 rounded-full transition-all duration-500 ${progress === 100
                                ? 'bg-green-500'
                                : progress >= 60
                                    ? 'bg-blue-500'
                                    : 'bg-amber-400'
                                }`}
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <p className="mt-1.5 text-xs text-gray-400">
                        {completedFields} of {REQUIRED_FIELDS.length} required fields completed
                    </p>
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
                                    error={fe('email')}
                                    icon={<Mail className="h-4 w-4" />}
                                    placeholder="example@gmail.com"
                                    required
                                />
                                <Field
                                    label="Phone Number"
                                    name="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    error={fe('phone')}
                                    icon={<Phone className="h-4 w-4" />}
                                    placeholder="01XXXXXXXXX"
                                    required
                                />
                            </div>
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
                                    error={fe('country')}
                                    icon={<Globe className="h-4 w-4" />}
                                    required
                                />
                                <Field
                                    label="District"
                                    name="district"
                                    value={formData.district}
                                    onChange={handleChange}
                                    error={fe('district')}
                                    icon={<Map className="h-4 w-4" />}
                                    placeholder="e.g. Chattogram"
                                    required
                                />
                                <Field
                                    label="City"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    error={fe('city')}
                                    icon={<Building className="h-4 w-4" />}
                                    placeholder="e.g. Chittagong"
                                    required
                                />
                                <Field
                                    label="Thana / Upazila"
                                    name="thana"
                                    value={formData.thana}
                                    onChange={handleChange}
                                    error={fe('thana')}
                                    icon={<Navigation className="h-4 w-4" />}
                                    placeholder="e.g. Kotwali"
                                    required
                                />
                            </div>

                            <div className="mt-5">
                                <Field
                                    label="Area / Locality"
                                    name="area"
                                    value={formData.area}
                                    onChange={handleChange}
                                    error={fe('area')}
                                    icon={<MapPin className="h-4 w-4" />}
                                    placeholder="e.g. Agrabad"
                                    required
                                />
                            </div>

                            <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-5">
                                <Field
                                    label="Road No"
                                    name="road_no"
                                    value={formData.road_no ?? ''}
                                    onChange={handleChange}
                                    error={fe('road_no')}
                                    placeholder="e.g. 5"
                                />
                                <Field
                                    label="House No"
                                    name="house_no"
                                    value={formData.house_no ?? ''}
                                    onChange={handleChange}
                                    error={fe('house_no')}
                                    placeholder="e.g. 12A"
                                />
                                <Field
                                    label="Flat No"
                                    name="flat_no"
                                    value={formData.flat_no ?? ''}
                                    onChange={handleChange}
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
                                    error={fe('address')}
                                    placeholder="Enter your complete mailing address…"
                                    textarea
                                    rows={4}
                                    required
                                />
                            </div>
                        </section>

                        {/* Footer / Submit */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100 bg-gray-50 px-6 sm:px-8 py-5">
                          
                            <div>

                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex items-center gap-2 rounded-xl bg-blue-950 px-8 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-blue-700 hover:shadow-lg active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Saving…
                                    </>
                                ) : (
                                    <>
                                        <Save className="h-4 w-4" />
                                        Save Changes
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                <p className="mt-6 text-center text-xs text-gray-400">
                    Fields marked with <span className="text-red-500 font-semibold">*</span> are required.
                    Changes are applied immediately upon saving.
                </p>
            </div>
        </div>
    );
}