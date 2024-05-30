import dbConnect from "@/lib/dbconnect";
import { NextRequest, NextResponse } from "next/server";
import DoubtModel from "@/models/Doubt.model";
export async function POST(req:NextRequest){
     await dbConnect();

     try {
        const reqJs= await req.json();
        console.log(`req json is ${reqJs}`)
        const {doubtId } =  await reqJs;
        console.log(doubtId)
        const doubt = await DoubtModel.findById(doubtId);
        if(!doubt){
            return NextResponse.json({
                status: 404,
                body: {
                    message: "Doubt no found",
                    success: false,
                },
            });
        }
        return NextResponse.json({
            status: 200,
            body: {
                message: "Doubt fetched suceessfully",
                success: true,
                doubt,
            },
        });






     } catch (error) {
        console.log(error)
        return NextResponse.json({
            status: 404,
            body: {
                message: "Error occured",
                success: false,
            },
        });
     }
}