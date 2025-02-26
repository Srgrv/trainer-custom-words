import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col items-center ">
      <div className="w-full mt-10 mb-10">
        <h1 className="text-4xl font-bold mb-6 text-secondary-foreground">
          Добро пожаловать в WordMaster
        </h1>
        <p className="text-xl mb-12 max-w-3xl text-secondary-foreground">
          WordMaster - это увлекательный способ изучения английских слов.
          Добавляйте свои слова, тренируйтесь и следите за своим прогрессом!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <Card className="shadow-custom dark:bg-dark-gradient-card">
          <CardContent className="p-6">
            <h3 className="text-2xl font-semibold mb-4">Добавляйте слова</h3>
            <p className="text-secondary-foreground">
              Создавайте свой собственный словарь для изучения
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-custom dark:bg-dark-gradient-card">
          <CardContent className="p-6">
            <h3 className="text-2xl font-semibold mb-4 ">Тренируйтесь</h3>
            <p className="text-secondary-foreground">
              Закрепляйте знания с помощью интерактивных упражнений
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-custom dark:bg-dark-gradient-card">
          <CardContent className="p-6">
            <h3 className="text-2xl font-semibold mb-4 ">
              Отслеживайте прогресс
            </h3>
            <p className="text-secondary-foreground">
              Следите за своими достижениями и улучшайте результаты
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
