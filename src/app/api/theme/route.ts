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
    console.log("Найдена тема в базе данных:", theme);

    if (!theme) {
      console.log("Тема не найдена, возвращаем дефолтную тему.");

      theme = new Theme({
        userId: session.user.id,
        theme: "light",
      });

      await theme.save();
      console.log("Дефолтная тема сохранена:", theme);

      return NextResponse.json({ theme: "light" });
    }

    return NextResponse.json({ theme: theme.theme });
  } catch (error) {
    console.error("Ошибка при получении темы: ", error);
    return NextResponse.json(
      { message: "Error fetching theme" },
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
    console.log("Полученные данные для обновления темы:", body);

    const { theme } = body;

    const updatedTheme = await Theme.findOneAndUpdate(
      { userId: session.user.id },
      { theme: theme },
      { new: true }
    );

    console.log("Обновленная тема:", updatedTheme);

    return NextResponse.json(updatedTheme);
  } catch (error) {
    console.error("Ошибка при изменении темы: ", error);
    return NextResponse.json(
      { message: "Error changing theme" },
      { status: 500 }
    );
  }
}
