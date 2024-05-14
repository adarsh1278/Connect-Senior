import mongoose, { Schema, Document } from 'mongoose';

export interface Reply extends Document {
    doubtId: string;
    userId: string;
    isAnonymous: boolean;
    answer: string;
}

export const ReplySchema: Schema<Reply> = new mongoose.Schema({
    doubtId: {
        type: String,
        required: [true, 'Doubt ID is required'],
    },
    userId: {
        type: String,
        required: [true, 'User ID is required'],
    },
    isAnonymous: {
        type: Boolean,
        default: false,
    },
    answer: {
        type: String,
        required: [true, 'Answer is required'],
    },
}, { timestamps: true });
