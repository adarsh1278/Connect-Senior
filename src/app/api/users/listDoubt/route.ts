import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbconnect";
import DoubtModel from "@/models/Doubt.model";
 export async function GET(req:NextRequest){
    try {
        
await dbConnect();
const Doubtlist = await DoubtModel.find({isSolved:false}).sort({"timestamp": 1});

console.log(Doubtlist)

return NextResponse.json({
    status: 200,
    body: {
        message: "Doubts fetched",
        success: true,
        Doubtlist,
    },
});




    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status: 404,
            body: {
                message: "Doubts error",
                success: false,
                
            },
        });
        
    }


}