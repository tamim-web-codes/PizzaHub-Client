

import { TMenuItemData } from "@/components/types/type";
import { auth } from "../auth";
import { headers } from "next/headers";


const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL


export const myMenuItem = async(query= ''): Promise<TMenuItemData[]>=>{
    const session = await auth.api.getSession({
    headers:await headers()
})

const res = await fetch(`${BASE_URL}/my-menu?${query}vendorId=${session?.user.id}`,)

  if (!res.ok) {
    throw new Error("Failed to add menu item");
  }
 return res.json()
}
// ----------------------------------------------------------------------------------------------
export const getMenuBrows = async(query= ''): Promise<TMenuItemData[]>=>{

const res = await fetch(`${BASE_URL}/my-menu?${query}`,)

  if (!res.ok) {
    throw new Error("Failed to add menu item");
  }
 return res.json()
}
// ------------------------------------------------------------------------------------------------

export const getVendorOverview = async(vendorId:string)=>{

const res = await fetch(`${BASE_URL}/vendor/overview/${vendorId}`,)

  if (!res.ok) {
    throw new Error("Failed to add menu item");
  }
 return res.json()
}


export type MenuDetailsData = TMenuItemData & {
  images?: string[];
  vendor?: {
    _id?: string;
    name?: string;
    businessName?: string;
    image?: string;
  };
};

export const getMenuDetails = async (
  id: string
): Promise<MenuDetailsData | null> => {
  const res = await fetch(`${BASE_URL}/brows-menu/${id}`, {
    cache: "no-store",
  });



  if (!res.ok) {
    throw new Error("Failed to fetch menu details");
  }

  return res.json();
};