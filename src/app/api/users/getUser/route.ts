import dbConnect from "@/lib/dbconnect";
import User from "@/models/User.model";
import jwt, { Secret } from "jsonwebtoken";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest) {
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
    const decodedToken: any = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as Secret);

    if (!decodedToken._id) {
        return NextResponse.json({
            status: 404,
            body: {
                message: "Token authentication failed",
                success: false,
            },
        });
    }

    try {
        await dbConnect();
        const user = await User.findOne({ _id: decodedToken._id }).select("-password").lean();

        if (!user) {
            return NextResponse.json({
                status: 404,
                body: {
                    message: "User not found",
                    success: false
                }
            });
        }

        console.log(user);
        return NextResponse.json({
            status: 200,
            body: {
                message: "User found",
                success: true,
                data: user,
            },
        });

    } catch (error) {
        console.error(error)
        return NextResponse.json({
            status: 404,
            body: {
                message: "Please try again",
                success: false,
            },
        });
    }
}
