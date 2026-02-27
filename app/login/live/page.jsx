"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import * as faceapi from "face-api.js";
import { useSearchParams } from "next/navigation";
export default function LiveInterviewPage() {

const router = useRouter();
const searchParams = useSearchParams();
const jobId = searchParams.get("jobId");

const jobTitle = searchParams.get("title");
const [messages, setMessages] = useState([]);
const [recording, setRecording] = useState(false);
const [showPopup, setShowPopup] = useState(false);
const [timer, setTimer] = useState(0);

const questionsRef = useRef([]);
const currentQRef = useRef(0);
const scoresRef = useRef([]);
const streamRef = useRef(null);
const recorderRef = useRef(null);
const audioChunksRef = useRef([]);
const timerRef = useRef(null);
const videoRef = useRef(null);
const videoContainerRef = useRef(null);
const isEndingRef = useRef(false);


/* ================= INIT ================= */

function formatTitleToFileName(title) {
  return title
    ?.toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]/g, "");
}

useEffect(() => {

let mounted = true;

(async () => {

await initMedia();
if (!mounted) return;

await loadModels();
await loadQuestions();
detectFace();

})();

return () => {
mounted = false;
cleanup();
};

}, []);


/* ================= LOAD QUESTIONS ================= */

async function loadQuestions() {

  if (!jobId) {
    console.error("No jobId found in URL");
    return;
  }

  // Fetch job from DB using jobId
  const jobRes = await fetch(`/api/jobs/${jobId}`);
  const jobData = await jobRes.json();

  const actualTitle = jobData.title;

  if (!actualTitle) {
    console.error("Job title not found in DB");
    return;
  }

  const res = await fetch("/api/interview/start", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ job: actualTitle }),
  });

  const data = await res.json();

  questionsRef.current = data.questions || [];

  askQuestion(0);
}

function askQuestion(index) {

if (isEndingRef.current) return;

if (!questionsRef.current[index]) {
finishInterview();
return;
}

currentQRef.current = index;

const question = questionsRef.current[index];

addAI(question);

speechSynthesis.cancel();

const utterance = new SpeechSynthesisUtterance(question);

utterance.onend = () => {
if (!isEndingRef.current) {
startRecording();
}
};

speechSynthesis.speak(utterance);

}


/* ================= CHAT ================= */

function addAI(text) {
setMessages(prev => [...prev, { sender: "ai", text }]);
}

function addUser(text) {
setMessages(prev => [...prev, { sender: "user", text }]);
}


/* ================= RECORD ================= */

function startRecording() {

if (!streamRef.current) return;

audioChunksRef.current = [];

const audioStream = new MediaStream(
streamRef.current.getAudioTracks()
);

const recorder = new MediaRecorder(audioStream);

recorderRef.current = recorder;

recorder.onstart = () => setRecording(true);

recorder.ondataavailable = (e) => {
if (e.data.size > 0)
audioChunksRef.current.push(e.data);
};

recorder.onstop = async () => {

setRecording(false);

const blob = new Blob(audioChunksRef.current, {
type: "audio/webm"
});

if (blob.size < 1500 && !isEndingRef.current) {
startRecording();
return;
}

const text = await sendToAPI(blob);

if (text) addUser(text);

};

recorder.start();

}

function stopRecording() {
if (recorderRef.current &&
recorderRef.current.state !== "inactive") {
recorderRef.current.stop();
}
}


/* ================= API FLOW ================= */

async function sendToAPI(blob) {

try {

setShowPopup(true);
setTimer(0);

timerRef.current = setInterval(() => {
setTimer(t => +(t + 0.1).toFixed(1));
}, 100);

/* ---------- TRANSCRIBE ---------- */

const formData = new FormData();
formData.append("file", blob);

const res = await fetch("/api/transcribe", {
method: "POST",
body: formData
});

const data = await res.json();

clearInterval(timerRef.current);
setShowPopup(false);

const answerText = data.text || "";

if (!answerText) return "";

/* ---------- SCORE ---------- */

const scoreRes = await fetch("/api/interview/answer", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({
question: questionsRef.current[currentQRef.current],
answer: answerText
})
});

const scoreData = await scoreRes.json();

/* SAFE SCORE EXTRACTION */

let numericScore = 0;

if (typeof scoreData.score === "number") {
numericScore = scoreData.score;
}
else if (typeof scoreData.score === "string") {
numericScore = parseFloat(scoreData.score);
}
else if (typeof scoreData.score === "object") {
numericScore =
scoreData.score.value ||
scoreData.score.score ||
Object.values(scoreData.score)[0] ||
0;
}

numericScore = Number(numericScore) || 0;

scoresRef.current.push(numericScore);

addAI(`Score: ${numericScore}/10`);

/* ---------- NEXT QUESTION ---------- */

const nextIndex = currentQRef.current + 1;

console.log("Next:", nextIndex, "Total:", questionsRef.current.length);

if (nextIndex < questionsRef.current.length) {

setTimeout(() => {
askQuestion(nextIndex);
}, 800);

}
else {

finishInterview();

}

return answerText;

}
catch (err) {

console.error(err);
clearInterval(timerRef.current);
setShowPopup(false);
return "";

}

}


/* ================= FINISH ================= */

async function finishInterview() {

if (isEndingRef.current) return;

isEndingRef.current = true;

stopRecording();

const res = await fetch("/api/interview/finish", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({
scores: scoresRef.current
}),
});

const data = await res.json();

addAI(`Final Score: ${Number(data.finalScore).toFixed(2)}/10`);

speechSynthesis.cancel();

const utterance = new SpeechSynthesisUtterance(
`Your final score is ${Number(data.finalScore).toFixed(2)}`
);

speechSynthesis.speak(utterance);

}


/* ================= MEDIA ================= */

async function initMedia() {

const stream =
await navigator.mediaDevices.getUserMedia({
video: true,
audio: true
});

streamRef.current = stream;

if (videoRef.current) {
videoRef.current.srcObject = stream;
}

}

async function loadModels() {
await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
}

async function detectFace() {

if (!videoRef.current || isEndingRef.current) return;

const detections =
await faceapi.detectAllFaces(
videoRef.current,
new faceapi.TinyFaceDetectorOptions()
);

if (videoContainerRef.current) {
videoContainerRef.current.style.border =
detections.length
? "5px solid green"
: "5px solid red";
}

requestAnimationFrame(detectFace);

}


/* ================= CLEANUP ================= */

function cleanup() {

clearInterval(timerRef.current);

stopRecording();

if (streamRef.current) {
streamRef.current.getTracks()
.forEach(track => track.stop());
}

}

function endInterview() {

isEndingRef.current = true;

cleanup();

router.push("/");

}


/* ================= UI ================= */

return (

<div className="h-screen bg-black text-white p-6 flex flex-col">

<h1 className="text-xl mb-4">
Live Interview
</h1>

<div className="grid md:grid-cols-3 gap-6 flex-1">

<div className="border rounded-xl p-4 flex flex-col items-center justify-center">

<img src="/ai-avatar.png"
className="w-40 h-40 mb-4"
/>

<p>AI Interviewer</p>

</div>

<div
ref={videoContainerRef}
className="border-4 rounded-xl p-2"
>

<video
ref={videoRef}
autoPlay
muted
playsInline
className="w-full h-full"
/>

</div>

<div className="border rounded-xl p-4 flex flex-col">

<div className="flex-1 overflow-y-auto space-y-2">

{messages.map((m, i) => (
<div key={i}>
{m.sender === "ai" ? "🤖 " : "🧑 "}
{m.text}
</div>
))}

</div>

</div>

</div>

<div className="mt-4 flex justify-between">

<button
onClick={endInterview}
className="bg-red-600 px-4 py-2 rounded"
>
End
</button>

<button
onClick={stopRecording}
className="bg-green-600 px-4 py-2 rounded"
>
Submit Audio
</button>

</div>

{showPopup && (
<div className="fixed inset-0 bg-black/70 flex items-center justify-center">
Processing… {timer}s
</div>
)}

</div>

);

}