"use client"

import { motion } from "framer-motion"

export default function Walkthrough() {
  return (
    <section className="py-28 px-6">

      <div className="max-w-6xl mx-auto text-center">

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold"
        >
          Platform Walkthrough
        </motion.h2>

        <p className="text-gray-400 mt-4 max-w-xl mx-auto">
          See how our AI interviewer platform works in real-time and how
          it helps evaluate candidates efficiently.
        </p>

        {/* Video Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-14 relative"
        >

          <div className="bg-[#111827] rounded-xl p-4 shadow-xl">

            {/* Dashboard Preview */}
            <div className="relative rounded-lg overflow-hidden">

              <img
                src="/dashboard-preview.png"
                alt="Platform Walkthrough"
                className="w-full rounded-lg"
              />

              {/* Play Button */}
              <button className="absolute inset-0 flex items-center justify-center">

                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white text-2xl">
                  ▶
                </div>

              </button>

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  )
}