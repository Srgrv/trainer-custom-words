"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import WordInput from "@/components/WordInput";
import WordTable from "@/components/WordTable";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useWords } from "@/context/WordsContexts";

export default function WordsPage() {
  const { data: session } = useSession();
  const { words, fetchWords } = useWords();

  useEffect(() => {
    if (session && words.length === 0) {
      fetchWords();
    }
  }, [session, words.length, fetchWords]);

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
