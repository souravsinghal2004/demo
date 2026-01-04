"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Sparkles, Menu } from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignIn, SignInButton, UserButton } from "@clerk/nextjs";


export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl text-gray-900">InterviewAI</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">
              How It Works
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
              Pricing
            </a>
            <a href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors">
              Testimonials
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
           <SignedIn>
            <UserButton/>
           </SignedIn>
           <SignedOut>
            <SignInButton/>
           </SignedOut>
            <Button
              className="bg-blue-600 hover:bg-blue-700"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-gray-200">
            <a href="#features" className="block text-gray-600 hover:text-gray-900">
              Features
            </a>
            <a href="#how-it-works" className="block text-gray-600 hover:text-gray-900">
              How It Works
            </a>
            <a href="#pricing" className="block text-gray-600 hover:text-gray-900">
              Pricing
            </a>
            <a href="#testimonials" className="block text-gray-600 hover:text-gray-900">
              Testimonials
            </a>
            <div className="flex flex-col gap-2 pt-4">
           <Button
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={() => router.push("/sign-in")}
              >
                Sign-in
              </Button>
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={() => router.push("/interview")}
              >
                Get Started
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
