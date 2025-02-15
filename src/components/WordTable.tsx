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

type Word = {
  id: number;
  english: string;
  russian: string;
  learned: boolean;
};

type WordTableProps = {
  words: Word[];
  onUpdateWord: (updatedWord: Word) => void;
  onDeleteWord: (id: number) => void;
};

function WordTable({ words, onUpdateWord, onDeleteWord }: WordTableProps) {
  const [filter, setFilter] = useState<"all" | "learned" | "unlearned">("all");

  const filteredWords = words.filter((word) => {
    if (filter === "learned") return word.learned;
    if (filter === "unlearned") return !word.learned;
    return true;
  });

  const handleEdit = (
    id: number,
    field: "english" | "russian",
    value: string
  ) => {
    const wordToUpdate = words.find((word) => word.id === id);
    if (wordToUpdate) {
      onUpdateWord({ ...wordToUpdate, [field]: value });
    }
  };

  const handleToggleLearned = (id: number) => {
    const wordToUpdate = words.find((word) => word.id === id);
    if (wordToUpdate) {
      onUpdateWord({ ...wordToUpdate, learned: !wordToUpdate.learned });
    }
  };

  return (
    <div className="space-y-4">
      <Select>
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
              <TableRow key={word.id}>
                <TableCell>
                  <Input
                    value={word.english}
                    onChange={(e) =>
                      handleEdit(word.id, "english", e.target.value)
                    }
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={word.russian}
                    onChange={(e) =>
                      handleEdit(word.id, "russian", e.target.value)
                    }
                    // onChange={(e) =>
                    //   handleEdit(word.id, "russian", e.target.value)
                    // }
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant={word.learned ? "default" : "outline"}
                    onClick={() => handleToggleLearned(word.id)}
                  >
                    {word.learned ? "Выучено" : "Изучается"}
                  </Button>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="destructive"
                    onClick={() => onDeleteWord(word.id)}
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
