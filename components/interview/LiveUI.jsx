"use client";

export default function LiveUI({
  messages,
  videoRef,
  videoContainerRef,
  showPopup,
  timer,
  stopRecording,
  endInterview
}) {

return (

<div className="min-h-screen bg-gradient-to-br from-slate-900 to-black text-white p-6">

{/* HEADER */}

<div className="flex justify-between items-center mb-6">

<h1 className="text-2xl font-bold">
AI Live Interview
</h1>

<div className="text-sm opacity-70">
Stay focused on camera
</div>

</div>


{/* TOP SECTION */}

<div className="grid lg:grid-cols-3 gap-6 mb-6">

{/* AI VIDEO */}

<div className="bg-slate-800/40 backdrop-blur rounded-2xl p-6 flex flex-col items-center justify-center shadow-xl">

<img
src="/ai-avatar.png"
className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-lg mb-4"
/>

<h2 className="text-lg font-semibold">
AI Interviewer
</h2>

<p className="text-sm opacity-70 mt-2 text-center">
Listening to your answer
</p>

</div>


{/* USER VIDEO */}

<div
ref={videoContainerRef}
className="relative rounded-2xl overflow-hidden border-4 border-red-500 shadow-xl bg-black flex items-center justify-center"
>

<video
ref={videoRef}
autoPlay
muted
playsInline
className="w-full h-full object-cover scale-x-[-1]"
/>

<div className="absolute bottom-3 right-3 bg-black/60 px-3 py-1 rounded text-sm">
You
</div>

</div>


{/* CONTROLS */}

<div className="bg-slate-800/40 backdrop-blur rounded-2xl p-6 flex flex-col justify-center items-center shadow-xl space-y-4">

<button
onClick={stopRecording}
className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 rounded-xl font-semibold transition"
>
Submit Answer
</button>

<button
onClick={endInterview}
className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 rounded-xl font-semibold transition"
>
End Interview
</button>

</div>

</div>


{/* CHAT AREA */}

<div className="bg-slate-800/40 backdrop-blur rounded-2xl p-6 shadow-xl h-[40vh] flex flex-col">

<h2 className="mb-4 text-lg font-semibold">
Interview Chat
</h2>

<div className="flex-1 overflow-y-auto space-y-3 pr-2">

{messages.map((m, i) => (

<div
key={i}
className={`p-3 rounded-lg text-sm max-w-[70%] ${
m.sender === "ai"
? "bg-blue-600 self-start"
: "bg-green-600 self-end ml-auto"
}`}
>

{m.sender === "ai" ? "🤖 " : "🧑 "}
{m.text}

</div>

))}

</div>

</div>


{/* PROCESSING POPUP */}

{showPopup && (

<div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">

<div className="bg-slate-800 p-8 rounded-xl text-center shadow-xl">

<p className="text-lg font-semibold mb-2">
Processing Response
</p>

<p className="text-sm opacity-70">
{timer}s
</p>

</div>

</div>

)}

</div>

);

}