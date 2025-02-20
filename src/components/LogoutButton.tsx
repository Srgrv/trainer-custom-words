"use client";

import React from "react";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

function LogoutButton() {
  return (
    <Button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="md:hover:bg-[#be4d4b]"
    >
      Выйти
    </Button>
  );
}

export default LogoutButton;
