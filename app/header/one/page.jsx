import React from 'react';
import { TrendingUp, User, Award, MessageSquare } from 'lucide-react';

export default function CandidateReport() {
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-slate-200 p-8">
      <header className="flex justify-between items-center border-b border-slate-800 pb-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">John Doe</h1>
          <p className="text-blue-400 font-medium">Senior Software Engineer | Interview ID: #8821</p>
        </div>
        <div className="bg-blue-600 px-6 py-2 rounded-full font-bold">Score: 92/100</div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Metric Cards */}
        {[
          { label: 'Technical Proficiency', val: '95%', icon: <Award /> },
          { label: 'Communication', val: '88%', icon: <MessageSquare /> },
          { label: 'Cultural Fit', val: '90%', icon: <User /> }
        ].map((item, i) => (
          <div key={i} className="bg-[#111827] border border-slate-800 p-6 rounded-xl">
            <div className="text-blue-500 mb-2">{item.icon}</div>
            <p className="text-slate-400 text-sm uppercase">{item.label}</p>
            <p className="text-2xl font-bold text-white">{item.val}</p>
          </div>
        ))}

        {/* Detailed Feedback */}
        <div className="md:col-span-3 bg-[#111827] border border-slate-800 p-8 rounded-2xl">
          <h2 className="text-xl font-semibold mb-4 text-white">Interview Summary</h2>
          <p className="leading-relaxed text-slate-400">
            John demonstrated exceptional depth in distributed systems...
          </p>
        </div>
      </div>
    </div>
  );
}