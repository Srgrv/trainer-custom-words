import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "WordMaster - Тренажер английских слов",
  description: "Изучайте английские слова эффективно и весело",
};

export default function Home() {
  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="text-4xl font-bold mb-6 text-primary">
        Добро пожаловать в WordMaster
      </h1>
      <p className="text-xl mb-12 max-w-3xl text-muted-foreground">
        WordMaster - это увлекательный способ изучения английских слов.
        Добавляйте свои слова, тренируйтесь и следите за своим прогрессом!
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-2xl font-semibold mb-4 text-primary">
              Добавляйте слова
            </h3>
            <p className="text-muted-foreground">
              Создавайте свой собственный словарь для изучения
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="text-2xl font-semibold mb-4 text-primary">
              Тренируйтесь
            </h3>
            <p className="text-muted-foreground">
              Закрепляйте знания с помощью интерактивных упражнений
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="text-2xl font-semibold mb-4 text-primary">
              Отслеживайте прогресс
            </h3>
            <p className="text-muted-foreground">
              Следите за своими достижениями и улучшайте результаты
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/register">
          <Button size="lg" className="w-full">
            Начать обучение
          </Button>
        </Link>
        <Link href="/login">
          <Button size="lg" variant="outline" className="w-full">
            Войти
          </Button>
        </Link>
      </div>
    </div>
  );
}
