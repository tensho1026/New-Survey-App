"use client";
import { Poll } from "@/types/poll";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

type Props = {
  poll: Poll;
  onDeleted?: (pollId: string) => void;
};

export function PollCard({ poll, onDeleted }: Props) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const handleDelete = async (
    pollId: string,
    onDeleted?: (id: string) => void
  ) => {
    try {
      await fetch(`/api/delete-poll/${pollId}`, {
        method: "DELETE",
      });
      onDeleted?.(pollId);
    } catch (error) {
      console.log(error);
    }
  };
  const { user } = useUser();
  return (
    <div className='relative'>
      <Link href={`/poll/${poll.id}`} key={poll.id} className='block'>
        <div className='rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:bg-gray-100'>
          <h2 className='text-xl font-semibold'>{poll.title}</h2>
          <p className='text-gray-600'>{poll.description}</p>
        </div>
      </Link>
      {user?.id === poll.userId && (
        <>
          <Button
            variant='ghost'
            size='icon'
            className=' absolute right-2 top-2 h-8 w-8 rounded-full bg-white/80 p-1 text-gray-500 hover:bg-red-100 hover:text-red-600'
            onClick={() =>  setIsConfirmOpen(true)}
          >
            <Trash2 className='h-4 w-4' />
          </Button>
          <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
            <DialogContent className='sm:max-w-md'>
              <DialogHeader>
                <DialogTitle>削除の確認</DialogTitle>
                <DialogDescription>
                  本当にこの投票を削除しますか？この操作は元に戻せません。
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className='flex flex-row justify-end gap-2 sm:justify-end'>
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => setIsConfirmOpen(false)}
                >
                  キャンセル
                </Button>
                <Button
                  type='button'
                  variant='destructive'
                  onClick={() => handleDelete(poll.id, onDeleted)}
                >
                  削除する
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
}
