"use client";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();
  return (
    <Image
      onClick={() => router.push("/")}
      src="/images/logo.png"
      alt="logo"
      className="hidden md:block cursor-pointer"
      width={100}
      height={100}
    />
  );
};

export default Logo;
