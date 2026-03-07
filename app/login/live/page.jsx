"use client";

import { useRouter, useSearchParams } from "next/navigation";
import useLiveInterview from "@/hooks/useLiveInterview";
import LiveUI from "@/components/interview/LiveUI";

export default function LiveInterviewPage(){

const router=useRouter();
const searchParams=useSearchParams();

const interview=useLiveInterview(router,searchParams);

return <LiveUI {...interview} />

}