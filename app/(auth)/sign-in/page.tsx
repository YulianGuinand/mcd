import { SignInForm } from "@/components/auth/SignInForm";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SignInPage() {
  return (
    <Card className="w-full max-w-md shadow-md dark:bg-gray-900">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>
          Please enter your credentials to sign in.
        </CardDescription>
      </CardHeader>
      <SignInForm />
    </Card>
  );
}
