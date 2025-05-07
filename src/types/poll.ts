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