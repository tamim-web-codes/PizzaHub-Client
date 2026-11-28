import VendorOrders from "@/app/components/vendorMyCustomer/CustomerOrders";
import { getVendorCustomerOrders } from "@/lib/api/user";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";


const VendorOrdersPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== "vendor") {
    redirect("/unauthorized");
  }
  const data = await getVendorCustomerOrders(session.user.id);
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <VendorOrders vendorId={session.user.id} data={data} />
    </div>
  );
};

export default VendorOrdersPage;