
"use client";

import {
    memo,
    useCallback,
    useDeferredValue,
    useMemo,
    useState,
} from "react";
import Image from "next/image";
import {
    Search,
    Pizza,
    Clock,
    CheckCircle2,
    XCircle,
    Trash2,
    RefreshCw,
    Loader2,
    Power,
    Filter,
} from "lucide-react";
import { toast } from "sonner";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
    deleteAdminMenuItem,
    getAdminMenuItems,
    updateMenuItemStatus,
} from "@/lib/api/adminApi";

type MenuItem = {
    _id: string;
    itemName: string;
    category: string;
    description?: string;
    price: number;
    location?: string;
    vendorId?: string;
    vendorName?: string;
    businessName?: string;
    ImageUrl?: string;
    imageUrl?: string;
    image?: string;
    status: "pending" | "approved" | "rejected";
    isActive: boolean;
    createdAt?: string;
};

type FilterStatus = "all" | "pending" | "approved" | "rejected";

type Props = {
    initialMenuItems: MenuItem[];
};

const statusStyles: Record<string, string> = {
    pending: "bg-amber-100 text-amber-700",
    approved: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
};

const getImage = (item: MenuItem) =>
    item.ImageUrl || item.imageUrl || item.image || "/default-menu.png";

export default function AdminMenuItemsClient({
    initialMenuItems,
}: Props) {
    const [menuItems, setMenuItems] = useState<MenuItem[]>(
        Array.isArray(initialMenuItems) ? initialMenuItems : []
    );

    const [search, setSearch] = useState("");
    const deferredSearch = useDeferredValue(search);

    const [status, setStatus] = useState<FilterStatus>("all");
    const [category, setCategory] = useState("all");

    const [loading, setLoading] = useState(false);
    const [updatingId, setUpdatingId] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [deleteItem, setDeleteItem] = useState<MenuItem | null>(null);

    // Search and Filter
    const filteredItems = useMemo(() => {
        const searchValue = deferredSearch.toLowerCase().trim();

        return menuItems.filter((item) => {
            const matchesSearch =
                (item.itemName || "").toLowerCase().includes(searchValue);

            const matchesStatus =
                status === "all" || item.status === status;

            const matchesCategory =
                category === "all" || item.category === category;

            return matchesSearch && matchesStatus && matchesCategory;
        });
    }, [menuItems, deferredSearch, status, category]);

    // Categories
    const categories = useMemo(() => {
        return Array.from(
            new Set(menuItems.map((item) => item.category).filter(Boolean))
        );
    }, [menuItems]);

    // Statistics
    const stats = useMemo(
        () => ({
            total: menuItems.length,
            pending: menuItems.filter((item) => item.status === "pending").length,
            approved: menuItems.filter((item) => item.status === "approved").length,
            rejected: menuItems.filter((item) => item.status === "rejected").length,
        }),
        [menuItems]
    );

    // Refresh
    const fetchMenuItems = useCallback(async () => {
        try {
            setLoading(true);

            const result = await getAdminMenuItems();

            if (result?.success && Array.isArray(result.menuItems)) {
                setMenuItems(result.menuItems);
                toast.success("Menu items refreshed");
            } else {
                throw new Error(result?.message || "Failed to refresh menu items");
            }
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    }, []);

    // Approve / Reject
    const handleStatusChange = useCallback(
        async (id: string, newStatus: "approved" | "rejected") => {
            try {
                setUpdatingId(id);

                await updateMenuItemStatus(id, newStatus);

                setMenuItems((previous) =>
                    previous.map((item) =>
                        item._id === id
                            ? { ...item, status: newStatus }
                            : item
                    )
                );

                toast.success(
                    newStatus === "approved"
                        ? "Menu item approved successfully"
                        : "Menu item rejected successfully"
                );
            } catch (error) {
                toast.error(
                    error instanceof Error ? error.message : "Something went wrong"
                );
            } finally {
                setUpdatingId(null);
            }
        },
        []
    );

    // Availability
    const handleAvailability = useCallback(async (item: MenuItem) => {
        const newAvailability = !item.isActive;

        try {
            setUpdatingId(item._id);

            // এখানে availability update করার আলাদা API ব্যবহার করতে হবে।
            // deleteAdminMenuItem() দিয়ে availability toggle করা যাবে না।
            // তোমার backend endpoint অনুযায়ী helper বসাবে।

            toast.error("Availability update API is not configured");
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : "Something went wrong"
            );
        } finally {
            setUpdatingId(null);
        }
    }, []);

    // Delete
    const handleDelete = useCallback(async () => {
        if (!deleteItem) return;

        const id = deleteItem._id;

        try {
            setDeletingId(id);

            await deleteAdminMenuItem(id);

            setMenuItems((previous) =>
                previous.filter((item) => item._id !== id)
            );

            toast.success("Menu item deleted successfully");
            setDeleteItem(null);
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : "Something went wrong"
            );
        } finally {
            setDeletingId(null);
        }
    }, [deleteItem]);

    const statCards = [
        {
            title: "Total Items",
            value: stats.total,
            icon: Pizza,
            color: "bg-blue-100 text-blue-600",
        },
        {
            title: "Pending",
            value: stats.pending,
            icon: Clock,
            color: "bg-amber-100 text-amber-600",
        },
        {
            title: "Approved",
            value: stats.approved,
            icon: CheckCircle2,
            color: "bg-green-100 text-green-600",
        },
        {
            title: "Rejected",
            value: stats.rejected,
            icon: XCircle,
            color: "bg-red-100 text-red-600",
        },
    ];

    return (
        <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-7xl space-y-7">

                {/* Header */}
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <div className="flex items-center gap-3">
                            <div className="rounded-xl bg-orange-100 p-3 text-orange-600">
                                <Pizza size={25} />
                            </div>

                            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                                Manage Menu Items
                            </h1>
                        </div>

                        <p className="mt-2 text-sm text-gray-500">
                            Review, approve and manage restaurant menu items.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={fetchMenuItems}
                        disabled={loading}
                        className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:opacity-50"
                    >
                        <RefreshCw
                            size={17}
                            className={loading ? "animate-spin" : ""}
                        />
                        Refresh
                    </button>
                </div>

                {/* Search & Filters */}
                <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
                    <div className="grid gap-4 md:grid-cols-[1fr_190px_190px]">
                        <div className="relative">
                            <Search
                                size={19}
                                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search menu item..."
                                className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-800 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                            />
                        </div>

                        <div className="relative">
                            <Filter
                                size={17}
                                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <select
                                value={status}
                                onChange={(e) =>
                                    setStatus(e.target.value as FilterStatus)
                                }
                                className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-gray-700 outline-none focus:border-orange-400"
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>

                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none focus:border-orange-400"
                        >
                            <option value="all">All Categories</option>
                            {categories.map((itemCategory) => (
                                <option key={itemCategory} value={itemCategory}>
                                    {itemCategory}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Items */}
                <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                    <div className="border-b border-gray-100 px-5 py-4">
                        <h2 className="font-bold text-gray-900">
                            All Menu Items
                        </h2>
                        <p className="mt-1 text-xs text-gray-500">
                            Showing {filteredItems.length} of {menuItems.length} menu items
                        </p>
                    </div>

                    {loading ? (
                        <MenuItemsLoading />
                    ) : filteredItems.length === 0 ? (
                        <div className="flex min-h-64 flex-col items-center justify-center gap-3 p-6 text-center">
                            <Pizza size={35} className="text-orange-500" />
                            <h3 className="font-bold text-gray-800">
                                No menu items found
                            </h3>
                            <p className="text-sm text-gray-500">
                                Try changing your search or filters.
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* Desktop Table */}
                            <div className="hidden overflow-x-auto lg:block">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                                        <tr>
                                            <th className="px-5 py-4">Menu Item</th>
                                            <th className="px-5 py-4">Vendor</th>
                                            <th className="px-5 py-4">Category</th>
                                            <th className="px-5 py-4">Price</th>
                                            <th className="px-5 py-4">Status</th>
                                            <th className="px-5 py-4">Availability</th>
                                            <th className="px-5 py-4 text-center">Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-gray-100">
                                        {filteredItems.map((item) => (
                                            <MenuItemRow
                                                key={item._id}
                                                item={item}
                                                updating={updatingId === item._id}
                                                deleting={deletingId === item._id}
                                                onStatusChange={handleStatusChange}
                                                onAvailability={handleAvailability}
                                                onDelete={() => setDeleteItem(item)}
                                            />
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile Cards */}
                            <div className="grid gap-4 p-4 lg:hidden">
                                {filteredItems.map((item) => (
                                    <MenuItemCard
                                        key={item._id}
                                        item={item}
                                        updating={updatingId === item._id}
                                        deleting={deletingId === item._id}
                                        onStatusChange={handleStatusChange}
                                        onAvailability={handleAvailability}
                                        onDelete={() => setDeleteItem(item)}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Delete Dialog */}
            <AlertDialog
                open={!!deleteItem}
                onOpenChange={(open) => {
                    if (!open && !deletingId) setDeleteItem(null);
                }}
            >
                <AlertDialogContent className="max-w-[420px] overflow-hidden rounded-2xl border border-gray-100 bg-white p-0 shadow-2xl">
                    <div className="px-6 pt-7">
                        <AlertDialogHeader className="items-center text-center">
                            <AlertDialogMedia className="mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600 ring-8 ring-red-50/60">
                                <Trash2 className="h-7 w-7" />
                            </AlertDialogMedia>

                            <AlertDialogTitle className="text-xl font-bold text-gray-900">
                                Delete Menu Item?
                            </AlertDialogTitle>

                            <AlertDialogDescription className="mt-2 max-w-[320px] text-center text-sm leading-6 text-gray-500">
                                Are you sure you want to delete this menu item? This action cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>

                        {deleteItem && (
                            <div className="mt-5 flex items-center gap-3 rounded-xl border border-red-100 bg-red-50/50 p-3">
                                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-white">
                                    <Image
                                        src={getImage(deleteItem)}
                                        alt={deleteItem.itemName}
                                        fill
                                        unoptimized
                                        sizes="56px"
                                        className="object-cover"
                                    />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-bold text-gray-900">
                                        {deleteItem.itemName}
                                    </p>
                                    <p className="mt-1 text-xs capitalize text-gray-500">
                                        {deleteItem.category}
                                    </p>
                                    <p className="mt-1 text-sm font-semibold text-orange-600">
                                        ৳{deleteItem.price}
                                    </p>
                                </div>

                                <Trash2 size={18} className="text-red-600" />
                            </div>
                        )}

                        <div className="mt-4 flex gap-2 rounded-lg bg-amber-50 px-3 py-2.5">
                            <span className="text-amber-600">⚠</span>
                            <p className="text-xs leading-5 text-amber-800">
                                Deleting this item will permanently remove it from the menu.
                            </p>
                        </div>
                    </div>

                    <AlertDialogFooter className="mt-6 flex-row justify-end gap-3 border-t border-gray-100 bg-gray-50/80 px-6 py-4">
                        <AlertDialogCancel
                            disabled={!!deletingId}
                            className="mt-0 h-11 flex-1 rounded-xl border border-gray-200 bg-white font-semibold text-gray-700 hover:bg-gray-100"
                        >
                            Cancel
                        </AlertDialogCancel>

                        <AlertDialogAction
                            variant="destructive"
                            disabled={!!deletingId}
                            onClick={(event) => {
                                event.preventDefault();
                                handleDelete();
                            }}
                            className="h-11 flex-1 rounded-xl mb-4 bg-red-600 font-semibold text-white hover:bg-red-700 disabled:opacity-60"
                        >
                            {deletingId ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Deleting...
                                </>
                            ) : (
                                <>
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete Item
                                </>
                            )}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

// Desktop Row
const MenuItemRow = memo(function MenuItemRow({
    item,
    updating,
    deleting,
    onStatusChange,
    onAvailability,
    onDelete,
}: {
    item: MenuItem;
    updating: boolean;
    deleting: boolean;
    onStatusChange: (id: string, status: "approved" | "rejected") => void;
    onAvailability: (item: MenuItem) => void;
    onDelete: () => void;
}) {
    return (
        <tr className="transition-colors duration-150 hover:bg-orange-50/50">
            <td className="px-5 py-4">
                <div className="flex min-w-52 items-center gap-3">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                        <Image
                            src={getImage(item)}
                            alt={item.itemName}
                            fill
                            unoptimized
                            sizes="48px"
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <p className="font-semibold text-gray-900">
                            {item.itemName}
                        </p>
                        <p className="mt-1 max-w-44 truncate text-xs text-gray-500">
                            {item.location || "No location"}
                        </p>
                    </div>
                </div>
            </td>

            <td className="px-5 py-4 text-sm text-gray-600">
                {item.businessName || item.vendorName || "Vendor"}
            </td>

            <td className="px-5 py-4">
                <span className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium capitalize text-gray-600">
                    {item.category}
                </span>
            </td>

            <td className="px-5 py-4 text-sm font-semibold text-gray-900">
                ৳{item.price}
            </td>

            <td className="px-5 py-4">
                <StatusBadge status={item.status} />
            </td>

            <td className="px-5 py-4">
                <AvailabilityBadge active={item.isActive} />
            </td>

            <td className="px-5 py-4">
                <div className="flex items-center justify-center gap-2">
                    {item.status === "pending" && (
                        <>
                            <ActionButton
                                title="Approve"
                                color="green"
                                disabled={updating}
                                onClick={() => onStatusChange(item._id, "approved")}
                                icon={<CheckCircle2 size={17} />}
                            />
                            <ActionButton
                                title="Reject"
                                color="red"
                                disabled={updating}
                                onClick={() => onStatusChange(item._id, "rejected")}
                                icon={<XCircle size={17} />}
                            />
                        </>
                    )}

                    {item.status === "approved" && (
                        <ActionButton
                            title={item.isActive ? "Deactivate" : "Activate"}
                            color={item.isActive ? "amber" : "green"}
                            disabled={updating}
                            onClick={() => onAvailability(item)}
                            icon={updating ? <Loader2 size={17} className="animate-spin" /> : <Power size={17} />}
                        />
                    )}

                    <ActionButton
                        title="Delete"
                        color="red"
                        disabled={deleting}
                        onClick={onDelete}
                        icon={<Trash2 size={17} />}
                    />
                </div>
            </td>
        </tr>
    );
});

// Mobile Card
const MenuItemCard = memo(function MenuItemCard({
    item,
    updating,
    deleting,
    onStatusChange,
    onAvailability,
    onDelete,
}: {
    item: MenuItem;
    updating: boolean;
    deleting: boolean;
    onStatusChange: (id: string, status: "approved" | "rejected") => void;
    onAvailability: (item: MenuItem) => void;
    onDelete: () => void;
}) {
    return (
        <div className="rounded-xl border border-gray-100 bg-white p-4 transition-shadow duration-200 hover:shadow-md">
            <div className="flex gap-3">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                    <Image
                        src={getImage(item)}
                        alt={item.itemName}
                        fill
                        unoptimized
                        sizes="80px"
                        className="object-cover"
                    />
                </div>

                <div className="min-w-0 flex-1">
                    <h3 className="truncate font-bold text-gray-900">
                        {item.itemName}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                        {item.businessName || item.vendorName || "Vendor"}
                    </p>
                    <p className="mt-1 font-semibold text-orange-600">
                        ৳{item.price}
                    </p>
                    <p className="mt-1 text-xs capitalize text-gray-500">
                        {item.category}
                    </p>
                </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                <StatusBadge status={item.status} />
                <AvailabilityBadge active={item.isActive} />
            </div>

            <div className="mt-4 flex flex-wrap gap-2 border-t border-gray-100 pt-3">
                {item.status === "pending" && (
                    <>
                        <button
                            type="button"
                            disabled={updating}
                            onClick={() => onStatusChange(item._id, "approved")}
                            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-green-50 px-3 py-2.5 text-xs font-semibold text-green-700 disabled:opacity-50"
                        >
                            <CheckCircle2 size={15} />
                            Approve
                        </button>

                        <button
                            type="button"
                            disabled={updating}
                            onClick={() => onStatusChange(item._id, "rejected")}
                            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-red-50 px-3 py-2.5 text-xs font-semibold text-red-700 disabled:opacity-50"
                        >
                            <XCircle size={15} />
                            Reject
                        </button>
                    </>
                )}

                {item.status === "approved" && (
                    <button
                        type="button"
                        disabled={updating}
                        onClick={() => onAvailability(item)}
                        className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-amber-50 px-3 py-2.5 text-xs font-semibold text-amber-700 disabled:opacity-50"
                    >
                        {updating ? (
                            <Loader2 size={15} className="animate-spin" />
                        ) : (
                            <Power size={15} />
                        )}
                        {item.isActive ? "Deactivate" : "Activate"}
                    </button>
                )}

                <button
                    type="button"
                    disabled={deleting}
                    onClick={onDelete}
                    className="flex items-center justify-center gap-1.5 rounded-lg bg-red-50 px-3 py-2.5 text-xs font-semibold text-red-600 hover:bg-red-100 disabled:opacity-50"
                >
                    <Trash2 size={15} />
                    Delete
                </button>
            </div>
        </div>
    );
});

function StatusBadge({ status }: { status: MenuItem["status"] }) {
    return (
        <span className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${statusStyles[status] || "bg-gray-100 text-gray-600"}`}>
            {status}
        </span>
    );
}

function AvailabilityBadge({ active }: { active: boolean }) {
    return (
        <span className={`text-xs font-semibold ${active ? "text-green-600" : "text-gray-400"}`}>
            {active ? "Active" : "Inactive"}
        </span>
    );
}

function ActionButton({
    title,
    color,
    disabled,
    onClick,
    icon,
}: {
    title: string;
    color: "green" | "red" | "amber";
    disabled: boolean;
    onClick: () => void;
    icon: React.ReactNode;
}) {
    const colors = {
        green: "bg-green-50 text-green-600 hover:bg-green-100",
        red: "bg-red-50 text-red-600 hover:bg-red-100",
        amber: "bg-amber-50 text-amber-600 hover:bg-amber-100",
    };

    return (
        <button
            type="button"
            title={title}
            aria-label={title}
            disabled={disabled}
            onClick={onClick}
            className={`rounded-lg p-2 transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50 ${colors[color]}`}
        >
            {icon}
        </button>
    );
}

// Loading Skeleton
export function MenuItemsLoading() {
    return (
        <div className="animate-pulse p-5">
            <div className="hidden lg:block">
                <div className="mb-5 grid grid-cols-7 gap-4">
                    {Array.from({ length: 7 }).map((_, index) => (
                        <div key={index} className="h-4 rounded bg-gray-100" />
                    ))}
                </div>

                {Array.from({ length: 6 }).map((_, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-7 items-center gap-4 border-t border-gray-100 py-5"
                    >
                        {Array.from({ length: 7 }).map((_, i) => (
                            <div key={i} className="h-10 rounded-lg bg-gray-100" />
                        ))}
                    </div>
                ))}
            </div>

            <div className="grid gap-4 lg:hidden">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="rounded-xl border border-gray-100 p-4">
                        <div className="flex gap-3">
                            <div className="h-20 w-20 rounded-xl bg-gray-100" />
                            <div className="flex-1 space-y-3">
                                <div className="h-4 w-3/4 rounded bg-gray-100" />
                                <div className="h-3 w-1/2 rounded bg-gray-100" />
                                <div className="h-4 w-1/3 rounded bg-gray-100" />
                            </div>
                        </div>
                        <div className="mt-4 h-8 rounded bg-gray-100" />
                    </div>
                ))}
            </div>
        </div>
    );
}
