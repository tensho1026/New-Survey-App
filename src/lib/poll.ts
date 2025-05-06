import { z } from "zod";

export const createPollSchema = z.object({
  title:z.string().min(1,"タイトルは必須です"),
  description:z.string().max(50,"50文字以内まで！"),
  options:z.array(z.object({value:z.string().min(1,"選択肢を入力してください")})).min(2,"選択肢は2つ以上必要です"),
})

export type CreatePollInput = z.infer<typeof createPollSchema>