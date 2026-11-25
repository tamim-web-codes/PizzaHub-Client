
import CustomerOverview from "@/app/components/customer-folder/CustomerOverview";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const CustomerDashboardPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        redirect("/login");
    }

    const customerId = session.user.id;

    return (
        <div className="min-h-screen w-full bg-white p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-7xl space-y-6">
         
                <CustomerOverview customerId={customerId} />
            </div>
        </div>
    );
};

export default CustomerDashboardPage;