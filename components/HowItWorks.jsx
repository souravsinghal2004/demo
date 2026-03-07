import React from "react";
import { Card } from "./ui/card";
import { Upload, MessageSquare, BarChart, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "Create Your Interview",
    description:
      "Upload job description and customize questions. Our AI suggests relevant questions based on the role.",
  },
  {
    icon: MessageSquare,
    step: "02",
    title: "Invite Candidates",
    description:
      "Send interview links to candidates. They can complete interviews at their convenience, 24/7.",
  },
  {
    icon: BarChart,
    step: "03",
    title: "AI Analysis",
    description:
      "Our AI evaluates responses, assesses skills, and provides comprehensive scoring and insights.",
  },
  {
    icon: CheckCircle,
    step: "04",
    title: "Make Better Decisions",
    description:
      "Review detailed reports, compare candidates side-by-side, and select the best talent.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 px-6 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>

          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Get started in minutes and transform your hiring process
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {steps.map((step, index) => {

            const Icon = step.icon;

            return (
              <div key={index} className="relative">

                {/* connecting line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-[2px] bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-500 -ml-4"></div>
                )}

                <Card className="p-8 text-center relative z-10 bg-white/50 backdrop-blur border border-white/40 shadow-lg rounded-2xl">

                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-2xl mb-5 shadow-md">

                    <Icon className="w-8 h-8 text-white" />

                  </div>

                  <div className="text-sm font-semibold text-indigo-600 mb-2">
                    Step {step.step}
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>

                </Card>

              </div>
            );

          })}

        </div>

      </div>
    </section>
  );
}