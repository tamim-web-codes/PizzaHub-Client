
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const myMenuItem = async()=>{
const res = await fetch(`${BASE_URL}/add-menu`,)

  if (!res.ok) {
    throw new Error("Failed to add menu item");
  }
 return res.json()
}
