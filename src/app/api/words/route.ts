// import type { NextApiRequest, NextApiResponse } from "next";

import { NextResponse } from "next/server";
// import { getSession } from "next-auth/react";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";

import dbConnect from "@/mongodb/mongodb";
import Word from "@/mongodb/models/Word";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    // return res.status(401).json({ message: "Unauthorized" });
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  await dbConnect();

  try {
    const words = await Word.find({ userId: session.user.id });
    return NextResponse.json(words);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching words", error },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();

  try {
    const body = await req.json();
    const { english, russian } = body;
    const word = new Word({
      userId: session.user.id,
      english,
      russian,
    });
    await word.save();
    return NextResponse.json(word, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating word", error },
      { status: 500 }
    );
  }
}
