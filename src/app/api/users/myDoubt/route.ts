import dbConnect from "@/lib/dbconnect";
import jwt, { Secret } from "jsonwebtoken";
import DoubtModel from "@/models/Doubt.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await dbConnect();

        const token = await req.cookies.get('token')?.value || '';
        if (!token) {
            return NextResponse.json({
                status: 404,
                body: {
                    message: "Token authentication failed",
                    success: false,
                },
            });
        }

        // Decode token
        const decodedToken: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as Secret);

        if (!decodedToken._id) {
            return NextResponse.json({
                status: 404,
                body: {
                    message: "Token authentication failed",
                    success: false,
                },
            });
        }

        const doubts = await DoubtModel.find({ userId: decodedToken._id });

        return NextResponse.json({
            status: 200,
            body: {
                message: "Doubts fetched",
                success: true,
                doubts,
            },
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            status: 500,
            body: {
                message: "Something went wrong",
                success: false,
                doubts: "No doubts available",
            },
        });
    }
}
