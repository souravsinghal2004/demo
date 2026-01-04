"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export default function Page() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn) {
      router.replace("/login"); // app/login/page.jsx
    }
  }, [isLoaded, isSignedIn, router]);

  // ⛔ Prevent UI flash before redirect
  if (!isLoaded || isSignedIn) return null;

  return (
    <div className="min-h-screen flex flex-col">
      {/* 🌟 Header */}
      <Header />

      {/* 🧩 Main Content */}
      <main className="flex-1">
        <Hero />
        <Features />
        <HowItWorks />
        <CTA />
      </main>

      {/* ⚓ Footer */}
      <Footer />
    </div>
  );
}
