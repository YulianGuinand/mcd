import { SignUpForm } from "@/components/auth/SignUpForm";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SignUpPage() {
  return (
    <Card className="w-full max-w-md shadow-md dark:bg-gray-900">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>
          Please enter your details to create an account.
        </CardDescription>
      </CardHeader>
      <SignUpForm />
    </Card>
  );
}
