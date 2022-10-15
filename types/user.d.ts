import mongoose, { Document, Model } from "mongoose";

interface IProfilePhoto {
    image_id: string;
    image_url: string;
}
interface IUserAddress {
    full_name: string;
    address_one: string;
    address_two: string;
    pincode: number;
    country: string;
    state: string;
    city: string;
    contact_no: number;
    landmark: string;
}
export interface IUser {
    name: string;
    email: string;
    courses: Array<string>;
    password: string;
    profile_photo: IProfilePhoto;
    state: string;
    phone_no: number;
    role: "student" | "admin";
    pass_changed_at: Date | undefined;
    forgot_password_token: string | undefined;
    forgot_password_expire: number | undefined;
    billing_address: IUserAddress;
    shipping_address: IUserAddress;
    bio: string;
}

export interface IUserDocument extends IUser, Document {
    isValidPassword: (password: string) => Promise<boolean>;
    createJWTToken: () => string;
    genForgotPasswordToken: () => Promise<string>;
    passwordChangedAfter: (jwtTimeStamp: number) => boolean;
}

export interface IUserModel extends Model<IUserDocument> {
    findByEmail: (email: string) => Promise<IUserDocument>;
    findAdminByEmail: (email: string) => Promise<IUserDocument>;
}
