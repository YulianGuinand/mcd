import { useToast } from "@/hooks/use-toast";
import { LoaderIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import { FC, ReactNode, useState } from "react";
import { Button } from "./ui/button";

interface GoogleSignInButtonProps {
  children: ReactNode;
}

const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const loginWithGoogle = async () => {
    try {
      setIsLoading(true);
      await signIn("google", { callbackUrl: "http://localhost:3000/maker" }); //CHANGE THIS WHEN DEPLOYED
    } catch {
      toast({
        title: "An error occurred",
        description: "Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button disabled={isLoading} className="w-full" onClick={loginWithGoogle}>
      {isLoading ? <LoaderIcon className="size-4 animate-spin" /> : children}
    </Button>
  );
};

export default GoogleSignInButton;
