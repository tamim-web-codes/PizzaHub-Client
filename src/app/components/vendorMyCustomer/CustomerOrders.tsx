
"use client";

import {
    useCallback,
    useEffect,
    useState,
} from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { toast } from "sonner";

import { getVendorCustomerOrders } from "@/lib/api/user";
import { updateCustomerOrderStatus } from "@/lib/actions/orderPost";

type OrderStatus = "pending" | "accepted" | "rejected" | "cancelled";
type VendorUpdateStatus = "pending" | "accepted" | "rejected";

interface Order {
    _id: string;
    menuItemId: string;
    imageUrl: string;
    itemName: string;
    price: number;
    quantity: number;
    vendorId: string;
    customerId: string;
    customerName: string;
    customerEmail: string;
    deliveryDate: string;
    deliveryAddress: string;
    phone: string;
    totalPrice: number;
    status: OrderStatus;
}

interface VendorOrdersProps {
    vendorId: string;
}

const statusStyles: Record<OrderStatus, string> = {
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    accepted: "bg-emerald-50 text-emerald-700 border-emerald-200",
    rejected: "bg-red-50 text-red-700 border-red-200",
    cancelled: "bg-slate-100 text-slate-500 border-slate-300",
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
        },
    },
};

const cardVariants = {
    hidden: {
        opacity: 0,
        y: 30,
        scale: 0.98,
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: "easeOut" as const,
        },
    },
};

const VendorOrders = ({ vendorId }: VendorOrdersProps) => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);

    // Fetch vendor orders
    const fetchOrders = useCallback(async () => {
        try {
            setLoading(true);

            const data = await getVendorCustomerOrders(vendorId);

            setOrders(Array.isArray(data) ? data : []);
        } catch (err) {
            const message =
                err instanceof Error
                    ? err.message
                    : "Something went wrong";

            toast.error(message);
        } finally {
            setLoading(false);
        }
    }, [vendorId]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    // Update order status
    const handleStatusChange = async (
        order: Order,
        newStatus: VendorUpdateStatus
    ) => {
        if (order.status === "cancelled") {
            toast.error("Customer cancelled this order.");
            return;
        }

        if (order.status === newStatus) {
            return;
        }

        try {
            setUpdatingOrderId(order._id);

            const result = await updateCustomerOrderStatus(
                order._id,
                vendorId,
                newStatus
            );

            if (result.success) {
                setOrders((prevOrders) =>
                    prevOrders.map((item) =>
                        item._id === order._id
                            ? { ...item, status: result.status }
                            : item
                    )
                );

                toast.success(
                    `Order status updated to ${newStatus}...`
                );
            } else {
                toast.error(
                    result.message || "Failed to update order status."
                );
            }
        } catch (err) {
            const message =
                err instanceof Error
                    ? err.message
                    : "Failed to update order status";

            toast.error(message);

            // Fetch latest orders after failure
            await fetchOrders();
        } finally {
            setUpdatingOrderId(null);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center bg-white">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                        repeat: Infinity,
                        duration: 0.8,
                        ease: "linear",
                    }}
                    className="h-11 w-11 rounded-full border-4 border-orange-500 border-t-transparent"
                />
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-white px-3 py-6 sm:px-6 sm:py-8 lg:px-8">
            <div className="mx-auto max-w-6xl">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"
                >
                    <div>
                        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-orange-500">
                            Vendor Dashboard
                        </p>

                        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                            Customer Orders
                        </h1>

                        <p className="mt-2 text-sm text-gray-500">
                            Manage and track all your customer orders.
                        </p>
                    </div>

                    <motion.button
                        type="button"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={fetchOrders}
                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600 sm:w-auto"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="17"
                            height="17"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M20 7v5h-5" />
                            <path d="M4 17v-5h5" />
                            <path d="M5.64 9A8 8 0 0 1 19 7l1 5" />
                            <path d="M4 12l1 5a8 8 0 0 0 13.36-2" />
                        </svg>
                        Refresh Orders
                    </motion.button>
                </motion.div>

                {/* Orders */}
                {orders.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="rounded-2xl border border-dashed border-gray-200 bg-white px-5 py-16 text-center"
                    >
                        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-3xl">
                            🍕
                        </div>

                        <h3 className="text-lg font-bold text-gray-900">
                            No Orders Yet
                        </h3>

                        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
                            Customer orders will appear here when someone orders your items.
                        </p>
                    </motion.div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 gap-6"
                    >
                        {orders.map((order) => (
                            <motion.div
                                key={order._id}
                                variants={cardVariants}
                                whileHover={{
                                    y: -5,
                                    transition: { duration: 0.2 },
                                }}
                                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-colors duration-300 hover:border-orange-200 hover:shadow-lg"
                            >
                                <div className="flex flex-col gap-5 p-4 sm:p-6 lg:flex-row">

                                    {/* Image */}
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ duration: 0.3 }}
                                        className="relative h-52 w-full shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-60 lg:h-48 lg:w-52"
                                    >
                                        <Image
                                            src={order.imageUrl}
                                            alt={order.itemName}
                                            fill
                                            sizes="(max-width: 640px) 100vw, 208px"
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </motion.div>

                                    {/* Content */}
                                    <div className="min-w-0 flex-1">

                                        {/* Title and Status */}
                                        <div className="mb-5 flex flex-wrap items-start justify-between gap-3 border-b border-gray-100 pb-5">
                                            <div className="min-w-0">
                                                <p className="mb-1 text-xs font-medium text-gray-400">
                                                    Order ID: #{order._id.slice(-8)}
                                                </p>

                                                <h2 className="break-words text-xl font-extrabold text-gray-900 sm:text-2xl">
                                                    {order.itemName}
                                                </h2>
                                            </div>

                                            <motion.span
                                                key={order.status}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className={`shrink-0 rounded-full border px-4 py-2 text-xs font-bold capitalize ${statusStyles[order.status]}`}
                                            >
                                                {order.status}
                                            </motion.span>
                                        </div>

                                        {/* Customer Information */}
                                        <div className="mb-5 rounded-xl border border-gray-100 bg-gray-50/70 p-4">
                                            <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-gray-900">
                                                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="17"
                                                        height="17"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    >
                                                        <circle cx="12" cy="8" r="4" />
                                                        <path d="M5 21a7 7 0 0 1 14 0" />
                                                    </svg>
                                                </span>
                                                Customer Information
                                            </h3>

                                            <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                                                <p className="break-words text-gray-600">
                                                    <span className="font-semibold text-gray-900">Name:</span>{" "}
                                                    {order.customerName}
                                                </p>

                                                <p className="break-all text-gray-600">
                                                    <span className="font-semibold text-gray-900">Email:</span>{" "}
                                                    {order.customerEmail}
                                                </p>

                                                <p className="break-words text-gray-600">
                                                    <span className="font-semibold text-gray-900">Phone:</span>{" "}
                                                    {order.phone}
                                                </p>

                                                <p className="text-gray-600">
                                                    <span className="font-semibold text-gray-900">Quantity:</span>{" "}
                                                    {order.quantity}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Delivery Information */}
                                        <div className="mb-5">
                                            <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-gray-900">
                                                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="17"
                                                        height="17"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    >
                                                        <path d="M3 7h13v11H3z" />
                                                        <path d="M16 11h3l2 3v4h-5z" />
                                                        <circle cx="7.5" cy="18.5" r="1.5" />
                                                        <circle cx="18.5" cy="18.5" r="1.5" />
                                                    </svg>
                                                </span>
                                                Delivery Information
                                            </h3>

                                            <div className="space-y-2 text-sm text-gray-600">
                                                <p>
                                                    <span className="font-semibold text-gray-900">Delivery Date:</span>{" "}
                                                    {order.deliveryDate}
                                                </p>

                                                <p className="break-words">
                                                    <span className="font-semibold text-gray-900">Address:</span>{" "}
                                                    {order.deliveryAddress}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Price and Status Selection */}
                                        <div className="flex flex-col gap-4 border-t border-gray-100 pt-5 sm:flex-row sm:items-end sm:justify-between">

                                            {/* Price */}
                                            <div>
                                                <p className="text-xs text-gray-500">
                                                    Unit Price: ৳{order.price} × {order.quantity}
                                                </p>

                                                <p className="mt-1 text-sm font-semibold text-gray-700">
                                                    Total Amount
                                                </p>

                                                <p className="mt-1 text-2xl font-extrabold text-orange-500">
                                                    ৳{order.totalPrice}
                                                </p>
                                            </div>

                                            {/* Status Selection */}
                                            <div className="w-full sm:w-56">
                                                <label
                                                    htmlFor={`status-${order._id}`}
                                                    className="mb-2 block text-xs font-bold text-gray-600"
                                                >
                                                    Update Order Status
                                                </label>

                                                <div className="relative">
                                                    <select
                                                        id={`status-${order._id}`}
                                                        value={order.status}
                                                        disabled={
                                                            order.status === "cancelled" ||
                                                            updatingOrderId === order._id
                                                        }
                                                        onChange={(e) =>
                                                            handleStatusChange(
                                                                order,
                                                                e.target.value as VendorUpdateStatus
                                                            )
                                                        }
                                                        className={`w-full appearance-none rounded-xl border px-4 py-3 pr-10 text-sm font-bold capitalize outline-none transition-all focus:ring-4 focus:ring-orange-100 disabled:cursor-not-allowed disabled:opacity-60 ${statusStyles[order.status]}`}
                                                    >
                                                        <option value="pending">Pending</option>
                                                        <option value="accepted">Accepted</option>
                                                        <option value="rejected">Rejected</option>
                                                    </select>

                                                    <svg
                                                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16"
                                                        height="16"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    >
                                                        <path d="m6 9 6 6 6-6" />
                                                    </svg>
                                                </div>

                                                {updatingOrderId === order._id && (
                                                    <p className="mt-2 text-xs text-orange-600">
                                                        Updating status...
                                                    </p>
                                                )}

                                                {order.status === "cancelled" && (
                                                    <p className="mt-2 text-xs font-medium text-slate-500">
                                                        This order was cancelled by the customer. Status cannot be changed.
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default VendorOrders;
