"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect } from "react";

const polls = [
  {
    id: 1,
    title: "次回の社内イベントについて",
    description: "次回の社内イベントのテーマを決めるための投票です。",
  },
  {
    id: 2,
    title: "新しいオフィスの場所",
    description: "新しいオフィスの候補地について意見を募集しています。",
  },
  {
    id: 3,
    title: "リモートワークポリシー",
    description: "今後のリモートワークポリシーについての意見を集めています。",
  },
  {
    id: 4,
    title: "社内ツールの選定",
    description: "新しい社内コミュニケーションツールの選定に関する投票です。",
  },
  {
    id: 5,
    title: "福利厚生の改善案",
    description: "福利厚生の改善案についてのアイデアを募集しています。",
  },
];

export default function Home() {
  const { user, isLoaded, isSignedIn } = useUser();

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
          {polls.map((poll) => (
            <Link href={`/polls/${poll.id}`} key={poll.id} className='block'>
              <div className='rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:bg-gray-100'>
                <h2 className='text-xl font-semibold'>{poll.title}</h2>
                <p className='text-gray-600'>{poll.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
