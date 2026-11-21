"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
    MapPin,
    Pencil,
    Trash2,
    Eye,
    Clock,
    CheckCircle2,
    XCircle,
    ToggleLeft,
    ToggleRight,
} from "lucide-react";

import { TMenuItemData } from "@/components/types/type";
import { MenuEditDialoag } from "./MenuEditDialoag";
import { DeleteMenuItem } from "./MenuDeleteDialoag";

type Props = {
    item: TMenuItemData;
    onDelete?: (id: string) => void;
    onAvailabilityChange?: (id: string, available: boolean) => void;
};


const MenuItemCard = ({
    item,
    onDelete,
    onAvailabilityChange,
}: Props) => {
    const [isAvailable, setIsAvailable] = useState(
        item.isAvailable ?? false
    );


    const handleAvailability = () => {
        if (item.status !== "approved") return;

        const updatedValue = !isAvailable;

        setIsAvailable(updatedValue);
        onAvailabilityChange?.(item._id, updatedValue);
    };

    return (
        <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:border-red-200 hover:shadow-md">

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
                            <span className="text-sm">No image available</span>
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
                            <MapPin size={17} className="shrink-0 text-red-500" />
                            <span className="truncate">
                                {item.location}
                            </span>
                        </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="mt-5 border-t border-slate-100 pt-4">

                        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">

                            {/* Availability */}
                            <button
                                type="button"
                                onClick={handleAvailability}
                                disabled={item.status !== "approved"}
                                className={`inline-flex w-fit items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition ${item.status !== "approved"
                                    ? "cursor-not-allowed bg-slate-100 text-slate-400"
                                    : isAvailable
                                        ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                    }`}
                                title={
                                    item.status !== "approved"
                                        ? "Only approved items can be made available"
                                        : "Change availability"
                                }
                            >
                                {isAvailable ? (
                                    <ToggleRight size={20} />
                                ) : (
                                    <ToggleLeft size={20} />
                                )}

                                {isAvailable ? "Available" : "Unavailable"}
                            </button>

                            {/* Action Buttons */}
                            <div className="grid grid-cols-3 gap-2">

                                <MenuEditDialoag item={item} />

                                <DeleteMenuItem item={item} />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuItemCard;