import { auth } from "@/lib/better-auth/auth";

export const GET = async (req: Request) => {
  const authInstance = await auth;
  return authInstance.handler(req);
};

export const POST = async (req: Request) => {
  const authInstance = await auth;
  return authInstance.handler(req);
};
