import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import CustomerOrdersList from "@/app/components/customer-folder/CustomerOrdersList";
import { getCustomerOrder } from "@/lib/api/orderGet";

const OrdersContent = async () => {
  // Get logged-in user session
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // If user is not logged in
  if (!session) {
    redirect("/signin");
  }

  // Get customer ID
  const customerEmail = session.user.email;

  // Fetch orders using customer ID
  const orders = await getCustomerOrder(customerEmail);

  return <CustomerOrdersList orders={orders} />;
};

const CustomerOrdersPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-red-500 border-t-transparent" />
        </div>
      }
    >
      <OrdersContent />
    </Suspense>
  );
};

export default CustomerOrdersPage;