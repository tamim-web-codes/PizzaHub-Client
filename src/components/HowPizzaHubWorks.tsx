
"use client";

import {
    Search,
    Pizza,
    ClipboardCheck,
    Bike,
    ArrowRight,
    CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";

const steps = [
    {
        id: 1,
        number: "01",
        title: "Explore Our Menu",
        description:
            "Browse our delicious pizza collection and discover your favorite flavors from trusted local vendors.",
        icon: Search,
        color: "bg-orange-100 text-orange-600",
    },
    {
        id: 2,
        number: "02",
        title: "Choose Your Pizza",
        description:
            "Explore pizza details, compare options, and select the perfect meal for your cravings.",
        icon: Pizza,
        color: "bg-red-100 text-red-600",
    },
    {
        id: 3,
        number: "03",
        title: "Place Your Order",
        description:
            "Enter your delivery date and address, add special instructions, and submit your order easily.",
        icon: ClipboardCheck,
        color: "bg-amber-100 text-amber-600",
    },
    {
        id: 4,
        number: "04",
        title: "Enjoy Your Meal",
        description:
            "Track your order status and get ready to enjoy a delicious meal from your favorite vendor.",
        icon: Bike,
        color: "bg-green-100 text-green-600",
    },
];

export default function HowPizzaHubWorks() {
    return (
        <section className="relative overflow-hidden bg-orange-50/50 py-16 sm:py-20 lg:py-24">

            {/* Background Decorations */}
            <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-orange-200/30 blur-3xl" />
            <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-red-200/30 blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">

                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mx-auto mb-12 max-w-2xl text-center sm:mb-16"
                >
                    <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-3 py-2 text-xs font-semibold text-orange-600 shadow-sm sm:px-4 sm:text-sm">
                        <span className="h-2 w-2 rounded-full bg-orange-500" />
                        SIMPLE & EASY PROCESS
                    </span>

                    <h2 className="mt-5 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                        How{" "}
                        <span className="text-orange-600">PizzaHub</span>{" "}
                        Works
                    </h2>

                    <p className="mt-4 text-xs leading-6 text-gray-600 sm:mt-5 sm:text-base sm:leading-7">
                        Getting your favorite pizza has never been easier.
                        Follow these four simple steps and enjoy a delicious
                        experience with PizzaHub.
                    </p>
                </motion.div>

                {/* Steps */}
                <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
                    {steps.map((step, index) => {
                        const Icon = step.icon;

                        return (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, y: 35 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.12,
                                }}
                                whileHover={{ y: -7 }}
                                className="group relative rounded-2xl border border-orange-100 bg-white p-3 shadow-sm transition-all duration-300 hover:border-orange-300 hover:shadow-xl hover:shadow-orange-100/70 sm:p-6 lg:p-7"
                            >
                                {/* Step Number */}
                                <div className="mb-4 flex items-center justify-between sm:mb-6">
                                    <span className="text-xs font-extrabold tracking-widest text-orange-300 sm:text-sm">
                                        STEP {step.number}
                                    </span>

                                    {index !== steps.length - 1 && (
                                        <ArrowRight
                                            size={17}
                                            className="text-orange-300 transition-transform duration-300 group-hover:translate-x-1 sm:h-5 sm:w-5"
                                        />
                                    )}
                                </div>

                                {/* Icon */}
                                <div
                                    className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-300 group-hover:rotate-6 group-hover:scale-110 sm:mb-6 sm:h-16 sm:w-16 sm:rounded-2xl ${step.color}`}
                                >
                                    <Icon
                                        size={23}
                                        strokeWidth={1.8}
                                        className="sm:h-8 sm:w-8"
                                    />
                                </div>

                                {/* Content */}
                                <h3 className="mb-2 text-sm font-bold leading-snug text-gray-900 transition-colors group-hover:text-orange-600 sm:mb-3 sm:text-lg">
                                    {step.title}
                                </h3>

                                <p className="text-[10px] leading-5 text-gray-600 sm:text-sm sm:leading-7">
                                    {step.description}
                                </p>

                                {/* Bottom */}
                                <div className="mt-4 flex items-center gap-2 border-t border-orange-100 pt-3 sm:mt-6 sm:pt-4">
                                    <CheckCircle2
                                        size={15}
                                        className="shrink-0 text-green-500"
                                    />
                                    <span className="text-[9px] font-semibold text-gray-500 sm:text-xs">
                                        Easy with PizzaHub
                                    </span>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Bottom Message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-10 text-center sm:mt-14"
                >
                    <p className="text-sm font-medium text-gray-600 sm:text-base">
                        Your favorite pizza is just a few clicks away!
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
