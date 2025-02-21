"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
// import { useGlobal } from "@/context/GlobalContext";
import { useWordsStore } from "@/store";
import { useToast } from "@/hooks/use-toast";

function WordTrainer() {
  const [isEnglishToRussian, setIsEnglishToRussian] = useState(true);
  const [currentWord, setCurrentWord] = useState<(typeof words)[0] | null>(
    null
  );
  const [userInput, setUserInput] = useState("");
  const { words, updateWord, resetProgress } = useWordsStore();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentWord) return;

    const isCorrect = isEnglishToRussian
      ? userInput.toLowerCase() === currentWord.russian.toLowerCase()
      : userInput.toLowerCase() === currentWord.english.toLowerCase();

    if (isCorrect) {
      toast({
        title: "Правильно!",
        description: `${currentWord.english} - ${currentWord.russian}`,
        duration: 2000,
      });
      updateWord({ ...currentWord, learned: true });

      const unlearned = words.filter(
        (word) => !word.learned && word._id !== currentWord._id
      );
      if (unlearned.length > 0) {
        setCurrentWord(unlearned[Math.floor(Math.random() * unlearned.length)]);
      } else {
        setCurrentWord(words[Math.floor(Math.random() * words.length)]);
      }
    } else {
      toast({
        title: "Неправильно",
        description: "Попробуйте еще раз",
        duration: 2000,
        variant: "destructive",
      });
    }
    setUserInput("");
  };

  useEffect(() => {
    if (words.length > 0) {
      const unlearned = words.filter((word) => !word.learned);
      if (unlearned.length > 0) {
        setCurrentWord(unlearned[Math.floor(Math.random() * unlearned.length)]);
      } else {
        setCurrentWord(words[Math.floor(Math.random() * words.length)]);
      }
    }
  }, [words]);

  if (!currentWord)
    return (
      <div className="text-center text-2xl">
        Добавьте слова для начала тренировки
      </div>
    );

  return (
    <Card className="shadow-custom dark:border-[#714444]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">
          Тренировка слов
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="items-center space-x-2">
          <Switch
            id="language-switch"
            checked={isEnglishToRussian}
            onCheckedChange={setIsEnglishToRussian}
          />
          <Label htmlFor="language-switch">
            {isEnglishToRussian
              ? "Английский -> Русский"
              : "Русский -> Английский"}
          </Label>
        </div>
        <div className="text-3xl font-bold text-center p-6  rounded-lg">
          {currentWord &&
            (isEnglishToRussian ? currentWord.english : currentWord.russian)}
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Введите перевод"
            className="text-lg  dark:border-[#714444] dark:focus:border-none"
          />
          <Button
            type="submit"
            className="w-full   md:dark:hover:text-black  md:dark:hover:bg-[#be4d4b]"
          >
            Проверить
          </Button>
        </form>
        <Button
          onClick={resetProgress}
          variant="default"
          className="w-full text-white bg-background md:dark:hover:text-black  md:dark:hover:bg-[#be4d4b]"
        >
          Сбросить прогресс
        </Button>
      </CardContent>
    </Card>
  );
}

export default WordTrainer;
