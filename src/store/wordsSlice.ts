import { create } from "zustand";

type Word = {
  _id?: string;
  english: string;
  russian: string;
  learned: boolean;
};

type WordsState = {
  words: Word[];
  currentPage: number;
  totalPages: number;
  setWords: (words: Word[]) => void;
  fetchWords: (
    page?: number,
    filter?: "all" | "learned" | "unlearned",
    limit?: number
  ) => Promise<void>;
  addWord: (word: Omit<Word, "_id">) => void;
  updateWord: (word: Word) => Promise<void>;
  deleteWord: (id: string) => Promise<void>;
  resetProgress: () => Promise<void>;
  setCurrentPage: (page: number) => void;
};

export const useWordsStore = create<WordsState>()((set, get) => ({
  words: [],
  currentPage: 1,
  totalPages: 1,
  setWords: (words) => set({ words }),

  fetchWords: async (page = 1, filter = "all", limit = 10) => {
    try {
      const response = await fetch(
        `/api/words?page=${page}&limit=${limit}&filter=${filter}`
      );
      const data = await response.json();

      if (data.words) {
        set({
          words: data.words, // Обновляем слова
          totalPages: data.totalPages, // Обновляем общее количество страниц
        });
      }
    } catch (error) {
      console.error("Error fetching words", error);
    }
  },
  addWord: async (word) => {
    try {
      const response = await fetch("/api/words", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(word),
      });
      if (response.ok) {
        const newWord = await response.json();
        set((state) => ({ words: [...state.words, newWord] }));
      }
    } catch (error) {
      console.error("Ошибка при добавлении слова:", error);
    }
  },
  updateWord: async (updatedWord) => {
    try {
      const response = await fetch(`/api/words/${updatedWord._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedWord),
      });
      if (response.ok) {
        const word = await response.json();
        set((state) => ({
          words: state.words.map((w) => (w._id === word._id ? word : w)),
        }));
      }
    } catch (error) {
      console.error("Ошибка при обновлении слова:", error);
    }
  },

  deleteWord: async (id) => {
    try {
      const response = await fetch(`/api/words/${id}`, { method: "DELETE" });
      if (response.ok) {
        set((state) => ({
          words: state.words.filter((word) => word._id !== id),
        }));
      }
    } catch (error) {
      console.error("Ошибка при удалении слова:", error);
    }
  },

  resetProgress: async () => {
    set((state) => ({
      words: state.words.map((word) => ({ ...word, learned: false })),
    }));

    await Promise.all(
      get().words.map(async (word) => {
        if (word.learned) {
          try {
            await fetch(`/api/words/${word._id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ...word, learned: false }),
            });
          } catch (error) {
            console.error("Ошибка при сбросе прогресса:", error);
          }
        }
      })
    );
  },

  setCurrentPage: (page) => {
    set({ currentPage: page });
  },
}));
