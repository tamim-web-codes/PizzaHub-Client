
"use client";

import { useEffect, useState } from "react";
import {
    Utensils,
    CheckCircle2,
    Clock,
    PackageCheck,
    TrendingUp,
    Crown,
    AlertCircle,
} from "lucide-react";

import { getVendorCustomerOverview } from "@/lib/actions/orderPost";

type OverviewData = {
    totalMenuItems: number;
    activeItems: number;
    pendingOrders: number;
    acceptedOrders: number;
    isPremium: boolean;
    freeSlotsLeft: number | null;
};

type Props = {
    vendorId: string;
};

const VendorOverview = ({ vendorId }: Props) => {
    const [overview, setOverview] = useState<OverviewData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOverview = async () => {
            try {
                setLoading(true);
                setError("");

                const result = await getVendorCustomerOverview(vendorId);

                if (!result.success) {
                    throw new Error(
                        result.message || "Failed to load overview"
                    );
                }

                setOverview(result);
            } catch (error) {
                console.error(error);

                setError(
                    error instanceof Error
                        ? error.message
                        : "Something went wrong"
                );
            } finally {
                setLoading(false);
            }
        };

        if (vendorId) {
            fetchOverview();
        }
    }, [vendorId]);

    const cards = [
        {
            title: "Menu items",
            value: overview?.totalMenuItems ?? 0,
            description: "Your complete menu collection",
            icon: Utensils,
            iconBg: "bg-orange-50",
            iconColor: "text-orange-600",
            accent: "from-orange-500 to-amber-400",
        },
        {
            title: "Active items",
            value: overview?.activeItems ?? 0,
            description: overview?.isPremium
                ? "Unlimited active menu items"
                : `${overview?.freeSlotsLeft ?? 0} free slots remaining`,
            icon: CheckCircle2,
            iconBg: "bg-emerald-50",
            iconColor: "text-emerald-600",
            accent: "from-emerald-500 to-teal-400",
        },
        {
            title: "Pending orders",
            value: overview?.pendingOrders ?? 0,
            description: "Orders waiting for your review",
            icon: Clock,
            iconBg: "bg-amber-50",
            iconColor: "text-amber-600",
            accent: "from-amber-500 to-yellow-400",
        },
        {
            title: "Accepted orders",
            value: overview?.acceptedOrders ?? 0,
            description: "Orders accepted successfully",
            icon: PackageCheck,
            iconBg: "bg-blue-50",
            iconColor: "text-blue-600",
            accent: "from-blue-500 to-cyan-400",
        },
    ];

    if (error) {
        return (
            <div className="flex items-center gap-3 rounded-2xl border border-red-100 bg-white p-5 shadow-sm">
                <div className="rounded-xl bg-red-50 p-3">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                </div>

                <div>
                    <h3 className="font-semibold text-gray-900">
                        Unable to load overview
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <section className="w-full space-y-5 bg-white">
            {/* Section heading */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
             
                {overview?.isPremium && (
                    <div className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
                        <Crown className="h-4 w-4" />
                        Premium Vendor
                    </div>
                )}
            </div>

            {/* Overview cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {cards.map((card) => {
                    const Icon = card.icon;

                    return (
                        <div
                            key={card.title}
                            className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-100 hover:shadow-lg sm:p-6"
                        >
                            {/* Top accent */}
                            <div
                                className={`absolute left-0 top-0 h-1 w-full bg-gradient-to-r ${card.accent}`}
                            />

                            <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                    <p className="text-sm font-medium text-gray-500">
                                        {card.title}
                                    </p>

                                    <h3 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                        {loading ? (
                                            <span className="inline-block h-9 w-12 animate-pulse rounded-lg bg-gray-100" />
                                        ) : (
                                            card.value
                                        )}
                                    </h3>
                                </div>

                                <div
                                    className={`rounded-xl ${card.iconBg} p-3 transition-transform duration-300 group-hover:scale-110`}
                                >
                                    <Icon
                                        className={`h-6 w-6 ${card.iconColor}`}
                                    />
                                </div>
                            </div>

                            <div className="mt-5 flex items-center gap-2 border-t border-gray-100 pt-4">
                                <TrendingUp className="h-3.5 w-3.5 shrink-0 text-gray-400" />

                                <p className="text-xs font-medium text-gray-500">
                                    {loading ? (
                                        <span className="inline-block h-3 w-28 animate-pulse rounded bg-gray-100" />
                                    ) : (
                                        card.description
                                    )}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default VendorOverview;
