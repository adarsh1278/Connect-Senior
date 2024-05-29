import mongoose, { Schema, Document, Model } from 'mongoose';
import { date } from 'zod';

export interface Doubt extends Document {
    userId: string;
    head:string;
    image:string;
    doubt: string;
    isAnonymous: boolean;
    isSolved: boolean;
    seniorOnly:boolean;
    upVote:number;
    year:number;
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
        seniorOnly:{
            type: Boolean,
            default:false
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
       year:{
        type: Number,
        default: 2022,
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