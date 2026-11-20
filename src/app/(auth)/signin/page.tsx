
"use client";

import Link from "next/link";
import Image from "next/image";
import {
    Mail,
    LockKeyhole,
    Eye,
    EyeOff,
    UserRound,
    ShieldCheck,
} from "lucide-react";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const SignInPage = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handlegooglesignin = async () => {
        const { data, error } = await authClient.signIn.social({
            provider: 'google',
            callbackURL: '/'
        })
        if (error) {
            toast.error(error.message || "Signup failed!");
            return;
        }

        if (data) {
            toast.success("Google Sign Up Successfully!");

        }
    }


    return (
        <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-100 via-orange-50 to-red-100 px-4 py-8">

            {/* Sign In Card */}
            <div className="w-full max-w-md overflow-hidden rounded-2xl border border-red-200 bg-[#fffaf7] shadow-2xl shadow-red-900/15">

                <div className="px-5 py-7 sm:px-7">

                    {/* Logo */}
                    <div className="mb-6 text-center">

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

                        {/* Heading */}
                        <div className="mt-4 flex items-center gap-3">
                            <div className="h-px flex-1 bg-red-300" />

                            <h2 className="text-sm font-bold text-gray-900">
                                Welcome Back!
                            </h2>

                            <div className="h-px flex-1 bg-red-300" />
                        </div>

                        <p className="mt-2 text-xs text-gray-600">
                            Sign in to continue enjoying your favorite pizza!
                        </p>
                    </div>

                    {/* Sign In Form */}
                    <form className="space-y-4">

                        {/* Email */}
                        <div>
                            <label className="mb-1.5 block text-xs font-bold text-gray-900">
                                Email Address
                            </label>

                            <div className="relative">
                                <Mail
                                    size={17}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700"
                                />

                                <input
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="Enter your email"
                                    className="h-11 w-full rounded-lg border border-orange-200 bg-white pl-10 pr-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="mb-1.5 block text-xs font-bold text-gray-900">
                                Password
                            </label>

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
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between gap-2">

                            <label className="flex cursor-pointer items-center gap-2 text-xs text-gray-600">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    className="h-4 w-4 accent-red-600"
                                />
                                Remember me
                            </label>

                        </div>

                        {/* Sign In Button */}
                        <button
                            type="submit"
                            className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-red-600 to-red-700 text-sm font-bold text-white shadow-md shadow-red-500/20 transition hover:from-red-700 hover:to-red-800"
                        >
                            <UserRound size={17} />
                            Sign In
                        </button>

                    </form>

                    {/* Divider */}
                    <div className="my-4 flex items-center gap-3">
                        <div className="h-px flex-1 bg-gray-200" />

                        <span className="text-xs font-medium text-gray-500">
                            OR
                        </span>

                        <div className="h-px flex-1 bg-gray-200" />
                    </div>

                    {/* Google Sign In */}
                    <button
                        onClick={handlegooglesignin}
                        className="flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
                    >
                        <FcGoogle size={20} />
                        Continue with Google
                    </button>


                    {/* Register Link */}
                    <p className="mt-5 text-center text-xs text-gray-600">
                        Don`t have an account?{" "}

                        <Link
                            href="/signup"
                            className="font-bold text-red-600 transition hover:text-red-800"
                        >
                            Sign Up
                        </Link>
                    </p>

                    {/* Security Footer */}
                    <div className="mt-5 flex items-center justify-center gap-2 border-t border-gray-200 pt-4">
                        <ShieldCheck
                            size={14}
                            className="text-green-700"
                        />

                        <p className="text-[10px] font-medium text-gray-500">
                            Your account is protected with secure authentication
                        </p>
                    </div>

                </div>
            </div>
        </main>
    );
};

export default SignInPage;
