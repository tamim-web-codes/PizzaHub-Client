
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
    UserRound,
    Menu,
    X,
    LogOut,
    UserRoundCog,
    LayoutDashboard,
    ShieldCheck,
    ChevronDown,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "./ui/popover";

const Navbar = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user;

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

    const handleLogout = async () => {
        await authClient.signOut();
        setIsOpen(false);
    };

    const ProfileMenu = ({ mobile = false }: { mobile?: boolean }) => (
        <Popover>
            <PopoverTrigger>
                {mobile ? (
                    <button
                        type="button"
                        className="flex w-full items-center gap-3 rounded-xl border border-white/15 bg-white/10 p-3 text-left transition hover:bg-white/15"
                    >
                        <Avatar className="h-11 w-11 border-2 border-yellow-400 shadow-md">
                            <AvatarImage
                                src={user?.image || ""}
                                alt={user?.name || "User"}
                            />
                            <AvatarFallback className="bg-red-950 text-white">
                                <UserRound size={20} />
                            </AvatarFallback>
                        </Avatar>

                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-bold text-white">
                                {user?.name || "User"}
                            </p>
                            <p className="truncate text-xs text-red-100">
                                {user?.email}
                            </p>
                        </div>

                        <span className="rounded-full bg-yellow-400 px-2 py-1 text-[10px] font-bold capitalize text-red-950">
                            {user?.role || "Customer"}
                        </span>

                        <ChevronDown size={17} className="text-white" />
                    </button>
                ) : (
                    <button
                        type="button"
                        aria-label="User profile"
                        className="rounded-full transition-all hover:ring-2 hover:ring-yellow-400 hover:ring-offset-2"
                    >
                        <Avatar className="h-10 w-10 border-2 border-yellow-400 shadow-md">
                            <AvatarImage
                                src={user?.image || ""}
                                alt={user?.name || "User"}
                            />
                            <AvatarFallback className="bg-red-950 text-white">
                                <UserRound size={19} />
                            </AvatarFallback>
                        </Avatar>
                    </button>
                )}
            </PopoverTrigger>

            <PopoverContent
                align="end"
                sideOffset={12}
                className={`overflow-hidden rounded-2xl border border-red-100 bg-white p-0 shadow-xl ${mobile
                        ? "w-[calc(100vw-40px)] max-w-80"
                        : "w-72"
                    }`}
            >
                {/* Profile Header */}
                <div className="bg-gradient-to-br from-red-700 via-red-800 to-red-950 px-4 py-5">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-14 w-14 border-2 border-yellow-400 shadow-lg">
                            <AvatarImage
                                src={user?.image || ""}
                                alt={user?.name || "User"}
                            />
                            <AvatarFallback className="bg-red-950 text-white">
                                <UserRound size={25} />
                            </AvatarFallback>
                        </Avatar>

                        <div className="min-w-0 flex-1">
                            <h3 className="truncate text-base font-bold text-white">
                                {user?.name || "User"}
                            </h3>

                            <p className="truncate text-xs text-red-100">
                                {user?.email}
                            </p>

                            <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-yellow-400 px-2.5 py-0.5 text-[10px] font-bold capitalize text-red-950">
                                <ShieldCheck size={11} />
                                {user?.role || "Customer"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Account Menu */}
                <div className="space-y-1 p-3">
                    <p className="px-2 pb-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                        Account Menu
                    </p>

                    <Link
                        href="/dashboard"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-red-50 hover:text-red-700"
                    >
                        <LayoutDashboard size={18} />
                        Dashboard
                    </Link>

                    <Link
                        href="/profile"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-red-50 hover:text-red-700"
                    >
                        <UserRoundCog size={18} />
                        My Profile
                    </Link>

                </div>

                {/* Logout */}
                <div className="border-t border-gray-100 bg-gray-50 p-3">
                    <Button
                        variant="ghost"
                        className="h-10 w-full justify-start gap-3 rounded-xl bg-red-50 font-semibold text-red-600 transition hover:bg-red-100 hover:text-red-700"
                        onClick={handleLogout}
                    >
                        <LogOut size={18} />
                        Logout
                    </Button>

                    <p className="mt-2 text-center text-[10px] text-gray-400">
                        PizzaHub · Your favorite pizza destination
                    </p>
                </div>
            </PopoverContent>
        </Popover>
    );

    return (
        <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-[#700000] via-[#A50000] to-[#750000] shadow-lg shadow-red-950/20">
            <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* Logo */}
                <Link
                    href="/"
                    className="flex shrink-0 items-center gap-2"
                >
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
                                className={`relative py-2 text-sm font-semibold transition-colors duration-300 hover:text-yellow-300 ${active
                                        ? "text-yellow-300 after:absolute after:bottom-[-13px] after:left-0 after:h-[3px] after:w-full after:rounded-full after:bg-yellow-400"
                                        : "text-white"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </div>

                {/* Desktop Auth */}
                <div className="hidden items-center gap-3 md:flex">
                    {!user ? (
                        <>
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
                        </>
                    ) : (
                        <ProfileMenu />
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    type="button"
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

                    {/* Mobile Navigation Links */}
                    <div className="flex flex-col gap-2">
                        {navLinks.map((link) => {
                            const active = isActive(link.href);

                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`rounded-lg px-4 py-3 text-sm font-semibold transition ${active
                                            ? "bg-white/15 text-yellow-300"
                                            : "text-white hover:bg-white/10 hover:text-yellow-300"
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Mobile Auth */}
                    <div className="mt-4 border-t border-white/15 pt-4">
                        {!user ? (
                            <div className="flex flex-col gap-3">
                                <Link
                                    href="/signin"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center justify-center gap-2 rounded-lg border border-white/60 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-red-800"
                                >
                                    <UserRound size={18} />
                                    Sign In
                                </Link>

                                <Link
                                    href="/signup"
                                    onClick={() => setIsOpen(false)}
                                    className="rounded-lg bg-yellow-400 px-4 py-3 text-center text-sm font-bold text-red-950 transition hover:bg-yellow-300"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        ) : (
                            <ProfileMenu mobile />
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
