import { Hono } from "hono";
import { prisma } from "@/lib/prisma";
import { createPollSchema } from "@/lib/poll";

const app = new Hono();

app.post("/api/create-poll", async (c) => {
  const body = await c.req.json();
  const result = createPollSchema.safeParse(body);

  if (!result.success) {
    return c.json(
      { error: "Invalid input", issues: result.error.format() },
      400
    );
  }

  const { title, description, options } = result.data;

  const createdPoll = await prisma.poll.create({
    data: {
      userId: body.clerkId,
      title,
      description,
      choices: {
        create: options.map((o) => ({
          text: o.value,
        })),
      },
    },
    include: {
      choices: true,
    },
  });

  return c.json(createdPoll, 201);
});

export async function POST(req: Request) {
  return app.fetch(req);
}
