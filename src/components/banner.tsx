
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Pizza, Sparkles } from "lucide-react";

const Banner = () => {
    return (
        <section className="relative w-full overflow-hidden pt-6">
            {/* Full Width Background Image */}
            <div className="absolute inset-0">
                <Image
                    src="https://s.yimg.com/fz/api/res/1.2/qFrSG7Ht0TBsRoGsWy3PcA--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpbGw7aD00MTI7cHhvZmY9NTA7cHlvZmY9MTAwO3E9ODA7c3M9MTt3PTM4OA--/https://i.pinimg.com/736x/ab/e6/57/abe65721a6d06545c99230151aab0177.jpg"
                    alt="Delicious fresh pizza background"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center"
                />
            </div>

            {/* Background Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#300000]/95 via-[#650000]/80 to-[#300000]/50" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

            {/* Background Decorations */}
            <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-red-500/20 blur-[100px]" />
            <div className="pointer-events-none absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-yellow-400/15 blur-[100px]" />

            {/* Decorative Circle */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{
                    duration: 35,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="pointer-events-none absolute -right-24 top-1/2 hidden h-[480px] w-[480px] -translate-y-1/2 rounded-full border border-white/10 lg:block"
            />

            {/* Content Container */}
            <div className="relative z-10 mx-auto flex min-h-[420px] max-w-7xl items-center px-4 py-16 sm:min-h-[480px] sm:px-6 lg:min-h-[530px] lg:px-8">

                <div className="max-w-2xl">

                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25, duration: 0.6 }}
                        className="mb-6 inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-[10px] font-bold tracking-[2px] text-yellow-300 shadow-lg backdrop-blur-md sm:text-xs"
                    >
                        <Sparkles size={15} className="text-yellow-400" />
                        FRESHLY BAKED, EVERY DAY
                    </motion.div>

                    {/* Heading */}
                    <motion.h1
                        initial={{ opacity: 0, x: -35 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.35, duration: 0.7 }}
                        className="text-4xl font-black leading-[1.15] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
                    >
                        Hot & Fresh
                        <br />
                        <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
                            Pizza
                        </span>{" "}
                        Delivered
                        <br className="hidden sm:block" />
                        to Your Door
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.55, duration: 0.7 }}
                        className="mt-5 max-w-lg text-sm leading-7 text-red-50/85 sm:text-base sm:leading-8"
                    >
                        Discover the best pizza in town. Made with fresh
                        ingredients, loaded with flavor, and delivered
                        straight to your doorstep.
                    </motion.p>

                    {/* Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.6 }}
                        className="mt-8 flex flex-wrap items-center gap-4"
                    >
                        <Link
                            href="/brows-menu"
                            className="group/btn inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-yellow-400 to-amber-300 px-6 py-3.5 text-sm font-extrabold text-red-950 shadow-xl shadow-yellow-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-yellow-500/30 sm:px-8 sm:py-4"
                        >
                            <Pizza size={19} />
                            Explore Pizza Menu
                            <ArrowRight
                                size={18}
                                className="transition-transform duration-300 group-hover/btn:translate-x-1"
                            />
                        </Link>

                        <span className="text-xs font-medium text-white/70 sm:text-sm">
                            Made with love. Served fresh.
                        </span>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Decorative Line */}
            <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-70" />
        </section>
    );
};

export default Banner;
