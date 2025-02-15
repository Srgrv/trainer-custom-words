"use client";

import type React from "react";
import { createContext, useState, useContext, useEffect } from "react";

type Word = {
  id: number;
  english: string;
  russian: string;
  learned: boolean;
};

type WordsContextType = {
  words: Word[];
  addWord: (word: Omit<Word, "id">) => void;
  updateWord: (word: Word) => void;
  deleteWord: (id: number) => void;
  resetProgress: () => void;
};

const WordsContext = createContext<WordsContextType | undefined>(undefined);

export const WordsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [words, setWords] = useState<Word[]>([]);

  useEffect(() => {
    const savedWords = localStorage.getItem("words");
    if (savedWords) {
      setWords(JSON.parse(savedWords));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("words", JSON.stringify(words));
  }, [words]);

  const addWord = (word: Omit<Word, "id">) => {
    setWords((prevWords) => [...prevWords, { ...word, id: Date.now() }]);
  };

  const updateWord = (updatedWord: Word) => {
    setWords((prevWords) =>
      prevWords.map((word) => (word.id === updatedWord.id ? updatedWord : word))
    );
  };

  const deleteWord = (id: number) => {
    setWords((prevWords) => prevWords.filter((word) => word.id !== id));
  };

  const resetProgress = () => {
    setWords((prevWords) =>
      prevWords.map((word) => ({ ...word, learned: false }))
    );
  };

  return (
    <WordsContext.Provider
      value={{ words, addWord, updateWord, deleteWord, resetProgress }}
    >
      {children}
    </WordsContext.Provider>
  );
};

export const useWords = () => {
  const context = useContext(WordsContext);
  if (context === undefined) {
    throw new Error("useWords must be used within a WordsProvider");
  }
  return context;
};
