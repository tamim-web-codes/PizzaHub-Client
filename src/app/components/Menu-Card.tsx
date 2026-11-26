"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  MapPin,
  Eye,
  ArrowUpRight,
  Utensils,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { TMenuItemData } from "@/components/types/type";
import Link from "next/link";

const MenuCard = ({ item }: { item: TMenuItemData }) => {

  // Status Badge Configuration
  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return {
          label: "Approved",
          className: "border-green-200 bg-green-100 text-green-700",
          icon: CheckCircle,
        };

      case "pending":
        return {
          label: "Pending",
          className: "border-amber-200 bg-amber-100 text-amber-700",
          icon: Clock,
        };

      case "rejected":
        return {
          label: "Rejected",
          className: "border-red-200 bg-red-100 text-red-700",
          icon: XCircle,
        };

      default:
        return {
          label: status || "Unknown",
          className: "border-slate-200 bg-slate-100 text-slate-600",
          icon: Clock,
        };
    }
  };

  const statusBadge = getStatusBadge(item.status);
  const StatusIcon = statusBadge.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:border-red-200 hover:shadow-xl hover:shadow-red-100/50"
    >
      {/* Image Section */}
      <div className="relative h-28 shrink-0 overflow-hidden bg-slate-100 sm:h-40 md:h-44 lg:h-48">

        <Image
          src={item.ImageUrl as string}
          alt={item.itemName}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />

        {/* Category - Top Left */}
        <Badge className="absolute left-2 top-2 z-20 flex items-center gap-1 border-0 bg-white/95 px-2 py-1 text-[9px] font-bold capitalize text-red-600 shadow-sm backdrop-blur-sm sm:left-3 sm:top-3 sm:text-xs">
          <Utensils className="size-3" />
          {item.category}
        </Badge>

        {/* Status - Bottom Left */}
        <div
          className={`absolute bottom-3 left-3 z-30 inline-flex items-center gap-1 rounded-full border px-2.5 py-1.5 text-[9px] font-bold shadow-md backdrop-blur-sm sm:px-3 sm:text-xs ${statusBadge.className}`}
        >
          <StatusIcon size={12} />
          {statusBadge.label}
        </div>

        {/* Price - Bottom Right */}
        <div className="absolute bottom-3 right-3 z-20 rounded-lg border border-white/50 bg-white px-2.5 py-1.5 text-xs font-extrabold text-red-600 shadow-lg sm:px-3.5 sm:py-2 sm:text-sm">
          ৳{item.price}
        </div>

        {/* Hover Icon */}
        <div className="absolute right-3 top-3 z-20 hidden size-9 items-center justify-center rounded-full bg-white text-red-600 opacity-0 shadow-md transition-all duration-300 group-hover:opacity-100 sm:flex">
          <ArrowUpRight className="size-5" />
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col p-2.5 sm:p-4 lg:p-4 xl:p-5">

        {/* Name & Description */}
        <div>
          <h3 className="line-clamp-1 text-xs font-extrabold text-slate-900 transition-colors group-hover:text-red-600 sm:text-base lg:text-[15px] xl:text-lg">
            {item.itemName}
          </h3>

          <p className="mt-1.5 line-clamp-2 min-h-8 text-[10px] leading-4 text-slate-500 sm:min-h-10 sm:text-xs sm:leading-5">
            {item.description}
          </p>
        </div>

        {/* Location */}
        <div className="mt-auto flex min-w-0 items-center gap-1.5 border-t border-slate-100 pt-2.5 sm:gap-2 sm:pt-3">
          <MapPin className="size-3.5 shrink-0 text-red-500 sm:size-4" />

          <span className="truncate text-[10px] font-medium text-slate-500 sm:text-xs">
            {item.location}
          </span>
        </div>

        {/* Button */}
        <Link
          href={`/brows-menu/${item._id}`}
          className="mt-2.5 flex h-8 w-full shrink-0 items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-red-600 to-orange-500 px-2 text-[10px] font-bold text-white shadow-sm transition-all duration-300 hover:from-red-700 hover:to-orange-600 hover:shadow-md sm:mt-3 sm:h-10 sm:gap-2 sm:rounded-xl sm:text-sm"
        >
          <Eye className="size-3.5 shrink-0 sm:size-4" />
          <span>View Details</span>
        </Link>

      </div>
    </motion.div>
  );
};

export default MenuCard;