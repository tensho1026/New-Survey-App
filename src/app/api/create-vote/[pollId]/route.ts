import { Hono } from "hono";
import { prisma } from "@/lib/prisma";

const app = new Hono();

app.post("/api/create-vote/:pollId", async (c) => {
  // const pollId = c.req.param("pollId");
  const body = await c.req.json();
  const { choiceId, userId, pollId } = body;

  const vote = await prisma.vote.create({
    data: {
      userId: userId,
      pollId: pollId,
      choiceId: choiceId,
    },
  });

  return c.json(vote);
});

export async function POST(req: Request) {
  return app.fetch(req);
}
