import React from "react";
import Link from "next/link";
export function Hero() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-16 bg-blue-50">
      
      {/* Text Content */}
      <div className="max-w-xl text-center md:text-left">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4 leading-tight">
          AI-Assisted Candidate Shortlisting for Smarter Hiring
        </h2>

        <p className="text-gray-600 mb-6 text-lg">
          Our platform helps recruiters efficiently evaluate candidates at the
          early stages of recruitment using AI-driven assessments, ensuring
          faster shortlisting while keeping the final hiring decision entirely
          human-led.
        </p>

        <div className="flex justify-center md:justify-start gap-4">
          <Link
            href="/sign-in"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
          >
            Get Started
          </Link>

          <a
            href="#features"
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-md hover:bg-blue-50 transition"
          >
            Learn More
          </a>
        </div>
      </div>

      {/* Image */}
      <div className="mt-12 md:mt-0 md:ml-12 flex-shrink-0">
        <img
          src="images/image.png"
          alt="AI-Assisted Recruitment Illustration"
          className="w-full max-w-md md:max-w-lg object-contain mx-auto"
        />
      </div>

    </section>
  );
}
