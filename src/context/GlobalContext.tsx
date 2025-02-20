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

type Word = {
  _id?: string;
  english: string;
  russian: string;
  learned: boolean;
};

type GlobalContextType = {
  words: Word[];
  addWord: (word: Omit<Word, "_id">) => void;
  updateWord: (word: Word) => Promise<void>;
  deleteWord: (id: string) => Promise<void>;
  resetProgress: () => Promise<void>;
  fetchWords: () => Promise<void>;
  theme: string;
  setTheme: (theme: string) => void;
  isLoadingTheme: boolean;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [words, setWords] = useState<Word[]>([]);
  const [theme, setTheme] = useState<string>("light");
  const { data: session } = useSession();
  const [isLoadingTheme, setIsLoadingTheme] = useState<boolean>(true);

  // Логика для работы со словами
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

  /* Логика для работы с темой*/

  useEffect(() => {
    // читаем тему после монтирования
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setTheme("light");
    }
    setIsLoadingTheme(false);
    // Инициализация темы
    // if (!localStorage.getItem("theme")) {
    //   localStorage.setItem("theme", "light");
    // }
    // setIsLoadingTheme(false);
  }, []);

  const updateTheme = async (newTheme: string) => {
    // const currentTheme = localStorage.getItem("theme");
    localStorage.setItem("theme", newTheme);
    // if (currentTheme === newTheme) return;
    setTheme(newTheme);
    // localStorage.setItem("theme", newTheme);

    if (session) {
      try {
        const response = await fetch("/api/theme", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ theme: newTheme }),
        });
        if (!response.ok) {
          console.error("Ошибка при обновлении темы на сервере");
        }
      } catch (error) {
        console.error("Ошибка при запросе обновления темы на сервере:", error);
      }
    }
  };

  if (isLoadingTheme) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 dark:border-gray-100">
          Загрузка...
        </div>
      </div>
    );
  }

  return (
    <GlobalContext.Provider
      value={{
        words,
        addWord,
        updateWord,
        deleteWord,
        resetProgress,
        fetchWords,
        theme,
        setTheme: updateTheme,
        isLoadingTheme,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobal must be used within a GlobalProvider");
  }
  return context;
};
