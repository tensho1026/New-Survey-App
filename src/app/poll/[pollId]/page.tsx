"use client";

import PollForm from "@/components/PollForm";
import PollGraph from "@/components/PollGraph";

import { PollData } from "@/types/poll";
import { Home } from "lucide-react";
import Link from "next/link";

import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function PollPage() {
  const [pollData, setPollData] = useState<PollData>({
    pollId: "",
    title: "",
    description: "",
    choices: [],
  });

  const { pollId } = useParams() as { pollId: string };
  const fetchPoll = useCallback(async () => {
    try {
      const res = await fetch(`/api/getPoll/${pollId}`);
      const data = await res.json();
      setPollData(data);
    } catch (error) {
      console.error("投票データの取得に失敗しました:", error);
    }
  }, [pollId]);

  useEffect(() => {
    fetchPoll();
  }, [fetchPoll]);

  return (
    <div className=' relative container mx-auto py-12 px-4'>
      <div className='absolute top-10 left-12'>
        <Link href='/'>
          <Home size={24} />
        </Link>
      </div>
      <h1 className='text-3xl font-bold text-center mb-8'>投票ページ</h1>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        <div className='order-2 lg:order-1'>
          <PollGraph
            title={pollData.title}
            choices={pollData.choices}
            selectedOption={null}
          />
        </div>

        <div className='order-1 lg:order-2'>
          <PollForm
            pollId={pollId}
            title={pollData.title}
            description={pollData.description}
            choices={pollData.choices}
            onVoted={fetchPoll}
          />
        </div>
      </div>
    </div>
  );
}
