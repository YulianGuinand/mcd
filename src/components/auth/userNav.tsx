"use client";

import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import { ReactNode } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const UserNav = ({ children }: { children: ReactNode }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="dark">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Billing
          <DropdownMenuShortcut>ctr+B</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button
            onClick={() =>
              signOut({
                redirect: true,
                callbackUrl: `${window.location.origin}/sign-in`,
              })
            }
            variant="destructive"
            className="w-full"
          >
            <LogOutIcon className="size-4 mr-2" />
            Sign out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNav;
