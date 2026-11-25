
"use client";

import { useEffect, useState } from "react";
import {
    ShoppingBag,
    Clock,
    CheckCircle2,
    XCircle,
    AlertCircle,
} from "lucide-react";

import { getCustomerOrderOverview } from "@/lib/actions/orderPost";

type OverviewData = {
    totalOrders: number;
    pendingOrders: number;
    acceptedOrders: number;
    rejectedCancelledOrders: number;
};

type Props = {
    customerId: string;
};

const CustomerOverview = ({ customerId }: Props) => {
    const [overview, setOverview] = useState<OverviewData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOverview = async () => {
            try {
                setLoading(true);
                setError("");

                const result = await getCustomerOrderOverview(customerId);

                if (!result.success) {
                    throw new Error(
                        result.message || "Failed to load customer overview"
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

        if (customerId) {
            fetchOverview();
        }
    }, [customerId]);

    const cards = [
        {
            title: "Total orders",
            value: overview?.totalOrders ?? 0,
            description: "Your pizza order history",
            icon: ShoppingBag,
            iconBg: "bg-orange-50",
            iconColor: "text-orange-600",
            accent: "from-orange-500 to-amber-400",
        },
        {
            title: "Pending",
            value: overview?.pendingOrders ?? 0,
            description: "Awaiting confirmation",
            icon: Clock,
            iconBg: "bg-amber-50",
            iconColor: "text-amber-600",
            accent: "from-amber-500 to-yellow-400",
        },
        {
            title: "Accepted",
            value: overview?.acceptedOrders ?? 0,
            description: "Your pizzeria is on it",
            icon: CheckCircle2,
            iconBg: "bg-emerald-50",
            iconColor: "text-emerald-600",
            accent: "from-emerald-500 to-teal-400",
        },
        {
            title: "Rejected / cancelled",
            value: overview?.rejectedCancelledOrders ?? 0,
            description: "Rejected or cancelled orders",
            icon: XCircle,
            iconBg: "bg-red-50",
            iconColor: "text-red-500",
            accent: "from-red-500 to-rose-400",
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
            <div>
                <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
                    Order Overview
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    Keep track of all your pizza orders in one place.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {cards.map((card) => {
                    const Icon = card.icon;

                    return (
                        <div
                            key={card.title}
                            className="group relative overflow-hidden rounded-2xl border border-orange-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg sm:p-6"
                        >
                            <div
                                className={`absolute left-0 top-0 h-1 w-full bg-gradient-to-r ${card.accent}`}
                            />

                            <div className="flex items-start justify-between gap-3">
                                <div>
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

                            <div className="mt-5 border-t border-gray-100 pt-4">
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

export default CustomerOverview;
