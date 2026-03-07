import React from "react";
import { Brain, CheckCircle, MessageSquare } from "lucide-react";

const AIThinking = () => {
  return (
    <section className="w-full py-28 bg-[#020617] text-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* TITLE */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold mb-4">
            See how our AI thinks
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Watch a real conversation unfold as our AI conducts natural interviews,
            evaluates responses, and generates insights in real-time.
          </p>
        </div>

        {/* CARDS */}
        <div className="grid md:grid-cols-3 gap-8">

          {/* CARD 1 */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 hover:border-indigo-500 transition">

            <div className="flex items-center gap-3 mb-6">
              <div className="bg-indigo-500/20 p-3 rounded-lg">
                <Brain size={22}/>
              </div>
              <h3 className="text-lg font-medium">Real-time Analysis</h3>
            </div>

            {/* PROGRESS BARS */}

            <div className="space-y-5">

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Skill Match</span>
                  <span className="text-orange-400">92%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full">
                  <div className="h-2 w-[92%] bg-gradient-to-r from-orange-400 to-yellow-300 rounded-full"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Analytical Thinking</span>
                  <span className="text-green-400">88%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full">
                  <div className="h-2 w-[88%] bg-gradient-to-r from-green-400 to-emerald-300 rounded-full"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Communication</span>
                  <span className="text-blue-400">85%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full">
                  <div className="h-2 w-[85%] bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Leadership</span>
                  <span className="text-green-400">80%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full">
                  <div className="h-2 w-[80%] bg-gradient-to-r from-green-400 to-emerald-300 rounded-full"></div>
                </div>
              </div>

            </div>
          </div>

          {/* CARD 2 */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 hover:border-indigo-500 transition">

            <div className="flex items-center gap-3 mb-6">
              <div className="bg-indigo-500/20 p-3 rounded-lg">
                <CheckCircle size={22}/>
              </div>
              <h3 className="text-lg font-medium">Key Insights</h3>
            </div>

            <ul className="space-y-4 text-gray-300 text-sm">

              <li className="flex gap-3">
                ⭐ Strong technical background with quantifiable results
              </li>

              <li className="flex gap-3">
                📈 Demonstrates leadership in technical migrations
              </li>

              <li className="flex gap-3">
                ⚛️ Shows deep understanding of React ecosystem
              </li>

            </ul>
          </div>

          {/* CARD 3 */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 hover:border-indigo-500 transition">

            <div className="flex items-center gap-3 mb-6">
              <div className="bg-indigo-500/20 p-3 rounded-lg">
                <MessageSquare size={22}/>
              </div>
              <h3 className="text-lg font-medium">Recommendation</h3>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4 mb-4">
              <p className="text-orange-400 font-medium">
                Strong Match • 89% compatibility
              </p>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed">
              Candidate demonstrates excellent technical skills and communication.
              Recommend proceeding to the technical round with focus on system design.
            </p>

          </div>

        </div>
      </div>
    </section>
  );
};

export default AIThinking;