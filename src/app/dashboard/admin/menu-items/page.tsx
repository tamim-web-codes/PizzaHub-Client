import AdminMenuItemsClient from "@/app/components/admin-folder/AdminMenuItemsClient";
import { getAdminMenuItems } from "@/lib/api/adminApi";

export default async function AdminMenuItemsPage() {
  const result = await getAdminMenuItems();

  // API থেকে Array নিশ্চিত করা
  const menuItems = Array.isArray(result)
    ? result
    : Array.isArray(result?.menuItems)
      ? result.menuItems
      : [];

  return (
    <AdminMenuItemsClient
      initialMenuItems={menuItems}
    />
  );
}