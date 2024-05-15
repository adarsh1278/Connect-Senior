import dbConnect from "@/lib/dbconnect";
import User from "@/models/User.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"
export async function POST(req:NextRequest) {
    try {
        await dbConnect()
        const {email,password , username} =  await req.json();
        //if username and email both are empty
        if (!username && !email) {
            return NextResponse.json({
              status: 400,
              body: {
                message: "Username or email is required",
                success: false,
              },
            });
          }
          const user = await User.findOne({  $or: [{username}, {email}] });
//if user does not exist 
if (!user) {
    return NextResponse.json({
      status: 404,
      body: {
        message: "User does not exist",
        success: false,
      },
    });
  }

  // compare password
  const success = await bcrypt.compare(password ,user.password);

   if(!success){
    return NextResponse.json({
        status: 404,
        body: {
          message: "password is not correct",
          success: false,
        },
      });
   }
// generate access token
const accessToken = await user.generateAccessToken();
//send token
const options = {
    httpOnly: true,
    secure: true,
    maxage:100000,
  };
  const response:NextResponse = NextResponse.json({

    status: 200,
    body: {
      message: "User login succefully",
      success: true,
    },
  
  })

  //add cookie

response.cookies.set("token",accessToken,options);

return response;


    } catch (error) {
        console.log(error)
        return NextResponse.json(
            {
                message:"Error occured",
                success:false
            },
            {
                status:500
            }
        )
    }
    
}