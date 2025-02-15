"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import WordInput from "@/components/WordInput";
import WordTable from "@/components/WordTable";
import React from "react";
import { useAuth } from "@/components/AuthContext";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Word = {
  id: number;
  english: string;
  russian: string;
  learned: boolean;
};

function WordsPage() {
  const { user } = useAuth();

  // const { words } = useWords();
  // const [words, setWords] = useState<Word[]>([]);

  // const handleAddWord = (newWord: Word) => {
  //   setWords([...words, newWord]);
  // };

  // const handleUpdateWord = (updatedWord: Word) => {
  //   setWords(
  //     words.map((word) => (word.id === updatedWord.id ? updatedWord : word))
  //   );
  // };

  // const handleDeleteWord = (id: number) => {
  //   setWords(words.filter((word) => word.id !== id));
  // };

  if (!user) {
    return (
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Доступ запрещен</h1>
        <p className="mb-4">
          Пожалуйста, войдите в систему, чтобы получить доступ к этой странице.
        </p>
        <Link href="/login">
          <Button>Войти</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-blue-600">
            Добавить новое слово
          </CardTitle>
        </CardHeader>
        <CardContent>
          <WordInput />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-blue-600">
            Список слов
          </CardTitle>
        </CardHeader>
        <CardContent>
          <WordTable />
        </CardContent>
      </Card>
    </div>
  );
}

export default WordsPage;
