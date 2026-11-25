import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getVendorOverview } from "@/lib/api/myMenut";
import VendorOverview from "@/app/components/vendorMyCustomer/VendorOverview";



const OverviewContent = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/signin");
    }

    if (session.user.role !== "vendor") {
        redirect("/unauthorized");
    }
    const vendorId = session?.user?.id
    // const overview = await getVendorOverview(vendorId);

    // return <VendorOverview data={overview} />;
};

const VendorDashboardPage = () => {
    return (
        <Suspense fallback={<OverviewSkeleton />}>
            {/* <OverviewContent /> */}
        </Suspense>
    );
};

function OverviewSkeleton() {
    return (
        <div className="space-y-6 animate-pulse">
            <div className="h-8 w-56 rounded-lg bg-gray-200" />

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {[1, 2, 3, 4].map((item) => (
                    <div
                        key={item}
                        className="h-32 rounded-xl bg-gray-200"
                    />
                ))}
            </div>

            <div className="h-24 rounded-xl bg-gray-200" />
        </div>
    );
}

export default VendorDashboardPage;