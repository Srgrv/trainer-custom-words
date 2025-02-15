import type { Metadata } from "next";

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"></div>
    </div>
  );
}
