import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbconnect";
import User from "@/models/User.model";
import ReplyModel, { Reply as ReplyType } from "@/models/Reply.model";
import { startOfDay, subDays } from "date-fns";
import mongoose from "mongoose";



export async function GET(req: NextRequest) {
  const token = await req.cookies.get('token')?.value || 'gh';
  console.log(token)
try{

    await dbConnect();
    const topUsers = await User.find()
    .sort({ replies: -1 }) // Sort by replies count in descending order
    .limit(10); // Limit to top 10 users
    return NextResponse.json(
        {
            status:200,
        
        body:{
            message:"Leader board fetch succefully",
            sucess:true,
            data:topUsers,
        }
    }
       )




  } catch (error) {
    console.error("Error fetching top users with satisfied replies:", error);
    return NextResponse.json({
      status: 500,
      body: {
        message: "Internal Server Error",
        success: false,
        data: null,
      },
    });
  }
}
