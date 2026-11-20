'use client'
import Link from "next/link";
import {
    User,
    Mail,
    LockKeyhole,
    Image as ImageIcon,
    Eye,
    Store,
    Users,
    UserRoundCheck,
    ShieldCheck,
    EyeOff,
} from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { toast } from "sonner";


type Role = "vendor" | "customer";

const RegisterPage = () => {
    const [role, setRole] = useState<Role>('vendor')
    const [showPassword, setShowPassword] = useState(false);

    const handlesignup = async (e: React.SubmitEvent<HTMLElement>) => {
        e.preventDefault()
        const imageInput = document.querySelector<HTMLInputElement>(
            "#sign-up-image"
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
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries())
        const { data: result, error } = await authClient.signUp.email({
            name: data.name as string,
            email: data.email as string,
            password: data.password as string,
            image: imageUrl,
            role: role,
            callbackURL: "/",
        })
        if (error) {
            toast.error(error.message || "Signup failed!");
            return;
        }

        if (result) {
            toast.success("Account created successfully!");

            redirect('/')
        }

    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-100 via-orange-50 to-red-100 px-4 py-8">

            {/* Register Card */}
            <div className="w-full max-w-md overflow-hidden rounded-2xl border border-red-200 bg-[#fffaf7] shadow-2xl shadow-red-900/15">

                <div className="px-5 py-6 sm:px-7">

                    {/* Logo */}
                    <div className="mb-5 text-center">
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center gap-2"
                        >
                            <Image
                                src="https://www.icosix.com/uploads/icons/2026/03/pizza-6.png"
                                alt="PizzaHub Logo"
                                width={44}
                                height={44}
                                className="h-11 w-11 object-contain"
                            />

                            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">
                                Pizza<span className="text-red-600">Hub</span>
                            </h1>
                        </Link>

                        <div className="mt-3 flex items-center gap-3">
                            <div className="h-px flex-1 bg-red-300" />
                            <h2 className="text-sm font-bold text-gray-900">
                                Sign Up to Get Started
                            </h2>
                            <div className="h-px flex-1 bg-red-300" />
                        </div>

                        <p className="mt-1 text-xs text-gray-600">
                            Join our community and enjoy great pizza!
                        </p>
                    </div>

                    {/* Register Form */}
                    <form onSubmit={handlesignup} className="space-y-3">

                        {/* Full Name */}
                        <div className="relative">
                            <User
                                size={17}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700"
                            />
                            <input
                                type="text"
                                name="name"
                                required
                                minLength={2}
                                placeholder="Full Name"
                                className="h-11 w-full rounded-lg border border-orange-200 bg-white pl-10 pr-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                            />
                        </div>

                        {/* Email */}
                        <div className="relative">
                            <Mail
                                size={17}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700"
                            />
                            <input
                                type="email"
                                name="email"
                                required
                                placeholder="Email Address"
                                className="h-11 w-full rounded-lg border border-orange-200 bg-white pl-10 pr-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                            />
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <LockKeyhole
                                size={17}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700"
                            />
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                required
                                placeholder="Enter your password"
                                className="h-11 w-full rounded-lg border border-orange-200 bg-white pl-10 pr-11 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-red-600"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? (
                                    <EyeOff size={17} />
                                ) : (
                                    <Eye size={17} />
                                )}
                            </button>
                        </div>

                        {/* Profile Image */}
                        <div className="relative flex h-11 items-center overflow-hidden rounded-lg border border-orange-200 bg-white">
                            <ImageIcon
                                size={17}
                                className="ml-3 shrink-0 text-gray-700"
                            />

                            <input
                                id="sign-up-image"
                                type="file"
                                accept="image/*"
                                className="w-full cursor-pointer pl-2 text-xs text-gray-500 file:mr-2 file:h-10 file:cursor-pointer file:border-0 file:border-l file:border-orange-200 file:bg-orange-50 file:px-3 file:text-xs file:font-medium file:text-gray-700"
                            />
                        </div>

                        {/* Account Role */}
                        <div>
                            <p className="mb-2 text-xs font-bold text-gray-900">
                                Select Account Role
                            </p>

                            <div className="grid grid-cols-2 gap-3">

                                {/* Vendor */}
                                <label className="flex cursor-pointer items-center gap-2 rounded-lg border-2 border-red-500 bg-red-50/50 p-2.5 transition hover:bg-red-50">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="vendor"
                                        checked={role === "vendor"}
                                        onChange={() => setRole("vendor")}
                                        className="h-4 w-4 accent-red-600"
                                    />

                                    <div className="flex flex-1 flex-col items-center text-center">
                                        <Store
                                            size={29}
                                            className="fill-red-600 text-red-600"
                                        />
                                        <span className="mt-1 text-xs font-bold text-gray-900">
                                            Vendor
                                        </span>
                                        <span className="text-[10px] text-gray-500">
                                            Restaurant Owner
                                        </span>
                                    </div>
                                </label>

                                {/* Customer */}
                                <label className="flex cursor-pointer items-center gap-2 rounded-lg border-2 border-red-500 bg-white p-2.5 transition hover:border-red-300 hover:bg-red-50/50">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="customer"
                                        checked={role === "customer"}
                                        onChange={() => setRole("customer")}
                                        className="h-4 w-4 accent-red-600"
                                    />

                                    <div className="flex flex-1 flex-col items-center text-center">
                                        <Users
                                            size={29}
                                            className="fill-red-600 text-red-600"
                                        />
                                        <span className="mt-1 text-xs font-bold text-gray-900">
                                            Customer
                                        </span>
                                        <span className="text-[10px] text-gray-500">
                                            Food Lover
                                        </span>
                                    </div>
                                </label>

                            </div>
                        </div>

                        {/* Create Account Button */}
                        <button
                            type="submit"
                            className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-red-600 to-red-700 text-sm font-bold text-white shadow-md shadow-red-500/20 transition hover:from-red-700 hover:to-red-800"
                        >
                            <UserRoundCheck size={17} />
                            Create Account
                        </button>

                    </form>

                    {/* Divider */}
                    <div className="my-3 flex items-center gap-3">
                        <div className="h-px flex-1 bg-gray-200" />
                        <span className="text-xs font-medium text-gray-500">
                            OR
                        </span>
                        <div className="h-px flex-1 bg-gray-200" />
                    </div>

                    {/* Google Button */}
                    <button
                        type="button"
                        className="flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
                    >
                        <FcGoogle size={20} />
                        Continue with Google
                    </button>

                    {/* Login Link */}
                    <p className="mt-4 text-center text-xs text-gray-600">
                        Already have an account?{" "}
                        <Link
                            href="/signin"
                            className="font-bold text-red-600 hover:text-red-800"
                        >
                            Sign In
                        </Link>
                    </p>

                    {/* Security Footer */}
                    <div className="mt-4 flex items-center justify-center gap-2 border-t border-gray-200 pt-3">
                        <ShieldCheck
                            size={14}
                            className="text-green-700"
                        />
                        <p className="text-[10px] font-medium text-gray-500">
                            Your data is safe with us
                        </p>
                    </div>

                </div>
            </div>
        </main>
    );
};

export default RegisterPage;
