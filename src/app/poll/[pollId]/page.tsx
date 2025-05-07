"use client";

import PollForm from "@/components/PollForm";
import { PollData } from "@/types/poll";
// import PollGraph from "@/components/PollGraph";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PollPage() {
  const [pollData, setPollData] = useState<PollData>({
    title: "",
    description: "",
    choices: [],
  });

  const params = useParams();
  const pollId = params?.pollId as string;

  useEffect(() => {
    const fetchPoll = async () => {
      const res = await fetch(`/api/getPoll/${pollId}`);
      const data = await res.json();
      console.log(data);
      setPollData(data);
    };
    fetchPoll();
  }, [pollId]);

  return (
    <div className='container mx-auto py-12 px-4'>
      <h1 className='text-3xl font-bold text-center mb-8'>投票ページ</h1>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        {/* <div className='order-2 lg:order-1'> */}
        {/* <PollGraph
            title={pollData.title}
            options={pollData.options}
            selectedOption={selectedOption}
          />
        </div> */}

        <div className='order-1 lg:order-2'>
          <PollForm
            title={pollData.title}
            description={pollData.description}
            options={pollData.choices.map((c) => ({
              ...c,
              votes: 0,
            }))}
          />
        </div>
      </div>
    </div>
  );
}
