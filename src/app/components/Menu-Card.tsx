"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, ShoppingBag, Eye } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TMenuItemData } from "@/components/types/type";



const MenuCard = ({ item }: { item: TMenuItemData }) => {
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
        className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-xl"
      >
        <div className="relative h-52 overflow-hidden bg-slate-100">
          <Image
            src={item.ImageUrl}
            alt={item.itemName}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />

          <Badge className="absolute left-4 top-4 border-0 bg-red-600 capitalize text-white">
            {item.category}
          </Badge>

          <div className="absolute right-4 top-4 rounded-lg bg-white px-3 py-1.5 font-bold text-red-600 shadow">
            ৳{item.price}
          </div>
        </div>

        <div className="space-y-3 p-5">
          <div>
            <h3 className="line-clamp-1 text-lg font-bold text-slate-900">
              {item.itemName}
            </h3>

            <p className="mt-1 line-clamp-2 min-h-10 text-sm leading-5 text-slate-500">
              {item.description}
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-500">
            <MapPin size={16} className="shrink-0 text-red-500" />
            <span className="truncate">{item.location}</span>
          </div>
      
          <div className="border-t border-slate-100 pt-3">
            <Button
              onClick={() => setDetailsOpen(true)}
              className="w-full gap-2 rounded-xl bg-red-600 font-semibold text-white hover:bg-red-700"
            >
              <Eye size={17} />
              View Details
            </Button>
          </div>
        </div>
      </motion.div>

      
    
    </>
  );
};

export default MenuCard;