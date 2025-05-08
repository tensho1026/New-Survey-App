import { Hono } from "hono";
import { prisma } from "@/lib/prisma";

const app = new Hono();

app.delete("/api/delete-poll/:pollId", async (c) => {
  const pollId = c.req.param("pollId");

  try {
    await prisma.poll.delete({
      where: {
        id: pollId,
      },
    });

    return c.json({ message: "Poll deleted successfully" }, 200);
  } catch (error) {
    console.error("Error deleting poll:", error);
    return c.json({ error: "Failed to delete poll" }, 500);
  }
});

export async function DELETE(req: Request) {
  return app.fetch(req);
}
