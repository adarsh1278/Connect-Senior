import mongoose, { Schema, Document, Model } from 'mongoose';

export interface Doubt extends Document {
    userId: string;
    head:string;
    image:string;
    doubt: string;
    isAnonymous: boolean;
    isSolved: boolean;
    upVote:number
    whoCanAnswer: {
        yearMargin: number;
        branches: string[];
    };
    skillsRequired: string[];
    finalAnswer?: string;
}

let DoubtModel: Model<Doubt>;

if (mongoose.models && mongoose.models.Doubt) {
    DoubtModel = mongoose.models.Doubt as Model<Doubt>;
} else {
    const DoubtSchema: Schema<Doubt> = new mongoose.Schema({
        userId: {
            type: String,
            required: [true, 'User ID is required'],
        },
        head:{
            type: String,
            default:"Anonmus doubt",
        },
        doubt:{
            type: String,
            required: [true, 'Doubt is required'],
        },
        image:{
            type: String,
            default:"none"
        },
        isAnonymous: {
            type: Boolean,
            default: false,
        },
        isSolved: {
            type: Boolean,
            default: false,
        },
        upVote:{
            type: Number,
            default: 0,
        },
        whoCanAnswer: {
            type: {
                yearMargin: {
                    type: Number,
                    default: 1,
                },
                branches: [{
                    type: String,
                }],
            },
            default: {
                yearMargin: 1, 
                branches: ["All"],
            },
        },
        skillsRequired: {
            type: [{
                type: String,
                
            }],
            validate: {
                validator: (v: string[]) => v.length > 0,
                message: 'At least one skill is required',
            },
        },
        finalAnswer: String,
    }, { timestamps: true });

    DoubtModel = mongoose.model<Doubt>('Doubt', DoubtSchema);
}

export default DoubtModel;