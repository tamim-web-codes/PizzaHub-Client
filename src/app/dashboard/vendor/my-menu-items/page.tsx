
import {
    Pizza,
    Plus,
    Utensils,
} from "lucide-react";
import Link from "next/link";

import MenuItemCard from "@/app/components/menuItemCard";
import { myMenuItem } from "@/lib/api/myMenut";
import { TMenuItemData } from "@/components/types/type";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const MyMenuItem = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const vendorId = session?.user.id;

    let menuItems: TMenuItemData[] = [];

    if (vendorId) {
        try {
            const result = await myMenuItem(vendorId);

            menuItems = Array.isArray(result) ? result : [];
        } catch (error) {
            console.error("Failed to fetch menu items:", error);
        }
    }

    return (
        <div className="space-y-7">

            {/* Header */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-red-600">
                        <Pizza size={18} />
                        Vendor Dashboard
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                        My Menu Items
                    </h1>
                </div>

                <Link
                    href="/dashboard/vendor/add-menu-item"
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700"
                >
                    <Plus size={18} />
                    Add Menu Item
                </Link>
            </div>

            {/* Menu Items */}
            <div>
                <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm text-slate-500">
                        {menuItems.length} menu items in your restaurant.
                        Manage your items and availability.
                    </p>
                </div>

                {menuItems.length > 0 ? (
                    <div className="space-y-4">
                        {menuItems.map((item) => (
                            <MenuItemCard
                                key={item._id}
                                item={item}
                                vendorId={vendorId}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-16 text-center">
                        <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                            <Utensils size={28} />
                        </div>

                        <h3 className="text-lg font-bold text-slate-800">
                            No menu items found
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                            You have not added any menu items yet.
                        </p>

                        <Link
                            href="/dashboard/vendor/add-menu-item"
                            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
                        >
                            <Plus size={17} />
                            Add Your First Item
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyMenuItem;
