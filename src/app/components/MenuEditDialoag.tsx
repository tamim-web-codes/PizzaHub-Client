
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TMenuItemData } from "@/components/types/type";

import { Button } from "@/components/ui/button";
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

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
    Pencil,
    Pizza,
    MapPin,
    Tag,
    DollarSign,
    FileText,
    Utensils,
    X,
    ImagePlus,
} from "lucide-react";

import Image from "next/image";
import { toast } from "sonner";
import { updateMenuItem } from "@/lib/actions/postAddMenu";
import { useRouter } from "next/navigation";

export function MenuEditDialoag({
    item,
}: {
    item: TMenuItemData;
}) {
    const router = useRouter()
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState(item.ImageUrl);

    // Clean up temporary image preview URL
    useEffect(() => {
        return () => {
            if (imagePreview.startsWith("blob:")) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    // Image Selection
    const handleImageChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];

        if (!file) return;

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
        ];

        if (!allowedTypes.includes(file.type)) {
            toast.error("Please select a PNG, JPG or WEBP image.");
            e.target.value = "";
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image size must be less than 5MB.");
            e.target.value = "";
            return;
        }

        setSelectedFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    // Remove Selected Image
    const removeImage = () => {
        setSelectedFile(null);
        setImagePreview(item.ImageUrl);

        const input = document.querySelector<HTMLInputElement>(
            "#ImageUrl"
        );

        if (input) {
            input.value = "";
        }
    };

    // Submit Form
    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        try {
            setLoading(true);

            // Keep existing image if no new image selected
            let imageUrl = item.ImageUrl;

            // Upload New Image to ImgBB
            if (selectedFile) {
                const imageFormData = new FormData();
                imageFormData.append("image", selectedFile);

                const imgbbAPI = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`;

                const uploadResponse = await fetch(imgbbAPI, {
                    method: "POST",
                    body: imageFormData,
                });

                const uploadData = await uploadResponse.json();

                if (!uploadResponse.ok || !uploadData.success) {
                    throw new Error("Image upload failed.");
                }

                imageUrl = uploadData.data.display_url;
            }

            // Updated Menu Data
            const updatedData = {
                itemName: formData.get("itemName") as string,
                category: formData.get("category") as string,
                description: formData.get("description") as string,
                price: Number(formData.get("price")),
                location: formData.get("location") as string,
                ImageUrl: imageUrl,
            };

            // Update Menu Item
            const result = await updateMenuItem(
                item._id,
                updatedData
            );

            if (result) {
                toast.success("Menu item updated successfully!");

                setOpen(false);
                setSelectedFile(null);
                setImagePreview(item.ImageUrl);
                router.refresh()
            }
        } catch (error) {
            console.error("Update failed:", error);

            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to update menu item."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {/* Edit Button */}
            <DialogTrigger
                render={
                    <Button
                        type="button"
                        variant="outline"
                        className="h-9 gap-2 rounded-lg border-slate-200 px-3 text-xs font-semibold text-slate-600 transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                    >
                        <Pencil size={15} />
                        Edit
                    </Button>
                }
            />

            <DialogContent className="max-h-[90vh] overflow-y-auto border-0 bg-white p-0 shadow-2xl sm:max-w-xl">
                {/* Header */}
                <div className="relative overflow-hidden bg-gradient-to-r from-red-600 to-orange-500 px-6 py-7 text-white">
                    <div className="absolute -right-10 -top-12 size-36 rounded-full bg-white/10 blur-2xl" />
                    <div className="absolute -bottom-12 -left-8 size-32 rounded-full bg-orange-300/20 blur-2xl" />

                    <DialogHeader className="relative text-left">
                        <div className="mb-3 flex size-11 items-center justify-center rounded-xl bg-white/20">
                            <Pizza size={23} />
                        </div>

                        <DialogTitle className="text-xl font-bold text-white">
                            Edit Menu Item
                        </DialogTitle>

                        <DialogDescription className="text-sm text-red-50">
                            Update your food details and keep your menu fresh.
                        </DialogDescription>
                    </DialogHeader>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-5 px-6 py-6"
                    >
                        {/* Item Name */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="itemName"
                                className="flex items-center gap-2 text-sm font-semibold text-slate-700"
                            >
                                <Utensils size={16} className="text-red-500" />
                                Item Name
                            </Label>

                            <Input
                                id="itemName"
                                name="itemName"
                                defaultValue={item.itemName}
                                placeholder="Enter food name"
                                required
                                className="h-11 rounded-xl border-slate-200 bg-slate-50/70 focus-visible:border-red-400 focus-visible:ring-red-100"
                            />
                        </div>

                        {/* Category and Price */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label
                                    htmlFor="category"
                                    className="flex items-center gap-2 text-sm font-semibold text-slate-700"
                                >
                                    <Tag size={16} className="text-red-500" />
                                    Category
                                </Label>

                                <select
                                    id="category"
                                    name="category"
                                    defaultValue={item.category}
                                    required
                                    className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3 text-sm outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100"
                                >
                                    <option value="pizza">Pizza</option>
                                    <option value="burger">Burger</option>
                                    <option value="pasta">Pasta</option>
                                    <option value="snacks">Snacks</option>
                                    <option value="drinks">Drinks</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <Label
                                    htmlFor="price"
                                    className="flex items-center gap-2 text-sm font-semibold text-slate-700"
                                >
                                    <DollarSign size={16} className="text-red-500" />
                                    Price (৳)
                                </Label>

                                <Input
                                    id="price"
                                    name="price"
                                    type="number"
                                    min="1"
                                    defaultValue={item.price}
                                    placeholder="Enter price"
                                    required
                                    className="h-11 rounded-xl border-slate-200 bg-slate-50/70 focus-visible:border-red-400 focus-visible:ring-red-100"
                                />
                            </div>
                        </div>

                        {/* Location */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="location"
                                className="flex items-center gap-2 text-sm font-semibold text-slate-700"
                            >
                                <MapPin size={16} className="text-red-500" />
                                Location
                            </Label>

                            <Input
                                id="location"
                                name="location"
                                defaultValue={item.location}
                                placeholder="Example: Uttara, Dhaka"
                                required
                                className="h-11 rounded-xl border-slate-200 bg-slate-50/70 focus-visible:border-red-400 focus-visible:ring-red-100"
                            />
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="description"
                                className="flex items-center gap-2 text-sm font-semibold text-slate-700"
                            >
                                <FileText size={16} className="text-red-500" />
                                Description
                            </Label>

                            <Textarea
                                id="description"
                                name="description"
                                defaultValue={item.description}
                                placeholder="Describe your food item..."
                                rows={4}
                                required
                                className="resize-none rounded-xl border-slate-200 bg-slate-50/70 focus-visible:border-red-400 focus-visible:ring-red-100"
                            />
                        </div>

                        {/* Image Update */}
                        <div className="space-y-3">
                            <Label
                                htmlFor="ImageUrl"
                                className="flex items-center gap-2 text-sm font-semibold text-slate-700"
                            >
                                <ImagePlus size={16} className="text-red-500" />
                                Food Image
                            </Label>

                            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4">
                                <div className="relative mx-auto h-44 w-full max-w-sm overflow-hidden rounded-xl bg-slate-100">
                                    {imagePreview ? (
                                        <Image
                                            src={imagePreview}
                                            alt={item.itemName}
                                            fill
                                            unoptimized
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center text-slate-400">
                                            <ImagePlus size={35} />
                                        </div>
                                    )}
                                </div>

                                <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                                    <label
                                        htmlFor="ImageUrl"
                                        className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
                                    >
                                        <ImagePlus size={16} />
                                        Change Image
                                    </label>

                                    {selectedFile && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={removeImage}
                                            className="gap-2 rounded-lg"
                                        >
                                            <X size={15} />
                                            Remove Selection
                                        </Button>
                                    )}

                                    <Input
                                        id="ImageUrl"
                                        name="ImageUrl"
                                        type="file"
                                        accept="image/jpeg,image/png,image/webp"
                                        className="hidden"
                                        onChange={handleImageChange}
                                    />
                                </div>

                                {selectedFile && (
                                    <p className="mt-2 text-center text-xs font-medium text-green-600">
                                        Selected: {selectedFile.name}
                                    </p>
                                )}

                                <p className="mt-2 text-center text-xs text-slate-500">
                                    PNG, JPG or WEBP (Maximum 5MB)
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Footer */}
                    <DialogFooter className="flex-row justify-end gap-2 border-t border-slate-100 bg-slate-50/70 px-6 py-4">
                        <DialogClose
                            render={
                                <Button
                                    type="button"
                                    variant="outline"
                                    disabled={loading}
                                    className="rounded-xl border-slate-200 px-5"
                                >
                                    <X size={16} />
                                    Cancel
                                </Button>
                            }
                        />

                        <Button
                            type="submit"
                            disabled={loading}
                            className="rounded-xl bg-red-600 px-6 font-semibold text-white shadow-sm transition hover:bg-red-700"
                        >
                            {loading ? "Updating..." : "Save Changes"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
