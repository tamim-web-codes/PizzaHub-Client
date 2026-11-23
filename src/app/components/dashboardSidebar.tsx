
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    ShoppingBag,
    ClipboardList,

    UserRound,
    Store,
    Pizza,
    Users,
    ChartNoAxesCombined,
    Settings,
    CreditCard,
    Utensils,
    House,
    ChevronRight,
    LogOut,
} from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from "@/components/ui/sidebar";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Role = "customer" | "vendor" | "admin";

const menuItems = {
    customer: [
        {
            title: "MENU",
            items: [
                { title: "Overview", url: "/dashboard", icon: LayoutDashboard },
                { title: "My Orders", url: "/dashboard/customer/my-orders", icon: ClipboardList },

            ],
        },
        {
            title: "PREFERENCES",
            items: [
                { title: "My Profile Settings", url: "/dashboard/customer/profile", icon: UserRound },

            ],
        },
    ],

    vendor: [
        {
            title: "OVERVIEW",
            items: [
                { title: "Overview", url: "/dashboard/vendor/vendor-overview", icon: LayoutDashboard },
            ],
        },
        {
            title: "RESTAURANT",
            items: [
                { title: "Add Menu Item", url: "/dashboard/vendor/add-menu-item", icon: Utensils },
                { title: "My Menu Items", url: "/dashboard/vendor/my-menu-items", icon: Store },
                { title: "Customer Orders", url: "/dashboard/orders", icon: ShoppingBag },
            ],
        },
        {
            title: "BUSINESS",
            items: [

                { title: "Subscription", url: "/dashboard/subscription", icon: CreditCard },
            ],
        },
        {
            title: "ACCOUNT",
            items: [
                { title: "My Profile Settings", url: "/dashboard/vendor/profile", icon: UserRound },

            ],
        },
    ],

    admin: [
        {
            title: "OVERVIEW",
            items: [
                { title: "Overview", url: "/dashboard", icon: LayoutDashboard },
            ],
        },
        {
            title: "MANAGEMENT",
            items: [
                { title: "Manage Users", url: "/dashboard/users", icon: Users },
                { title: " Manage Menu Items", url: "/dashboard/restaurants", icon: Store },

            ],
        },
        {
            title: "REPORTS & SETTINGS",
            items: [
                { title: "Transactions", url: "/dashboard/transactions", icon: CreditCard },

            ],
        },
    ],
};

const DashboardSidebar = () => {
    const pathname = usePathname();
    const router = useRouter();

    const { data: session, isPending } = authClient.useSession();

    const user = session?.user;
    const role = (user as typeof user & { role?: Role })?.role ?? "customer";

    const currentMenu = menuItems[role] ?? menuItems.customer;

    const handleLogout = async () => {
        try {
            await authClient.signOut();
            toast.success("Logged out successfully!");
            router.push("/signin");
            router.refresh();
        } catch {
            toast.error("Logout failed!");
        }
    };
    return (


        <Sidebar
            collapsible="icon"
            className="container mx-auto absolute sticky top-0 h-screen border-r border-slate-200 bg-white px-0"
        >

            {/* BRAND */}
            <SidebarHeader className="p-3 bg-white group-data-[collapsible=icon]:p-2">
                <Link
                    href="/"
                    className="flex w-full items-center gap-3 group-data-[collapsible=icon]:justify-center"
                >
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-orange-500 text-white shadow-md shadow-orange-200">
                        <Pizza size={22} />
                    </div>

                    <div className="grid min-w-0 flex-1 text-left leading-tight group-data-[collapsible=icon]:hidden">
                        <span className="text-xl font-extrabold tracking-tight text-slate-900">
                            Pizza<span className="text-red-500">Hub</span>
                        </span>

                        <span className="text-[11px] text-slate-400">
                            Food ordering platform
                        </span>
                    </div>
                </Link>
            </SidebarHeader>
            <SidebarSeparator className="bg-slate-100" />

            <SidebarContent className="px-2 bg-white group-data-[collapsible=icon]:px-2">

                {/* USER PROFILE */}
                <div className="mx-1 my-4 rounded-xl border border-slate-100 bg-slate-50 p-3 group-data-[collapsible=icon]:mx-0 group-data-[collapsible=icon]:border-0 group-data-[collapsible=icon]:bg-transparent group-data-[collapsible=icon]:p-0">

                    <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">

                        <Avatar className="size-10 shrink-0 rounded-xl">
                            <AvatarImage
                                src={user?.image || ""}
                                alt={user?.name || "User"}
                            />

                            <AvatarFallback className="rounded-xl bg-orange-100 font-bold text-orange-600">
                                {user?.name?.charAt(0)?.toUpperCase() || "U"}
                            </AvatarFallback>
                        </Avatar>

                        <div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
                            <p className="truncate text-sm font-semibold text-slate-800">
                                {isPending ? "Loading..." : user?.name || "User"}
                            </p>

                            <p className="truncate text-xs text-slate-400">
                                {user?.email || "Welcome to PizzaHub"}
                            </p>
                        </div>
                    </div>

                    <div className="mt-3 group-data-[collapsible=icon]:hidden">
                        <Badge className="border-0 bg-orange-100 text-[10px] font-semibold capitalize text-orange-700 hover:bg-orange-100">
                            {role} account
                        </Badge>
                    </div>
                </div>
                {/* NAVIGATION */}
                {currentMenu.map((group) => (
                    <SidebarGroup
                        key={group.title}
                        className="py-2 group-data-[collapsible=icon]:px-0"
                    >

                        <SidebarGroupLabel className="mb-2 px-3 text-[10px] font-bold tracking-[0.12em] text-slate-400">
                            {group.title}
                        </SidebarGroupLabel>

                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.items.map((item) => {
                                    const isActive =
                                        pathname === item.url ||
                                        (item.url !== "/dashboard" &&
                                            pathname.startsWith(`${item.url}/`));

                                    return (
                                        <SidebarMenuItem key={item.url}>

                                            <SidebarMenuButton

                                                isActive={isActive}
                                                tooltip={item.title}
                                                className={`flex h-11 w-full items-center gap-3 rounded-xl px-3 ${isActive
                                                    ? "bg-red-500 text-white hover:bg-red-600 hover:text-white"
                                                    : "text-slate-600 hover:bg-orange-50 hover:text-red-600"
                                                    }`}
                                            >
                                                <Link href={item.url} className="flex w-full items-center gap-3">
                                                    <item.icon className="size-[18px] shrink-0" />

                                                    <span className="flex-1 truncate text-sm font-medium">
                                                        {item.title}
                                                    </span>

                                                    {isActive && (
                                                        <ChevronRight className="ml-auto size-4 shrink-0" />
                                                    )}
                                                </Link>
                                            </SidebarMenuButton>

                                        </SidebarMenuItem>
                                    );
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>

            <SidebarSeparator className="bg-slate-100" />

            {/* FOOTER */}
            <SidebarFooter className="gap-2 bg-white p-3">

                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton

                            tooltip="Back to Website"
                            className="h-10 rounded-xl text-slate-500 hover:bg-orange-50 hover:text-red-600"
                        >
                            <Link href="/" className="flex items-center gap-3">
                                <House className="size-[18px]" />
                                <span>Back to Website</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                        <SidebarMenuButton
                            onClick={handleLogout}
                            tooltip="Logout"
                            className="h-10 rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-600"
                        >
                            <LogOut className="size-[18px]" />
                            <span>Logout</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>

                <div className="px-2 py-2 text-center group-data-[collapsible=icon]:hidden">
                    <p className="text-[10px] font-medium text-slate-400">
                        © 2026 PizzaHub
                    </p>
                </div>

            </SidebarFooter>
        </Sidebar>

    );
};

export default DashboardSidebar;
