
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
    Camera,
    UserRound,
    Mail,
    ShieldCheck,
    Crown,
    Save,
    Loader2,
    Store,
    ImagePlus,
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { updateProfile } from "@/lib/actions/postAddMenu";
import { authClient } from "@/lib/auth-client";



type VendorUser = {
    id: string;
    name: string;
    email: string;
    image?: string | null;
    role: string;
    premium: boolean;
};

export default function VendorProfileForm({
    user,
}: {
    user: VendorUser;
}) {
    const router = useRouter();


    const [name, setName] = useState(user.name || "");
    const [imagePreview, setImagePreview] = useState(user.image || "");
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

    // Blob URL cleanup
    useEffect(() => {
        return () => {
            if (imagePreview.startsWith("blob:")) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    // Image select
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
            toast.error("Please select JPG, PNG or WEBP image");
            e.target.value = "";
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image size must be less than 5MB");
            e.target.value = "";
            return;
        }

        setSelectedImage(file);
        setImagePreview(URL.createObjectURL(file));
    };

    // ImgBB upload
    const uploadImage = async (file: File): Promise<string> => {
        if (!IMGBB_API_KEY) {
            throw new Error("ImgBB API key is missing");
        }

        const formData = new FormData();
        formData.append("image", file);

        const response = await fetch(
            `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
            {
                method: "POST",
                body: formData,
            }
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
            throw new Error("Image upload failed");
        }

        return result.data.display_url;
    };

    // Profile update
    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        if (!name.trim()) {
            toast.error("Please enter your name");
            return;
        }

        try {
            setLoading(true);

            let imageUrl = user.image || "";

            if (selectedImage) {
                imageUrl = await uploadImage(selectedImage);
            }

            await updateProfile(user.id, {
                name: name.trim(),
                image: imageUrl,
            });

            toast.success("Profile updated successfully!");

            // Refresh server component data
            router.refresh();
        } catch (error) {
            console.error("Profile update error:", error);

            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to update profile"
            );
        } finally {
            setLoading(false);
        }
    };

    const isPremium = user.premium === true;

    return (
        <div className="mx-auto max-w-5xl space-y-7 pb-10">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 via-red-500 to-orange-500 p-7 text-white shadow-lg shadow-red-200/50 md:p-9"
            >
                <div className="absolute -right-12 -top-16 h-56 w-56 rounded-full bg-white/10" />
                <div className="absolute -bottom-20 right-32 h-48 w-48 rounded-full bg-white/10" />

                <div className="relative z-10">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
                        <Store size={25} />
                    </div>

                    <h1 className="text-2xl font-bold md:text-3xl">
                        Vendor Profile
                    </h1>

                    <p className="mt-2 max-w-lg text-sm leading-6 text-red-50">
                        Manage your personal information and keep your
                        vendor profile up to date.
                    </p>
                </div>
            </motion.div>

            {/* Profile Form */}
            <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.1 }}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
                <div className="border-b border-slate-100 px-6 py-5 md:px-8">
                    <h2 className="text-lg font-bold text-slate-800">
                        Personal Information
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Update your name and profile picture.
                    </p>
                </div>

                <div className="space-y-8 p-6 md:p-8">
                    {/* Profile Image */}
                    <div className="flex flex-col items-center gap-5 sm:flex-row">
                        <div className="relative">
                            <div className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-red-100 bg-red-50">
                                {imagePreview ? (
                                    <Image
                                        src={imagePreview}
                                        alt="Vendor profile"
                                        fill
                                        unoptimized
                                        className="object-cover"
                                    />
                                ) : (
                                    <UserRound size={42} className="text-red-400" />
                                )}
                            </div>

                            <label
                                htmlFor="profileImage"
                                className="absolute bottom-0 right-0 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-red-600 text-white shadow-md transition hover:bg-red-700"
                            >
                                <Camera size={16} />
                            </label>

                            <input
                                id="profileImage"
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </div>

                        <div className="text-center sm:text-left">
                            <h3 className="font-semibold text-slate-800">
                                Profile Picture
                            </h3>

                            <p className="mt-1 text-sm text-slate-500">
                                Upload a new profile picture.
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                                JPG, PNG or WEBP · Maximum 5MB
                            </p>

                            <label
                                htmlFor="profileImage"
                                className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                            >
                                <ImagePlus size={16} />
                                Change Photo
                            </label>
                        </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        {/* Name */}
                        <div className="space-y-2">
                            <label
                                htmlFor="name"
                                className="text-sm font-semibold text-slate-700"
                            >
                                Full Name
                            </label>

                            <div className="relative">
                                <UserRound
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your full name"
                                    required
                                    className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-red-400 focus:ring-4 focus:ring-red-50"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <label
                                htmlFor="email"
                                className="text-sm font-semibold text-slate-700"
                            >
                                Email Address
                            </label>

                            <div className="relative">
                                <Mail
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    id="email"
                                    type="email"
                                    value={user.email}
                                    disabled
                                    className="h-11 w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-500 outline-none"
                                />
                            </div>

                            <p className="text-xs text-slate-400">
                                Email address cannot be changed here.
                            </p>
                        </div>

                        {/* Role */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">
                                Account Role
                            </label>

                            <div className="flex h-11 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4">
                                <ShieldCheck size={18} className="text-red-500" />

                                <span className="text-sm font-medium capitalize text-slate-600">
                                    {user.role}
                                </span>

                                <span className="ml-auto rounded-full bg-slate-200 px-2.5 py-1 text-[10px] font-bold uppercase text-slate-500">
                                    Protected
                                </span>
                            </div>
                        </div>

                        {/* Subscription */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">
                                Subscription Plan
                            </label>

                            <div className="flex h-11 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4">
                                <Crown
                                    size={18}
                                    className={isPremium ? "text-amber-500" : "text-slate-400"}
                                />

                                <span className="text-sm font-semibold text-slate-600">
                                    {isPremium ? "Premium Plan" : "Free Plan"}
                                </span>

                                <span className="ml-auto rounded-full bg-slate-200 px-2.5 py-1 text-[10px] font-bold uppercase text-slate-500">
                                    Protected
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/70 px-6 py-5 sm:flex-row sm:items-center sm:justify-between md:px-8">
                    <p className="text-xs text-slate-400">
                        Your role and subscription cannot be changed here.
                    </p>

                    <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={{ scale: loading ? 1 : 1.02 }}
                        whileTap={{ scale: loading ? 1 : 0.97 }}
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-orange-500 px-6 text-sm font-semibold text-white shadow-md shadow-red-200 transition hover:from-red-700 hover:to-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? (
                            <>
                                <Loader2 size={17} className="animate-spin" />
                                Saving Changes...
                            </>
                        ) : (
                            <>
                                <Save size={17} />
                                Save Changes
                            </>
                        )}
                    </motion.button>
                </div>
            </motion.form>
        </div>
    );
}
