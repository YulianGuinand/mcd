"use client";

import { signIn } from "@/actions/auth";
import { CardContent, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SignInSchemaType } from "@/lib/schema";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button, buttonVariants } from "../ui/button";
import { Input } from "../ui/input";

export const SignInForm = () => {
  const router = useRouter();

  const form = useForm<SignInSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignInSchemaType) => {
    startTransition(async () => {
      const toastId = toast.loading("Connexion à votre compte...");

      try {
        const data = await signIn(values);

        if (data.success) {
          toast.success(data.message, {
            id: toastId,
          });
          router.push("/");
        } else {
          toast.error(data.message, {
            id: toastId,
          });
        }
      } catch (error) {
        toast.error("Une erreur est survenue", {
          id: toastId,
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="password">Password</FormLabel>
                <FormControl>
                  <Input id="password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-4">
          <Button className="w-full" type="submit">
            Sign In
          </Button>

          <p className="text-sm text-secondary-foreground font-semibold flex flex-row gap-2">
            Dosn&apos;t have an account?
            <Link
              href="/sign-up"
              className={buttonVariants({
                variant: "link",
                className: "h-fit pt-0 pb-0 pl-0 pr-0 dark:text-purple-400",
              })}
            >
              Sign-Up
            </Link>
          </p>
        </CardFooter>
      </form>
    </Form>
  );
};
