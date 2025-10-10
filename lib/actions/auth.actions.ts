"use server";

import { auth } from "@/lib/better-auth/auth";
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
    const response = await (
      await auth
    ).api.signUpEmail({
      body: { email, password, name: fullName },
    });

    return { success: true, data: response };
  } catch (e: unknown) {
    console.log("Sign up failed", e);
    const errorMessage =
      e && typeof e === "object" && "message" in e
        ? String(e.message)
        : "Sign up failed";
    return { success: false, error: errorMessage };
  }
};

export const signInWithEmail = async ({ email, password }: SignInFormData) => {
  try {
    const response = await (
      await auth
    ).api.signInEmail({ body: { email, password } });

    if (response && response.user) {
      return { success: true, data: response };
    } else {
      return { success: false, error: "Invalid credentials" };
    }
  } catch (e: unknown) {
    console.log("Sign in failed", e);
    const errorMessage =
      e && typeof e === "object" && "message" in e
        ? String(e.message)
        : "Sign in failed";
    return { success: false, error: errorMessage };
  }
};

export const signInWithGoogle = async () => {
  try {
    // For better-auth, we need to redirect to the OAuth provider
    // The actual OAuth flow happens on the server side
    const authInstance = await auth;
    const response = await authInstance.api.signInSocial({
      body: {
        provider: "google",
        callbackURL: "/",
      },
    });

    // If we get a redirect URL, we need to redirect the user
    if (response && response.redirect) {
      return { success: true, data: response, redirect: response.redirect };
    }

    return { success: true, data: response };
  } catch (e) {
    console.log("Google sign in failed", e);
    return { success: false, error: "Google sign in failed" };
  }
};

export const signOut = async () => {
  try {
    await (await auth).api.signOut({ headers: await headers() });
    return { success: true };
  } catch (e) {
    console.log("Sign out failed", e);
    return { success: false, error: "Sign out failed" };
  }
};
