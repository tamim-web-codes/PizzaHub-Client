
"use client";

import React from "react";
import {
  Pizza,
  ImagePlus,
  MapPin,
  Tag,
  DollarSign,
  FileText,
  Utensils,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
export type MenuItemData = {
  itemName: string;
  category: string;
  description: string;
  price: number;
  location: string;
  ImageUrl: string;
};

const AddMenuItemPage = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const imageInput = document.querySelector<HTMLInputElement>(
      "#itemImage"
    )

    const file = imageInput?.files?.[0]

    let imageUrl = ""

    // 2. Upload image to ImgBB
    if (file) {
      const formData = new FormData()
      formData.append("image", file)

      const imgbbAPI = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGBB_API_KEY}`

      const uploadResponse = await fetch(imgbbAPI, {
        method: "POST",
        body: formData,
      })

      const uploadData = await uploadResponse.json()
      console.log(uploadData);

      if (!uploadResponse.ok || !uploadData.success) {
        throw new Error("Image upload failed")
      }

      // Get uploaded image URL
      imageUrl = uploadData.data.display_url
    }

    const formData = new FormData(e.currentTarget)

    const data: MenuItemData = {
      itemName: formData.get("itemName") as string,
      category: formData.get("category") as string,
      description: formData.get("description") as string,
      price: Number(formData.get("price")),
      location: formData.get("location") as string,
      ImageUrl: imageUrl
    };
    console.log(data);
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6">
      <div className="mx-auto w-full max-w-2xl">

        {/* Page Header */}
        <div className="mb-5">
          <Link
            href="/dashboard/menu"
            className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-red-600"
          >
            <ArrowLeft size={16} />
            Back to Menu
          </Link>

          <h1 className="text-2xl font-bold text-slate-900">
            Add Menu Item
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Add a new delicious item to your restaurant menu.
          </p>
        </div>

        {/* Form Card */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* Card Header */}
          <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4">
            <div className="flex size-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <Pizza size={21} />
            </div>

            <div>
              <h2 className="font-semibold text-slate-900">
                Item Information
              </h2>
              <p className="text-xs text-slate-500">
                Fill in the details below
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 p-5">

            {/* Item Name */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Item Name <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <Pizza
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  name="itemName"
                  required
                  minLength={2}
                  placeholder="e.g. Margherita Pizza"
                  className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Category <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <Tag
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <select
                  name="category"
                  required
                  defaultValue=""
                  className="h-10 w-full appearance-none rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-600 outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100"
                >
                  <option value="" disabled>
                    Select a category
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

            {/* Description */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Description <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <FileText
                  size={17}
                  className="absolute left-3 top-3 text-slate-400"
                />
                <textarea
                  name="description"
                  required
                  minLength={10}
                  rows={3}
                  placeholder="Describe your menu item..."
                  className="w-full resize-none rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                />
              </div>
            </div>

            {/* Price and Location */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

              {/* Price */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Price (BDT) <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <DollarSign
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="number"
                    name="price"
                    required
                    min="1"
                    step="0.01"
                    placeholder="499"
                    className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Location <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <MapPin
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    name="location"
                    required
                    placeholder="Mirpur, Dhaka"
                    className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                  />
                </div>
              </div>
            </div>

            {/* Item Image */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Item Image <span className="text-red-500">*</span>
              </label>

              <label
                htmlFor="itemImage"
                className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 px-4 py-5 text-center transition hover:border-red-300 hover:bg-red-50/40"
              >
                <div className="mb-2 flex size-10 items-center justify-center rounded-full bg-red-100 text-red-600">
                  <ImagePlus size={21} />
                </div>

                <p className="text-sm font-semibold text-slate-700">
                  Click to upload image
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  PNG, JPG or WEBP
                </p>

                <input
                  id="itemImage"
                  type="file"
                  name="itemImage"
                  accept="image/png,image/jpeg,image/webp"
                  required
                  className="hidden"
                />
              </label>
            </div>

            {/* Approval Notice */}
            <div className="flex gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3">
              <Utensils
                size={18}
                className="mt-0.5 shrink-0 text-amber-600"
              />
              <div>
                <p className="text-sm font-semibold text-amber-800">
                  Admin Approval Required
                </p>
                <p className="mt-0.5 text-xs leading-5 text-amber-700">
                  Your menu item will remain pending until an admin reviews
                  and approves it.
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end">


              <button
                type="submit"
                className="inline-flex h-10 items-center justify-center cursor-pointer gap-2 rounded-lg bg-red-600 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700"
              >
                <Pizza size={17} />
                Add Menu Item
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
