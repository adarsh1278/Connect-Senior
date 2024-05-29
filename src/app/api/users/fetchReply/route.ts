import dbConnect from "@/lib/dbconnect";
import { NextRequest, NextResponse } from "next/server";
import DoubtModel from "@/models/Doubt.model";
import ReplyModel from "@/models/Reply.model";
export async function POST(req:NextRequest){
     await dbConnect();

     try {
        const reqJs= await req.json();
        console.log(`req json is ${reqJs}`)
        const {doubtId } =  await reqJs;
        const reply = await ReplyModel.find({doubtId})
        if(!reply){
            return NextResponse.json({
                status: 404,
                body: {
                    message: "No Solution",
                    success: false,
                },
            });
        }
        return NextResponse.json({
            status: 200,
            body: {
                message: "success",
                success: true,
                reply,
            },
        });






     } catch (error) {
        return NextResponse.json({
            status: 404,
            body: {
                message: "Error occured",
                success: false,
            },
        });
     }
}