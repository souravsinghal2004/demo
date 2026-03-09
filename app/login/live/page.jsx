"use client";

export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useLiveInterview from "@/hooks/useLiveInterview";
import LiveUI from "@/components/interview/LiveUI";

function LiveInterviewContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Updated hook to include showResult and averageScore
  const interview = useLiveInterview(router, searchParams);

  return (
    <LiveUI
      {...interview} // spread all returned hook values
    />
  );
}

export default function LiveInterviewPage() {
  return (
    <Suspense fallback={<div className="p-10">Loading interview...</div>}>
      <LiveInterviewContent />
    </Suspense>
  );
}