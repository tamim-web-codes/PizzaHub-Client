import { protectedMutation } from "../core/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getVendorPremium = async (vendorId: string) => {
    const api = `${BASE_URL}/vendor/${vendorId}/premium`
    const res = await protectedMutation(api)
    if (!res.ok) {
        throw new Error("Failed to check premium status");
    }

    return res.json();
};


export const getVendorCustomerOrders = async (vendorId:string) => {
    const api =  `${BASE_URL}/vendor-to-customer-order/${vendorId}`
    const res = await protectedMutation(api)

    return res.json();
};