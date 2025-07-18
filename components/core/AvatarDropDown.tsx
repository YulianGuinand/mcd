"use client";

import { signOut } from "@/actions/auth";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const AvatarDropDown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="w-10 h-10 border-2 border-black/50 dark:border-white/50 rounded-md">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="dark:bg-gray-800">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="hover:dark:bg-gray-700">
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:dark:bg-gray-700">
          Billing
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:dark:bg-gray-700">
          Team
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:dark:bg-gray-700">
          Subscription
        </DropdownMenuItem>
        <DropdownMenuItem variant="destructive" onClick={signOut}>
          Sign-Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
