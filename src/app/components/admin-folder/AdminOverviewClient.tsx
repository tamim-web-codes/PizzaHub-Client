
"use client";

import { useCallback, useEffect, useState } from "react";
import {
    Users,
    Store,
    UserRound,
    Pizza,
    Clock,
    CreditCard,
    RefreshCw,
    TrendingUp,
    LayoutDashboard,
    AlertCircle,
} from "lucide-react";
import { getAdminOverview } from "@/lib/api/adminApi";



interface OverviewData {
    totalUsers: number;
    totalVendors: number;
    totalCustomers: number;
    totalMenuItems: number;
    pendingMenuItems: number;
    totalTransactions: number;
}

const initialOverview: OverviewData = {
    totalUsers: 0,
    totalVendors: 0,
    totalCustomers: 0,
    totalMenuItems: 0,
    pendingMenuItems: 0,
    totalTransactions: 0,
};

const AdminOverviewClient = () => {
    const [overview, setOverview] =
        useState<OverviewData>(initialOverview);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch overview data using your existing API function
    const fetchOverview = useCallback(async () => {
        try {
            setLoading(true);
            setError("");

            const result = await getAdminOverview();

            if (!result.success) {
                throw new Error(
                    result.message || "Something went wrong"
                );
            }

            setOverview(result.overview);
        } catch (err) {
            console.error(err);

            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to load overview"
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchOverview();
    }, [fetchOverview]);

    const statistics = [
        {
            title: "Total Users",
            value: overview.totalUsers,
            icon: Users,
            description: "All registered users",
            color: "bg-blue-50 text-blue-600",
        },
        {
            title: "Total Vendors",
            value: overview.totalVendors,
            icon: Store,
            description: "Registered restaurant owners",
            color: "bg-purple-50 text-purple-600",
        },
        {
            title: "Total Customers",
            value: overview.totalCustomers,
            icon: UserRound,
            description: "Registered customers",
            color: "bg-green-50 text-green-600",
        },
        {
            title: "Total Menu Items",
            value: overview.totalMenuItems,
            icon: Pizza,
            description: "All submitted menu items",
            color: "bg-orange-50 text-orange-600",
        },
        {
            title: "Pending Menu Items",
            value: overview.pendingMenuItems,
            icon: Clock,
            description: "Waiting for admin review",
            color: "bg-amber-50 text-amber-600",
        },
        {
            title: "Total Transactions",
            value: overview.totalTransactions,
            icon: CreditCard,
            description: "Recorded transactions",
            color: "bg-pink-50 text-pink-600",
        },
    ];

    const chartItems = [
        {
            label: "Vendors",
            value: overview.totalVendors,
            color: "bg-purple-500",
        },
        {
            label: "Customers",
            value: overview.totalCustomers,
            color: "bg-blue-500",
        },
        {
            label: "Menu Items",
            value: overview.totalMenuItems,
            color: "bg-orange-500",
        },
        {
            label: "Transactions",
            value: overview.totalTransactions,
            color: "bg-pink-500",
        },
    ];

    const maxChartValue = Math.max(
        ...chartItems.map((item) => item.value),
        1
    );

    const menuProgress =
        overview.totalMenuItems > 0
            ? Math.min(
                (overview.pendingMenuItems /
                    overview.totalMenuItems) *
                100,
                100
            )
            : 0;

    // Loading UI
    if (loading) {
        return (
            <div className="space-y-6 p-4 md:p-6">
                <div className="h-8 w-48 animate-pulse rounded-lg bg-gray-200" />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div
                            key={index}
                            className="h-36 animate-pulse rounded-2xl border border-gray-100 bg-gray-100"
                        />
                    ))}
                </div>

                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                    <div className="h-80 animate-pulse rounded-2xl bg-gray-100" />
                    <div className="h-80 animate-pulse rounded-2xl bg-gray-100" />
                </div>
            </div>
        );
    }

    // Error UI
    if (error) {
        return (
            <div className="flex min-h-[400px] flex-col items-center justify-center px-4 text-center">
                <div className="mb-4 rounded-full bg-red-50 p-4 text-red-500">
                    <AlertCircle size={32} />
                </div>

                <h2 className="text-xl font-bold text-gray-800">
                    Unable to load overview
                </h2>

                <p className="mt-2 max-w-md text-sm text-gray-500">
                    {error}
                </p>

                <button
                    onClick={fetchOverview}
                    className="mt-5 flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
                >
                    <RefreshCw size={16} />
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen space-y-7 bg-gray-50/70 p-4 md:p-6 lg:p-8">

            {/* Header */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
                        <LayoutDashboard size={16} />
                        <span>Admin Dashboard</span>
                        <span>/</span>
                        <span className="text-orange-500">
                            Overview
                        </span>
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
                        Dashboard Overview
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Monitor your PizzaHub platform statistics.
                    </p>
                </div>

                <button
                    onClick={fetchOverview}
                    className="flex w-fit items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-orange-300 hover:text-orange-600"
                >
                    <RefreshCw size={16} />
                    Refresh Data
                </button>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {statistics.map((item) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={item.title}
                            className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
                        >
                            <div className="flex items-center justify-between">
                                <div
                                    className={`rounded-xl p-3 ${item.color}`}
                                >
                                    <Icon size={23} />
                                </div>

                                <TrendingUp
                                    size={18}
                                    className="text-gray-300 transition group-hover:text-orange-500"
                                />
                            </div>

                            <div className="mt-5">
                                <p className="text-sm font-medium text-gray-500">
                                    {item.title}
                                </p>

                                <h2 className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
                                    {item.value.toLocaleString()}
                                </h2>

                                <p className="mt-2 text-xs text-gray-400">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

                {/* Platform Statistics */}
                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm md:p-6">
                    <div className="mb-7">
                        <h2 className="text-lg font-bold text-gray-900">
                            Platform Statistics
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Overview of your platform activity
                        </p>
                    </div>

                    <div className="space-y-6">
                        {chartItems.map((item) => {
                            const percentage =
                                (item.value / maxChartValue) * 100;

                            return (
                                <div key={item.label}>
                                    <div className="mb-2 flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-600">
                                            {item.label}
                                        </span>

                                        <span className="text-sm font-bold text-gray-900">
                                            {item.value.toLocaleString()}
                                        </span>
                                    </div>

                                    <div className="h-3 overflow-hidden rounded-full bg-gray-100">
                                        <div
                                            className={`h-full rounded-full transition-all duration-700 ${item.color}`}
                                            style={{
                                                width: `${percentage}%`,
                                            }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Menu Items Overview */}
                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm md:p-6">
                    <div className="mb-7">
                        <h2 className="text-lg font-bold text-gray-900">
                            Menu Items Overview
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Menu approval status summary
                        </p>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-7 sm:flex-row">
                        <div
                            className="relative flex h-44 w-44 shrink-0 items-center justify-center rounded-full"
                            style={{
                                background: `conic-gradient(#f59e0b ${menuProgress}%, #e5e7eb ${menuProgress}% 100%)`,
                            }}
                        >
                            <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-white">
                                <span className="text-3xl font-bold text-gray-900">
                                    {overview.totalMenuItems}
                                </span>

                                <span className="text-xs text-gray-500">
                                    Total Items
                                </span>
                            </div>
                        </div>

                        <div className="w-full space-y-5">
                            <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-2">
                                    <span className="h-3 w-3 rounded-full bg-amber-500" />
                                    <span className="text-sm text-gray-600">
                                        Pending Items
                                    </span>
                                </div>

                                <span className="font-bold text-gray-900">
                                    {overview.pendingMenuItems}
                                </span>
                            </div>

                            <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-2">
                                    <span className="h-3 w-3 rounded-full bg-gray-300" />
                                    <span className="text-sm text-gray-600">
                                        Other Items
                                    </span>
                                </div>

                                <span className="font-bold text-gray-900">
                                    {Math.max(
                                        overview.totalMenuItems -
                                        overview.pendingMenuItems,
                                        0
                                    )}
                                </span>
                            </div>

                            <div className="border-t border-gray-100 pt-4">
                                <p className="text-xs leading-5 text-gray-500">
                                    Pending items are waiting for admin review.
                                    Review them from Manage Menu Items.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminOverviewClient;
