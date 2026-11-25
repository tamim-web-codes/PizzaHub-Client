
"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
    MapPin,
    Store,
    ChefHat,
    Tag,
    ShoppingBag,
    ImageIcon,
    CheckCircle2,
    Utensils,
    Clock,
    Minus,
    Plus,
    CalendarDays,
    Phone,
    MapPinned,
    Loader2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";


import { addOrderPost } from "@/lib/actions/orderPost";
import { toast } from "sonner";
import { MenuDetailsData, OrderPostData } from "@/components/types/type";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const MenuDetails = ({ item }: { item: MenuDetailsData }) => {

    const router = useRouter()
    const { data: session } = authClient.useSession()
    const images = Array.from(
        new Set(
            [...(item.images ?? []), item.ImageUrl].filter(
                (image): image is string =>
                    typeof image === "string" && image.trim().length > 0
            )
        )
    );

    const [activeImage, setActiveImage] = useState(images[0] ?? "");
    const [imageError, setImageError] = useState(false);

    const [open, setOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [deliveryDate, setDeliveryDate] = useState("");
    const [deliveryAddress, setDeliveryAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);

    const totalPrice = item.price * quantity;

    const today = new Date().toLocaleDateString("en-CA", {
        timeZone: "Asia/Dhaka",
    });

    const handleOrderNow = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Check login
        if (!session?.user) {
            toast.error("Please login before placing an order!");
            return;
        }

        // Only customer can place an order
        if (session.user.role !== "customer") {
            toast.error("Only customers can place orders!");
            return;
        }

        // Check delivery information
        if (!deliveryDate || !deliveryAddress.trim() || !phone.trim()) {
            toast.error("Please fill in all delivery details!");
            return;
        }

        setLoading(true);

        try {
            const data: OrderPostData = {
                menuItemId: item._id,
                imageUrl: item.ImageUrl,
                itemName: item.itemName,
                price: item.price,
                quantity,
                vendorId: item.vendorId,

                customerId: session.user.id,
                customerName: session.user.name,
                customerEmail: session.user.email,

                deliveryDate,
                deliveryAddress: deliveryAddress.trim(),
                phone: phone.trim(),

                totalPrice: item.price * quantity,
                status: "pending",
            };

            const res = await addOrderPost(data);

            if (res) {
                toast.success(res.message || "Order placed successfully!");

                setOpen(false);
                setQuantity(1);
                setDeliveryDate("");
                setDeliveryAddress("");
                setPhone("");

                router.push("/dashboard/customer/my-orders");
                router.refresh()
            } else {
                toast.error(res?.message || "Failed to place order!");
            }

        } catch (error) {
            console.error("Order failed:", error);
            toast.error("Failed to place order!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#fffaf7]">
            <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">

                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12"
                >

                    {/* Left: Image Section */}
                    <div className="space-y-4">

                        <div className="relative overflow-hidden rounded-3xl border border-orange-100 bg-white p-2 shadow-xl shadow-orange-100/60">
                            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-orange-50">

                                {activeImage && !imageError ? (
                                    <Image
                                        key={activeImage}
                                        src={activeImage}
                                        alt={item.itemName || "Food image"}
                                        fill
                                        priority
                                        sizes="(max-width: 768px) 100vw, 55vw"
                                        className="object-cover transition duration-700 hover:scale-105"
                                        onError={() => setImageError(true)}
                                    />
                                ) : (
                                    <div className="flex h-full flex-col items-center justify-center gap-3 text-orange-300">
                                        <ImageIcon className="size-16" />
                                        <p className="text-sm font-medium">
                                            Image not available
                                        </p>
                                    </div>
                                )}

                                <div className="absolute left-4 top-4">
                                    <Badge className="border-0 bg-white/95 px-4 py-2 text-xs font-bold capitalize text-red-600 shadow-md hover:bg-white">
                                        <Tag className="mr-1.5 size-3.5" />
                                        {item.category}
                                    </Badge>
                                </div>

                                <div className="absolute bottom-4 right-4">
                                    <Badge className="border-0 bg-emerald-500 px-3 py-1.5 text-white shadow-md hover:bg-emerald-500">
                                        <CheckCircle2 className="mr-1 size-3.5" />
                                        Available
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        {/* Thumbnail Gallery */}
                        {images.length > 1 && (
                            <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
                                {images.map((image, index) => (
                                    <button
                                        key={`${image}-${index}`}
                                        type="button"
                                        onClick={() => {
                                            setActiveImage(image);
                                            setImageError(false);
                                        }}
                                        aria-label={`View image ${index + 1}`}
                                        className={`relative aspect-square overflow-hidden rounded-xl border-2 bg-white p-1 transition ${activeImage === image
                                            ? "border-red-500 shadow-md shadow-red-100"
                                            : "border-orange-100 hover:border-orange-300"
                                            }`}
                                    >
                                        <Image
                                            src={image}
                                            alt={`${item.itemName} ${index + 1}`}
                                            fill
                                            sizes="120px"
                                            className="rounded-lg object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Small Info Cards */}
                        <div className="grid grid-cols-2 gap-3 pt-2">

                            <div className="flex items-center gap-3 rounded-2xl border border-orange-100 bg-white p-4">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                                    <Utensils className="size-5" />
                                </div>

                                <div>
                                    <p className="text-xs text-slate-400">
                                        Food Category
                                    </p>
                                    <p className="text-sm font-bold capitalize text-slate-800">
                                        {item.category}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 rounded-2xl border border-orange-100 bg-white p-4">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                                    <Clock className="size-5" />
                                </div>

                                <div>
                                    <p className="text-xs text-slate-400">
                                        Fresh Food
                                    </p>
                                    <p className="text-sm font-bold text-slate-800">
                                        Made with Care
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Right: Details Section */}
                    <div className="space-y-5">

                        {/* Title */}
                        <div className="rounded-3xl border border-orange-100 bg-white p-6 shadow-sm sm:p-7">

                            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                                <Badge className="border-0 bg-red-50 px-3 py-1.5 capitalize text-red-600 hover:bg-red-50">
                                    {item.category}
                                </Badge>

                                <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                                    <span className="size-2 rounded-full bg-emerald-500" />
                                    Available Now
                                </span>
                            </div>

                            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
                                {item.itemName}
                            </h2>

                            <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base">
                                {item.description}
                            </p>

                            {/* Price */}
                            <div className="mt-7 overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 to-orange-500 p-5 text-white shadow-lg shadow-red-100">
                                <p className="text-sm font-medium text-red-100">
                                    Our Price
                                </p>

                                <div className="mt-1 flex items-end justify-between gap-3">
                                    <p className="text-4xl font-extrabold tracking-tight">
                                        ৳{item.price}
                                    </p>

                                    <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur">
                                        Best Taste
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="rounded-3xl border border-orange-100 bg-white p-5 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                                    <MapPin className="size-6" />
                                </div>

                                <div className="min-w-0">
                                    <p className="text-xs font-medium text-slate-400">
                                        Restaurant Location
                                    </p>
                                    <p className="mt-1 truncate font-bold text-slate-800">
                                        {item.location}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Vendor Information */}
                        <div className="rounded-3xl border border-orange-100 bg-white p-5 shadow-sm">

                            <div className="flex items-center gap-2">
                                <Store className="size-5 text-red-500" />
                                <h3 className="font-bold text-slate-900">
                                    Restaurant Information
                                </h3>
                            </div>

                            <div className="mt-5 flex items-center gap-4 rounded-2xl bg-orange-50/70 p-4">
                                <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-white text-orange-600 shadow-sm">
                                    <ChefHat className="size-7" />
                                </div>

                                <div className="min-w-0">
                                    <p className="truncate font-bold text-slate-900">
                                        {item.vendor?.businessName ||
                                            item.vendor?.name ||
                                            "Restaurant"}
                                    </p>

                                    <p className="mt-1 text-xs text-slate-500">
                                        PizzaHub Restaurant Partner
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Order Dialog */}
                        <div className="rounded-3xl border border-red-100 bg-white p-5 shadow-sm">

                            <Dialog open={open} onOpenChange={setOpen}>

                                <DialogTrigger
                                    render={
                                        <Button
                                            type="button"
                                            className="h-12 w-full rounded-2xl bg-gradient-to-r from-red-600 to-orange-500 text-base font-bold text-white shadow-lg shadow-red-100 transition hover:-translate-y-0.5 hover:from-red-700 hover:to-orange-600"
                                        >
                                            <ShoppingBag className="mr-2 size-5" />
                                            Order Now
                                        </Button>
                                    }
                                />

                                <DialogContent
                                    className="
                                        w-[calc(100%-1.5rem)]
                                        max-w-[480px]
                                        max-h-[calc(100dvh-2rem)]
                                        overflow-hidden
                                        rounded-2xl
                                        border-orange-100
                                        bg-white
                                        p-0
                                        gap-0
                                        sm:max-w-[540px]
                                        sm:rounded-3xl
                                    "
                                >
                                    <form
                                        onSubmit={handleOrderNow}
                                        className="flex w-full flex-col"
                                    >

                                        {/* Dialog Header */}
                                        <div className="bg-gradient-to-r from-red-600 to-orange-500 px-4 py-3.5 text-white sm:px-6 sm:py-4">
                                            <DialogHeader>
                                                <div className="mb-2 flex size-9 items-center justify-center rounded-xl bg-white/20 sm:size-10">
                                                    <ShoppingBag className="size-5" />
                                                </div>

                                                <DialogTitle className="text-lg font-extrabold text-white sm:text-xl">
                                                    Complete Your Order
                                                </DialogTitle>

                                                <DialogDescription className="text-xs text-red-100 sm:text-sm">
                                                    Fill in your delivery details to place your order.
                                                </DialogDescription>
                                            </DialogHeader>
                                        </div>

                                        {/* Form Fields - No Scroll */}
                                        <div className="space-y-3 px-4 py-3.5 sm:space-y-3.5 sm:px-6 sm:py-4">

                                            {/* Item Summary */}
                                            <div className="flex items-center gap-3 rounded-xl border border-orange-100 bg-orange-50/60 p-2.5">
                                                <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-white sm:size-14">
                                                    {images[0] && (
                                                        <Image
                                                            src={images[0]}
                                                            alt={item.itemName}
                                                            fill
                                                            sizes="56px"
                                                            className="object-cover"
                                                        />
                                                    )}
                                                </div>

                                                <div className="min-w-0 flex-1">
                                                    <h3 className="truncate text-xs font-bold text-slate-900 sm:text-sm">
                                                        {item.itemName}
                                                    </h3>

                                                    <p className="mt-0.5 text-[11px] capitalize text-slate-500">
                                                        {item.category}
                                                    </p>

                                                    <p className="mt-0.5 text-xs font-bold text-red-600 sm:text-sm">
                                                        ৳{item.price} / item
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Quantity */}
                                            <div>
                                                <Label className="mb-1 block text-xs font-semibold text-slate-700 sm:text-sm">
                                                    Quantity
                                                </Label>

                                                <div className="flex h-10 items-center justify-between rounded-xl border border-orange-100 px-2 sm:h-11">
                                                    <p className="text-xs text-slate-500 sm:text-sm">
                                                        Select quantity
                                                    </p>

                                                    <div className="flex items-center gap-2">
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            size="icon"
                                                            disabled={quantity <= 1}
                                                            onClick={() =>
                                                                setQuantity((q) => Math.max(1, q - 1))
                                                            }
                                                            className="size-7 rounded-lg border-orange-200 sm:size-8"
                                                        >
                                                            <Minus className="size-3.5" />
                                                        </Button>

                                                        <span className="w-4 text-center text-sm font-bold text-slate-900">
                                                            {quantity}
                                                        </span>

                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            size="icon"
                                                            disabled={quantity >= 20}
                                                            onClick={() =>
                                                                setQuantity((q) => Math.min(20, q + 1))
                                                            }
                                                            className="size-7 rounded-lg border-orange-200 sm:size-8"
                                                        >
                                                            <Plus className="size-3.5" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Delivery Date */}
                                            <div className="space-y-1">
                                                <Label
                                                    htmlFor="deliveryDate"
                                                    className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 sm:text-sm"
                                                >
                                                    <CalendarDays className="size-3.5 text-red-500" />
                                                    Delivery Date
                                                </Label>

                                                <Input
                                                    id="deliveryDate"
                                                    type="date"
                                                    min={today}
                                                    value={deliveryDate}
                                                    onChange={(e) => setDeliveryDate(e.target.value)}
                                                    required
                                                    className="h-9 rounded-lg border-orange-200 text-xs sm:h-10 sm:text-sm"
                                                />
                                            </div>

                                            {/* Delivery Address */}
                                            <div className="space-y-1">
                                                <Label
                                                    htmlFor="deliveryAddress"
                                                    className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 sm:text-sm"
                                                >
                                                    <MapPinned className="size-3.5 text-red-500" />
                                                    Delivery Address
                                                </Label>

                                                <textarea
                                                    id="deliveryAddress"
                                                    value={deliveryAddress}
                                                    onChange={(e) => setDeliveryAddress(e.target.value)}
                                                    placeholder="Enter your full delivery address..."
                                                    required
                                                    rows={2}
                                                    className="min-h-[54px] w-full resize-none rounded-lg border border-orange-200 bg-background px-3 py-2 text-xs outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-red-400 sm:min-h-[60px] sm:text-sm"
                                                />
                                            </div>

                                            {/* Phone Number */}
                                            <div className="space-y-1">
                                                <Label
                                                    htmlFor="phone"
                                                    className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 sm:text-sm"
                                                >
                                                    <Phone className="size-3.5 text-red-500" />
                                                    Phone Number
                                                </Label>

                                                <Input
                                                    id="phone"
                                                    type="tel"
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    placeholder="01XXXXXXXXX"
                                                    required
                                                    className="h-9 rounded-lg border-orange-200 text-xs sm:h-10 sm:text-sm"
                                                />
                                            </div>

                                            {/* Total Price */}
                                            <div className="rounded-xl bg-slate-50 px-3 py-2.5 sm:px-4 sm:py-3">
                                                <div className="flex justify-between text-xs text-slate-500 sm:text-sm">
                                                    <span>
                                                        ৳{item.price} × {quantity}
                                                    </span>
                                                    <span>৳{totalPrice}</span>
                                                </div>

                                                <div className="my-2 border-t border-dashed border-slate-200" />

                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-bold text-slate-800">
                                                        Total Price
                                                    </span>

                                                    <span className="text-xl font-extrabold text-red-600 sm:text-2xl">
                                                        ৳{totalPrice}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Footer - Always at Bottom */}
                                        <DialogFooter className="flex flex-row items-center justify-end gap-2 border-t border-orange-100 bg-white px-4 mb-2 mr-1 py-3 sm:gap-3 sm:px-6 sm:py-3.5">

                                            <DialogClose
                                                render={
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        disabled={loading}
                                                        className="h-9 rounded-lg border-orange-200 px-3 text-xs sm:h-10 sm:px-5 sm:text-sm"
                                                    >
                                                        Cancel
                                                    </Button>
                                                }
                                            />

                                            <Button
                                                type="submit"
                                                disabled={loading}
                                                className="h-9 rounded-lg bg-gradient-to-r from-red-600 to-orange-500 px-3 text-xs font-bold text-white hover:from-red-700 hover:to-orange-600 sm:h-10 sm:px-5 sm:text-sm"
                                            >
                                                {loading ? (
                                                    <>
                                                        <Loader2 className="mr-1.5 size-3.5 animate-spin" />
                                                        Processing...
                                                    </>
                                                ) : (
                                                    <>
                                                        <ShoppingBag className="mr-1.5 size-3.5" />
                                                        Confirm Order
                                                    </>
                                                )}
                                            </Button>
                                        </DialogFooter>

                                    </form>
                                </DialogContent>
                            </Dialog>

                            <p className="mt-3 text-center text-xs text-slate-400">
                                Fresh food, delicious taste, delivered to your door.
                            </p>
                        </div>

                    </div>
                </motion.div>
            </section>
        </main>
    );
};

export default MenuDetails;
