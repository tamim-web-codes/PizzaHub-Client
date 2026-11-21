import { TMenuItemData } from "@/components/types/type";


const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const myMenuItem = async(query= ''): Promise<TMenuItemData[]>=>{
const res = await fetch(`${BASE_URL}/my-menu?${query}`,)

  if (!res.ok) {
    throw new Error("Failed to add menu item");
  }
 return res.json()
}



