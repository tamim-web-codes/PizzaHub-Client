import { OrderPostData } from "@/components/types/type";


const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL


export const addOrderPost = async(data:OrderPostData)=>{
const res = await fetch(`${BASE_URL}/order-now`,{
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


export type UpdateProfileData = {
  name: string;
  image?: string;
};


export const updateCustomerProfile = async (
  id: string,
  data: UpdateProfileData
) => {
  const res = await fetch(`${BASE_URL}/update-customer-profile/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Profile update failed");
  }

  return result;
};