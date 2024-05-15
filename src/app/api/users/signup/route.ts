import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbconnect";
import User from "@/models/User.model";

export async function POST(req: NextRequest) {
    try {
        // Assuming req is the request object containing username, password, and email
        const { username, password, email } = await req.json();

        // Connect to the database
        await dbConnect();

        // Extract information from the email
        const [userName, domainPart] = email.split("@");
        if (domainPart !== "kiet.edu") {
            console.log("domain part is" + domainPart);
            return NextResponse.json({ error: "Invalid email domain" }, { status: 400 });
        }

        const [name, libId] = userName.split(".");

        console.log("libid is -", libId);
        let year = libId.substring(0, 4);
        const admissionYear = "20" + year.substring(0,2);
       
        const branch = libId.substring(4, libId.length - 4);

        // Check if the email domain is kiet.edu
        

        // Check if the user already exists
        let user = await User.findOne({ email });

        if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        
     

        // Create a new user
        const newUser = new User({
            username,
            email,
            password,
            branch,
            admissionYear,
            name,
        });

        // Save the new user to the database
        await newUser.save();

        // Respond with success message
        return NextResponse.json({ message: "User created successfully" }, { status: 200 });
    } catch (error) {
        console.error(error);
        console.log("error occured");
        return NextResponse.json(
            {
                message: "Please try again",
                status: "404"
            }
        );
    }
}
