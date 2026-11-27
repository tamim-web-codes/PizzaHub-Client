
"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const categories = [
       {
        id: "specialty",
        name: "Specialty",
        description: "Discover our unique gourmet creations.",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800",
        label: "Premium Selection",
    },
    {
        id: "meat-lovers",
        name: "Meat-Lovers",
        description: "Loaded with delicious meat toppings.",
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800",
        label: "Rich & Flavorful",
    },
    {
        id: "desserts",
        name: "Desserts",
        description: "Sweet treats to make your day better.",
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800",
        label: "Sweet Treats",
    },
    {
        id: "vegetarian",
        name: "Vegetarian",
        description: "Fresh vegetables and delicious flavors.",
        image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=800",
        label: "Fresh & Healthy",
    },
    {
        id: "classic",
        name: "Classic",
        description: "Enjoy timeless and traditional favorites.",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800",
        label: "Traditional Favorites",
    },
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const cardVariants = {
    hidden: {
        opacity: 0,
        y: 25,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
        },
    },
};

export default function PizzaCategories() {
    return (
        <section className="bg-white py-5 sm:py-16 lg:py-5">
            <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">

                {/* Section Heading */}
                <div className="mb-8 text-center sm:mb-12">
                    <span className="mb-3 inline-block rounded-full bg-orange-100 px-3 py-1.5 text-xs font-semibold text-orange-600 sm:px-4 sm:py-2 sm:text-sm">
                        Explore Our Menu
                    </span>

                    <h2 className="text-2xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
                        Choose Your{" "}
                        <span className="text-orange-600">
                            Favorite Food
                        </span>
                    </h2>

                    <p className="mx-auto mt-3 max-w-2xl text-xs leading-6 text-gray-500 sm:mt-4 sm:text-base sm:leading-7">
                        Discover a wide variety of delicious foods.
                        From classic pizzas to tasty burgers and sweet
                        desserts, find something you will love.
                    </p>
                </div>

                {/* Category Cards */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    className="grid grid-cols-3 gap-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-3"
                >
                    {categories.map((category) => (
                        <motion.div
                            key={category.id}
                            variants={cardVariants}
                            whileHover={{ y: -5 }}
                            className="group min-w-0"
                        >
                            <Link
                                href={`/brows-menu?category=${encodeURIComponent(category.id)}`}
                                className="block h-full overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:border-orange-200 hover:shadow-lg sm:rounded-2xl"
                            >
                                {/* Image */}
                                {/* Image */}
                                <div className="relative h-36 overflow-hidden bg-gray-100 sm:h-48 lg:h-56 xl:h-64">
                                    <Image
                                        src={category.image}
                                        alt={category.name}
                                        fill
                                        sizes="(max-width: 640px) 33vw, (max-width: 1024px) 33vw, 25vw"
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                    <span className="absolute bottom-2 left-2 max-w-[90%] truncate rounded-full border border-white/20 bg-white/20 px-2 py-1 text-[8px] font-semibold text-white backdrop-blur-md sm:bottom-3 sm:left-3 sm:px-3 sm:text-xs">
                                        {category.label}
                                    </span>

                                    <div className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white text-orange-600 opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100 sm:right-3 sm:top-3 sm:h-9 sm:w-9">
                                        <ArrowUpRight size={16} />
                                    </div>
                                </div>

                                {/* Card Content */}
                                <div className="flex min-h-[75px] items-center justify-between gap-1 p-2 sm:min-h-[105px] sm:gap-3 sm:p-4 lg:p-5">
                                    <div className="min-w-0">
                                        <h3 className="truncate text-[11px] font-bold text-gray-900 transition-colors duration-300 group-hover:text-orange-600 sm:text-base lg:text-lg">
                                            {category.name}
                                        </h3>

                                        <p className="mt-1 line-clamp-2 text-[9px] leading-4 text-gray-500 sm:text-xs sm:leading-5 lg:text-sm">
                                            {category.description}
                                        </p>
                                    </div>

                                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-600 transition-all duration-300 group-hover:bg-orange-600 group-hover:text-white sm:h-9 sm:w-9">
                                        <ArrowUpRight size={14} />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom Button */}
                <div className="mt-8 text-center sm:mt-12">
                    <Link
                        href="/brows-menu"
                        className="inline-flex items-center gap-2 rounded-xl border-2 border-orange-600 px-5 py-3 text-xs font-bold text-orange-600 transition-all hover:bg-orange-600 hover:text-white sm:px-7 sm:py-3.5 sm:text-sm"
                    >
                        Explore All Pizzas
                        <ArrowRight size={16} />
                    </Link>
                </div>

            </div>
        </section>
    );
}
