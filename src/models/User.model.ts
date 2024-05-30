import mongoose, { Schema, Document } from "mongoose";
import jwt from "jsonwebtoken";


import bcrypt from "bcrypt"

export interface User extends Document {
    name: string;
    email: string;
    username: string; // Unique
    password: string;
    avatar?: string;
    anonymousdoubts: string[];
    replies: number;

    admissionYear: number;
    branch:String;
    skills: string[];
    profileLink: {
        github?: string;
        linkedin?: string;
        twitter?: string;
        website?: string;
    };
    generateAccessToken: () => string;
    // Methods
   

}

const UserSchema: Schema<User> = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/.+\@.+\..+/, 'Please use a valid email address'],
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    avatar: {
        type: String,
    },
    anonymousdoubts: [],
    replies: {
        type: Number,
        default:0,
    },
    admissionYear: {
        type: Number,
        required: [true, 'Year is required'],
    },
    branch:{
        type: String,
        required: [true, 'Branch is required'],
    },
    skills: [{
        type: String,
        required: [true, 'Skills are required'],
    }],
    profileLink: {
        github: String,
        linkedin: String,
        twitter: String,
        website: String,
    }
}, { timestamps: true });

UserSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})


UserSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            name: this.name
        },
        process.env.ACCESS_TOKEN_SECRET!,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
};

const User= (mongoose.models.User as mongoose.Model<User>)|| mongoose.model<User>("User",UserSchema)


export default User;