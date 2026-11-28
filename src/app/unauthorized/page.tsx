
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    ShieldX,
    ArrowLeft,
    Home,
    LayoutDashboard,
    LockKeyhole,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

const UnAutorizePage = () => {
    const { data: session } = authClient.useSession()
    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-4 py-12">

            {/* Background Decorations */}
            <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-orange-100/70 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-red-100/70 blur-3xl" />

            <motion.section
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative w-full max-w-xl rounded-3xl border border-orange-100 bg-white p-7 text-center shadow-2xl shadow-orange-950/5 sm:p-10"
            >
                {/* Error Icon */}
                <motion.div
                    initial={{ scale: 0.5, rotate: -15 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
                    className="relative mx-auto mb-7 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-orange-100 to-red-100"
                >
                    <div className="absolute inset-2 rounded-full border border-red-200" />

                    <ShieldX
                        className="h-12 w-12 text-red-500"
                        strokeWidth={1.7}
                    />

                    <span className="absolute -right-1 -top-1 flex h-8 w-8 items-center justify-center rounded-full border-4 border-white bg-orange-500 text-white">
                        <LockKeyhole className="h-3.5 w-3.5" />
                    </span>
                </motion.div>

                {/* Error Code */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-orange-600"
                >
                    Access Restricted · 403
                </motion.p>

                {/* Heading */}
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                    Unauthorized
                    <span className="mt-1 block bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                        Access Denied!
                    </span>
                </h1>

                {/* Description */}
                <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-gray-600 sm:text-base">
                    Sorry! You don't have permission to access this page.
                    Please make sure you are using the correct account
                    or contact the administrator for assistance.
                </p>

                {/* Info Box */}
                <div className="mt-7 flex items-start gap-3 rounded-2xl border border-orange-100 bg-orange-50/80 p-4 text-left">
                    <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-orange-600" />

                    <div>
                        <h3 className="text-sm font-semibold text-gray-900">
                            Why am I seeing this?
                        </h3>

                        <p className="mt-1 text-xs leading-6 text-gray-600 sm:text-sm">
                            Your account may not have the required role or permissions
                            to view this resource.
                        </p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/30 active:scale-95"
                    >
                        <Home className="h-4 w-4" />
                        Back to Home
                    </Link>

                    <Link
                        href={`/dashboard/${session?.user.role}/overview`}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-all duration-300 hover:-translate-y-1 hover:border-orange-300 hover:bg-orange-50 active:scale-95"
                    >
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                    </Link>
                </div>

                {/* Footer */}
                <div className="mt-9 border-t border-gray-100 pt-5">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-xs font-medium text-gray-500 transition-colors hover:text-orange-600"
                    >
                        <ArrowLeft className="h-3.5 w-3.5" />
                        Return to PizzaHub
                    </Link>
                </div>
            </motion.section>
        </main>
    );
};

export default UnAutorizePage;



