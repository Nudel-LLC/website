import { z } from "zod/v4";
import { TRPCError } from "@trpc/server";
import { router, publicProcedure } from "../trpc";
import { getResendClient } from "@/lib/email/resend";
import {
  buildAdminNotificationEmail,
  buildAutoReplyEmail,
} from "@/lib/email/templates";
import { SITE_CONFIG } from "@/lib/constants";
import { logger } from "@/lib/logger";

const SENDER = "Nudel <noreply@nudel.co.jp>";

const contactInputSchema = z.object({
  name: z.string().min(1, "お名前を入力してください"),
  email: z.email("有効なメールアドレスを入力してください"),
  message: z.string().min(1, "メッセージを入力してください"),
});

export const contactRouter = router({
  submit: publicProcedure
    .input(contactInputSchema)
    .mutation(async ({ input }) => {
      const resend = getResendClient();
      const adminEmail = buildAdminNotificationEmail(input);
      const autoReply = buildAutoReplyEmail(input);

      const [adminResult, replyResult] = await Promise.all([
        resend.emails.send({
          from: SENDER,
          to: process.env.CONTACT_EMAIL_TO!,
          replyTo: input.email,
          subject: adminEmail.subject,
          html: adminEmail.html,
        }),
        resend.emails.send({
          from: SENDER,
          to: input.email,
          subject: autoReply.subject,
          html: autoReply.html,
        }),
      ]);

      if (adminResult.error || replyResult.error) {
        logger.error(
          { admin: adminResult.error, autoReply: replyResult.error },
          "メール送信失敗",
        );
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "メールの送信に失敗しました。しばらく経ってから再度お試しください。",
        });
      }

      return { success: true, message: "お問い合わせありがとうございます。" };
    }),
});
