import { IUser } from "@/types/Iuser";

export const VALIDATORS: Record<string, (v: string, form?: IUser) => string | null> = {
    first_name: (v) =>
        !v.trim()
            ? 'First name is required.'
            : v.trim().length < 2
                ? 'First name must be at least 2 characters.'
                : /[^a-zA-Z\s'-]/.test(v)
                    ? 'First name contains invalid characters.'
                    : null,

    last_name: (v) =>
        !v.trim()
            ? 'Last name is required.'
            : v.trim().length < 2
                ? 'Last name must be at least 2 characters.'
                : /[^a-zA-Z\s'-]/.test(v)
                    ? 'Last name contains invalid characters.'
                    : null,

    email: (v) =>
        !v.trim()
            ? 'Email address is required.'
            : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
                ? 'Please enter a valid email address.'
                : null,

    phone: (v) =>
        !v.trim()
            ? 'Phone number is required.'
            : !/^(\+?880|0)?1[3-9]\d{8}$/.test(v.replace(/\s/g, ''))
                ? 'Enter a valid Bangladeshi phone number (e.g. 01XXXXXXXXX).'
                : null,

    nid: () => null,

    password: (v) =>
        !v
            ? 'Password is required.'
            : v.length < 8
                ? 'Password must be at least 8 characters.'
                : !/[A-Z]/.test(v)
                    ? 'Password must contain at least one uppercase letter.'
                    : !/[0-9]/.test(v)
                        ? 'Password must contain at least one number.'
                        : null,

    password_confirmation: (v, form) =>
        !v
            ? 'Please confirm your password.'
            : v !== form?.password
                ? 'Passwords do not match.'
                : null,

    country: (v) => (!v.trim() ? 'Country is required.' : null),
    district: (v) => (!v.trim() ? 'District is required.' : null),
    city: (v) => (!v.trim() ? 'City is required.' : null),
    thana: (v) => (!v.trim() ? 'Thana / Upazila is required.' : null),
   

    road_no: () => null,
    house_no: () => null,
    flat_no: () => null,
    area: () =>  null,
    address: (v) =>
        !v.trim()
            ? 'Full address is required.'
            : v.trim().length < 10
                ? 'Please provide a more complete address (min 10 characters).'
                : null,
};
