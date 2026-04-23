export default function TerminalReport() {
  return (
    <div className="min-h-screen bg-[#000000] font-mono p-4 text-green-500">
      <div className="border border-green-900 rounded-lg p-6 max-w-4xl mx-auto shadow-[0_0_30px_rgba(0,50,0,0.3)]">
        <div className="flex items-center gap-2 mb-6 border-b border-green-900 pb-2 text-xs opacity-50">
          <span>REPORT_V3.0.SYS</span>
          <span>LOCATION: US-EAST-1</span>
        </div>
        
        <pre className="text-xs md:text-sm leading-tight mb-8">
{`
> INITIALIZING CANDIDATE SCAN...
> NAME: John Doe
> POSITION: Sr. Engineer
> STATUS: [ HIGHLY RECOMMENDED ]
`}
        </pre>

        <div className="space-y-6">
          <div className="bg-green-950/20 p-4 border-l-2 border-green-500">
            <h4 className="text-white mb-2 underline">// INTERVIEWER_NOTES</h4>
            <p className="text-green-400">"The candidate solved the graph traversal problem in O(V+E) time without hesitation..."</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-green-900 p-4">
              <span className="block text-white text-xs underline mb-2">RAW_METRICS</span>
              <p>SPEED: 0.4s</p>
              <p>CLEAN_CODE: 9.8</p>
            </div>
            <div className="border border-green-900 p-4">
              <span className="block text-white text-xs underline mb-2">FINAL_VERDICT</span>
              <p className="text-2xl font-bold text-white">L6_HIRE</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}