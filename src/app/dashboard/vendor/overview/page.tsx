import VendorOverview from "@/app/components/vendorMyCustomer/VendorOverview";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const VendorDashboardPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        redirect("/login");
    }

    const vendorId = session.user.id;

    return (
        <div className="min-h-screen w-full bg-white p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-7xl space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Dashboard Overview
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Welcome back! Here is your restaurant overview.
                    </p>
                </div>

                <VendorOverview vendorId={vendorId} />
            </div>
        </div>
    );
};

export default VendorDashboardPage;