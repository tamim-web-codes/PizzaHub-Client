'use server'

import { TMenuItemData } from "@/components/types/type";
import { protectedMutation } from "../core/server";
import { MenuItemData } from "@/app/components/AddMenuItemClient";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL




export const addmenupost = async (data: MenuItemData) => {
  const api = `${BASE_URL}/add-menu/count`
    const res = await protectedMutation(api,'POST',data)
  
    return res.json()
};


export const updateMenuItem = async(id:string,data: Partial<TMenuItemData>)=>{
  const api = `${BASE_URL}/edit-menu/${id}`
const res = await protectedMutation(api,'PATCH',data)

  if (!res.ok) {
    throw new Error("Failed to add menu item");
  }
 return res.json()
}
// http://localhost:5000/add-menu


export const deletMenuItem = async(id:string)=>{
  const api = `${BASE_URL}/delete-menu/${id}`
const res = await protectedMutation(api,'DELETE',)

  if (!res.ok) {
    throw new Error("Failed to add menu item");
  }
 return res.json()
}
// http://localhost:5000/add-menu

// ====================================================================================================

export type ProfileUpdateData = {
  name: string;
  image?: string;
};

export const updateProfile = async (
  userId: string,
  data: ProfileUpdateData
) => {
  const api = `${BASE_URL}/vendor-edit-profile/${userId}`
  const res = await protectedMutation(api,"PATCH",data)

  if (!res.ok) {
    throw new Error("Failed to update profile");
  }

  return res.json();
};


// ----------------------------------------------------------------------------------------------------






