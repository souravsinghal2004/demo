"use client";

import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { useSearchParams } from "next/navigation";

export default function useLiveInterview() {
  const startedRef = useRef(false);
  const searchParams = useSearchParams();

  const jobId = searchParams.get("jobId");
  const title = searchParams.get("title");
  const candidateName = searchParams.get("name");

  const [messages, setMessages] = useState([]);
  const [recording, setRecording] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [averageScore, setAverageScore] = useState(0);

  const streamRef = useRef(null);
  const recorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);
  const [setupPopup, setSetupPopup] = useState(true);

  const isEndingRef = useRef(false);
  const currentQRef = useRef(0); // Track number of questions
  const scoresRef = useRef([]);   // Track scores
  const [processing, setProcessing] = useState(false);
  const voiceRef = useRef(null);

  const MAX_QUESTIONS = 4; // n = 2

  /* ================= INIT ================= */
  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    initMedia();
    loadModels();
    detectFace();
    startInterview();
  }, []);


  useEffect(() => {
  function loadVoices() {
    const voices = speechSynthesis.getVoices();

    voiceRef.current =
      voices.find(v => v.name.includes("David")) ||   // Windows male
      voices.find(v => v.name.includes("Google UK English Male")) || // Chrome male
      voices.find(v => v.lang === "en-US");

  }

  loadVoices();
  speechSynthesis.onvoiceschanged = loadVoices;
}, []);

  /* ================= CHAT ================= */
  function addAI(text) {
    setMessages((prev) => [...prev, { sender: "ai", text }]);
    speak(text);
  }

  function addUser(text) {
    setMessages((prev) => [...prev, { sender: "user", text }]);
  }

  /* ================= SPEECH ================= */
function speak(text) {
  speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);

  if (voiceRef.current) {
    utterance.voice = voiceRef.current;
  }

  utterance.rate = 0.9;
  utterance.pitch = 1;

  utterance.onend = () => {
    if (!isEndingRef.current) startRecording();
  };

  speechSynthesis.speak(utterance);
}

  /* ================= START INTERVIEW ================= */
  async function startInterview() {
   const systemPrompt = `
You are a professional technical interviewer.

Interview Flow:
1. Greet the candidate and ask them to introduce themselves.
2. Ask ONE technical question at a time based on the job role: "${title}".
3. After each answer:
   - evaluate internally and give a score out of 10
   - do NOT explain the candidate's answer
   - ask only the next question
4. Ask a total of ${MAX_QUESTIONS} technical questions.
5. If candidate says "I don't know", move to another question.
6. Keep the interview conversational and natural.
7. When finished, respond exactly: INTERVIEW_COMPLETE
`;

  const res = await fetch("/api/interview/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ candidateName, jobTitle: title, systemPrompt }),
  });

  const data = await res.json();

  addAI(data.message);

  // hide setup popup after AI greeting
  setSetupPopup(false);
}

  /* ================= RECORDING ================= */
  function startRecording() {
    if (!streamRef.current) return;

    audioChunksRef.current = [];
    const audioStream = new MediaStream(streamRef.current.getAudioTracks());
    const recorder = new MediaRecorder(audioStream);

    recorderRef.current = recorder;

    recorder.onstart = () => setRecording(true);

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) audioChunksRef.current.push(e.data);
    };

    recorder.onstop = async () => {
      setRecording(false);
      const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
      const text = await transcribe(blob);

      if (text) {
        addUser(text);
        await sendToAI(text);
      }
    };

    recorder.start();
  }

  function stopRecording() {
  if (recorderRef.current && recorderRef.current.state !== "inactive") {
    setProcessing(true); // show popup
    recorderRef.current.stop();
  }
}

  /* ================= TRANSCRIBE ================= */
  async function transcribe(blob) {
    const formData = new FormData();
    formData.append("file", blob);

    const res = await fetch("/api/transcribe", { method: "POST", body: formData });
    const data = await res.json();

    return data.text || "";
  }

  /* ================= SEND TO AI ================= */
 async function sendToAI(text) {
  const res = await fetch("/api/interview/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userMessage: text }),
  });

  const data = await res.json();
  const reply = data.message;

  setProcessing(false); // hide popup when AI ready

  addAI(reply);

  currentQRef.current += 1;

  if (
    currentQRef.current >= MAX_QUESTIONS ||
    reply.includes("INTERVIEW_COMPLETE")
  ) {
    finishInterview();
  }
}

  /* ================= FINISH ================= */
  function finishInterview() {
    if (isEndingRef.current) return;
    isEndingRef.current = true;

    stopRecording();

    // Compute average score
    const totalScore = scoresRef.current.reduce((acc, s) => acc + s, 0);
    const avgScore = scoresRef.current.length
      ? totalScore / scoresRef.current.length
      : 0;

    setAverageScore(avgScore);
    setShowResult(true);

    addAI("Thank you. The interview is now complete.");
  }

  /* ================= MEDIA ================= */
  async function initMedia() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    streamRef.current = stream;
    if (videoRef.current) videoRef.current.srcObject = stream;
  }

  /* ================= FACE DETECTION ================= */
  async function loadModels() {
    await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
  }

  async function detectFace() {
    if (!videoRef.current) return;
    const detections = await faceapi.detectAllFaces(
      videoRef.current,
      new faceapi.TinyFaceDetectorOptions()
    );

    if (videoContainerRef.current) {
      videoContainerRef.current.style.border = detections.length
        ? "5px solid green"
        : "5px solid red";
    }

    requestAnimationFrame(detectFace);
  }

  return {
    messages,
    recording,
    videoRef,
    videoContainerRef,
    stopRecording,
    showResult,
    averageScore,
    setShowResult,
    setupPopup, 
      processing,
      title,
  };
}