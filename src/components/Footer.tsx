
"use client";

import Link from "next/link";
import {
    MapPin,
    Phone,
    Mail,
    Heart,
    ChevronRight,
} from "lucide-react";

import {
    FaFacebookF,
    FaInstagram,
    FaXTwitter,
} from "react-icons/fa6";

import Image from "next/image";
import { motion } from "framer-motion";

const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Browse Menu", href: "/brows-menu" },
];

const supportLinks = [
    { name: "Contact Us", href: "#contact" },
    { name: "Help Center", href: "#help" },
    { name: "Privacy Policy", href: "#privacy-policy" },
    { name: "Terms & Conditions", href: "#terms" },
];

const socialLinks = [
    {
        name: "Facebook",
        href: "https://www.facebook.com/",
        icon: FaFacebookF,
    },
    {
        name: "Instagram",
        href: "https://www.instagram.com/",
        icon: FaInstagram,
    },
    {
        name: "X",
        href: "https://x.com/",
        icon: FaXTwitter,
    },
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const itemVariants = {
    hidden: {
        opacity: 0,
        y: 30,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut" as const,
        },
    },
};

const linkVariants = {
    hidden: {
        opacity: 0,
        x: -15,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.4,
        },
    },
};

export default function Footer() {
    return (
        <motion.footer
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
            variants={containerVariants}
            className="relative overflow-hidden border-t border-orange-100 bg-white"
        >
            {/* Background Decoration */}
            <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
                className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-orange-100/60 blur-3xl"
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.2 }}
                className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-red-50 blur-3xl"
            />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Main Footer */}
                <motion.div
                    variants={containerVariants}
                    className="grid grid-cols-2 gap-x-6 gap-y-12 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12 lg:py-20"
                >

                    {/* Brand Section */}
                    <motion.div
                        variants={itemVariants}
                        className="col-span-2 lg:col-span-1"
                    >
                        <Link
                            href="/"
                            className="group inline-flex items-center gap-3"
                        >
                            {/* Modern PizzaHub Logo */}
                            <motion.div
                                whileHover={{
                                    y: -5,
                                    rotate: 5,
                                    scale: 1.08,
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 15,
                                }}
                                className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-orange-200/70 bg-gradient-to-br from-orange-100 via-orange-50 to-red-100 shadow-md shadow-orange-200/50"
                            >
                                <div className="absolute inset-1 rounded-xl bg-white/70 shadow-inner" />

                                <Image
                                    src="https://www.icosix.com/uploads/icons/2026/03/pizza-6.png"
                                    alt="PizzaHub Logo"
                                    fill
                                    className="relative z-10 object-contain p-2.5"
                                    sizes="64px"
                                />
                            </motion.div>

                            <motion.span
                                whileHover={{ scale: 1.04 }}
                                className="text-3xl font-extrabold tracking-tight text-gray-900"
                            >
                                Pizza<span className="text-orange-600">Hub</span>
                            </motion.span>
                        </Link>

                        <p className="mt-5 max-w-sm text-sm leading-7 text-gray-500">
                            Discover delicious pizzas, explore trusted local
                            vendors, and enjoy a smooth food ordering
                            experience with PizzaHub.
                        </p>

                        {/* Social Links */}
                        <motion.div
                            variants={containerVariants}
                            className="mt-6 flex items-center gap-3"
                        >
                            {socialLinks.map((social) => {
                                const Icon = social.icon;

                                return (
                                    <motion.a
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.name}
                                        variants={itemVariants}
                                        whileHover={{
                                            y: -5,
                                            scale: 1.1,
                                        }}
                                        whileTap={{ scale: 0.9 }}
                                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 shadow-sm transition-colors duration-300 hover:border-orange-500 hover:bg-orange-600 hover:text-white hover:shadow-lg hover:shadow-orange-200"
                                    >
                                        <Icon size={17} />
                                    </motion.a>
                                );
                            })}
                        </motion.div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div variants={itemVariants}>
                        <h3 className="mb-6 text-base font-bold text-gray-900">
                            Quick Links
                        </h3>

                        <motion.ul
                            variants={containerVariants}
                            className="space-y-4"
                        >
                            {quickLinks.map((link) => (
                                <motion.li
                                    key={link.name}
                                    variants={linkVariants}
                                >
                                    <Link
                                        href={link.href}
                                        className="group inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors duration-300 hover:text-orange-600"
                                    >
                                        <ChevronRight
                                            size={15}
                                            className="text-orange-500 transition-transform duration-300 group-hover:translate-x-1"
                                        />
                                        {link.name}
                                    </Link>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.div>

                    {/* Customer Support */}
                    <motion.div variants={itemVariants}>
                        <h3 className="mb-6 text-base font-bold text-gray-900">
                            Customer Support
                        </h3>

                        <motion.ul
                            variants={containerVariants}
                            className="space-y-4"
                        >
                            {supportLinks.map((link) => (
                                <motion.li
                                    key={link.name}
                                    variants={linkVariants}
                                >
                                    <Link
                                        href={link.href}
                                        className="group inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors duration-300 hover:text-orange-600"
                                    >
                                        <ChevronRight
                                            size={15}
                                            className="text-orange-500 transition-transform duration-300 group-hover:translate-x-1"
                                        />
                                        {link.name}
                                    </Link>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.div>

                    {/* Contact Information */}
                    <motion.div
                        variants={itemVariants}
                        className="col-span-2 lg:col-span-1"
                    >
                        <h3 className="mb-6 text-base font-bold text-gray-900">
                            Get In Touch
                        </h3>

                        <motion.ul
                            variants={containerVariants}
                            className="space-y-5"
                        >
                            {/* Location */}
                            <motion.li
                                variants={linkVariants}
                                className="flex items-start gap-3"
                            >
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600 transition-all duration-300 hover:bg-orange-600 hover:text-white">
                                    <MapPin size={17} />
                                </div>

                                <div>
                                    <p className="text-sm font-semibold text-gray-800">
                                        Our Location
                                    </p>
                                    <p className="mt-1 text-sm leading-6 text-gray-500">
                                        Dhaka, Bangladesh
                                    </p>
                                </div>
                            </motion.li>

                            {/* Phone */}
                            <motion.li
                                variants={linkVariants}
                                className="flex items-start gap-3"
                            >
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600 transition-all duration-300 hover:bg-orange-600 hover:text-white">
                                    <Phone size={17} />
                                </div>

                                <div>
                                    <p className="text-sm font-semibold text-gray-800">
                                        Phone Number
                                    </p>
                                    <p className="mt-1 text-sm text-gray-500">
                                        01328502138
                                    </p>
                                </div>
                            </motion.li>

                            {/* Email */}
                            <motion.li
                                variants={linkVariants}
                                className="flex items-start gap-3"
                            >
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600 transition-all duration-300 hover:bg-orange-600 hover:text-white">
                                    <Mail size={17} />
                                </div>

                                <div className="min-w-0">
                                    <p className="text-sm font-semibold text-gray-800">
                                        Email Address
                                    </p>
                                    <p className="mt-1 break-all text-sm text-gray-500">
                                        pstamim723@gmail.com
                                    </p>
                                </div>
                            </motion.li>
                        </motion.ul>
                    </motion.div>
                </motion.div>

                {/* Bottom Footer */}
                <motion.div
                    variants={itemVariants}
                    className="border-t border-gray-200 py-6"
                >
                    <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">

                        <p className="text-xs text-gray-500 sm:text-sm">
                            {/* © {new Date().getFullYear()}{" "} */}
                            <span className="font-semibold text-gray-800">
                                PizzaHub.
                            </span>{" "}
                            All rights reserved.
                        </p>

                        <motion.p
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center gap-1.5 text-xs text-gray-500 sm:text-sm"
                        >
                            Made with
                            <motion.span
                                animate={{
                                    scale: [1, 1.2, 1],
                                }}
                                transition={{
                                    duration: 1.2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            >
                                <Heart
                                    size={14}
                                    className="fill-red-500 text-red-500"
                                />
                            </motion.span>
                            for Pizza Lovers
                        </motion.p>
                    </div>
                </motion.div>
            </div>
        </motion.footer>
    );
}
