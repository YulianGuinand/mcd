import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-screen min-h-screen h-full flex items-center justify-center bg-gray-50 dark:bg-gray-950">
      {children}
    </div>
  );
}
