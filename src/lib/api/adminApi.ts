
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
