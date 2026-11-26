"use client";

import { useEffect, useMemo, useState } from "react";
import {
    Search,
    ReceiptText,
    CheckCircle2,
    Clock3,
    XCircle,
    RefreshCw,
    CreditCard,
    CalendarDays,
    UserRound,
    Hash,
    Loader2,
    AlertCircle,
    Mail,
} from "lucide-react";
import { toast } from "sonner";
import { getAdminTransactions } from "@/lib/api/adminApi";

type Transaction = {
    _id: string;
    sessionId: string;
    status: string;
    payment_status: string;
    amount_total: number;
    customer_email: string;
    userId: string;
    payment_date: string;
    payment_intent?: string;

    vendorName?: string;
    vendorEmail?: string;
};

type FilterStatus = "all" | "paid" | "unpaid" | "no_payment_required";

export default function AdminTransactionsClient() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<FilterStatus>("all");

    // Fetch transactions
    const fetchTransactions = async () => {
        try {
            setLoading(true);

            const result = await getAdminTransactions();

            if (result.success) {
                setTransactions(result.transactions || []);
            } else {
                toast.error(result.message || "Failed to load transactions");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong while loading transactions");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    // Search and filter
    const filteredTransactions = useMemo(() => {
        return transactions.filter((transaction) => {
            const searchText = search.toLowerCase();

            const matchesSearch =
                transaction._id?.toLowerCase().includes(searchText) ||
                transaction.userId?.toLowerCase().includes(searchText) ||
                transaction.sessionId?.toLowerCase().includes(searchText) ||
                transaction.customer_email?.toLowerCase().includes(searchText) ||
                transaction.vendorName?.toLowerCase().includes(searchText) ||
                transaction.vendorEmail?.toLowerCase().includes(searchText);

            const matchesStatus =
                statusFilter === "all" ||
                transaction.payment_status?.toLowerCase() === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [transactions, search, statusFilter]);

    // Statistics
    const totalTransactions = transactions.length;

    const paidTransactions = transactions.filter(
        (item) => item.payment_status?.toLowerCase() === "paid"
    ).length;

    const pendingTransactions = transactions.filter(
        (item) =>
            item.payment_status?.toLowerCase() === "unpaid"
    ).length;

    const failedTransactions = transactions.filter(
        (item) =>
            item.payment_status?.toLowerCase() === "failed"
    ).length;

    // Total successful payment amount
    const totalRevenue = transactions
        .filter((item) => item.payment_status?.toLowerCase() === "paid")
        .reduce(
            (total, item) => total + Number(item.amount_total || 0),
            0
        );

    // Amount formatter
    const formatAmount = (amount: number) => {
        return `৳${Number(amount || 0).toLocaleString("en-BD")}`;
    };

    // Date formatter
    const formatDate = (date: string) => {
        if (!date) return "N/A";

        return new Date(date).toLocaleString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    // Status styles
    const getStatusStyle = (status: string) => {
        switch (status?.toLowerCase()) {
            case "paid":
                return "bg-green-50 text-green-700 ring-green-600/20";

            case "unpaid":
                return "bg-yellow-50 text-yellow-700 ring-yellow-600/20";

            case "failed":
                return "bg-red-50 text-red-700 ring-red-600/20";

            default:
                return "bg-gray-50 text-gray-600 ring-gray-500/20";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status?.toLowerCase()) {
            case "paid":
                return <CheckCircle2 size={14} />;

            case "unpaid":
                return <Clock3 size={14} />;

            case "failed":
                return <XCircle size={14} />;

            default:
                return <AlertCircle size={14} />;
        }
    };

    return (
        <div className="min-h-screen bg-white px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl space-y-7">

                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="mb-2 flex items-center gap-2 text-sm font-medium text-emerald-600">
                            <ReceiptText size={17} />
                            Admin Dashboard
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                            Transactions
                        </h1>

                        <p className="mt-2 text-sm text-gray-500">
                            View vendor subscription payment history.
                        </p>
                    </div>

                    <button
                        onClick={fetchTransactions}
                        disabled={loading}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-60"
                    >
                        <RefreshCw
                            size={16}
                            className={loading ? "animate-spin" : ""}
                        />
                        Refresh
                    </button>
                </div>


                {/* Revenue */}
                <div className="rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-50 to-white p-5 sm:p-6">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-sm font-medium text-gray-600">
                                Total Successful Payment Amount
                            </p>

                            <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
                                {formatAmount(totalRevenue)}
                            </h2>

                            <p className="mt-2 text-xs text-gray-500">
                                Based on paid transactions only
                            </p>
                        </div>

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                            <CreditCard size={25} />
                        </div>
                    </div>
                </div>

                {/* Search and Filter */}
                <div className="rounded-2xl border border-gray-200 p-4 shadow-sm sm:p-5">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h2 className="font-semibold text-gray-900">
                                All Transactions
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Search and filter payment records.
                            </p>
                        </div>

                        <div className="flex w-full flex-col gap-3 sm:flex-row lg:max-w-xl">
                            <div className="relative flex-1">
                                <Search
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search vendor or transaction..."
                                    className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                                />
                            </div>

                            <select
                                value={statusFilter}
                                onChange={(e) =>
                                    setStatusFilter(e.target.value as FilterStatus)
                                }
                                className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-emerald-500"
                            >
                                <option value="all">All Status</option>
                                <option value="paid">Paid</option>
                                <option value="unpaid">Unpaid</option>
                                <option value="no_payment_required">
                                    No Payment Required
                                </option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Transaction List */}
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

                    {loading ? (
                        <div className="flex min-h-64 flex-col items-center justify-center gap-3">
                            <Loader2
                                className="animate-spin text-emerald-600"
                                size={32}
                            />
                            <p className="text-sm text-gray-500">
                                Loading transactions...
                            </p>
                        </div>
                    ) : filteredTransactions.length === 0 ? (
                        <div className="flex min-h-64 flex-col items-center justify-center px-4 text-center">
                            <ReceiptText
                                size={32}
                                className="mb-3 text-gray-400"
                            />

                            <h3 className="font-semibold text-gray-900">
                                No transactions found
                            </h3>

                            <p className="mt-2 text-sm text-gray-500">
                                Try changing your search or filter.
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* Desktop Table */}
                            <div className="hidden overflow-x-auto md:block">
                                <table className="w-full min-w-[950px] text-left">
                                    <thead className="bg-gray-50">
                                        <tr className="border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500">
                                            <th className="px-6 py-4 font-semibold">
                                                Vendor
                                            </th>
                                            <th className="px-6 py-4 font-semibold">
                                                Plan
                                            </th>
                                            <th className="px-6 py-4 font-semibold">
                                                Amount
                                            </th>
                                            <th className="px-6 py-4 font-semibold">
                                                Date
                                            </th>
                                            <th className="px-6 py-4 font-semibold">
                                                Payment Status
                                            </th>
                                            <th className="px-6 py-4 font-semibold">
                                                Transaction ID
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-gray-100">
                                        {filteredTransactions.map((item) => (
                                            <tr
                                                key={item._id}
                                                className="transition hover:bg-gray-50"
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                                                            <UserRound size={18} />
                                                        </div>

                                                        <div className="min-w-0">
                                                            <p className="truncate text-sm font-semibold text-gray-900">
                                                                {item.vendorName || "Unknown Vendor"}
                                                            </p>

                                                            <p className="truncate text-xs text-gray-500">
                                                                {item.vendorEmail || item.customer_email}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <span className="rounded-lg bg-purple-50 px-3 py-1.5 text-xs font-semibold text-purple-700">
                                                        Premium
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4 text-sm font-bold text-gray-900">
                                                    {formatAmount(item.amount_total)}
                                                </td>

                                                <td className="px-6 py-4 text-sm text-gray-600">
                                                    {formatDate(item.payment_date)}
                                                </td>

                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold capitalize ring-1 ring-inset ${getStatusStyle(item.payment_status)}`}>
                                                        {getStatusIcon(item.payment_status)}
                                                        {item.payment_status || "Unknown"}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <span
                                                        title={item.sessionId}
                                                        className="inline-flex max-w-40 items-center gap-1 truncate text-xs text-gray-500"
                                                    >
                                                        <Hash size={13} />
                                                        {item._id}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile Cards */}
                            <div className="space-y-3 p-4 md:hidden">
                                {filteredTransactions.map((item) => (
                                    <div
                                        key={item._id}
                                        className="rounded-xl border border-gray-200 p-4"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex min-w-0 items-center gap-3">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                                                    <UserRound size={18} />
                                                </div>

                                                <div className="min-w-0">
                                                    <h3 className="truncate text-sm font-semibold text-gray-900">
                                                        {item.vendorName || "Unknown Vendor"}
                                                    </h3>

                                                    <p className="flex items-center gap-1 truncate text-xs text-gray-500">
                                                        <Mail size={12} />
                                                        {item.vendorEmail || item.customer_email}
                                                    </p>
                                                </div>
                                            </div>

                                            <span className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold capitalize ring-1 ring-inset ${getStatusStyle(item.payment_status)}`}>
                                                {getStatusIcon(item.payment_status)}
                                                {item.payment_status || "Unknown"}
                                            </span>
                                        </div>

                                        <div className="my-4 flex items-center justify-between border-y border-gray-100 py-3">
                                            <div>
                                                <p className="text-xs text-gray-500">
                                                    Payment Amount
                                                </p>

                                                <p className="mt-1 text-xl font-bold text-gray-900">
                                                    {formatAmount(item.amount_total)}
                                                </p>
                                            </div>

                                            <div className="text-right">
                                                <p className="text-xs text-gray-500">
                                                    Subscription
                                                </p>

                                                <p className="mt-1 text-sm font-semibold text-purple-700">
                                                    Premium
                                                </p>
                                            </div>
                                        </div>

                                        <div className="space-y-2 text-xs text-gray-500">
                                            <p className="flex items-center gap-2">
                                                <CalendarDays size={14} />
                                                {formatDate(item.payment_date)}
                                            </p>

                                            <p className="flex items-center gap-2 break-all">
                                                <Hash size={14} />
                                                {item._id}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {/* Footer */}
                    {!loading && filteredTransactions.length > 0 && (
                        <div className="border-t border-gray-200 bg-gray-50 px-4 py-3 sm:px-6">
                            <p className="text-xs text-gray-500">
                                Showing{" "}
                                <strong className="text-gray-700">
                                    {filteredTransactions.length}
                                </strong>{" "}
                                of{" "}
                                <strong className="text-gray-700">
                                    {transactions.length}
                                </strong>{" "}
                                transactions
                            </p>
                        </div>
                    )}
                </div>

                {/* Read Only Notice */}
                <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4">
                    <AlertCircle
                        size={19}
                        className="mt-0.5 shrink-0 text-blue-600"
                    />

                    <div>
                        <p className="text-sm font-semibold text-blue-900">
                            Payment records are read-only
                        </p>

                        <p className="mt-1 text-xs leading-5 text-blue-700">
                            Admin can view transaction history but cannot edit
                            payment amount, change payment status, or delete
                            payment records.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Statistics Card
function StatCard({
    title,
    value,
    icon,
    iconBg,
    iconColor,
}: {
    title: string;
    value: number;
    icon: React.ReactNode;
    iconBg: string;
    iconColor: string;
}) {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-center justify-between gap-3">
                <div>
                    <p className="text-sm font-medium text-gray-500">
                        {title}
                    </p>

                    <h3 className="mt-3 text-3xl font-bold text-gray-900">
                        {value}
                    </h3>
                </div>

                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}>
                    {icon}
                </div>
            </div>
        </div>
    );
}