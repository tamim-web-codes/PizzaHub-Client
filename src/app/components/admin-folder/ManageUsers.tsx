
"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import {
    Search,
    Users,
    Store,
    UserRound,
    ShieldCheck,
    ShieldBan,
    Loader2,
    RefreshCw,
    AlertCircle,
    Mail,
} from "lucide-react";
import { toast } from "sonner";
import { getAdminUsers, updateUserBlockStatus } from "@/lib/api/adminApi";


type User = {
    _id: string;
    name: string;
    email: string;
    image?: string;
    role: "admin" | "vendor" | "customer";
    isBlocked?: boolean;
    businessName?: string;
    subscriptionPlan?: "free" | "premium";
};

const ManageUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [search, setSearch] = useState("");
    const [role, setRole] = useState("all");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    const fetchUsers = useCallback(async () => {
        try {
            setLoading(true);
            setError("");

            const result = await getAdminUsers(search.trim(), role);

            if (!result.success) {
                throw new Error(result.message || "Failed to fetch users");
            }

            setUsers(result.users || []);
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
    }, [search, role]);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchUsers();
        }, 350);

        return () => clearTimeout(timer);
    }, [fetchUsers]);

    const handleBlockToggle = async (user: User) => {
        if (updatingId) return;

        const updatedStatus = !user.isBlocked;

        try {
            setUpdatingId(user._id);

            const result = await updateUserBlockStatus(
                user._id,
                updatedStatus
            );

            if (!result.success) {
                throw new Error(
                    result.message || "Failed to update user"
                );
            }

            // Update the selected user's status locally
            setUsers((prevUsers) =>
                prevUsers.map((item) =>
                    item._id === user._id
                        ? { ...item, isBlocked: updatedStatus }
                        : item
                )
            );

            toast.success(
                updatedStatus
                    ? "User blocked successfully"
                    : "User unblocked successfully"
            );
        } catch (error) {
            console.error(error);

            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to update user"
            );
        } finally {
            setUpdatingId(null);
        }
    };

    const totalUsers = users.length;
    const totalVendors = users.filter(
        (user) => user.role === "vendor"
    ).length;
    const totalCustomers = users.filter(
        (user) => user.role === "customer"
    ).length;

    const getRoleStyle = (userRole: string) => {
        switch (userRole) {
            case "admin":
                return "bg-purple-50 text-purple-700 ring-purple-200";
            case "vendor":
                return "bg-orange-50 text-orange-700 ring-orange-200";
            default:
                return "bg-blue-50 text-blue-700 ring-blue-200";
        }
    };

    return (
        <div className="min-h-screen w-full space-y-6 bg-white">
            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                        Manage Users
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Manage your platform users, roles and account status.
                    </p>
                </div>

                <button
                    onClick={fetchUsers}
                    disabled={loading}
                    className="inline-flex w-fit items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
                >
                    <RefreshCw
                        className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
                    />
                    Refresh
                </button>
            </div>

            {/* Search and Filter */}
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
                <div className="flex flex-col gap-3 md:flex-row md:items-center">
                    <div className="relative flex-1">
                        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by name or email..."
                            className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-50"
                        />
                    </div>

                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="h-11 rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-700 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-50"
                    >
                        <option value="all">All Roles</option>
                        <option value="vendor">Vendor</option>
                        <option value="customer">Customer</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
            </div>

            {/* Users Table */}
            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                    <div>
                        <h2 className="font-semibold text-gray-900">
                            All Users
                        </h2>
                        <p className="mt-1 text-xs text-gray-500">
                            {loading ? "Loading users..." : `${users.length} users found`}
                        </p>
                    </div>

                    <div className="rounded-lg bg-orange-50 px-3 py-1.5 text-xs font-semibold text-orange-600">
                        User Management
                    </div>
                </div>

                {error ? (
                    <div className="flex flex-col items-center justify-center px-5 py-14 text-center">
                        <AlertCircle className="h-10 w-10 text-red-400" />

                        <h3 className="mt-3 font-semibold text-gray-900">
                            Failed to load users
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                            {error}
                        </p>

                        <button
                            onClick={fetchUsers}
                            className="mt-4 rounded-xl bg-orange-500 px-5 py-2 text-sm font-semibold text-white hover:bg-orange-600"
                        >
                            Try Again
                        </button>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[850px] text-left">
                            <thead className="bg-gray-50">
                                <tr className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                                    <th className="px-5 py-4">User</th>
                                    <th className="px-5 py-4">Role</th>
                                    <th className="px-5 py-4">Plan</th>
                                    <th className="px-5 py-4">Status</th>
                                    <th className="px-5 py-4 text-right">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    Array.from({ length: 5 }).map((_, index) => (
                                        <tr key={index}>
                                            <td colSpan={5} className="px-5 py-5">
                                                <div className="h-10 animate-pulse rounded-lg bg-gray-100" />
                                            </td>
                                        </tr>
                                    ))
                                ) : users.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-5 py-16 text-center"
                                        >
                                            <Users className="mx-auto h-10 w-10 text-gray-300" />

                                            <h3 className="mt-3 font-semibold text-gray-800">
                                                No users found
                                            </h3>

                                            <p className="mt-1 text-sm text-gray-500">
                                                Try changing your search or filter.
                                            </p>
                                        </td>
                                    </tr>
                                ) : (
                                    users.map((user) => (
                                        <tr
                                            key={user._id}
                                            className="transition hover:bg-orange-50/30"
                                        >
                                            {/* User */}
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-orange-50">
                                                        {user.image ? (
                                                            <Image
                                                                src={user.image}
                                                                alt={user.name}
                                                                fill
                                                                sizes="44px"
                                                                className="object-cover"
                                                            />
                                                        ) : (
                                                            <UserRound className="h-5 w-5 text-orange-500" />
                                                        )}
                                                    </div>

                                                    <div className="min-w-0">
                                                        <p className="truncate text-sm font-semibold text-gray-900">
                                                            {user.name}
                                                        </p>

                                                        <p className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
                                                            <Mail className="h-3 w-3" />
                                                            {user.email}
                                                        </p>

                                                        {user.businessName && (
                                                            <p className="mt-1 text-xs text-gray-400">
                                                                {user.businessName}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Role */}
                                            <td className="px-5 py-4">
                                                <span
                                                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ring-1 ring-inset ${getRoleStyle(user.role)}`}
                                                >
                                                    {user.role}
                                                </span>
                                            </td>

                                            {/* Plan */}
                                            <td className="px-5 py-4">
                                                {user.role === "vendor" ? (
                                                    <span className={`text-xs font-semibold capitalize ${user.subscriptionPlan === "premium"
                                                        ? "text-amber-600"
                                                        : "text-gray-500"
                                                        }`}>
                                                        {user.subscriptionPlan || "free"}
                                                    </span>
                                                ) : (
                                                    <span className="text-xs text-gray-400">
                                                        —
                                                    </span>
                                                )}
                                            </td>

                                            {/* Status */}
                                            <td className="px-5 py-4">
                                                <span
                                                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${user.isBlocked
                                                        ? "bg-red-50 text-red-600"
                                                        : "bg-emerald-50 text-emerald-600"
                                                        }`}
                                                >
                                                    <span className={`h-1.5 w-1.5 rounded-full ${user.isBlocked
                                                        ? "bg-red-500"
                                                        : "bg-emerald-500"
                                                        }`} />

                                                    {user.isBlocked ? "Blocked" : "Active"}
                                                </span>
                                            </td>

                                            {/* Action */}
                                            <td className="px-5 py-4 text-right">
                                                {user.role === "admin" ? (
                                                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-400">
                                                        <ShieldCheck className="h-4 w-4" />
                                                        Protected
                                                    </span>
                                                ) : (
                                                    <button
                                                        onClick={() => handleBlockToggle(user)}
                                                        disabled={updatingId !== null}
                                                        className={`inline-flex items-center justify-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${user.isBlocked
                                                            ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                                                            : "bg-red-50 text-red-600 hover:bg-red-100"
                                                            }`}
                                                    >
                                                        {updatingId === user._id ? (
                                                            <Loader2 className="h-4 w-4 animate-spin" />
                                                        ) : (
                                                            <ShieldBan className="h-4 w-4" />
                                                        )}

                                                        {user.isBlocked ? "Unblock" : "Block"}
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageUsers;
