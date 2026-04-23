
export default function MinimalistReport() {
  return (
    <div className="min-h-screen bg-[#050505] text-white p-12 flex flex-col items-center">
      <div className="max-w-3xl w-full">
        <div className="flex items-center gap-6 mb-12">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-indigo-900 flex items-center justify-center text-3xl font-bold">JD</div>
          <div>
            <h1 className="text-4xl font-light">John Doe</h1>
            <span className="text-xs tracking-[0.2em] text-slate-500 uppercase">Candidate Evaluation</span>
          </div>
        </div>

        <section className="space-y-12">
          <div className="group">
            <h3 className="text-blue-500 text-sm mb-2 font-mono tracking-widest">01 / STRENGTHS</h3>
            <p className="text-lg text-slate-300 border-l border-slate-800 pl-6 group-hover:border-blue-500 transition-colors">
              Strong architectural thinking and proactive problem solving.
            </p>
          </div>
          <div className="group">
            <h3 className="text-blue-500 text-sm mb-2 font-mono tracking-widest">02 / WEAKNESSES</h3>
            <p className="text-lg text-slate-300 border-l border-slate-800 pl-6 group-hover:border-red-500 transition-colors">
              Limited experience with AWS-specific serverless deployments.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}