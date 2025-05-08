"use client";

import Link from "next/link";
import { Home } from "lucide-react";
import CreatePolls from "@/components/CreatePolls";

function CreatePoll() {
  return (
    <div className='max-w-2xl mx-auto py-8 px-4 relative'>
      <div className='absolute top-10 right-12'>
        <Link href='/'>
          <Home size={24} />
        </Link>
      </div>
      <h1 className='text-2xl font-bold mb-6'>新しい投票を作成</h1>

      <CreatePolls />
    </div>
  );
}

export default CreatePoll;
