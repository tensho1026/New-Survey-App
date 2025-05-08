"use client";

import { PollCard } from "@/components/PollCard";
import { Poll } from "@/types/poll";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [polls, setPolls] = useState<Poll[]>();

  const handleDeleted = (deletedId: string) => {
    setPolls((prev) => prev?.filter((p) => p.id !== deletedId));
  };

  useEffect(() => {
    const saveUserToDatabase = async () => {
      await fetch("/api/save-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clerkId: user?.id,
          username: user?.fullName,
        }),
      });
    };
    if (isLoaded && isSignedIn && user) {
      saveUserToDatabase();
    }
  }, [user, isLoaded, isSignedIn]);

  useEffect(() => {
    const fetchPolls = async () => {
      const res = await fetch("/api/get-poll");
      const data = await res.json();
      setPolls(data);
    };

    fetchPolls();
  }, []);

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='mx-auto max-w-4xl px-4 py-8'>
        {/* ヘッダー */}
        <div className='mb-8 flex items-center justify-between'>
          <h1 className='text-3xl font-bold'>投票一覧</h1>
          <div className='flex items-center gap-8'>
            <div className='scale-120'>
              <UserButton />
            </div>
            <Link href='/create-poll'>
              <button className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'>
                新規投票作成
              </button>
            </Link>
          </div>
        </div>

        {/* 投票リスト */}
        <div className='space-y-4'>
          {polls?.map((poll) => (
            <PollCard key={poll.id} poll={poll} onDeleted={handleDeleted}/>
          ))}
        </div>
      </div>
    </div>
  );
}
