import { FC, ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="bg-[#202020] p-10 rounded-lg container mx-auto w-auto max-w-[400px] ">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
