"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
    UserRound,
    Mail,
    ShieldCheck,
    Pencil,
    Loader2,
    Camera,
    ImagePlus,
    X,
    Upload,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { updateCustomerProfile } from "@/lib/actions/orderPost";

type CustomerUser = {
    id: string;
    name: string;
    email: string;
    image: string;
    role: string;
};

type CustomerProfileProps = {
    user: CustomerUser;
};

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp",
];

export default function CustomerProfile({
    user,
}: CustomerProfileProps) {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [open, setOpen] = useState(false);
    const [name, setName] = useState(user.name);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState(user.image);
    const [removeImage, setRemoveImage] = useState(false);
    const [loading, setLoading] = useState(false);

    const [profileName, setProfileName] = useState(user.name);
    const [profileImage, setProfileImage] = useState(user.image);

    const initials = profileName
        ? profileName.charAt(0).toUpperCase()
        : "C";

    // Dialog open/close
    const handleOpenChange = (value: boolean) => {
        setOpen(value);

        if (value) {
            setName(profileName);
            setImagePreview(profileImage);
            setImageFile(null);
            setRemoveImage(false);
        }
    };

    // Select image
    const handleImageChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];

        if (!file) return;

        if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
            toast.error("Please select JPG, PNG or WEBP image");
            e.target.value = "";
            return;
        }

        if (file.size > MAX_IMAGE_SIZE) {
            toast.error("Image size must be less than 5MB");
            e.target.value = "";
            return;
        }

        setImageFile(file);
        setRemoveImage(false);

        const reader = new FileReader();

        reader.onloadend = () => {
            setImagePreview(reader.result as string);
        };

        reader.readAsDataURL(file);
    };

    // Remove selected image
    const handleRemoveImage = () => {
        setImageFile(null);
        setImagePreview("");
        setRemoveImage(true);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    // Upload image to ImgBB
    const uploadImage = async (file: File): Promise<string> => {
        const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

        if (!apiKey) {
            throw new Error("ImgBB API key is missing");
        }

        const formData = new FormData();
        formData.append("image", file);

        const response = await fetch(
            `https://api.imgbb.com/1/upload?key=${apiKey}`,
            {
                method: "POST",
                body: formData,
            }
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
            throw new Error("Image upload failed. Please try again.");
        }

        return result.data.display_url;
    };

    // Update profile
    const handleUpdateProfile = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        if (!name.trim()) {
            toast.error("Please enter your name");
            return;
        }

        try {
            setLoading(true);

            let uploadedImage = profileImage;

            if (imageFile) {
                uploadedImage = await uploadImage(imageFile);
            } else if (removeImage) {
                uploadedImage = "";
            }

            const result = await updateCustomerProfile(user.id, {
                name: name.trim(),
                image: uploadedImage,
            });

            if (result?.success === false) {
                throw new Error(result.message || "Profile update failed");
            }

            setProfileName(name.trim());
            setProfileImage(uploadedImage);

            toast.success(
                result.message || "Profile updated successfully!"
            );

            setOpen(false);
            setImageFile(null);
            setRemoveImage(false);

            router.refresh();
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : "Something went wrong";

            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto w-full max-w-4xl space-y-6">
            {/* Page Header */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <p className="text-sm font-semibold tracking-wide text-red-600">
                    CUSTOMER DASHBOARD
                </p>

                <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                    My Profile
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                    Manage your personal information and profile details.
                </p>
            </motion.div>

            {/* Profile Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.1 }}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
                {/* Cover */}
                <div className="h-32 bg-gradient-to-r from-red-600 via-orange-500 to-amber-400 sm:h-40" />

                <div className="px-5 pb-6 sm:px-8">
                    {/* Avatar and Edit Button */}
                    <div className="-mt-12 flex flex-col gap-4 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
                        <div className="flex items-end gap-4">
                            <div className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-red-100 text-3xl font-bold text-red-600 shadow-md sm:h-28 sm:w-28">
                                {profileImage ? (
                                    <Image
                                        src={profileImage}
                                        alt={profileName}
                                        fill
                                        unoptimized
                                        className="object-cover"
                                        sizes="112px"
                                    />
                                ) : (
                                    initials
                                )}
                            </div>

                            <div className="min-w-0 pb-1">
                                <h2 className="break-words text-xl font-bold text-slate-900">
                                    {profileName}
                                </h2>

                                <p className="text-sm text-slate-500">
                                    Customer Account
                                </p>
                            </div>
                        </div>

                        {/* Edit Profile Dialog */}
                        <Dialog open={open} onOpenChange={handleOpenChange}>
                            <DialogTrigger asChild>
                                <Button className="w-full gap-2 bg-red-600 text-white hover:bg-red-700 sm:w-auto">
                                    <Pencil className="h-4 w-4" />
                                    Edit Profile
                                </Button>
                            </DialogTrigger>

                            <DialogContent className="max-h-[90vh] w-[calc(100%-2rem)] overflow-y-auto rounded-2xl bg-white sm:max-w-md">
                                <DialogHeader>
                                    <DialogTitle className="text-xl font-bold">
                                        Edit Your Profile
                                    </DialogTitle>

                                    <DialogDescription>
                                        Update your name and profile picture.
                                    </DialogDescription>
                                </DialogHeader>

                                <form
                                    onSubmit={handleUpdateProfile}
                                    className="space-y-5"
                                >
                                    {/* Image Upload */}
                                    <div className="space-y-3">
                                        <Label>Profile Picture</Label>

                                        <div className="flex flex-col items-center rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5">
                                            <div className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-red-100 text-3xl font-bold text-red-600 shadow-md">
                                                {imagePreview ? (
                                                    <Image
                                                        src={imagePreview}
                                                        alt="Profile preview"
                                                        fill
                                                        unoptimized
                                                        className="object-cover"
                                                        sizes="112px"
                                                    />
                                                ) : (
                                                    <UserRound className="h-12 w-12" />
                                                )}
                                            </div>

                                            <p className="mt-3 text-sm font-semibold text-slate-700">
                                                Choose your profile picture
                                            </p>

                                            <p className="mt-1 text-center text-xs text-slate-500">
                                                JPG, PNG or WEBP · Maximum 5MB
                                            </p>

                                            <div className="mt-4 flex flex-wrap justify-center gap-2">
                                                <input
                                                    ref={fileInputRef}
                                                    type="file"
                                                    accept="image/jpeg,image/png,image/webp"
                                                    className="hidden"
                                                    onChange={handleImageChange}
                                                    disabled={loading}
                                                />

                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    className="gap-2 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                                                    onClick={() => fileInputRef.current?.click()}
                                                    disabled={loading}
                                                >
                                                    <Upload className="h-4 w-4" />
                                                    {imagePreview ? "Change Photo" : "Upload Photo"}
                                                </Button>

                                                {imagePreview && (
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        className="gap-2 text-slate-600"
                                                        onClick={handleRemoveImage}
                                                        disabled={loading}
                                                    >
                                                        <X className="h-4 w-4" />
                                                        Remove
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Full Name */}
                                    <div className="space-y-2">
                                        <Label htmlFor="customer-name">
                                            Full Name
                                        </Label>

                                        <Input
                                            id="customer-name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Enter your full name"
                                            required
                                            maxLength={80}
                                            disabled={loading}
                                        />
                                    </div>

                                    {/* Email - Read Only */}
                                    <div className="space-y-2">
                                        <Label htmlFor="customer-email">
                                            Email Address
                                        </Label>

                                        <Input
                                            id="customer-email"
                                            value={user.email}
                                            readOnly
                                            disabled
                                            className="bg-slate-100"
                                        />

                                        <p className="text-xs text-slate-500">
                                            Your registered email address cannot be changed here.
                                        </p>
                                    </div>

                                    <DialogFooter className="gap-2">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => setOpen(false)}
                                            disabled={loading}
                                        >
                                            Cancel
                                        </Button>

                                        <Button
                                            type="submit"
                                            disabled={loading}
                                            className="bg-red-600 text-white hover:bg-red-700"
                                        >
                                            {loading ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Updating...
                                                </>
                                            ) : (
                                                "Save Changes"
                                            )}
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <div className="my-7 border-t border-slate-100" />

                    {/* Personal Information */}
                    <div>
                        <h3 className="mb-4 text-base font-bold text-slate-900">
                            Personal Information
                        </h3>

                        <div className="grid gap-4 sm:grid-cols-2">
                            {/* Name */}
                            <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4">
                                <div className="rounded-lg bg-red-100 p-2 text-red-600">
                                    <UserRound className="h-5 w-5" />
                                </div>

                                <div className="min-w-0">
                                    <p className="text-xs font-medium text-slate-500">
                                        Full Name
                                    </p>

                                    <p className="mt-1 break-words text-sm font-semibold text-slate-800">
                                        {profileName || "Not provided"}
                                    </p>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4">
                                <div className="rounded-lg bg-orange-100 p-2 text-orange-600">
                                    <Mail className="h-5 w-5" />
                                </div>

                                <div className="min-w-0">
                                    <p className="text-xs font-medium text-slate-500">
                                        Email Address
                                    </p>

                                    <p className="mt-1 break-all text-sm font-semibold text-slate-800">
                                        {user.email}
                                    </p>
                                </div>
                            </div>

                            {/* Role */}
                            <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4">
                                <div className="rounded-lg bg-green-100 p-2 text-green-600">
                                    <ShieldCheck className="h-5 w-5" />
                                </div>

                                <div className="min-w-0">
                                    <p className="text-xs font-medium text-slate-500">
                                        Account Role
                                    </p>

                                    <p className="mt-1 text-sm font-semibold capitalize text-slate-800">
                                        {user.role}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Security Notice */}
                    <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
                        <p className="text-sm font-semibold text-amber-800">
                            Account Security
                        </p>

                        <p className="mt-1 text-xs leading-5 text-amber-700">
                            Your account role and subscription status cannot be
                            changed from profile settings.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}