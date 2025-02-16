"use client";

import React from "react";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

function LogoutButton() {
  return (
    <Button onClick={() => signOut({ callbackUrl: "/login" })}>Выйти</Button>
  );
}

export default LogoutButton;
