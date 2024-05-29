
import dbConnect from "@/lib/dbconnect";
import jwt, { Secret } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User.model";
import ReplyModel from "@/models/Reply.model";
import DoubtModel from "@/models/Doubt.model";

export  async function POST(req:NextRequest){
   const {doubtId , reply}= await req.json();
   const token = await req.cookies.get('token')?.value || '';

    if (!token) {
        return NextResponse.json({
            status: 404,
            body: {
                message: "Please login",
                success: false,
            },
        });
    }
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
const doubt = await DoubtModel.findById(doubtId);
if (!doubt) {
    return NextResponse.json({
        status: 404,
        body: {
            message: "doubt not found",
            success: false
        }
    });
}
if( doubt.seniorOnly && doubt.year<=user.admissionYear){
    return NextResponse.json({
        status: 300,
        body: {
            message: "You are not eligile",
            success: false
        }
    });
}


const newReply =  new ReplyModel(
    {
        doubtId,
        userId:user._id,
        answer:reply
    }
    

)
await newReply.save();
return NextResponse.json({
    status: 200,
    body: {
        message: "Reply posted succefully",
        success: true
    }
});

    
} catch (error) {
    


    return NextResponse.json({
        status: 404,
        body: {
            message: "Error at catch block",
            success: false
        }
    });
}



}

