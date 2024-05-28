import OTP from "@/models/Otp.model";
import dbConnect from "@/lib/dbconnect";
import User from "@/models/User.model";

import nodemailer from 'nodemailer';

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    // Check if email is provided
    if (!email) {
      return NextResponse.json({
        status: 400,
        body: {
          message: "Email is required",
          success: false,
        },
      });
    }

    await dbConnect()

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({
        status: 400,
        body: {
          message: "User already exists",
          success: false,
        },
      });
    }

    // Generate OTP
    const oldOtp = await OTP.findOneAndDelete({ email });
    
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    // Save OTP to database
    const otpDocument = new OTP({
      email,
      otp,
    });
    await otpDocument.save();
    console.log("OTP saved successfully");

    // Send OTP via email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const subject = "OTP Verification";
    const text = `Your OTP for login nextauth.com is ${otp}`;
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject,
      text,
    };
    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      status: 200,
      body: {
        message: "OTP sent successfully",
        success: true,
      },
    });
  } catch (error) {
    console.error("Error in send email API:", error);
    return NextResponse.json({
      status: 500,
      body: {
        message: "Internal server error",
        success: false,
      },
    });
  }
}
