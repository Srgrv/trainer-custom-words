import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/mongodb/mongodb";
import User from "@/mongodb/models/User";

export async function POST(req: Request) {
  //   if (req.method !== "POST") {
  //     // return res.status(405).json({ message: "Method not allowed" });
  //     return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  //   }

  await dbConnect();
  const body = await req.json();

  const { name, email, password } = body;

  if (!name || !email || !password) {
    // return res.status(400).json({ message: "Missing fields" });
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    // return res.status(409).json({ message: "User already exists" });
    return NextResponse.json(
      { message: "User already exists" },
      { status: 409 }
    );
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  await user.save();

  //   res.status(201).json({ message: "User created succussfully" });
  return NextResponse.json(
    { message: "User created successfully" },
    { status: 201 }
  );
}
