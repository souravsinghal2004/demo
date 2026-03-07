"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";  

import { Header } from "@/components/Navbar";

import Hero from "@/components/Hero";
import Features from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import Footer from "@/components/Footer";

import AIThinking from "@/components/Ai-Thinkkings";
import Logos from "@/components/Logos";

import { WhyChoose } from "@/components/WhyChoose";

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
    <main className="min-h-screen">

       <div className="min-h-screen flex flex-col">
      {/* 🌟 Header */}
      <Header/>

      {/* 🧩 Main Content */}
      <main className="flex-1">
        <Hero />
        <Logos/>
        <Features />
        <HowItWorks />
        <AIThinking/>
        <WhyChoose/>
        
      
      </main>

      {/* ⚓ Footer */}
      <Footer />
    </div>



    </main>
  );
}