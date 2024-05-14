import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import DoubtModel from "@/models/Doubt.model"; // Assuming your model is correctly exported from Doubt.model
import dbConnect from "@/lib/dbconnect";
import User from "@/models/User.model";

export async function POST(req: NextRequest) {
    try {
        const { username, doubt, isAnonymous, yearMargin, branch } = await req.json();
        const token = req.cookies.get('token')?.value || '';

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
        const decodedToken:any = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        if (!decodedToken) {
            return NextResponse.json({
                status: 404,
                body: {
                    message: "Token authentication failed",
                    success: false,
                },
            });
        }
         await dbConnect();
const user = await User.findOne({_id:decodedToken});
if(!user){
  return NextResponse.json({
    status: 404,
    body: {
        message: "user not found",
        success: false,
    },
});
}
console.log(user)
        // Create a new doubt object
        const newDoubt = new DoubtModel({
            userId: decodedToken._id, // Assuming userId is stored in the token
            doubt: doubt,
            isAnonymous: isAnonymous,
            whoCanAnswer: {
                yearMargin: yearMargin,
                branches: [branch],
            },
            skillsRequired:["java"]
            // Other fields
        });

        // Save the new doubt
        await newDoubt.save();

      // is anonymous case


        return NextResponse.json({
            status: 200,
            body: {
                message: "Doubt created successfully",
                success: true,
            },
        });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({
            status: 500,
            body: {
                message: "Internal Server Error",
                success: false,
            },
        });
    }
}
