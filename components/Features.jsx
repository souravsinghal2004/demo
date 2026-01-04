import React from "react";
import { Card } from "./ui/card";
import { Brain, Clock, Shield, BarChart3, Users, Zap } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Driven Interviews",
    description:
      "The AI listens, analyzes, and scores candidate responses instantly with deep NLP understanding.",
  },
  {
    icon: Clock,
    title: "Save Interview Time",
    description:
      "Automate initial rounds so recruiters can focus only on the best-performing candidates.",
  },
  {
    icon: Shield,
    title: "Fair & Unbiased",
    description:
      "All candidates face the same structured questions, ensuring objective evaluations every time.",
  },
  {
    icon: BarChart3,
    title: "Instant Reports",
    description:
      "Both recruiter and candidate receive detailed feedback and performance insights.",
  },
  {
    icon: Users,
    title: "Recruiter Dashboard",
    description:
      "Manage job posts, review AI evaluations, and collaborate with your hiring team in one place.",
  },
  {
    icon: Zap,
    title: "Candidate Experience",
    description:
      "Candidates can take interviews anytime, anywhere — without scheduling delays.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl text-gray-900 mb-4 font-bold">
            Why Choose AI Interview?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Simplify recruitment with intelligent automation that benefits both
            recruiters and candidates.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-shadow border border-gray-200"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
