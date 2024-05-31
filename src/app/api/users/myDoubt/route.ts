import dbConnect from "@/lib/dbconnect";
import jwt, { Secret } from "jsonwebtoken";
import DoubtModel from "@/models/Doubt.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await dbConnect();
        console.log("inside my doubt");

        const token = await req.cookies.get('token')?.value || '';
        if (!token) {
            return NextResponse.json({
                message: "Token authentication failed",
                success: false,
            }, { status: 404 });
        }

        // Decode token
        const decodedToken: any = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as Secret);
        
        if (!decodedToken._id) {
            return NextResponse.json({
                message: "Token authentication failed",
                success: false,
            }, { status: 404 });
        }

        const doubts = await DoubtModel.find({ userId: decodedToken._id });
        console.log(doubts);

        return NextResponse.json({
            message: "Doubts fetched",
            success: true,
            doubts,
        }, { status: 200 });
    } catch (error) {
        console.error(error);

        return NextResponse.json({
            message: "Something went wrong",
            success: false,
            doubts: "No doubts available",
            error: error,
        }, { status: 500 });
    }
}
