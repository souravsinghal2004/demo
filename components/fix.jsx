"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full flex items-center justify-between px-10 py-6 bg-white">
      
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 bg-red-500 rounded-md"></div>
        <h1 className="text-xl font-semibold">INTERVAI</h1>
      </div>

      {/* Links */}
      <nav className="hidden md:flex items-center gap-8 text-gray-700">
        <a href="#">Solutions</a>
        <a href="#">Enterprise</a>
        <a href="#">Resources</a>
        <a href="#">Pricing</a>
      </nav>

      {/* Buttons */}a
      <div className="flex items-center gap-4">

        {/* If user NOT signed in */}
        <SignedOut>

          <SignInButton mode="modal">
            <button className="text-gray-700">
              Sign in
            </button>
          </SignInButton>

          <SignInButton mode="modal">
            <button className="bg-black text-white px-5 py-2 rounded-full">
              Get Started
            </button>
          </SignInButton>

        </SignedOut>

        {/* If user signed in */}
        <SignedIn>

          <UserButton afterSignOutUrl="/" />

          <Link href="/interview">
            <button className="bg-black text-white px-5 py-2 rounded-full">
              Get Started
            </button>
          </Link>

        </SignedIn>

      </div>
    </header>
  );
}