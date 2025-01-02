import MCDEditor from "@/components/editor";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Maker = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div>
      <MCDEditor user={session?.user} />
    </div>
  );
};

export default Maker;
