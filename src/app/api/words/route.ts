import { NextRequest, NextResponse } from "next/server";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";

import dbConnect from "@/mongodb/mongodb";
import Word from "@/mongodb/models/Word";

interface QueryFilter {
  userId: string;
  learned?: boolean;
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") ?? "1", 10);
  const limit = parseInt(searchParams.get("limit") ?? "20", 10);
  const filter = searchParams.get("filter") ?? "all"; // Параметр фильтра
  const skip = (page - 1) * limit;

  try {
    // Фильтрация по значению "learned" или "unlearned"
    const query: QueryFilter = { userId: session.user.id };
    console.log(query);

    if (filter === "learned") {
      query.learned = true;
    } else if (filter === "unlearned") {
      query.learned = false;
    }

    const words = await Word.find(query).skip(skip).limit(limit);

    const totalWords = await Word.countDocuments(query);
    const totalPages = Math.ceil(totalWords / limit);

    return NextResponse.json({ words, totalPages });
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
