"use client";

import React, { useEffect, useState } from "react";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Trash2, CheckCircle, Circle, Trash } from "lucide-react";

import { useWordsStore } from "@/store";
import WordsPagination from "./WordsPagination";

function WordTable() {
  const [filter, setFilter] = useState<"all" | "learned" | "unlearned">("all");

  const {
    words,
    currentPage,
    setCurrentPage,
    updateWord,
    deleteWord,
    fetchWords,
  } = useWordsStore();

  useEffect(() => {
    fetchWords(currentPage, filter);
  }, [currentPage, filter, fetchWords]);

  const handleEdit = (
    id: string,
    field: "english" | "russian",
    value: string
  ) => {
    const wordToUpdate = words.find((word) => word._id === id);
    if (wordToUpdate) {
      updateWord({ ...wordToUpdate, [field]: value });
    }
  };

  const handleToggleLearned = (id: string) => {
    const wordToUpdate = words.find((word) => word._id === id);
    if (wordToUpdate) {
      updateWord({ ...wordToUpdate, learned: !wordToUpdate.learned });
    }
  };

  return (
    <div className="space-y-4">
      <Select
        onValueChange={(value) => {
          setFilter(value as "all" | "learned" | "unlearned");
          setCurrentPage(1);
        }}
        defaultValue={filter}
      >
        <SelectTrigger className="dark:border-[#714444]">
          <SelectValue placeholder="Фильтр" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Все слова</SelectItem>
          <SelectItem value="unlearned">Для изучения</SelectItem>
          <SelectItem value="learned">Выученные</SelectItem>
        </SelectContent>
      </Select>
      <WordsPagination />

      <div className="rounded-md border dark:border-[#714444]">
        <Table>
          <TableHeader className="border-b-2 dark:border-[#714444]">
            <TableRow>
              <TableHead className="w-[200px]">Английский</TableHead>
              <TableHead className="w-[200px]">Русский</TableHead>
              <TableHead className="hidden md:table-cell">Статус</TableHead>
              <TableHead className="hidden md:table-cell text-right">
                Действия
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {words.map((word) => (
              <TableRow key={word._id} className="dark:border-[#714444]">
                <TableCell className="w-1/2">
                  <Input
                    value={word.english}
                    onChange={(e) =>
                      handleEdit(word._id!, "english", e.target.value)
                    }
                  />
                </TableCell>
                <TableCell className="w-1/2">
                  <Input
                    value={word.russian}
                    onChange={(e) =>
                      handleEdit(word._id!, "russian", e.target.value)
                    }
                  />
                </TableCell>

                <TableCell className="hidden md:table-cell">
                  <Button
                    variant={word.learned ? "default" : "outline"}
                    onClick={() => handleToggleLearned(word._id!)}
                    className="flex items-center justify-center gap-2"
                  >
                    {word.learned ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <div className="w-4 h-4 border-2 rounded-full"></div>
                    )}
                    {word.learned ? "Выучено" : "Изучается"}
                  </Button>
                </TableCell>

                <TableCell className="hidden md:table-cell text-right">
                  <button
                    onClick={() => deleteWord(word._id!)}
                    className="flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                    Удалить
                  </button>
                </TableCell>

                <TableCell className="md:hidden flex gap-2 justify-end">
                  <button
                    onClick={() => handleToggleLearned(word._id!)}
                    className="flex items-center justify-center"
                  >
                    {word.learned ? (
                      <CheckCircle className="w-7 h-10 text-green-500" />
                    ) : (
                      <Circle className="w-7 h-10 text-gray-400" />
                    )}
                  </button>
                  <button
                    onClick={() => deleteWord(word._id!)}
                    className="flex items-center justify-center"
                  >
                    <Trash className="w-8 h-10 text-red-500" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default WordTable;
