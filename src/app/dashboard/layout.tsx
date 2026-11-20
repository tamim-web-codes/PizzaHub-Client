
import type { ReactNode } from "react";

import {
    SidebarProvider,
    SidebarInset,
    SidebarTrigger,
} from "@/components/ui/sidebar";

import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import DashboardSidebar from "../components/dashboardSidebar";

const DashboardLayoutPage = ({
    children,
}: {
    children: ReactNode;
}) => {
    return (
        <div className="min-h-screen bg-slate-50">

            {/* Centered dashboard shell: sidebar + content live in one container */}
            <div className="container mx-auto px-0 md:px-4 xl:px-6">

                <SidebarProvider className="relative min-h-svh w-full">

                    {/* Sidebar */}
                    <DashboardSidebar />

                    {/* Main Dashboard */}
                    <SidebarInset className="min-w-0 flex-1 bg-slate-50">

                        {/* Header */}
                        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
                            <div className="flex h-16 items-center gap-3 px-5">

                                <SidebarTrigger className="size-9 text-slate-600 hover:bg-slate-100" />

                                <Separator orientation="vertical" className="h-6" />

                                <div>
                                    <h1 className="text-lg font-bold text-slate-900">
                                        PizzaHub Dashboard
                                    </h1>
                                    <p className="text-xs text-slate-500">
                                        Manage your account and activities
                                    </p>
                                </div>

                            </div>
                        </header>

                        {/* Page Content */}
                        <main className="min-h-[calc(100vh-64px)] w-full bg-slate-50 p-5 md:p-7">
                            {children}
                        </main>

                    </SidebarInset>

                    <Toaster position="top-right" richColors />

                </SidebarProvider>
            </div>
        </div>
    );
};

export default DashboardLayoutPage;
