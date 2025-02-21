import { NextResponse } from "next/server";

import Theme from "@/mongodb/models/Theme";
import dbConnect from "@/mongodb/mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    await dbConnect();

    let theme = await Theme.findOne({ userId: session.user.id });

    if (!theme) {
      theme = new Theme({
        userId: session.user.id,
        theme: "light",
      });

      await theme.save();

      return NextResponse.json({ theme: "light" });
    }

    return NextResponse.json({ theme: theme.theme });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching theme", error },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const body = await req.json();

    const { theme } = body;

    const updatedTheme = await Theme.findOneAndUpdate(
      { userId: session.user.id },
      { theme: theme },
      { new: true }
    );

    return NextResponse.json(updatedTheme);
  } catch (error) {
    return NextResponse.json(
      { message: "Error changing theme", error },
      { status: 500 }
    );
  }
}
