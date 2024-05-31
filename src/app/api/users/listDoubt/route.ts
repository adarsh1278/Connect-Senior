"use server"
import {  NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbconnect';
import DoubtModel from '@/models/Doubt.model';

export async function GET(req:NextRequest) {
    const token = await req.cookies.get('token')?.value || '';
    try {
        console.log(token);
       
        await dbConnect();
       

        
        const Doubtlist = await DoubtModel.find({ isSolved: false }).sort({ updatedAt: -1 });
    

        
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
