"use client";

import type React from "react";
import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";

import { useSession } from "next-auth/react";
import Word from "@/mongodb/models/Word";

type Word = {
  _id?: string;
  english: string;
  russian: string;
  learned: boolean;
};

type WordsContextType = {
  words: Word[];
  addWord: (word: Word) => void;
  updateWord: (word: Word) => Promise<void>;
  deleteWord: (id: string) => Promise<void>;
  resetProgress: () => Promise<void>;
  fetchWords: () => Promise<void>;
};

const WordsContext = createContext<WordsContextType | undefined>(undefined);

export const WordsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [words, setWords] = useState<Word[]>([]);
  const { data: session } = useSession();

  const fetchWords = useCallback(async () => {
    if (!session) return;

    try {
      const response = await fetch("/api/words", { method: "GET" });
      if (response.ok) {
        const data = await response.json();
        setWords(data);
      } else {
        console.error("Ошибка при загрузке слов");
      }
    } catch (error) {
      console.log("Ошибка при запросе слов: ", error);
    }
  }, [session]);

  useEffect(() => {
    if (session) {
      fetchWords();
    }
  }, [session, fetchWords]);

  const addWord = async (word: Omit<Word, "_id">) => {
    try {
      const response = await fetch("/api/words", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(word),
      });
      if (response.ok) {
        const newWord = await response.json();
        setWords((prevWords) => [...prevWords, newWord]);
      } else {
        console.error(
          "Error adding word:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error adding word:", error);
    }
  };

  const updateWord = async (updatedWord: Word) => {
    try {
      const response = await fetch(`/api/words/${updatedWord._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedWord),
      });
      if (response.ok) {
        const word = await response.json();
        setWords((prevWords) =>
          prevWords.map((w) => (w._id === word._id ? word : w))
        );
      } else {
        console.log(
          "Error updating word: ",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error updating word: ", error);
    }
  };

  const deleteWord = async (id: string) => {
    try {
      const response = await fetch(`/api/words/${id}`, { method: "DELETE" });
      if (response.ok) {
        setWords((prevWords) => prevWords.filter((word) => word._id !== id));
      } else {
        console.error(
          "Error deleting word:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error deleting word:", error);
    }
  };

  const resetProgress = async () => {
    const updatedWords = await Promise.all(
      words.map(async (word) => {
        if (word.learned) {
          const response = await fetch(`/api/words/${word._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...word, learned: false }),
          });
          if (response.ok) {
            return { ...word, learned: false };
          }
        }
        return word;
      })
    );
    setWords(updatedWords);
  };

  return (
    <WordsContext.Provider
      value={{
        words,
        addWord,
        updateWord,
        deleteWord,
        resetProgress,
        fetchWords,
      }}
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
