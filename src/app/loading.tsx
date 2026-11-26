
"use client";

import { motion } from "framer-motion";
import { Pizza, LoaderCircle } from "lucide-react";

export default function Loading() {
    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50 px-4">

            {/* Background Decoration */}
            <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-orange-200/30 blur-3xl" />
            <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-amber-200/30 blur-3xl" />

            <div className="relative flex flex-col items-center text-center">

                {/* Logo Animation */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative mb-7"
                >
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 12,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="flex h-24 w-24 items-center justify-center rounded-[28px] bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-xl shadow-orange-200"
                    >
                        <Pizza size={46} strokeWidth={1.7} />
                    </motion.div>

                    {/* Pulse Ring */}
                    <motion.div
                        animate={{
                            scale: [1, 1.35, 1],
                            opacity: [0.5, 0, 0.5],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute inset-0 rounded-[28px] border-2 border-orange-400"
                    />
                </motion.div>

                {/* Brand Name */}
                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl font-extrabold tracking-tight text-gray-900"
                >
                    Pizza<span className="text-orange-500">Hub</span>
                </motion.h1>

                <p className="mt-2 text-sm text-gray-500">
                    Delicious moments are loading...
                </p>

                {/* Loader */}
                <div className="mt-8 flex items-center gap-3">
                    <LoaderCircle
                        size={20}
                        className="animate-spin text-orange-500"
                    />

                    <span className="text-sm font-semibold text-gray-600">
                        Please wait
                    </span>
                </div>

                {/* Loading Progress Animation */}
                <div className="mt-5 h-1.5 w-48 overflow-hidden rounded-full bg-orange-100">
                    <motion.div
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="h-full w-1/2 rounded-full bg-gradient-to-r from-orange-400 to-amber-500"
                    />
                </div>

                <p className="mt-6 text-xs font-medium text-gray-400">
                    Fresh food. Happy moments.
                </p>
            </div>
        </div>
    );
}
