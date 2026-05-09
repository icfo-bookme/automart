export interface IUser {
    first_name: string;
    last_name: string;
    email: string;
    password?: string;
    password_confirmation?: string;
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
    nid?: string;
}

export interface SignInFormData {
    email: string;
    password: string;
}