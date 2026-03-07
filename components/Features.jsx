import React from "react";
import { CheckCircle, Mic, PhoneOff } from "lucide-react";

const Features = () => {
  return (
    <section className="w-full py-24 bg-gradient-to-r from-[#2a0e3f] via-[#1b114f] to-[#0b1b4d] text-white">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        
        {/* LEFT CONTENT */}
        <div>
          <h2 className="text-5xl font-semibold leading-tight mb-6">
            Feels exactly like talking to a real recruiter.
          </h2>

          <p className="text-gray-300 text-lg mb-10 max-w-xl">
            Our ultra-low latency voice engine listens to your responses,
            analyzes the context based on your CV and the JD, and dynamically
            asks follow-up questions to dig deeper into your experience.
          </p>

          <div className="space-y-5">
            <div className="flex items-center gap-3 text-gray-200">
              <CheckCircle size={20} className="text-white" />
              <p>Under 500ms response latency.</p>
            </div>

            <div className="flex items-center gap-3 text-gray-200">
              <CheckCircle size={20} className="text-white" />
              <p>Interruptible conversations.</p>
            </div>

            <div className="flex items-center gap-3 text-gray-200">
              <CheckCircle size={20} className="text-white" />
              <p>Adjusts tone based on company culture.</p>
            </div>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="flex justify-center">
          <div className="w-[340px] bg-black/70 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                Recording
              </div>
              <span>14:02</span>
            </div>

            {/* VOICE CIRCLE */}
            <div className="flex justify-center mb-8">
              <div className="w-40 h-40 rounded-full border border-white/10 flex items-center justify-center">
                <div className="flex gap-1">
                  <span className="w-1 h-6 bg-white rounded"></span>
                  <span className="w-1 h-10 bg-white rounded"></span>
                  <span className="w-1 h-4 bg-white rounded"></span>
                  <span className="w-1 h-8 bg-white rounded"></span>
                </div>
              </div>
            </div>

            {/* QUESTION */}
            <p className="text-center text-sm text-gray-200 leading-relaxed mb-8">
              "That's interesting. Can you tell me about a specific time when
              that microservices architecture failed under load, and how you
              recovered?"
            </p>

            {/* CONTROLS */}
            <div className="flex justify-center gap-6">
              <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <Mic size={18} />
              </button>

              <button className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
                <PhoneOff size={20} />
              </button>

              <button className="w-10 h-10 rounded-full bg-white/10"></button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Features;