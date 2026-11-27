
"use client";

import {
    Leaf,
    ShoppingBag,
    ShieldCheck,
    Truck,
    ArrowUpRight,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
    {
        id: 1,
        title: "Fresh & Quality Ingredients",
        description:
            "Every meal is prepared with fresh, high-quality ingredients to deliver delicious taste in every bite.",
        icon: Leaf,
        number: "01",
    },
    {
        id: 2,
        title: "Easy Online Ordering",
        description:
            "Order your favorite pizzas and meals in just a few simple steps with a smooth ordering experience.",
        icon: ShoppingBag,
        number: "02",
    },
    {
        id: 3,
        title: "Trusted Local Vendors",
        description:
            "Discover delicious food from trusted restaurants and reliable local vendors near you.",
        icon: ShieldCheck,
        number: "03",
    },
    {
        id: 4,
        title: "Fast & Convenient Service",
        description:
            "Enjoy a simple and convenient food ordering experience designed to save your time.",
        icon: Truck,
        number: "04",
    },
];

export default function WhyChoosePizzaHub() {
    return (
        <section className="relative overflow-hidden bg-white py-15 sm:py-20 lg:py-20">
            {/* Background Decoration */}
            <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-orange-100/50 blur-3xl" />
            <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-red-100/40 blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">

                {/* Section Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mx-auto mb-10 max-w-2xl text-center sm:mb-16"
                >
                    <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-2 text-xs font-semibold text-orange-600 sm:px-4 sm:text-sm">
                        <span className="h-2 w-2 rounded-full bg-orange-500" />
                        WHY CHOOSE US
                    </span>

                    <h2 className="mt-5 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                        Why Choose{" "}
                        <span className="text-orange-600">PizzaHub?</span>
                    </h2>

                    <p className="mt-4 text-xs leading-6 text-gray-600 sm:mt-5 sm:text-base sm:leading-7">
                        Great food, trusted vendors, and a smooth ordering
                        experience. Everything you need to enjoy your favorite
                        food in one place.
                    </p>
                </motion.div>

                {/* Feature Cards */}
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;

                        return (
                            <motion.div
                                key={feature.id}
                                initial={{ opacity: 0, y: 35 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.12,
                                }}
                                whileHover={{ y: -8 }}
                                className="group relative rounded-xl border border-orange-100 bg-white p-2.5 shadow-sm transition-all duration-300 hover:border-orange-300 hover:shadow-xl hover:shadow-orange-100/60 sm:rounded-2xl sm:p-6 lg:p-7"
                            >
                                {/* Number */}
                                <div className="absolute right-2 top-2 text-[10px] font-bold text-orange-300 transition-colors group-hover:text-orange-500 sm:right-5 sm:top-5 sm:text-sm">
                                    {feature.number}
                                </div>

                                {/* Icon */}
                                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-orange-600 transition-all duration-300 group-hover:rotate-6 group-hover:bg-orange-600 group-hover:text-white sm:mb-6 sm:h-14 sm:w-14 sm:rounded-2xl">
                                    <Icon
                                        size={20}
                                        strokeWidth={1.8}
                                        className="sm:h-[27px] sm:w-[27px]"
                                    />
                                </div>

                                {/* Content */}
                                <h3 className="mb-2 text-[11px] font-bold leading-snug text-gray-900 transition-colors group-hover:text-orange-600 sm:mb-3 sm:text-lg">
                                    {feature.title}
                                </h3>

                                <p className="text-[9px] leading-4 text-gray-600 sm:text-sm sm:leading-7">
                                    {feature.description}
                                </p>

                                {/* Bottom Decoration */}
                                <div className="mt-3 flex items-center justify-between border-t border-orange-100 pt-2 sm:mt-6 sm:pt-4">
                                    <span className="text-[7px] font-semibold uppercase tracking-wide text-gray-400 sm:text-xs sm:tracking-wider">
                                        PizzaHub Quality
                                    </span>

                                    <ArrowUpRight
                                        size={14}
                                        className="shrink-0 text-orange-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 sm:h-[18px] sm:w-[18px]"
                                    />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
