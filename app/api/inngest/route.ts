import { sendDailyNewsSummary, sendSignUpEmail } from "@/lib/inngest/functions";
import { inngest } from "@/lib/inngest/inngest";
import { serve } from "inngest/next";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [sendSignUpEmail, sendDailyNewsSummary],
});
