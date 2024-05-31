import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbconnect";
import DoubtModel from "@/models/Doubt.model";

export async function GET(req: NextRequest) {
    try {
        // Connect to the database
        await dbConnect();

        // Fetch doubts that are not solved, sorted by updatedAt in ascending order
        const Doubtlist = await DoubtModel.find({ isSolved: false }).sort({ updatedAt: -1 });

        // Log the fetched list for debugging
        console.log("Doubtlist fetched and sorted:", Doubtlist);

        // Return the response with the fetched doubts
        return NextResponse.json({
            status: 200,
            body: {
                message: "Doubts fetched",
                success: true,
                Doubtlist,
            },
        });
    } catch (error) {
        // Log the error for debugging
        console.error("Error fetching doubts:", error);

        // Return an error response
        return NextResponse.json({
            status: 404,
            body: {
                message: "Doubts error",
                success: false,
            },
        });
    }
}
