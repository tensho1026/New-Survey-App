import { Hono } from "hono";
import { prisma } from "@/lib/prisma";
import { createPollSchema } from "@/lib/poll";

const app = new Hono();

app.post("/api/create-poll", async (c) => {
  const body = await c.req.json();
  const result = createPollSchema.safeParse(body);

  if (!result.success) {
    console.log("❌ バリデーションエラー:", result.error.format());
    return c.json({ error: result.error.format() }, 400);
  }

  const { title, description, options } = result.data;

 

   await prisma.poll.create({
    data: {
      userId: body.clerkId,
      title: title,
      description: description,
      choices: {
        create: options.map((o) => ({
          text: o.value,
        })),
      },
      
    },
    
  });
  
});

export async function POST(req: Request) {
  return app.fetch(req);
}
