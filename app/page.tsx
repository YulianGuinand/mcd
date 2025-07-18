import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-screen min-h-screen h-full dark:bg-gray-950 bg-gray-50 flex items-center justify-center">
      <Card className="w-full max-w-md shadow dark:bg-gray-900">
        <CardHeader>
          <CardTitle>MCD Maker</CardTitle>
          <CardDescription>
            A simple app to create and manage MCDs for your projects.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Link
            href="/mcd"
            className={buttonVariants({
              variant: "default",
              className: "w-full",
            })}
          >
            Get Started
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}
