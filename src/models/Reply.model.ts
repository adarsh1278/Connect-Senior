import mongoose, { Schema, Document, Model } from 'mongoose';

export interface Reply extends Document {
    doubtId: string;
    userId: string;
    isAnonymous: boolean;
    answer: string;
    satisfied:boolean;
}

let ReplyModel: Model<Reply>;
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
    satisfied:{
        type: Boolean,
        default:false
    }
}, { timestamps: true });

if (mongoose.models && mongoose.models.Reply) {
    ReplyModel = mongoose.models.Reply as Model<Reply>;
} else {
    ReplyModel = mongoose.model<Reply>('Reply', ReplySchema);
}

export default ReplyModel;
