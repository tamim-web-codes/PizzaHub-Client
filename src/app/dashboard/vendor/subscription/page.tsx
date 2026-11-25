
import SubscriptionContent from "@/app/components/vendorMyCustomer/SubscriptionContent";
import { getVendorPremium } from "@/lib/api/user";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";


const SubscriptionPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ canceled?: string }>;
}) => {
  const { canceled } = await searchParams;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== "vendor") {
    redirect("/unauthorized");
  }

  const vendor = await getVendorPremium(session.user.id);
  const isPremium = vendor?.premium === true;

  return (
    <SubscriptionContent
      isPremium={isPremium}
      canceled={Boolean(canceled)}
    />
  );
};

export default SubscriptionPage;
