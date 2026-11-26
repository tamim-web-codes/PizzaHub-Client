
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
    UserRound,
    Menu,
    X,
    LogOut,
    UserRoundCog,
    LayoutDashboard,
    ShieldCheck,
    ChevronDown,
    Home,
    Pizza,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "./ui/popover";
import { toast } from "sonner";

const Navbar = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user;
    const router = useRouter();
    const pathname = usePathname();

    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: "Home", href: "/", icon: Home },
        { name: "Browse Menu", href: "/brows-menu", icon: Pizza },
        {
            name: "Dashboard",
            href: user?.role ? `/dashboard/${user.role}/overview` : "/signin",
            icon: LayoutDashboard,
        },
    ];

    const isActive = (href: string) => {
        if (href === "/") return pathname === "/";
        return pathname === href || pathname.startsWith(`${href}/`);
    };

    const handleLogout = async () => {
        try {
            await authClient.signOut();
            toast.success("Logged out successfully!");
            setIsOpen(false);
            router.push("/signin");
            router.refresh();
        } catch {
            toast.error("Logout failed. Please try again.");
        }
    };

    const mobileMenuVariants = {
        hidden: {
            opacity: 0,
            height: 0,
            transition: { duration: 0.2 },
        },
        visible: {
            opacity: 1,
            height: "auto",
            transition: {
                duration: 0.3,
                when: "beforeChildren",
                staggerChildren: 0.07,
            },
        },
        exit: {
            opacity: 0,
            height: 0,
            transition: { duration: 0.2 },
        },
    };

    const mobileItemVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0 },
    };

    const ProfileMenu = ({ mobile = false }: { mobile?: boolean }) => (
        <Popover>
            <PopoverTrigger asChild>
                {mobile ? (
                    <button
                        type="button"
                        className="flex w-full items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-3 text-left transition hover:bg-white/15"
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
                    <motion.button
                        whileHover={{ scale: 1.07 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        aria-label="User profile"
                        className="rounded-full transition-all hover:ring-2 hover:ring-yellow-400 hover:ring-offset-2 hover:ring-offset-red-800"
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
                    </motion.button>
                )}
            </PopoverTrigger>

            <PopoverContent
                align="end"
                sideOffset={12}
                className={`overflow-hidden rounded-2xl border border-red-100 bg-white p-0 shadow-2xl ${mobile ? "w-[calc(100vw-40px)] max-w-80" : "w-72"
                    }`}
            >
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

                <div className="space-y-1 p-3">
                    <p className="px-2 pb-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                        Account Menu
                    </p>

                    <Link
                        href={`/dashboard/${user?.role}`}
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
        <motion.header
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="sticky top-0 z-50 w-full border-b border-white/10 bg-gradient-to-r from-[#650000]/95 via-[#A50000]/95 to-[#700000]/95 shadow-lg shadow-red-950/20 backdrop-blur-xl"
        >
            <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* Logo */}
                <Link
                    href="/"
                    className="group flex shrink-0 items-center gap-2"
                >
                    <motion.div
                        whileHover={{ rotate: -12, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <Image
                            src="https://www.icosix.com/uploads/icons/2026/03/pizza-6.png"
                            alt="PizzaHub Logo"
                            width={44}
                            height={44}
                            className="h-11 w-11 object-contain"
                        />
                    </motion.div>

                    <span className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                        Pizza<span className="text-yellow-400">Hub</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-2 md:flex">
                    {navLinks.map((link) => {
                        const active = isActive(link.href);

                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`relative flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors duration-300 ${active
                                    ? "text-yellow-300"
                                    : "text-white/90 hover:text-yellow-300"
                                    }`}
                            >
                                {active && (
                                    <motion.span
                                        layoutId="navbar-active"
                                        className="absolute inset-0 rounded-full border border-yellow-300/20 bg-white/10 shadow-inner"
                                        transition={{
                                            type: "spring",
                                            stiffness: 350,
                                            damping: 30,
                                        }}
                                    />
                                )}

                                <span className="relative z-10">
                                    {link.name}
                                </span>
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
                                className="rounded-xl border border-white/50 px-5 py-2.5 text-sm font-semibold text-white transition duration-300 hover:border-yellow-400 hover:bg-white/10 hover:text-yellow-300"
                            >
                                Sign In
                            </Link>

                            <motion.div
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.96 }}
                            >
                                <Link
                                    href="/signup"
                                    className="inline-flex rounded-xl bg-gradient-to-r from-yellow-400 to-amber-300 px-5 py-2.5 text-sm font-bold text-red-950 shadow-md shadow-yellow-500/20 transition hover:shadow-lg hover:shadow-yellow-400/30"
                                >
                                    Sign Up
                                </Link>
                            </motion.div>
                        </>
                    ) : (
                        <ProfileMenu />
                    )}
                </div>

                {/* Mobile Menu Button */}
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white transition hover:bg-white/20 md:hidden"
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isOpen}
                >
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                            key={isOpen ? "close" : "menu"}
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.18 }}
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </motion.span>
                    </AnimatePresence>
                </motion.button>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        variants={mobileMenuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="overflow-hidden border-t border-white/10 bg-gradient-to-b from-[#850000] to-[#650000] px-5 shadow-xl md:hidden"
                    >
                        <motion.div
                            className="flex flex-col gap-2 py-5"
                        >
                            {navLinks.map((link) => {
                                const active = isActive(link.href);
                                const Icon = link.icon;

                                return (
                                    <motion.div
                                        key={link.name}
                                        variants={mobileItemVariants}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${active
                                                ? "border border-yellow-300/20 bg-white/15 text-yellow-300"
                                                : "text-white hover:bg-white/10 hover:text-yellow-300"
                                                }`}
                                        >
                                            <Icon size={18} />
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </motion.div>

                        <motion.div
                            variants={mobileItemVariants}
                            className="border-t border-white/15 py-4"
                        >
                            {!user ? (
                                <div className="flex flex-col gap-3">
                                    <Link
                                        href="/signin"
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center justify-center gap-2 rounded-xl border border-white/60 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-red-800"
                                    >
                                        <UserRound size={18} />
                                        Sign In
                                    </Link>

                                    <Link
                                        href="/signup"
                                        onClick={() => setIsOpen(false)}
                                        className="rounded-xl bg-gradient-to-r from-yellow-400 to-amber-300 px-4 py-3 text-center text-sm font-bold text-red-950 transition hover:brightness-105"
                                    >
                                        Sign Up
                                    </Link>
                                </div>
                            ) : (
                                <ProfileMenu mobile />
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
};

export default Navbar;
