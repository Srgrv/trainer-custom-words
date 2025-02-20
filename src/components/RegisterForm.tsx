"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useToast } from "@/hooks/use-toast";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      toast({
        title: "Регистрация успешна",
        description: data.message,
      });
      router.push("/login");
    } else {
      const error = await response.json();
      toast({
        title: "Ошибка регистрации",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 shadow-custom p-6 rounded-xl bg-card dark:border dark:border-[#714444]"
    >
      <div>
        <Label htmlFor="name">Имя</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 dark:border-[#714444] dark:focus:border-none"
        />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 dark:border-[#714444] dark:focus:border-none"
        />
      </div>
      <div>
        <Label htmlFor="password">Пароль</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1 dark:border-[#714444] dark:focus:border-none"
        />
      </div>
      <Button
        type="submit"
        className="w-full dark:hover:text-black  dark:hover:bg-[#be4d4b]"
      >
        Зарегистрироваться
      </Button>
    </form>
  );
}
