export default function GlassReport() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020617] to-[#0f172a] text-white p-6">
      <div className="grid grid-cols-12 gap-4 max-w-6xl mx-auto">
        <div className="col-span-12 md:col-span-4 bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-3xl">
          <div className="h-40 w-full bg-slate-800 rounded-2xl mb-4 overflow-hidden">
             {/* Profile Image Placeholder */}
             <div className="w-full h-full bg-gradient-to-tr from-blue-900 to-black"></div>
          </div>
          <h2 className="text-2xl font-bold text-center">John Doe</h2>
          <div className="mt-6 space-y-2">
            <button className="w-full py-3 bg-white text-black rounded-xl font-bold">Hire Candidate</button>
            <button className="w-full py-3 bg-white/10 rounded-xl">Hold</button>
          </div>
        </div>

        <div className="col-span-12 md:col-span-8 bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-3xl">
          <h3 className="text-xl mb-6 font-bold">Interview Transcript Analysis</h3>
          <div className="space-y-4">
             {/* Visual Progress Bars */}
             {['Logic', 'Teamwork', 'Speed'].map(skill => (
               <div key={skill}>
                 <div className="flex justify-between text-sm mb-1"><span>{skill}</span><span>85%</span></div>
                 <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                   <div className="h-full bg-blue-500" style={{ width: '85%' }}></div>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}