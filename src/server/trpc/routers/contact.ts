import { z } from "zod/v4";
import { router, publicProcedure } from "../trpc";

const contactInputSchema = z.object({
  name: z.string().min(1, "お名前を入力してください"),
  email: z.email("有効なメールアドレスを入力してください"),
  message: z.string().min(1, "メッセージを入力してください"),
});

export const contactRouter = router({
  submit: publicProcedure
    .input(contactInputSchema)
    .mutation(async ({ input }) => {
      // TODO: DB保存 + メール送信を実装 (Phase B)
      console.log("Contact form submission:", input);
      return { success: true, message: "お問い合わせありがとうございます。" };
    }),
});
