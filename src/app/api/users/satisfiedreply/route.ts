import dbConnect from "@/lib/dbconnect";
import { NextRequest, NextResponse } from "next/server";
import ReplyModel from "@/models/Reply.model";
import User from "@/models/User.model";
import DoubtModel from "@/models/Doubt.model";

export async function POST(req: NextRequest) {
  try {
    const { replyid } = await req.json();
    console.log(replyid);
    await dbConnect();

    // Find and update the reply
    const reply = await ReplyModel.findOneAndUpdate(
      { _id: replyid },
      { $set: { satisfied: true } },
      { new: true }
    );

    if (!reply) {
      return NextResponse.json({
        status: 404,
        body: {
          message: "Reply not found",
          success: false,
        },
      });
    }

    // Find the user and ensure replies is a number
    const user = await User.findById(reply.userId);
    if (!user) {
      return NextResponse.json({
        status: 404,
        body: {
          message: "User not found",
          success: false,
        },
      });
    }

    if (typeof user.replies !== 'number') {
      user.replies = 0;
    }

    // Increment the user's replies
    user.replies += 1;
    await user.save();

    // Find and update the doubt
    const doubt = await DoubtModel.findOneAndUpdate(
      { _id: reply.doubtId },
      { $set: { isSolved: true } },
      { new: true }
    );

    if (!doubt) {
      return NextResponse.json({
        status: 404,
        body: {
          message: "Doubt not found",
          success: false,
        },
      });
    }

    return NextResponse.json({
      status: 200,
      body: {
        message: "Marked Satisfied",
        success: true,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      body: {
        message: "Error occurred",
        success: false,
      },
    });
  }
}
