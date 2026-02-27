import { NextResponse } from "next/server";
import { getQuestionsByJob } from "@/app/lib/csv";

export async function POST(req) {
  try {
    const body = await req.json();   // ✅ read request body
    const { job } = body;            // ✅ extract job

    if (!job) {
      return NextResponse.json(
        { error: "Job title missing" },
        { status: 400 }
      );
    }

    const formattedJob = job
      .toLowerCase()
      .replace(/\s+/g, "_");

    console.log("Job received:", job);
    console.log("Formatted:", formattedJob);

    const sections = await getQuestionsByJob(formattedJob);

    const selectedQuestions = [];

    for (let i = 1; i <= 5; i++) {
      const arr = sections[i];

      if (!arr || arr.length === 0) {
        console.log(`Section ${i} empty`);
        continue;
      }

      const randomIndex =
        Math.floor(Math.random() * arr.length);

      selectedQuestions.push(arr[randomIndex]);
    }

    console.log("Total selected:", selectedQuestions.length);

    return NextResponse.json({
      questions: selectedQuestions
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to start interview" },
      { status: 500 }
    );
  }
}