import { authOptions } from "@/lib/auth";
import { ArrowRight, MenuIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { Button } from "./ui/button";

export const Header = async () => {
  const session = await getServerSession(authOptions);

  return (
    <header className="sticky top-0 backdrop-blur-sm z-20">
      <div className="flex justify-center items-center py-3 bg-black text-white text-sm gap-3">
        <p className="text-white/60 hidden md:block">
          Streamline your workflow and boost your productivity
        </p>
        <div className="inline-flex gap-1 items-center">
          <p>Get started for free</p>
          <ArrowRight className="size-4 inline-flex justify-center items-center" />
        </div>
      </div>
      <div className="py-5 px-3 md:px-0">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <p>MCDMaker.</p>
            <MenuIcon className="size-5 md:hidden" />
            <nav className="hidden md:flex gap-6 text-white/60 items-center">
              <a href="#">About</a>
              <a href="#">Features</a>
              <a href="#">Customers</a>
              <a href="#">Updates</a>
              <a href="#">Help</a>
              <Link href="/maker">
                {session?.user ? (
                  <Button
                    variant="primary"
                    className="inline-flex items-center justify-center font-medium tracking-tight"
                  >
                    Create MCD
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    className="inline-flex items-center justify-center font-medium tracking-tight"
                  >
                    Get for free
                  </Button>
                )}
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
