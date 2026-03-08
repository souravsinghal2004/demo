"use client";

import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { useSearchParams, useRouter } from "next/navigation";

export default function useLiveInterview() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get job info and candidate name directly from URL
  const jobId = searchParams.get("jobId");
  const title = searchParams.get("title");
  const candidateName = searchParams.get("name"); // fetched from URL
  const candidateRole = "CANDIDATE"; // or you can pass from URL as well

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

  useEffect(() => {
    speechSynthesis.onvoiceschanged = () => {
      speechSynthesis.getVoices();
    };
  }, []);

  /* ================= QUESTIONS ================= */
  async function loadQuestions() {
    if (!jobId || !candidateName) return;

    // Fetch job details from your DB
    const jobRes = await fetch(`/api/jobs/${jobId}`);
    const jobData = await jobRes.json();

    // Start interview by sending candidateName & role
    const res = await fetch("/api/interview/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        job: jobData.title,
        candidateName: candidateName,
        candidateRole: candidateRole,
      }),
    });

    const data = await res.json();

    // Push greeting first
    if (data.greeting) addAI(data.greeting);

    questionsRef.current = data.questions || [];
    askQuestion(0);
  }

  function getIndianMaleVoice() {
    const voices = speechSynthesis.getVoices();

    // Try Indian male voice
    const indianMale = voices.find(
      (v) => v.lang === "en-IN" && v.name.toLowerCase().includes("male")
    );
    if (indianMale) return indianMale;

    // fallback: any Indian voice
    const indian = voices.find((v) => v.lang === "en-IN");
    if (indian) return indian;

    // fallback: english male voice
    const male = voices.find((v) => v.name.toLowerCase().includes("male"));
    if (male) return male;

    // last fallback
    return voices.find((v) => v.lang.startsWith("en")) || voices[0];
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
    const voice = getIndianMaleVoice();
    if (voice) utterance.voice = voice;

    // make voice softer
    utterance.rate = 0.85;
    utterance.pitch = 0.8;
    utterance.volume = 1;

    utterance.onend = () => {
      if (!isEndingRef.current) startRecording();
    };

    setTimeout(() => {
      speechSynthesis.speak(utterance);
    }, 500);
  }

  /* ================= CHAT ================= */
  function addAI(text) {
    setMessages((prev) => [...prev, { sender: "ai", text }]);
  }

  function addUser(text) {
    setMessages((prev) => [...prev, { sender: "user", text }]);
  }

  /* ================= RECORD ================= */
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
      const text = await sendToAPI(blob);
      if (text) addUser(text);
    };

    recorder.start();
  }

  function stopRecording() {
    if (recorderRef.current && recorderRef.current.state !== "inactive") {
      recorderRef.current.stop();
    }
  }

  /* ================= API ================= */
  async function sendToAPI(blob) {
    try {
      setShowPopup(true);
      setTimer(0);

      timerRef.current = setInterval(() => {
        setTimer((t) => +(t + 0.1).toFixed(1));
      }, 100);

      const formData = new FormData();
      formData.append("file", blob);

      const res = await fetch("/api/transcribe", { method: "POST", body: formData });
      const data = await res.json();

      clearInterval(timerRef.current);
      setShowPopup(false);

      const answerText = data.text || "";
      if (!answerText) return "";

    const scoreRes = await fetch("/api/interview/answer", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    question: questionsRef.current[currentQRef.current],
    answer: answerText,

    context: questionsRef.current
      .slice(0, currentQRef.current + 1)
      .map((q, i) => `Q${i + 1}: ${q}`)
      .join("\n"),

    history: questionsRef.current
      .slice(0, currentQRef.current)
      .map((q, i) => `Q${i + 1}: ${q}`)
      .join("\n") + `\nA: ${answerText}`,
  }),
});
      const scoreData = await scoreRes.json();
      addAI(`Score: ${scoreData.score}`);

    scoresRef.current.push(scoreData.score);

// STOP after 6 questions
if (currentQRef.current + 1 >= 6) {
  finishInterview();
  return answerText;
}

if (scoreData.nextQuestion) {
  questionsRef.current.push(scoreData.nextQuestion);
  setTimeout(() => askQuestion(currentQRef.current + 1), 800);
} else {
  finishInterview();
}

      return answerText;
    } catch (err) {
      console.error(err);
      setShowPopup(false);
      clearInterval(timerRef.current);
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
      body: JSON.stringify({ scores: scoresRef.current }),
    });

    const data = await res.json();
    addAI(`Final Score: ${Number(data.finalScore).toFixed(2)}/10`);
  }

  /* ================= MEDIA ================= */
  async function initMedia() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    streamRef.current = stream;

    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }

  async function loadModels() {
    await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
  }

  async function detectFace() {
    if (!videoRef.current) return;

    const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions());

    if (videoContainerRef.current) {
      videoContainerRef.current.style.border = detections.length ? "5px solid green" : "5px solid red";
    }

    requestAnimationFrame(detectFace);
  }

  /* ================= CLEANUP ================= */
  function cleanup() {
    clearInterval(timerRef.current);
    stopRecording();

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
  }

  function endInterview() {
    isEndingRef.current = true;
    cleanup();
    router.push("/");
  }

  return {
    messages,
    recording,
    showPopup,
    timer,
    videoRef,
    videoContainerRef,
    stopRecording,
    endInterview,
  };
}