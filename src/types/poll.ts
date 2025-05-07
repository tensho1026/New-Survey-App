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
  pollId:string
  title: string;
  description: string;
  choices: {
    id: string;
    text: string;
  }[];
};

