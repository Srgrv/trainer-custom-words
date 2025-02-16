import WordTrainer from "@/components/WordTrainer";
import React from "react";
import { useAuth } from "@/components/AuthContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function TrainPage() {
  // const { user } = useAuth();

  // if (!user) {
  //   return (
  //     <div className="text-center">
  //       <h1 className="text-3xl font-bold mb-4">Доступ запрещен</h1>
  //       <p className="mb-4">
  //         Пожалуйста, войдите в систему, чтобы получить доступ к тренажеру.
  //       </p>
  //       <Link href="/login">
  //         <Button>Войти</Button>
  //       </Link>
  //     </div>
  //   );
  // }
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Тренировка слов</h1>
      <WordTrainer />
    </div>
  );
}

export default TrainPage;
