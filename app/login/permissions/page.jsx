import { Suspense } from "react";
import InterviewSetup from "./InterviewSetup";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-10">Loading interview setup...</div>}>
      <InterviewSetup />
    </Suspense>
  );
}