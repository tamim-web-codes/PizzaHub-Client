"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { toast } from "sonner";

import {
    MapPin,
    Loader2,
    Crown,
} from "lucide-react";

import { TMenuItemData } from "@/components/types/type";
import { MenuEditDialoag } from "./MenuEditDialoag";
import { DeleteMenuItem } from "./MenuDeleteDialoag";
import { updateMenuAvailability } from "@/lib/actions/orderPost";

type Props = {
    item: TMenuItemData;
    vendorId: string;
    onDelete?: (id: string) => void;
    onAvailabilityChange?: (
        id: string,
        available: boolean
    ) => void;
};

const MenuItemCard = ({
    item,
    vendorId,
}: Props) => {
    const [isAvailable, setIsAvailable] = useState(
        item.isActive ?? true
    );

    const [isUpdating, setIsUpdating] = useState(false);

    // Database থেকে item update হলে state sync হবে
    useEffect(() => {
        setIsAvailable(item.isActive ?? true);
    }, [item.isActive]);

    const handleAvailability = async () => {
        if (isUpdating) return;

        const updatedValue = !isAvailable;

        try {
            setIsUpdating(true);

            const result = await updateMenuAvailability(
                item._id,
                vendorId,
                updatedValue
            );

            if (result.success) {
                setIsAvailable(updatedValue);

                toast.success(
                    updatedValue
                        ? "Menu item activated successfully!"
                        : "Menu item deactivated successfully!"
                );
            } else {
                toast.error(
                    result.message || "Failed to update availability"
                );
            }

        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : "Something went wrong";

            toast.error(message);

        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5,
                ease: "easeOut",
            }}
            whileHover={{
                y: -5,
                transition: { duration: 0.25 },
            }}
            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:border-red-200 hover:shadow-xl"
        >
            <div className="flex flex-col sm:flex-row">

                {/* Image */}
                <div className="relative h-56 shrink-0 overflow-hidden bg-slate-100 sm:h-auto sm:w-64 lg:w-72">
                    {item.ImageUrl ? (
                        <Image
                            src={item.ImageUrl}
                            alt={item.itemName || "Menu item"}
                            fill
                            sizes="(max-width: 640px) 100vw, 288px"
                            className="object-cover transition duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex h-full min-h-48 items-center justify-center text-slate-400">
                            <span className="text-sm">
                                No image available
                            </span>
                        </div>
                    )}

                    {/* Premium Badge */}
                    {item.isPremiumItem === true && (
                        <div className="absolute left-3 top-3 z-20 inline-flex items-center gap-1.5 rounded-full border border-amber-300/70 bg-gradient-to-r from-amber-400 to-yellow-500 px-3 py-1.5 text-xs font-bold text-amber-950 shadow-lg">
                            <Crown size={14} className="fill-amber-950" />
                            Premium
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="flex min-w-0 flex-1 flex-col justify-between p-5 lg:p-6">

                    <div>
                        {/* Category and Price */}
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <span className="rounded-md bg-red-50 px-3 py-1 text-xs font-semibold capitalize text-red-600">
                                {item.category}
                            </span>

                            <p className="text-xl font-bold text-red-600">
                                ৳{item.price}
                            </p>
                        </div>

                        {/* Name */}
                        <h3 className="mt-3 text-xl font-bold text-slate-900 transition group-hover:text-red-600">
                            {item.itemName}
                        </h3>

                        {/* Description */}
                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
                            {item.description}
                        </p>

                        {/* Location */}
                        <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                            <MapPin
                                size={17}
                                className="shrink-0 text-red-500"
                            />

                            <span className="truncate">
                                {item.location}
                            </span>
                        </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="mt-5 border-t border-slate-100 pt-4">

                        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">

                            {/* Availability Switch */}
                            <div className="flex items-center gap-3">

                                <button
                                    type="button"
                                    role="switch"
                                    aria-checked={isAvailable}
                                    onClick={handleAvailability}
                                    disabled={isUpdating}
                                    className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 disabled:cursor-wait disabled:opacity-60 ${isAvailable
                                        ? "bg-emerald-500"
                                        : "bg-slate-300"
                                        }`}
                                >
                                    <span
                                        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ${isAvailable
                                            ? "translate-x-6"
                                            : "translate-x-1"
                                            }`}
                                    />
                                </button>

                                <div className="flex flex-col">
                                    <span
                                        className={`text-sm font-bold ${isAvailable
                                            ? "text-emerald-600"
                                            : "text-slate-500"
                                            }`}
                                    >
                                        {isUpdating
                                            ? "Updating..."
                                            : isAvailable
                                                ? "Available"
                                                : "Unavailable"}
                                    </span>

                                    <span className="text-xs text-slate-400">
                                        {isAvailable
                                            ? "Your item is active"
                                            : "Your item is inactive"}
                                    </span>
                                </div>

                                {isUpdating && (
                                    <Loader2
                                        size={16}
                                        className="animate-spin text-red-500"
                                    />
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="grid grid-cols-3 gap-2">
                                <MenuEditDialoag item={item} />

                                <DeleteMenuItem item={item} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default MenuItemCard;