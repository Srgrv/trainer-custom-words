"use client";

import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { useGlobal } from "@/context/GlobalContext";

function WordInput() {
  const [english, setEnglish] = useState("");
  const [russian, setRussian] = useState("");
  const { toast } = useToast();
  const { addWord } = useGlobal();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (english.trim() && russian.trim()) {
      addWord({
        english: english.trim(),
        russian: russian.trim(),
        learned: false,
      });

      setEnglish("");
      setRussian("");
      toast({
        title: "Слово добавлено",
        description: `${english} - ${russian}`,
      });
    }
  };

  return (
    <form className="space-y-4 " onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="english">Английское слово</Label>
        <Input
          id="english"
          value={english}
          placeholder="Введите английское слово"
          className="mt-1 dark:border-[#714444] dark:focus:border-none "
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEnglish(e.target.value)
          }
        />
      </div>
      <div>
        <Label htmlFor="russian">Русский перевод</Label>
        <Input
          id="russian"
          value={russian}
          onChange={(e) => setRussian(e.target.value)}
          placeholder="Введите русский перевод"
          className="mt-1 dark:border-[#714444] dark:focus:border-none"
        />
      </div>
      <Button
        type="submit"
        className="w-full  md:dark:hover:text-black  md:dark:hover:bg-[#be4d4b]"
      >
        Добавить слово
      </Button>
    </form>
  );
}

export default WordInput;
