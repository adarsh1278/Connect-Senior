import mongoose, { Schema, Document } from 'mongoose';

export interface Doubt extends Document {
    userId: string;
    image:string;
    doubt: string;
    isAnonymous: boolean;
    isSolved: boolean;
    whoCanAnswer: {
        yearMargin: number;
        branches: string[];
    };
    skillsRequired: string[];
    finalAnswer?: string;
}

 const DoubtSchema: Schema<Doubt> = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, 'User ID is required'],
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


const Doubt= (mongoose.model.Doubt as mongoose.Model<Doubt>)||mongoose.model<Doubt>("DOubt",DoubtSchema)

export default Doubt;