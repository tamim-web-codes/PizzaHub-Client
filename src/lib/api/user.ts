const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getVendorPremium = async (vendorId: string) => {
    const res = await fetch(`${BASE_URL}/vendor/${vendorId}/premium`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to check premium status");
    }

    return res.json();
};
