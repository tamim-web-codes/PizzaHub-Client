
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
    CalendarDays,
    ClipboardList,
    MapPin,
    Package,
    Phone,
    ShoppingBag,
    XCircle,
} from "lucide-react";

import { TOrderData } from "@/components/types/type";

type Props = {
    orders: TOrderData[];
};

const statusStyles: Record<string, string> = {
    pending: "bg-orange-50 text-orange-600 border-orange-200",
    accepted: "bg-blue-50 text-blue-600 border-blue-200",
    rejected: "bg-red-50 text-red-600 border-red-200",
    delivered: "bg-green-50 text-green-600 border-green-200",
    cancelled: "bg-slate-100 text-slate-600 border-slate-200",
};

const CustomerOrdersList = ({ orders }: Props) => {
    return (
        <div className="mx-auto w-full max-w-6xl space-y-7">

            {/* Page Header */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
            >
                <div>
                    <p className="text-sm font-semibold tracking-wider text-red-500">
                        CUSTOMER DASHBOARD
                    </p>

                    <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                        My Orders
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Track your orders and manage your food deliveries.
                    </p>
                </div>

                <div className="flex w-fit items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-3">
                    <ClipboardList className="h-5 w-5 text-red-500" />

                    <span className="text-sm font-semibold text-red-600">
                        Your Orders
                    </span>
                </div>
            </motion.div>

            {/* Order List */}
            <div className="space-y-4">

                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-slate-900">
                        Order History
                    </h2>

                    <span className="text-sm text-slate-500">
                        {orders.length} orders
                    </span>
                </div>

                {orders.length > 0 ? (
                    <div className="grid grid-cols-1 gap-5">
                        {orders.map((order, index) => (
                            <motion.div
                                key={order._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.4,
                                    delay: index * 0.08,
                                }}
                                whileHover={{ y: -3 }}
                                className="group flex min-w-0 flex-row gap-3 overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition-all duration-300 hover:border-red-200 hover:shadow-lg sm:gap-5 sm:p-5"
                            >
                                {/* Food Image */}
                                <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-orange-50 sm:h-40 sm:w-44 md:h-44 md:w-52">
                                    <Image
                                        src={order.imageUrl || "/default-event-image.jpg"}
                                        alt={order.itemName}
                                        fill
                                        unoptimized
                                        sizes="(max-width: 640px) 112px, 208px"
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>

                                {/* Order Information */}
                                <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">

                                    {/* Top Content */}
                                    <div className="min-w-0">

                                        {/* Name and Status */}
                                        <div className="flex flex-wrap items-start justify-between gap-2">
                                            <div className="min-w-0">
                                                <h3 className="line-clamp-1 text-sm font-bold text-slate-900 sm:text-lg">
                                                    {order.itemName}
                                                </h3>

                                                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                                                    Order ID: #{order._id.slice(-8)}
                                                </p>
                                            </div>

                                            <span
                                                className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-semibold capitalize sm:px-3 sm:text-xs ${statusStyles[order.status] ||
                                                    statusStyles.pending
                                                    }`}
                                            >
                                                {order.status}
                                            </span>
                                        </div>

                                        {/* Order Details */}
                                        <div className="mt-3 grid grid-cols-1 gap-2 text-xs text-slate-600 sm:grid-cols-2 sm:gap-3 sm:text-sm">

                                            {/* Quantity */}
                                            <div className="flex items-center gap-2">
                                                <ShoppingBag className="h-4 w-4 shrink-0 text-red-500" />

                                                <span>
                                                    {order.quantity} Items
                                                </span>
                                            </div>

                                            {/* Delivery Date */}
                                            <div className="flex items-center gap-2">
                                                <CalendarDays className="h-4 w-4 shrink-0 text-red-500" />

                                                <span className="truncate">
                                                    {order.deliveryDate}
                                                </span>
                                            </div>

                                            {/* Address */}
                                            <div className="flex min-w-0 items-center gap-2 sm:col-span-2">
                                                <MapPin className="h-4 w-4 shrink-0 text-red-500" />

                                                <span className="line-clamp-1">
                                                    {order.deliveryAddress}
                                                </span>
                                            </div>

                                            {/* Phone */}
                                            <div className="flex items-center gap-2 sm:col-span-2">
                                                <Phone className="h-4 w-4 shrink-0 text-red-500" />

                                                <span>
                                                    {order.phone}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bottom Section */}
                                    <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3">

                                        {/* Total Price */}
                                        <div>
                                            <p className="text-[10px] font-medium text-slate-500 sm:text-xs">
                                                Total Amount
                                            </p>

                                            <p className="text-base font-extrabold text-red-600 sm:text-xl">
                                                ৳{order.totalPrice.toLocaleString("en-BD")}
                                            </p>
                                        </div>

                                        {/* Cancel Button UI */}
                                        {order.status === "pending" ? (
                                            <button
                                                type="button"
                                                className="flex h-8 shrink-0 items-center gap-1.5 rounded-lg border border-red-200 px-2.5 text-xs font-semibold text-red-600 transition hover:bg-red-50 sm:h-9 sm:px-3 sm:text-sm"
                                            >
                                                <XCircle className="h-3.5 w-3.5" />
                                                Cancel Order
                                            </button>
                                        ) : (
                                            <div className="flex items-center gap-1 text-xs font-medium capitalize text-slate-400">
                                                <Package className="h-4 w-4" />
                                                {order.status} Order
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-16 text-center"
                    >
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
                            <ClipboardList className="h-7 w-7 text-red-500" />
                        </div>

                        <h3 className="mt-4 text-lg font-bold text-slate-900">
                            No orders yet
                        </h3>

                        <p className="mt-2 text-sm text-slate-500">
                            Your food orders will appear here.
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default CustomerOrdersList;
