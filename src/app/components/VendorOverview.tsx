
"use client";

import { motion } from "framer-motion";
import {
  Pizza,
  CheckCircle,
  Clock,
  ShoppingBag,
  Crown,
} from "lucide-react";

type OverviewData = {
  totalMenuItems: number;
  activeMenuItems: number;
  pendingOrders: number;
  acceptedOrders: number;
  currentPlan: string;
};

const VendorOverview = ({ data }: { data: OverviewData }) => {
  const cards = [
    {
      title: "Total Menu Items",
      value: data.totalMenuItems,
      icon: Pizza,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Active Menu Items",
      value: data.activeMenuItems,
      icon: CheckCircle,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      title: "Pending Orders",
      value: data.pendingOrders,
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      title: "Accepted Orders",
      value: data.acceptedOrders,
      icon: ShoppingBag,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Dashboard Overview
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Welcome back! Here is your restaurant summary.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card, index) => {
          const Icon = card.icon;

          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ y: -4 }}
              className="rounded-xl border bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">
                  {card.title}
                </p>

                <div className={`rounded-lg p-3 ${card.bg}`}>
                  <Icon className={`h-5 w-5 ${card.color}`} />
                </div>
              </div>

              <h2 className="mt-5 text-3xl font-bold text-slate-900">
                {card.value}
              </h2>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.35 }}
        className="flex items-center justify-between rounded-xl border border-orange-200 bg-orange-50 p-6"
      >
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-orange-100 p-3">
            <Crown className="h-7 w-7 text-orange-600" />
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Current Subscription Plan
            </p>
            <h2 className="mt-1 text-xl font-bold text-slate-900">
              {data.currentPlan}
            </h2>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VendorOverview;
