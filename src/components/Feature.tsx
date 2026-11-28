
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    ArrowRight,
    MapPin,
    UtensilsCrossed,
    Star,
    Crown,
    RefreshCw,
    CheckCircle2,
    Clock,
    XCircle,
    EyeOff,
} from "lucide-react";
import { getFeaturedMenuItems } from "@/lib/api/myMenut";

type FeaturedMenuItem = {
    _id: string;
    itemName: string;
    category: string;
    price: number;
    location: string;

    ImageUrl?: string;
    vendorName?: string;
    vendorImage?: string;

    status?: string;
    isActive?: boolean;

    isPremiumItem?: boolean;
};

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
        },
    },
};

const cardVariants = {
    hidden: {
        opacity: 0,
        y: 30,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut" as const,
        },
    },
};

const getStatusInfo = (status?: string, isActive?: boolean) => {
    const normalizedStatus = status?.toLowerCase();

    if (normalizedStatus === "approved") {
        return {
            label: "Approved",
            className: "bg-green-500 text-white",
            icon: CheckCircle2,
        };
    }

    if (normalizedStatus === "pending") {
        return {
            label: "Pending",
            className: "bg-amber-500 text-white",
            icon: Clock,
        };
    }

    if (normalizedStatus === "rejected") {
        return {
            label: "Rejected",
            className: "bg-red-500 text-white",
            icon: XCircle,
        };
    }

    if (normalizedStatus === "inactive" || isActive === false) {
        return {
            label: "Inactive",
            className: "bg-gray-600 text-white",
            icon: EyeOff,
        };
    }

    return {
        label: status || "Unknown",
        className: "bg-gray-500 text-white",
        icon: Clock,
    };
};

const Feature = () => {
    const [items, setItems] = useState<FeaturedMenuItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchFeaturedItems = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getFeaturedMenuItems();

            console.log("Featured Menu Data:", data);

            setItems(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Featured Menu Error:", err);

            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to load menu items."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFeaturedItems();
    }, []);

    return (
        <section className="relative overflow-hidden bg-white py-12 sm:py-20 lg:py-20">

            {/* Background Decoration */}
            <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-orange-400/5 blur-3xl" />

            <div className="pointer-events-none absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-red-400/5 blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">

                {/* Section Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="mb-10 text-center sm:mb-12"
                >
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-3 py-1.5 text-xs font-semibold text-orange-700 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm">
                        <Star size={14} className="fill-current" />
                        Our Special Selection
                    </span>

                    <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-gray-900 sm:mt-5 sm:text-4xl lg:text-5xl">
                        Featured{" "}
                        <span className="text-orange-600">
                            Menu Items
                        </span>
                    </h2>

                    <p className="mx-auto mt-3 max-w-2xl text-xs leading-6 text-gray-500 sm:mt-4 sm:text-base sm:leading-7">
                        Explore our delicious pizza collection, freshly prepared
                        by our talented restaurant vendors.
                    </p>
                </motion.div>

                {/* Loading State */}
                {loading && (
                    <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 lg:gap-7">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div
                                key={index}
                                className="animate-pulse overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm sm:rounded-3xl"
                            >
                                <div className="h-28 bg-gray-100 sm:h-56" />

                                <div className="space-y-3 p-3 sm:space-y-4 sm:p-5">
                                    <div className="h-4 w-3/4 rounded bg-gray-100 sm:h-5" />
                                    <div className="h-3 w-1/2 rounded bg-gray-100 sm:h-4" />
                                    <div className="h-8 rounded bg-gray-100 sm:h-10" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Error State */}
                {!loading && error && (
                    <div className="rounded-2xl border border-red-100 bg-white p-6 text-center sm:rounded-3xl sm:p-10">
                        <p className="mb-5 text-sm text-red-600 sm:text-base">
                            {error}
                        </p>

                        <button
                            onClick={fetchFeaturedItems}
                            className="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-700"
                        >
                            <RefreshCw size={17} />
                            Try Again
                        </button>
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && items.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-4 py-12 text-center sm:rounded-3xl sm:py-16">
                        <UtensilsCrossed
                            size={38}
                            className="mx-auto text-orange-500"
                        />

                        <h3 className="mt-4 text-lg font-bold text-gray-900 sm:text-xl">
                            No Featured Items Yet
                        </h3>

                        <p className="mt-2 text-xs text-gray-500 sm:text-sm">
                            Delicious pizzas will appear here soon!
                        </p>
                    </div>
                )}

                {/* Featured Menu Cards */}
                {!loading && !error && items.length > 0 && (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 lg:gap-7"
                    >
                        {items.map((item) => {
                            // Find available image URL
                      

                            // Status information
                            const statusInfo = getStatusInfo(
                                item.status,
                                item.isActive
                            );

                            const StatusIcon = statusInfo.icon;

                            return (
                                <motion.article
                                    key={item._id}
                                    variants={cardVariants}
                                    whileHover={{ y: -6 }}
                                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-orange-500/10 sm:rounded-3xl"
                                >
                                    {/* Image */}
                                    <div className="relative h-28 overflow-hidden bg-gray-100 sm:h-56">

                                        <Image
                                            src={item.ImageUrl || "/default-pizza.jpg"}
                                            alt={item.itemName}
                                            fill
                                            unoptimized
                                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            onError={(event) => {
                                                event.currentTarget.src =
                                                    "/default-pizza.jpg";
                                            }}
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                                        {/* Category */}
                                        <span className="absolute bottom-2 left-2 max-w-[85%] truncate rounded-full border border-white/20 bg-black/50 px-2 py-1 text-[9px] font-semibold text-white backdrop-blur-md sm:bottom-4 sm:left-4 sm:px-3 sm:py-1.5 sm:text-xs">
                                            {item.category}
                                        </span>

                                        {/* Status Badge */}
                                        <span
                                            className={`absolute left-2 top-2 inline-flex items-center gap-1 rounded-full px-2 py-1 text-[9px] font-bold shadow-md sm:left-4 sm:top-4 sm:px-3 sm:py-1.5 sm:text-xs ${statusInfo.className}`}
                                        >
                                            <StatusIcon size={11} />
                                            {statusInfo.label}
                                        </span>

                                        {/* Premium Badge */}
                                        {item.isPremiumItem === true && (
                                            <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 px-2 py-1 text-[9px] font-bold text-amber-950 shadow-lg sm:right-4 sm:top-4 sm:px-3 sm:py-1.5 sm:text-xs">
                                                <Crown size={11} />
                                                Premium
                                            </span>
                                        )}
                                    </div>

                                    {/* Card Content */}
                                    <div className="flex flex-1 flex-col p-2.5 sm:p-5 lg:p-6">

                                        {/* Name & Price */}
                                        <div className="flex items-start justify-between gap-1.5 sm:gap-3">
                                            <h3 className="line-clamp-2 text-xs font-bold leading-5 text-gray-900 transition-colors group-hover:text-orange-600 sm:text-lg sm:leading-7">
                                                {item.itemName}
                                            </h3>

                                            <p className="shrink-0 text-xs font-extrabold text-orange-600 sm:text-lg">
                                                ৳{item.price}
                                            </p>
                                        </div>

                                        {/* Location */}
                                        <div className="mt-2 flex items-center gap-1 text-[10px] text-gray-500 sm:mt-4 sm:gap-2 sm:text-sm">
                                            <MapPin
                                                size={13}
                                                className="shrink-0 text-orange-500 sm:h-4 sm:w-4"
                                            />

                                            <span className="line-clamp-1">
                                                {item.location}
                                            </span>
                                        </div>

                                        {/* Vendor Information */}
                                        <div className="mt-3 flex items-center gap-2 border-t border-gray-100 pt-3 sm:mt-5 sm:gap-3 sm:pt-4">

                                            <div className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full bg-orange-100 sm:h-10 sm:w-10">
                                                {item.vendorImage ? (
                                                    <Image
                                                        src={item.vendorImage}
                                                        alt={item.vendorName || "Vendor"}
                                                        fill
                                                        unoptimized
                                                        sizes="40px"
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center text-xs font-bold text-orange-600 sm:text-sm">
                                                        {(item.vendorName || "V")
                                                            .charAt(0)
                                                            .toUpperCase()}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="min-w-0">
                                                <p className="text-[9px] text-gray-400 sm:text-[11px]">
                                                    Prepared by
                                                </p>

                                                <p className="truncate text-[10px] font-semibold text-gray-800 sm:text-sm">
                                                    {item.vendorName || "Unknown Vendor"}
                                                </p>
                                            </div>
                                        </div>

                                        {/* View Details */}
                                        <Link
                                            href={`/brows-menu/${item._id}`}
                                            className="mt-3 flex w-full items-center justify-center gap-1 rounded-lg bg-orange-600 px-2 py-2 text-[10px] font-bold text-white transition-all duration-300 hover:bg-orange-700 sm:mt-5 sm:gap-2 sm:rounded-xl sm:px-5 sm:py-3 sm:text-sm"
                                        >
                                            View Details

                                            <ArrowRight
                                                size={13}
                                                className="transition-transform group-hover:translate-x-1 sm:h-4 sm:w-4"
                                            />
                                        </Link>
                                    </div>
                                </motion.article>
                            );
                        })}
                    </motion.div>
                )}

                {/* Explore Menu Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="mt-10 text-center sm:mt-12"
                >
                    <Link
                        href="/brows-menu"
                        className="inline-flex items-center gap-2 rounded-xl border-2 border-orange-600 px-5 py-3 text-xs font-bold text-orange-600 transition-all hover:bg-orange-600 hover:text-white sm:px-7 sm:py-3.5 sm:text-sm"
                    >
                        Explore All Pizzas
                        <ArrowRight size={16} />
                    </Link>
                </motion.div>

            </div>
        </section>
    );
};

export default Feature;
