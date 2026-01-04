import React from "react";
import { Card } from "./ui/card";
import { Upload, MessageSquare, BarChart, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "Create Your Interview",
    description: "Upload job description and customize questions. Our AI suggests relevant questions based on the role.",
  },
  {
    icon: MessageSquare,
    step: "02",
    title: "Invite Candidates",
    description: "Send interview links to candidates. They can complete interviews at their convenience, 24/7.",
  },
  {
    icon: BarChart,
    step: "03",
    title: "AI Analysis",
    description: "Our AI evaluates responses, assesses skills, and provides comprehensive scoring and insights.",
  },
  {
    icon: CheckCircle,
    step: "04",
    title: "Make Better Decisions",
    description: "Review detailed reports, compare candidates side-by-side, and select the best talent.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get started in minutes and transform your hiring process
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-blue-200 to-transparent -ml-4" />
                )}
                <Card className="p-6 text-center relative z-10 bg-white border border-gray-200">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg blue-600 to-purple-600 rounded-2xl mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-sm text-blue-600 mb-2">Step {step.step}</div>
                  <h3 className="text-xl text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
