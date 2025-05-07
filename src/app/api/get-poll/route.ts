import { Hono } from "hono";
import { prisma } from "@/lib/prisma";
import { createPollSchema } from "@/lib/poll";

const app = new Hono();

app.get("/api/get-poll", async (c) => {
  const polls = await prisma.poll.findMany({
    include:{choices:true},
    orderBy: { createdAt: "desc" },
  })
  return c.json(polls)
})

export async function GET(req: Request) {
  return app.fetch(req);
}

