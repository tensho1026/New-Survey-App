"use client";

import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PollData } from "@/types/poll";
import { useUser } from "@clerk/nextjs";

export default function PollForm({
  pollId,
  title,
  description,
  choices,
}: PollData) {
  const [hasVoted, setHasVoted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const { user } = useUser();

  const handleSubmit = async () => {
    await fetch(`/api/create-vote/${pollId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pollId,
        choiceId: selectedOption,
        userId: user?.id,
      }),
    });

    setHasVoted(true);
  };

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle className='text-2xl'>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {!hasVoted ? (
          <RadioGroup
            value={selectedOption || ""}
            onValueChange={setSelectedOption}
            className='space-y-3'
          >
            {choices.map((choice) => (
              <div
                key={choice.id}
                className={`flex items-center space-x-2 rounded-lg border p-4 transition-colors ${
                  selectedOption === choice.id
                    ? "border-primary bg-primary/5"
                    : ""
                }`}
              >
                <RadioGroupItem
                  value={choice.id}
                  id={choice.id}
                  className='mr-2'
                />
                <Label
                  htmlFor={choice.id}
                  className='flex-grow cursor-pointer font-medium'
                >
                  {choice.text}
                </Label>
              </div>
            ))}
          </RadioGroup>
        ) : (
          <p className='text-center text-muted-foreground py-4'>
            投票ありがとうございました！
          </p>
        )}
      </CardContent>
      <CardFooter>
        {!hasVoted ? (
          <Button
            disabled={!selectedOption}
            className='w-full'
            onClick={() => handleSubmit()}
          >
            投票する
          </Button>
        ) : null}
      </CardFooter>
    </Card>
  );
}
