"use client";

import React, { useState } from "react";
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
import { useWords } from "@/context/WordsContexts";

function WordTable() {
  const [filter, setFilter] = useState("all");

  const { words, updateWord, deleteWord } = useWords();

  const filteredWords = words.filter((word) => {
    if (filter === "learned") return word.learned;
    if (filter === "unlearned") return !word.learned;
    return true;
  });

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
      <Select onValueChange={setFilter} defaultValue={filter}>
        <SelectTrigger>
          <SelectValue placeholder="Фильтр" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Все слова</SelectItem>
          <SelectItem value="unlearned">Для изучения</SelectItem>
          <SelectItem value="learned">Выученные</SelectItem>
        </SelectContent>
      </Select>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Английский</TableHead>
              <TableHead className="w-[200px]">Русский</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead className="text-right">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredWords.map((word) => (
              <TableRow key={word._id}>
                <TableCell>
                  <Input
                    value={word.english}
                    onChange={(e) =>
                      handleEdit(word._id!, "english", e.target.value)
                    }
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={word.russian}
                    onChange={(e) =>
                      handleEdit(word._id!, "russian", e.target.value)
                    }
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant={word.learned ? "default" : "outline"}
                    onClick={() => handleToggleLearned(word._id!)}
                  >
                    {word.learned ? "Выучено" : "Изучается"}
                  </Button>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="destructive"
                    onClick={() => deleteWord(word._id!)}
                  >
                    Удалить
                  </Button>
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
