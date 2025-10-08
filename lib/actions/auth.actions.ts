"use server";

import { auth } from "../better-auth/auth";
import { inngest } from "../inngest/inngest";
import { headers } from "next/headers";

export const signUpWithEmail = async ({
  email,
  password,
  fullName,
  country,
  investmentGoals,
  riskTolerance,
  preferredIndustry,
}: SignUpFormData) => {
  try {
    const authInstance = await auth;
    const response = await authInstance.api.signUpEmail({
      body: { email, password, name: fullName },
    });

    if (response) {
      await inngest.send({
        name: "app/user.created",
        data: {
          email,
          name: fullName,
          country,
          investmentGoals,
          riskTolerance,
          preferredIndustry,
        },
      });
    }

    return { success: true, data: response };
  } catch (e) {
    console.log("Sign up failed", e);
    return { success: false, error: "Sign up failed" };
  }
};

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const authInstance = await auth;
    const headersList = await headers();

    // Create a mock request object with headers
    const request = new Request("http://localhost", {
      headers: headersList,
    });

    const session = await authInstance.api.getSession({
      headers: request.headers,
    });

    if (session?.user) {
      return {
        id: session.user.id,
        name: session.user.name || "",
        email: session.user.email || "",
      };
    }

    return null;
  } catch (e) {
    console.log("Get current user failed", e);
    return null;
  }
};
