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


export const cancelCustomerOrder = async (orderId: string) => {
    const res = await fetch(
        `${BASE_URL}/order-canceld/${orderId}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    const result = await res.json();

    if (!res.ok) {
        throw new Error(result.message || "Failed to cancel order");
    }

    return result;
};



export const updateCustomerOrderStatus = async (
    orderId: string,
    vendorId: string,
    status: "pending" | "accepted" | "rejected"
) => {
    const res = await fetch(
        `${BASE_URL}/vendor-to-customer-status/${orderId}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                vendorId,
                status,
            }),
        }
    );

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Failed to update order status");
    }

    return data;
};




export const updateMenuAvailability = async (
    id: string,
    vendorId: string,
    isActive: boolean
) => {
    const res = await fetch(
        `${BASE_URL}/menu/availability/${id}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                vendorId,
                isActive,
            }),
        }
    );

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Failed to update availability");
    }

    return data;
};


export const getVendorCustomerOverview = async (vendorId: string) => {
    const res = await fetch(
        `${BASE_URL}/vendor-overview/${vendorId}`,
        {
            cache: "no-store",
        }
    );

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Failed to load overview");
    }

    return data;
};

// --------------------------------------------------------------------------
export const getCustomerOrderOverview = async (customerId: string) => {
    const res = await fetch(
        `${BASE_URL}/customer-order-overview/${customerId}`,
        {
            method: "GET",
            cache: "no-store",
        }
    );

    const data = await res.json();

    if (!res.ok) {
        throw new Error(
            data.message || "Failed to load customer overview"
        );
    }

    return data;
};