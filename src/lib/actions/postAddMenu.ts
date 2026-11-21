import { MenuItemData } from "@/app/dashboard/vendor/add-menu-item/page"
import { TMenuItemData } from "@/components/types/type";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL


export const addmenupost = async(data:MenuItemData)=>{
const res = await fetch(`${BASE_URL}/add-menu`,{
    method:'POST',
    headers:{
       "Content-Type": "application/json",
    },
    body:JSON.stringify(data)
})

  if (!res.ok) {
    throw new Error("Failed to add menu item");
  }
 return res.json()
}


export const updateMenuItem = async(id:string,data: Partial<TMenuItemData>)=>{
const res = await fetch(`${BASE_URL}/edit-menu/${id}`,{
    method:'PATCH',
    headers:{
       "Content-Type": "application/json",
    },
    body:JSON.stringify(data)
})

  if (!res.ok) {
    throw new Error("Failed to add menu item");
  }
 return res.json()
}
// http://localhost:5000/add-menu

