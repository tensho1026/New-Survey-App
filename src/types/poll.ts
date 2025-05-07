export type Poll = {
  id: string;
  title: string;
  description: string;
  userId: string;
  createdAt: string;
  choices: {
    id: string;
    pollId: string;
    text: string;
    createdAt: string;
  }[];
};
export type PollData = {
  title: string;
  description: string;
  choices: {
    id: string;
    text: string;
  }[];
};

export type PollProps = {
  title: string;
  description: string;
  options: {
    id: string;
    text: string;
    votes?: number;
  }[];
  onVoteSubmit?: (optionId: string) => void;
};
