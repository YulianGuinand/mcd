import Billing from "@/components/stripe/Billing";
import { authOptions } from "@/lib/auth";
import { plans } from "@/lib/plans";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className="w-full">
      <Billing
        title="Pro"
        data={plans[0]?.pro}
        features={plans[0].features}
        email={session?.user.email || undefined}
      />
    </div>
  );
};

export default page;
