import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbconnect";
import User, { User as UserType } from "@/models/User.model";
import ReplyModel, { Reply as ReplyType } from "@/models/Reply.model";
import { startOfDay, subDays } from "date-fns";
import mongoose from "mongoose";

interface AggregatedReply {
  _id: mongoose.Types.ObjectId;
  satisfiedRepliesCount: number;
}

interface TopUser {
  user: UserType;
  satisfiedRepliesCount: number;
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  await dbConnect();

  try {
    // Get the date 7 days ago
    const date7DaysAgo = subDays(startOfDay(new Date()), 7);

    // Aggregate the replies
    const topUsers: AggregatedReply[] = await ReplyModel.aggregate([
      {
        $match: {
          satisfied: true,
          createdAt: { $gte: date7DaysAgo },
        },
      },
      {
        $group: {
          _id: "$userId",
          satisfiedRepliesCount: { $sum: 1 },
        },
      },
      {
        $sort: { satisfiedRepliesCount: -1 },
      },
      {
        $limit: 10,
      },
    ]);
console.log(topUsers)
    // Extract user IDs
    const userIds = topUsers.map(user => new mongoose.Types.ObjectId(user._id));
   
    // Fetch user details
    const users: UserType[] = await User.find({ _id: { $in: userIds } }).lean();
console.log(users)
    // Map user details to the aggregated results
    const result: TopUser[] = topUsers.map(user => ({
      user: users.find(u => u._id.equals(user._id))!,
      satisfiedRepliesCount: user.satisfiedRepliesCount,
    }));

    return NextResponse.json({
      status: 200,
      body: {
        message: "Top users found",
        success: true,
        data: result,
      },
    });
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
