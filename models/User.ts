import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { IUserDocument, IUserModel } from "../types/user";
const { ObjectId } = mongoose.Schema.Types;

const UserSchema: Schema<IUserDocument, IUserModel> = new Schema(
    {
        name: {
            type: String,
            maxlength: [50, "name must be less than 50 char"],
            required: [true, "please provide name"],
            trim: true,
            lowercase: true,
        },
        email: {
            type: String,
            maxlength: [50, "name must be less than 50 char"],
            required: [true, "please provide email"],
            trim: true,
            lowercase: true,
        },
        courses: [
            {
                type: ObjectId,
                ref: "Course",
            },
        ],
        password: {
            type: String,
            required: [true, "please provide password"],
        },
        profile_photo: {
            image_id: String,
            image_url: String,
        },
        state: {
            type: String,
        },
        phone_no: {
            type: Number,
        },
        role: {
            type: String,
            enum: ["student", "admin", "support", "writer"],
            default: "student",
        },
        bio: {
            type: String,
            maxLength: [100, "bio must be less than 100 char"],
            trim: true,
            lowercase: true,
        },
        pass_changed_at: Date,
        forgot_password_token: String,
        forgot_password_expire: Number,
        billing_address: {
            full_name: {
                type: String,
            },
            address_one: {
                type: String,
            },
            address_two: {
                type: String,
            },
            pincode: {
                type: Number,
            },
            country: {
                type: String,
            },
            state: {
                type: String,
            },
            city: {
                type: String,
            },
            contact_no: {
                type: Number,
            },
            landmark: String,
        },
        shipping_address: {
            full_name: {
                type: String,
            },
            address_one: {
                type: String,
            },
            address_two: {
                type: String,
            },
            pincode: {
                type: Number,
            },
            country: {
                type: String,
            },
            state: {
                type: String,
            },
            city: {
                type: String,
            },
            contact_no: {
                type: Number,
            },
            landmark: String,
        },
    },
    { timestamps: true }
);

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    this.pass_changed_at = new Date(Date.now() - 1000);
    next();
});

//validate that given password is correct or not
UserSchema.methods.isValidPassword = async function (plainPassword: string) {
    return await bcrypt.compare(plainPassword, this.password);
};

//create and return JWT token
UserSchema.methods.createJWTToken = function () {
    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET as string, {
        expiresIn: process.env.JWT_EXPIRE_IN,
    });
    return token;
};

UserSchema.methods.genForgotPasswordToken = async function () {
    const token = crypto.randomBytes(20).toString("hex");

    //save hashed version of token in DB
    this.forgot_password_token = crypto.createHash("sha256").update(token).digest("hex");

    //time of token (20min)
    this.forgot_password_expire = Date.now() + 20 * 60 * 1000;

    this.pass_changed_at = new Date(Date.now() - 1000);
    return token;
};

UserSchema.methods.passwordChangedAfter = function (jwtTimeStamp: number) {
    console.log(this.pass_changed_at);
    if (this.pass_changed_at) {
        const changedTimeStamp = Math.floor(this.pass_changed_at.getTime() / 1000);
        return jwtTimeStamp < changedTimeStamp;
    }
    return false;
};

UserSchema.statics.findByEmail = function (email: string) {
    return this.findOne({ email });
};
UserSchema.statics.findAdminByEmail = function (email: string) {
    return this.findOne({ email, role: "admin" });
};
const User = mongoose.model<IUserDocument, IUserModel>("User", UserSchema);
export { User };
