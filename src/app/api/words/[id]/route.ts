import { NextResponse, NextRequest } from "next/server";
import { ObjectId } from "mongodb";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import dbConnect from "@/mongodb/mongodb";
import Word from "@/mongodb/models/Word";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const id = (await params).id;
    const body = await req.json();

    const updatedWord = await Word.findOneAndUpdate(
      { _id: new ObjectId(id), userId: session.user.id },
      body,
      { new: true }
    );

    if (!updatedWord) {
      return NextResponse.json({ message: "Word not found" }, { status: 404 });
    }
    return NextResponse.json(updatedWord);
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating word", error },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const id = (await params).id;

    const deletedWord = await Word.findOneAndDelete({
      _id: new ObjectId(id),
      userId: session.user.id,
    }).exec();

    if (!deletedWord) {
      return NextResponse.json({ message: "Word not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Word deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting word", error },
      { status: 500 }
    );
  }
}
