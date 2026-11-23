import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import CustomerProfile from "@/app/components/customer-folder/CustomerProfile";


const CustomerProfileContent = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  if (session.user.role !== "customer") {
    redirect("/unauthorized");
  }

  const user = {
    id: session.user.id,
    name: session.user.name || "",
    email: session.user.email || "",
    image: session.user.image || "",
    role: session.user.role,
  };

  return <CustomerProfile user={user} />;
};

export default function CustomerProfilePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="h-9 w-9 animate-spin rounded-full border-4 border-red-500 border-t-transparent" />
        </div>
      }
    >
      <CustomerProfileContent />
    </Suspense>
  );
}