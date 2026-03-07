import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400">

      <div className="max-w-[1400px] mx-auto px-10 py-24 flex items-center min-h-[600px] relative">

        {/* LEFT CONTENT */}
        <div className="max-w-xl z-10">

          <h1 className="text-5xl font-bold text-gray-900 leading-tight">
            AI-Powered Hiring for Modern Recruiters
          </h1>

          <p className="mt-6 text-lg text-gray-700">
            Post a job and let our AI conduct interviews with hundreds of 
            candidates automatically. Instantly evaluate responses and 
            shortlist the best talent while eliminating unqualified applicants.
          </p>

          <div className="flex items-center gap-6 mt-8">

            <button className=" text-white px-6 py-3 rounded-full font-medium ">
           <Link href="/sign-in" className="group flex items-center gap-4">
  {/* The Icon Container */}
  <div className="relative flex items-center justify-center">
    {/* The Outer Offset Circle (Thin Red Line) */}
    <div className="absolute h-12 w-12 rounded-full border border-red-500/50 scale-110" />
    
    {/* The Solid Red Circle with Arrow */}
    <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-red-600 transition-transform group-hover:scale-105">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-5 w-5 text-white" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor" 
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="Arrow-Right-Icon-Path-Here" />
        {/* Simplified Arrow Path */}
        <path d="M5 12h14m-7-7 7 7-7 7" />
      </svg>
    </div>
  </div>

  {/* The Text */}
  <span className="text-xl font-bold text-slate-900">
    Get Start 
  </span>
</Link>
            </button>

            <button className="text-gray-900">
             <Link href="/sign-in" className="group flex items-center gap-4">
  {/* The Icon Container */}
  <div className="relative flex items-center justify-center">
    {/* The Outer Offset Circle (Thin Red Line) */}
    <div className="absolute h-12 w-12 rounded-full border border-red-500/60 scale-110" />
    
    {/* The Solid Red Circle with Play Triangle */}
    {/* We use pl-1 (left padding) to visually center the play triangle, which can look unbalanced otherwise. */}
    <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-red-600 pl-1 transition-transform group-hover:scale-105">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="currentColor" // Use fill color instead of stroke
        className="h-5 w-5 text-white"
      >
        {/* Simplified Play Triangle Path */}
        <path d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 0 1 0 1.971l-11.54 6.347c-.75.412-1.667-.13-1.667-.986V5.653Z" />
      </svg>
    </div>
  </div>

  {/* The Text (Kept from original design) */}
  <span className="text-xl font-bold text-slate-950">
    Watch Demo
  </span>
</Link>
            </button>

          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20">

          <Image
            src="/ai-head.png"
            alt="AI Hiring Platform"
            width={600}
            height={700}
            className="object-contain"
            priority
          />

        </div>

      </div>

    </section>
  );
}