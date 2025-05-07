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
import { PollProps } from "@/types/poll";

export default function PollForm({
  title,
  description,
  options,
  onVoteSubmit,
}: PollProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = () => {
    if (!selectedOption) return;
    if (onVoteSubmit) {
      onVoteSubmit(selectedOption);
    }
    setHasVoted(true);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {!hasVoted ? (
          <RadioGroup
            value={selectedOption || ""}
            onValueChange={setSelectedOption}
            className="space-y-3"
          >
            {options.map((option) => (
              <div
                key={option.id}
                className={`flex items-center space-x-2 rounded-lg border p-4 transition-colors ${
                  selectedOption === option.id
                    ? "border-primary bg-primary/5"
                    : ""
                }`}
              >
                <RadioGroupItem
                  value={option.id}
                  id={option.id}
                  className="mr-2"
                />
                <Label
                  htmlFor={option.id}
                  className="flex-grow cursor-pointer font-medium"
                >
                  {option.text}
                </Label>
              </div>
            ))}
          </RadioGroup>
        ) : (
          <p className="text-center text-muted-foreground py-4">
            投票ありがとうございました！
          </p>
        )}
      </CardContent>
      <CardFooter>
        {!hasVoted ? (
          <Button
            onClick={handleVote}
            disabled={!selectedOption}
            className="w-full"
          >
            投票する
          </Button>
        ) : (
          <Button
            variant="outline"
            onClick={() => setHasVoted(false)}
            className="w-full"
          >
            戻る
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
