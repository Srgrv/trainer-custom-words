"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import WordInput from "@/components/WordInput";
import WordTable from "@/components/WordTable";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";

import { useWordsStore } from "@/store";

export default function WordsPage() {
  const { data: session } = useSession();
  const { words, fetchWords } = useWordsStore();

  useEffect(() => {
    if (session && words.length === 0) {
      fetchWords();
    }
  }, [session, words.length, fetchWords]);

  return (
    <div className="space-y-8 ">
      <Card className="shadow-custom dark:border-[#714444] ">
        <CardHeader>
          <CardTitle className="text-2xl font-bold ">
            Добавить новое слово
          </CardTitle>
        </CardHeader>
        <CardContent>
          <WordInput />
        </CardContent>
      </Card>
      <Card className="shadow-custom dark:border-[#714444] ">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Список слов</CardTitle>
        </CardHeader>
        <CardContent>
          <WordTable />
        </CardContent>
      </Card>
    </div>
  );
}
