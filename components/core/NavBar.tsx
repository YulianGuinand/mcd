import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { AvatarDropDown } from "./AvatarDropDown";

export const NavBar = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  const user = session?.user;

  return (
    <nav className="fixed top-0 left-0 w-screen flex dark:bg-gray-900 bg-white border-b border-gray-100 dark:border-gray-700 px-4">
      <div className="container w-full py-4 flex flex-row items-center justify-between mx-auto">
        <h2 className="text-xl font-bold">MCD Maker</h2>
        <ul className="flex space-x-2">
          {user && (
            <li>
              <AvatarDropDown />
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};
