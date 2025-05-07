import { Poll } from "@/types/poll";
import Link from "next/link";

type Props = {
  poll: Poll;
};

export function PollCard({ poll }: Props) {
  return (
    <div>
      <Link href={`/polls/${poll.id}`} key={poll.id} className='block'>
        <div className='rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:bg-gray-100'>
          <h2 className='text-xl font-semibold'>{poll.title}</h2>
          <p className='text-gray-600'>{poll.description}</p>
        </div>
      </Link>
    </div>
  );
}
