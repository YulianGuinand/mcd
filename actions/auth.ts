"use server";

import { auth } from "@/lib/auth/auth";
import {
  SignInSchema,
  SignInSchemaType,
  SignUpSchema,
  SignUpSchemaType,
} from "@/lib/schema";
import { headers } from "next/headers";

export const signIn = async (values: SignInSchemaType) => {
  const validatedValues = SignInSchema.safeParse(values);
  if (!validatedValues.success) {
    return { success: false, message: "Invalides Credentials" };
  }

  const res = await auth.api.signInEmail({
    body: {
      email: validatedValues.data.email,
      password: validatedValues.data.password,
    },
  });

  if (!res) {
    return {
      success: false,
      message: "Something went wrong. Please check credentials and try again",
    };
  }

  return { success: true, message: "Successfully signed in" };
};

export const signUp = async (values: SignUpSchemaType) => {
  const validatedValues = SignUpSchema.safeParse(values);
  if (!validatedValues.success) {
    return { success: false, message: "Invalides Credentials" };
  }

  const res = await auth.api.signUpEmail({
    body: {
      email: validatedValues.data.email,
      password: validatedValues.data.password,
      name: validatedValues.data.name,
    },
  });

  if (!res) {
    return {
      success: false,
      message: "Something went wrong. Please check credentials and try again",
    };
  }

  return { success: true, message: "Successfully signed up" };
};

export const signOut = async () => {
  const res = await auth.api.signOut({ headers: await headers() });

  if (!res) {
    return {
      success: false,
      message: "Something went wrong. Please try again",
    };
  }

  return { success: true, message: "Successfully signed out" };
};
