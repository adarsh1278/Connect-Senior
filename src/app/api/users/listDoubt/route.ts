import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbconnect';
import DoubtModel from '@/models/Doubt.model';

export async function GET(req: NextRequest) {
    try {
        // Connect to the database
        await dbConnect();
        console.log('Database connected successfully.');

        // Fetch doubts that are not solved, sorted by updatedAt in ascending order
        const Doubtlist = await DoubtModel.find({ isSolved: false }).sort({ updatedAt: -1 });
        console.log('Doubtlist fetched and sorted:', Doubtlist);

        // Return the response with cache control headers
        const response = NextResponse.json({
            status: 200,
            body: {
                message: 'Doubts fetched',
                success: true,
                Doubtlist,
            },
        });
        response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        return response;
    } catch (error) {
        // Log the error for debugging
        console.error('Error fetching doubts:', error);

        // Return an error response with the error message
        const response = NextResponse.json({
            status: 404,
            body: {
                message: 'Doubts error',
                success: false,
                error: error,
            },
        });
        response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        return response;
    }
}
