
"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { UserRound, Menu, X } from "lucide-react";
import Image from "next/image";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Browse Menu", href: "/menu" },
        { name: "Dashboard", href: "/dashboard" },
    ];

    const isActive = (href: string) => {
        if (href === "/") {
            return pathname === "/";
        }

        return pathname === href || pathname.startsWith(`${href}/`);
    };

    return (
        <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-[#700000] via-[#A50000] to-[#750000] shadow-lg shadow-red-950/20">
            <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* Logo */}
                <Link href="/" className="flex shrink-0 items-center gap-2">
                    <Image
                        src="https://www.icosix.com/uploads/icons/2026/03/pizza-6.png"
                        alt="PizzaHub Logo"
                        width={44}
                        height={44}
                        className="h-11 w-11 object-contain"
                    />

                    <span className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                        Pizza<span className="text-yellow-400">Hub</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-8 md:flex">
                    {navLinks.map((link) => {
                        const active = isActive(link.href);

                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`relative py-2 text-sm font-semibold transition-colors duration-300 hover:text-yellow-300 ${
                                    active
                                        ? "text-yellow-300 after:absolute after:bottom-[-13px] after:left-0 after:h-[3px] after:w-full after:rounded-full after:bg-yellow-400"
                                        : "text-white"
                                }`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </div>

                {/* Desktop Auth Buttons */}
                <div className="hidden items-center gap-3 md:flex">

                    <Link
                        href="/login"
                        aria-label="Sign in"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-red-950/50 text-white transition hover:bg-red-950"
                    >
                        <UserRound size={19} />
                    </Link>

                    <Link
                        href="/signin"
                        className="rounded-xl border border-white/70 px-5 py-2.5 text-sm font-semibold text-white transition duration-300 hover:bg-white hover:text-red-800"
                    >
                        Sign In
                    </Link>

                    <Link
                        href="/signup"
                        className="rounded-xl bg-yellow-400 px-5 py-2.5 text-sm font-bold text-red-950 shadow-md shadow-yellow-500/20 transition duration-300 hover:bg-yellow-300 hover:shadow-yellow-400/30"
                    >
                        Sign Up
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 text-white transition hover:bg-white/10 md:hidden"
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isOpen}
                >
                    {isOpen ? <X size={25} /> : <Menu size={25} />}
                </button>
            </nav>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="border-t border-white/10 bg-[#850000] px-5 py-5 shadow-xl md:hidden">

                    <div className="flex flex-col gap-2">
                        {navLinks.map((link) => {
                            const active = isActive(link.href);

                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`rounded-lg px-4 py-3 text-sm font-semibold transition ${
                                        active
                                            ? "bg-white/15 text-yellow-300"
                                            : "text-white hover:bg-white/10 hover:text-yellow-300"
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </div>

                    <div className="mt-4 flex flex-col gap-3 border-t border-white/15 pt-4">

                        <Link
                            href="/login"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center justify-center gap-2 rounded-lg border border-white/60 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-red-800"
                        >
                            <UserRound size={18} />
                            Sign In
                        </Link>

                        <Link
                            href="/register"
                            onClick={() => setIsOpen(false)}
                            className="rounded-lg bg-yellow-400 px-4 py-3 text-center text-sm font-bold text-red-950 transition hover:bg-yellow-300"
                        >
                            Sign Up
                        </Link>

                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
