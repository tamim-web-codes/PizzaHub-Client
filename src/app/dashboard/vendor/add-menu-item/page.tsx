
"use client";

import { useEffect, useState, type FormEvent, type ChangeEvent } from "react";
import {
  Pizza,
  MapPin,
  Tag,
  DollarSign,
  FileText,
  Utensils,
  ArrowLeft,
  Upload,
  X,
  Image as ImageIcon,
  Loader2,
  CheckCircle2,
  Sparkles,
  Plus,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { addmenupost } from "@/lib/actions/postAddMenu";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export type MenuItemData = {
  itemName: string;
  vendorId: string;
  category: string;
  description: string;
  price: number;
  location: string;
  ImageUrl: string;
};

const AddMenuItemPage = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  // Image Preview Cleanup
  useEffect(() => {
    if (!imagePreview) return;

    return () => {
      URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  // Image Selection
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

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

  // Remove Image
  const removeImage = () => {
    setSelectedFile(null);
    setImagePreview("");

    const input = document.querySelector<HTMLInputElement>("#itemImage");

    if (input) {
      input.value = "";
    }
  };

  // Submit Form
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!session?.user?.id) {
      toast.error("Please login before adding a menu item.");
      return;
    }

    if (!selectedFile) {
      toast.error("Please upload an item image.");
      return;
    }

    const formData = new FormData(e.currentTarget);

    try {
      setLoading(true);

      // Upload Image to ImgBB
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

      const imageUrl = uploadData.data.display_url;

      // Prepare Menu Data
      const data: MenuItemData = {
        itemName: formData.get("itemName") as string,
        category: formData.get("category") as string,
        description: formData.get("description") as string,
        price: Number(formData.get("price")),
        location: formData.get("location") as string,
        vendorId: session.user.id,
        ImageUrl: imageUrl,
      };

      // Send Data to Backend
      const postmenu = await addmenupost(data);

      if (!postmenu) {
        throw new Error("Failed to add menu item.");
      }

      toast.success("Menu item added successfully!");

      router.push("/dashboard/vendor/my-menu-items");
      router.refresh();

    } catch (error) {
      console.error("Add menu item error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50/40 px-4 py-6">

      <div className="mx-auto w-full max-w-3xl">

        {/* Back Button */}
        <Link
          href="/dashboard/vendor/my-menu-items"
          className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-red-600"
        >
          <ArrowLeft size={16} />
          Back to My Menu
        </Link>

        {/* Page Header */}
        <div className="mb-5">
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-red-100 bg-red-50 px-3 py-1 text-[11px] font-bold text-red-600">
            <Sparkles size={13} />
            VENDOR DASHBOARD
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Add Menu Item
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Add a delicious new item to your restaurant menu.
          </p>
        </div>

        {/* Main Form Card */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-200/40">

          {/* Card Header */}
          <div className="flex items-center gap-3 border-b border-slate-100 bg-gradient-to-r from-red-50 to-orange-50/50 px-5 py-3.5">
            <div className="flex size-10 items-center justify-center rounded-xl bg-red-600 text-white shadow-md shadow-red-200">
              <Pizza size={21} />
            </div>

            <div>
              <h2 className="text-base font-bold text-slate-900">
                Menu Item Information
              </h2>
              <p className="text-xs text-slate-500">
                Fill in the details below
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 p-5">

            {/* Basic Information */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <div className="flex size-7 items-center justify-center rounded-lg bg-red-50 text-red-600">
                  <Utensils size={15} />
                </div>

                <h3 className="text-sm font-bold text-slate-800">
                  Basic Information
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                {/* Item Name */}
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Item Name <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <Pizza
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="text"
                      name="itemName"
                      required
                      minLength={2}
                      placeholder="e.g. Margherita Pizza"
                      className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50/50 pl-9 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-50"
                    />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Category <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <Tag
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <select
                      name="category"
                      required
                      defaultValue=""
                      className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50/50 pl-9 pr-3 text-sm outline-none transition focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-50"
                    >
                      <option value="" disabled>
                        Select category
                      </option>
                      <option value="pizza">Pizza</option>
                      <option value="burger">Burger</option>
                      <option value="pasta">Pasta</option>
                      <option value="sandwich">Sandwich</option>
                      <option value="appetizer">Appetizer</option>
                      <option value="dessert">Dessert</option>
                      <option value="drinks">Drinks</option>
                    </select>
                  </div>
                </div>

                {/* Price */}
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Price (BDT) <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <DollarSign
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="number"
                      name="price"
                      required
                      min="1"
                      step="0.01"
                      placeholder="499"
                      className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50/50 pl-9 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-50"
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Restaurant Location <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <MapPin
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="text"
                      name="location"
                      required
                      placeholder="e.g. Mirpur, Dhaka"
                      className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50/50 pl-9 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-50"
                    />
                  </div>
                </div>

              </div>
            </div>

            {/* Description */}
            <div>
              <label className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <FileText size={16} className="text-red-600" />
                Description <span className="text-red-500">*</span>
              </label>

              <textarea
                name="description"
                required
                minLength={10}
                rows={3}
                placeholder="Describe your food item, ingredients and special features..."
                className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50/50 p-3 text-sm leading-5 outline-none transition placeholder:text-slate-400 focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-50"
              />
            </div>

            {/* Image Upload */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <ImageIcon size={16} className="text-red-600" />
                  Food Image <span className="text-red-500">*</span>
                </label>

                <span className="text-xs text-slate-400">
                  Max 5MB
                </span>
              </div>

              {imagePreview ? (
                /* Image Preview */
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-2.5">
                  <div className="relative h-44 w-full overflow-hidden rounded-lg bg-slate-100">
                    <Image
                      src={imagePreview}
                      alt="Food image preview"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>

                  <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-2">
                      <CheckCircle2
                        size={16}
                        className="shrink-0 text-emerald-500"
                      />

                      <span className="truncate text-xs font-medium text-slate-700">
                        {selectedFile?.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <label
                        htmlFor="itemImage"
                        className="cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-red-200 hover:text-red-600"
                      >
                        Change
                      </label>

                      <button
                        type="button"
                        onClick={removeImage}
                        className="flex size-8 items-center justify-center rounded-lg border border-red-100 bg-red-50 text-red-600 transition hover:bg-red-100"
                        aria-label="Remove image"
                      >
                        <X size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Upload Area */
                <label
                  htmlFor="itemImage"
                  className="group flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/70 px-4 py-6 text-center transition hover:border-red-300 hover:bg-red-50/40"
                >
                  <div className="mb-2 flex size-11 items-center justify-center rounded-xl bg-red-100 text-red-600 transition group-hover:scale-105">
                    <Upload size={21} />
                  </div>

                  <p className="text-sm font-bold text-slate-800">
                    Click to upload image
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    PNG, JPG or WEBP (Max 5MB)
                  </p>
                </label>
              )}

              <input
                id="itemImage"
                type="file"
                name="itemImage"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleImageChange}
                className="sr-only"
              />
            </div>
            {/* Buttons */}
            <div className="flex flex-col-reverse gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end">

              <Link
                href="/dashboard/vendor/my-menu-items"
                className="inline-flex h-10 items-center justify-center rounded-lg border border-slate-200 px-5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-red-600 to-orange-500 px-6 text-sm font-bold text-white shadow-md shadow-red-200 transition hover:from-red-700 hover:to-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Uploading & Saving...
                  </>
                ) : (
                  <>
                    <Plus size={17} />
                    Add Menu Item
                  </>
                )}
              </button>

            </div>

          </form>
        </div>

        <p className="mt-4 text-center text-xs text-slate-400">
          All fields marked with * are required.
        </p>

      </div>
    </div>
  );
};

export default AddMenuItemPage;
