import mongoose, { Schema, Document, Model } from "mongoose";

export interface OTP extends Document {
    email: string;
    otp: string;
    expiresAt: Date;
}

const OTPSchema: Schema<OTP> = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    otp: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        default: () => new Date(Date.now() + 10 * 60 * 1000), // 10 minutes expiration
    },
});

// Define a TTL index for automatic expiration after 10 minutes
OTPSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Export the model
const OTPModel: Model<OTP> = mongoose.models.OTP || mongoose.model<OTP>("OTP", OTPSchema);
export default OTPModel;
