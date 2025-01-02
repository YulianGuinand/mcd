"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const ErrorPage = () => {
  const router = useRouter();

  return (
    <div>
      <h2>Something went wrong!</h2>
      <Button variant="secondary" onClick={() => router.push("/")}>
        Go back
      </Button>
    </div>
  );
};
export default ErrorPage;
