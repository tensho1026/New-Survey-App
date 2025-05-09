import { Hono } from "hono";
import { prisma } from "@/lib/prisma";

const app = new Hono();

app.get("/api/getPoll/:pollId", async (c) => {
  const pollId = c.req.param("pollId");
  const userId = c.req.query("userId");


  const existingPoll = await prisma.vote.findFirst({
    where: {
      pollId: pollId,
      userId: userId,
    },
  });
  const poll = await prisma.poll.findUnique({
    where: { id: pollId },
    include: {
      choices: {
        orderBy: {
          createdAt: "asc",
        },
        include: {
          _count: {
            select: { votes: true },
          },
        },
      },

      _count: {
        select: { votes: true },
      },
    },
  });
  if (!poll) {
    return c.json({ error: "Poll not found" }, 404);
  }

  return c.json({poll,existingPoll});
});

export async function GET(req: Request) {
  return app.fetch(req);
}
