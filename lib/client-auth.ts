"use client";

export const signInWithEmail = async (email: string, password: string) => {
  const response = await fetch("/api/auth/sign-in/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Sign in failed");
  }

  return response.json();
};

export const signUpWithEmail = async (
  email: string,
  password: string,
  name: string
) => {
  const response = await fetch("/api/auth/sign-up/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name }),
  });

  if (!response.ok) {
    throw new Error("Sign up failed");
  }

  return response.json();
};
