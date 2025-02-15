"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import WordInput from "@/components/WordInput";
import WordTable from "@/components/WordTable";
import React, { useState } from "react";

type Word = {
  id: number;
  english: string;
  russian: string;
  learned: boolean;
};

function WordsPage() {
  const [words, setWords] = useState<Word[]>([]);

  const handleAddWord = (newWord: Word) => {
    setWords([...words, newWord]);
  };

  const handleUpdateWord = (updatedWord: Word) => {
    setWords(
      words.map((word) => (word.id === updatedWord.id ? updatedWord : word))
    );
  };

  const handleDeleteWord = (id: number) => {
    setWords(words.filter((word) => word.id !== id));
  };

  return (
    <div className="space-y-8">
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-blue-600">
            Добавить новое слово
          </CardTitle>
        </CardHeader>
        <CardContent>
          <WordInput onAddWord={handleAddWord} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-blue-600">
            Список слов
          </CardTitle>
        </CardHeader>
        <CardContent>
          <WordTable
            words={words}
            onUpdateWord={handleUpdateWord}
            onDeleteWord={handleDeleteWord}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default WordsPage;
