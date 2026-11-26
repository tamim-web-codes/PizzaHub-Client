
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getAdminUsers = async (
    search: string = "",
    role: string = "all"
) => {
    const params = new URLSearchParams();

    if (search) params.set("search", search);
    if (role !== "all") params.set("role", role);

    const res = await fetch(
        `${BASE_URL}/admin/users?${params.toString()}`,
        {
            method: "GET",
            cache: "no-store",
        }
    );

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Failed to fetch users");
    }

    return data;
};

export const updateUserBlockStatus = async (
    userId: string,
    isBlocked: boolean
) => {
    const res = await fetch(
        `${BASE_URL}/admin/users/${userId}/block`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ isBlocked }),
        }
    );

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Failed to update user status");
    }

    return data;
};


export const getAdminMenuItems = async (
    search = "",
    status = "all",
    category = "all"
) => {
    const params = new URLSearchParams({
        search,
        status,
        category,
    });

    const res = await fetch(
        `${BASE_URL}/admin/menu-items?${params.toString()}`,
        { cache: "no-store" }
    );

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Failed to fetch menu items");
    }

    return data;
};

export const updateMenuItemStatus = async (
    id: string,
    status: string
) => {
    const res = await fetch(
        `${BASE_URL}/admin/menu-items/${id}/status`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status }),
        }
    );

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Failed to update status");
    }

    return data;
};

export const deleteAdminMenuItem = async (id: string) => {
    const res = await fetch(
        `${BASE_URL}/admin/menu-items/${id}`,
        { method: "DELETE" }
    );

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Failed to delete menu item");
    }

    return data;
};





export const getAdminTransactions = async () => {
    const res = await fetch(`${BASE_URL}/admin/transactions`)
  

    if (!res.ok) {
        throw new Error("Failed to fetch transactions");
    }

    return res.json();
};




export const getAdminOverview = async () => {
  const res = await fetch(`${BASE_URL}/admin/overview`)

  if (!res.ok) {
    throw new Error("Failed to fetch admin overview");
  }

  return res.json();
};