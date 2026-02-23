import { NextResponse } from "next/server";
import { getQuestionsByJob } from "@/app/lib/csv";

export async function POST(req) {

  const { job } = await req.json();

  const sections = await getQuestionsByJob(job);

  const selectedQuestions = [];

  /* SAFE LOOP */

  for (let i = 1; i <= 5; i++) {

    const arr = sections[i];

    if (!arr || arr.length === 0) {
      console.log(`Section ${i} empty or undefined`);
      continue;
    }

    const randomIndex =
      Math.floor(Math.random() * arr.length);

    const randomQuestion = arr[randomIndex];

    if (randomQuestion) {
      selectedQuestions.push(randomQuestion);
    }

  }

  console.log("Total selected:", selectedQuestions.length);
  console.log("Questions:", selectedQuestions);

  return NextResponse.json({
    questions: selectedQuestions
  });

}