"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    Search,
    Pizza,
    SlidersHorizontal,
    RefreshCw,
    MapPin,
    ArrowUpDown,
    Filter,
    ArrowDownWideNarrow,
    ArrowUpNarrowWide,
    Crown,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { TMenuItemData } from "@/components/types/type";
import MenuCard from "./Menu-Card";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

type Props = {
    menuItems: TMenuItemData[];
    query: string;
    error?: string;
};

const categories = [
    "pizza",
    "burger",
    "pasta",
    "snacks",
    "drinks",
];

const BrowseMenuClient = ({
    menuItems,
    query,
    error,
}: Props) => {
    const router = useRouter();

    const params = new URLSearchParams(query);

    const initialSearch = params.get("search") || "";
    const category = params.get("category") || "all";
    const location = params.get("location") || "all";
    const sort = params.get("sort") || "default";

    const [search, setSearch] = useState(initialSearch);

    // URL পরিবর্তন হলে search input update হবে
    useEffect(() => {
        setSearch(initialSearch);
    }, [initialSearch]);

    // Unique locations
    const locations = Array.from(
        new Set(
            menuItems
                .map((item) => item.location?.trim())
                .filter((item): item is string => Boolean(item))
        )
    );

    // Filter URL তৈরি
    const createFilterUrl = (key: string, value: string) => {
        const urlParams = new URLSearchParams(query);

        if (value === "all" || value === "default") {
            urlParams.delete(key);
        } else {
            urlParams.set(key, value);
        }

        const newQuery = urlParams.toString();

        return newQuery
            ? `/brows-menu?${newQuery}`
            : "/brows-menu";
    };

    // Search submit
    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const urlParams = new URLSearchParams(query);

        if (search.trim()) {
            urlParams.set("search", search.trim());
        } else {
            urlParams.delete("search");
        }

        const newQuery = urlParams.toString();

        router.push(
            newQuery
                ? `/brows-menu?${newQuery}`
                : "/brows-menu",
            { scroll: false }
        );
    };

    // Automatic search with debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            const urlParams = new URLSearchParams(query);

            if (search.trim()) {
                urlParams.set("search", search.trim());
            } else {
                urlParams.delete("search");
            }

            const newQuery = urlParams.toString();

            const newUrl = newQuery
                ? `/brows-menu?${newQuery}`
                : "/brows-menu";

            const currentUrl = query
                ? `/brows-menu?${query}`
                : "/brows-menu";

            if (newUrl !== currentUrl) {
                router.replace(newUrl, { scroll: false });
            }
        }, 400);

        return () => clearTimeout(timer);
    }, [search, query, router]);

    return (
        <div className="min-h-screen bg-slate-50">

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-r from-red-700 via-red-600 to-orange-500 px-5 py-16 text-white md:py-20">

                <div className="absolute -right-20 -top-20 size-72 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute -bottom-24 -left-20 size-72 rounded-full bg-orange-300/20 blur-3xl" />

                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative mx-auto max-w-7xl text-center"
                >
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm">
                        <Pizza size={17} />
                        Fresh & Delicious
                    </div>

                    <h1 className="text-3xl font-extrabold sm:text-4xl md:text-5xl">
                        Explore Our Delicious Menu
                    </h1>

                    <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-red-50 sm:text-base">
                        Discover your favorite pizzas and delicious foods.
                        Fresh ingredients, amazing taste, and quality in every bite.
                    </p>
                </motion.div>
            </section>

            {/* Menu Section */}
            <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >

                    {/* Heading */}
                    <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

                        <div>
                            <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
                                Browse Menu
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Find your favorite food from our menu.
                            </p>
                        </div>

                        <div className="flex w-fit items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600">
                            <Pizza size={17} />
                            {menuItems.length} Items Found
                        </div>
                    </div>

                    {/* Main Filter Card */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">

                        {/* Search */}
                        <form
                            onSubmit={handleSearch}
                            className="flex flex-col gap-3 sm:flex-row"
                        >
                            <div className="relative flex-1">
                                <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" />

                                <Input
                                    type="text"
                                    name="search"
                                    placeholder="Search by food name..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="h-12 rounded-xl border-2 border-slate-200 bg-slate-50 pl-11 text-sm shadow-none transition focus-visible:border-red-500 focus-visible:ring-2 focus-visible:ring-red-100"
                                />
                            </div>

                            <Button
                                type="submit"
                                className="h-12 rounded-xl bg-red-600 px-7 font-semibold text-white shadow-sm transition hover:bg-red-700"
                            >
                                <Search size={17} />
                                Search
                            </Button>
                        </form>

                        <div className="my-6 border-t border-slate-100" />

                        {/* Category */}
                        <div>
                            <div className="mb-4 flex items-center gap-2">

                                <div className="flex size-9 items-center justify-center rounded-xl bg-red-50">
                                    <SlidersHorizontal
                                        size={18}
                                        className="text-red-600"
                                    />
                                </div>

                                <div>
                                    <h3 className="text-sm font-bold text-slate-900">
                                        Browse by Category
                                    </h3>

                                    <p className="text-xs text-slate-500">
                                        Choose your favorite food category
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">

                                <Link
                                    href={createFilterUrl("category", "all")}
                                    scroll={false}
                                    className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${category === "all"
                                        ? "border-red-600 bg-red-600 text-white shadow-md shadow-red-100"
                                        : "border-slate-200 bg-white text-slate-600 hover:border-red-400 hover:bg-red-50 hover:text-red-600"
                                        }`}
                                >
                                    All
                                </Link>

                                {categories.map((item) => (
                                    <Link
                                        key={item}
                                        href={createFilterUrl("category", item)}
                                        scroll={false}
                                        className={`rounded-full border px-5 py-2.5 text-sm font-semibold capitalize transition-all duration-200 ${category === item
                                            ? "border-red-600 bg-red-600 text-white shadow-md shadow-red-100"
                                            : "border-slate-200 bg-white text-slate-600 hover:border-red-400 hover:bg-red-50 hover:text-red-600"
                                            }`}
                                    >
                                        {item}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="my-6 border-t border-slate-100" />

                        {/* Modern Filter Section */}
                        <div>

                            <div className="mb-5 flex items-center justify-between gap-3">
                                <div className="flex items-center gap-2">

                                    <div className="flex size-9 items-center justify-center rounded-xl bg-orange-50">
                                        <Filter
                                            size={18}
                                            className="text-orange-600"
                                        />
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-bold text-slate-900">
                                            Refine Your Search
                                        </h3>

                                        <p className="text-xs text-slate-500">
                                            Filter menu by location and price
                                        </p>
                                    </div>
                                </div>

                                <span className="hidden rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500 sm:inline-flex">
                                    2 Filters
                                </span>
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                                {/* Location Filter */}
                                <motion.div
                                    whileHover={{ y: -2 }}
                                    transition={{ duration: 0.2 }}
                                    className="group min-w-0 rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-red-50/40 p-4 shadow-sm transition-all duration-200 hover:border-red-200 hover:shadow-md"
                                >
                                    <div className="mb-3 flex items-center justify-between">

                                        <div className="flex items-center gap-3">

                                            <div className="flex size-10 items-center justify-center rounded-xl bg-red-100 text-red-600 transition group-hover:bg-red-600 group-hover:text-white">
                                                <MapPin size={19} />
                                            </div>

                                            <div>
                                                <h4 className="text-sm font-bold text-slate-800">
                                                    Location
                                                </h4>

                                                <p className="text-xs text-slate-500">
                                                    Find food near you
                                                </p>
                                            </div>
                                        </div>

                                        <span className="rounded-lg bg-red-50 px-2.5 py-1 text-[11px] font-semibold text-red-600">
                                            LOCATION
                                        </span>
                                    </div>

                                    <Select
                                        value={location}
                                        onValueChange={(value) => {
                                            router.push(
                                                createFilterUrl("location", value),
                                                { scroll: false }
                                            );
                                        }}
                                    >
                                        <SelectTrigger className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition hover:border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100">
                                            <SelectValue placeholder="Choose your location" />
                                        </SelectTrigger>

                                        <SelectContent
                                            position="popper"
                                            sideOffset={6}
                                            className="z-[9999] max-h-60 min-w-[var(--radix-select-trigger-width)] rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl"
                                        >
                                            <SelectItem
                                                value="all"
                                                className="cursor-pointer rounded-lg py-2.5 text-sm focus:bg-red-50 focus:text-red-700"
                                            >
                                                All Locations
                                            </SelectItem>

                                            {locations.map((item) => (
                                                <SelectItem
                                                    key={item}
                                                    value={item}
                                                    className="cursor-pointer rounded-lg py-2.5 text-sm focus:bg-red-50 focus:text-red-700"
                                                >
                                                    {item}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    <p className="mt-2 text-[11px] text-slate-400">
                                        Select a restaurant location
                                    </p>
                                </motion.div>

                                {/* Price Sort Filter */}
                                <motion.div
                                    whileHover={{ y: -2 }}
                                    transition={{ duration: 0.2 }}
                                    className="group min-w-0 rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-orange-50/40 p-4 shadow-sm transition-all duration-200 hover:border-orange-200 hover:shadow-md"
                                >
                                    <div className="mb-3 flex items-center justify-between">

                                        <div className="flex items-center gap-3">

                                            <div className="flex size-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600 transition group-hover:bg-orange-500 group-hover:text-white">
                                                <ArrowUpDown size={19} />
                                            </div>

                                            <div>
                                                <h4 className="text-sm font-bold text-slate-800">
                                                    Sort by Price
                                                </h4>

                                                <p className="text-xs text-slate-500">
                                                    Arrange food by price
                                                </p>
                                            </div>
                                        </div>

                                        <span className="rounded-lg bg-orange-50 px-2.5 py-1 text-[11px] font-semibold text-orange-600">
                                            PRICE
                                        </span>
                                    </div>

                                    <Select
                                        value={sort}
                                        onValueChange={(value) => {
                                            router.push(
                                                createFilterUrl("sort", value),
                                                { scroll: false }
                                            );
                                        }}
                                    >
                                        <SelectTrigger className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition hover:border-orange-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-100">
                                            <SelectValue placeholder="Choose price order" />
                                        </SelectTrigger>

                                        <SelectContent
                                            position="popper"
                                            sideOffset={6}
                                            className="z-[9999] min-w-[var(--radix-select-trigger-width)] rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl"
                                        >
                                            <SelectItem
                                                value="default"
                                                className="cursor-pointer rounded-lg py-2.5 text-sm focus:bg-orange-50 focus:text-orange-700"
                                            >
                                                Default
                                            </SelectItem>

                                            <SelectItem
                                                value="low-to-high"
                                                className="cursor-pointer rounded-lg py-2.5 text-sm focus:bg-orange-50 focus:text-orange-700"
                                            >
                                                <span className="flex items-center gap-2">
                                                    <ArrowUpNarrowWide className="size-4 text-green-600" />
                                                    Price: Low to High
                                                </span>
                                            </SelectItem>

                                            <SelectItem
                                                value="high-to-low"
                                                className="cursor-pointer rounded-lg py-2.5 text-sm focus:bg-orange-50 focus:text-orange-700"
                                            >
                                                <span className="flex items-center gap-2">
                                                    <ArrowDownWideNarrow className="size-4 text-red-600" />
                                                    Price: High to Low
                                                </span>
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <p className="mt-2 text-[11px] text-slate-400">
                                        Choose your preferred price order
                                    </p>
                                </motion.div>

                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Error State */}
                {error && (
                    <div className="rounded-2xl border border-red-100 bg-white px-5 py-14 text-center">
                        <p className="font-semibold text-red-600">
                            {error}
                        </p>
                    </div>
                )}

                {/* Menu Cards */}
                {!error && menuItems.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="grid grid-cols-2 items-stretch gap-3 sm:gap-5 lg:grid-cols-3 lg:gap-6"
                    >
                        {menuItems.map((item) => (
                            <div
                                key={item._id}
                                className="relative"
                            >
                                <MenuCard item={item} />

                                {/* Premium Vendor Badge */}
                                {item.isPremiumVendor === true && (
                                    <div className="absolute right-2 top-2 z-20 inline-flex items-center gap-1.5 rounded-full border border-amber-300/70 bg-gradient-to-r from-amber-400 to-yellow-500 px-2.5 py-1.5 text-[10px] font-bold text-amber-950 shadow-lg sm:right-3 sm:top-3 sm:px-3 sm:text-xs">
                                        <Crown
                                            size={14}
                                            className="fill-amber-950"
                                        />
                                        Premium
                                    </div>
                                )}
                            </div>
                        ))}
                    </motion.div>
                )}

                {/* Empty State */}
                {!error && menuItems.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="rounded-2xl border border-slate-200 bg-white px-5 py-16 text-center"
                    >
                        <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-red-50">
                            <Pizza className="size-8 text-red-500" />
                        </div>

                        <h3 className="text-xl font-bold text-slate-900">
                            No Menu Items Found!
                        </h3>

                        <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                            We could not find any food matching your filters.
                            Try another name, category or location.
                        </p>

                        <Link
                            href="/brows-menu"
                            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
                        >
                            <RefreshCw size={15} />
                            Clear Filters
                        </Link>
                    </motion.div>
                )}
            </section>
        </div>
    );
};

export default BrowseMenuClient;