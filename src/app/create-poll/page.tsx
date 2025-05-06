"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreatePollInput, createPollSchema } from "@/lib/poll";
import { useUser } from "@clerk/nextjs";

function CreatePoll() {
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreatePollInput>({
    resolver: zodResolver(createPollSchema),
    defaultValues: {
      title: "",
      description: "",
      options: [{ value: "" }, { value: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  const onSubmit = async (data: CreatePollInput) => {
    // ここで投票作成のロジックを実装（APIリクエストなど）
    await fetch("/api/create-poll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        clerkId: user?.id,
      }),
    });
    reset()
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
      <div className='max-w-2xl mx-auto py-8 px-4'>
        <h1 className='text-2xl font-bold mb-6'>新しい投票を作成</h1>

        <div className='space-y-2'>
          <label htmlFor='title' className='block font-medium'>
            タイトル
          </label>
          <input
            {...register("title")}
            className='w-full px-3 py-2 border border-gray-300 rounded-md'
            placeholder='投票のタイトルを入力'
          />
          {errors.title && (
            <p className='text-sm text-red-500'>{errors.title.message}</p>
          )}
        </div>

        <div className='space-y-2'>
          <label htmlFor='description' className='block font-medium'>
            説明
          </label>
          <textarea
            {...register("description")}
            className='w-full px-3 py-2 border border-gray-300 rounded-md'
            placeholder='投票の説明を入力'
            rows={4}
          />
          {errors.description && (
            <p className='text-sm text-red-500'>{errors.description.message}</p>
          )}
        </div>

        <div className='space-y-4'>
          <label className='block font-medium'>選択肢</label>

          {fields.map((field, index) => (
            <div key={field.id} className='space-y-2'>
              <label className='block text-sm text-gray-600'>
                選択肢 {index + 1}
              </label>
              <div className='flex gap-2'>
                <input
                  {...register(`options.${index}.value`)}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md'
                  placeholder={`選択肢 ${index + 1}`}
                />
                {errors.options?.[index]?.value?.message && (
                  <p className='text-sm text-red-500'>
                    {errors.options[index]?.value?.message}
                  </p>
                )}
                {fields.length > 2 && (
                  <button
                    type='button'
                    onClick={() => remove(index)}
                    className='text-red-500 hover:underline text-sm whitespace-nowrap'
                  >
                    削除
                  </button>
                )}
              </div>
            </div>
          ))}

          <button
            type='button'
            onClick={() => append({ value: "" })}
            className='flex items-center text-blue-500 hover:text-blue-700'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5 mr-1'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z'
                clipRule='evenodd'
              />
            </svg>
            選択肢を追加
          </button>
        </div>

        <div className='pt-4'>
          <button
            type='submit'
            className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'
          >
            投票を作成
          </button>
        </div>
      </div>
    </form>
  );
}

export default CreatePoll;
