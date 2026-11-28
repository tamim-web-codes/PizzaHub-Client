import AdminOverviewClient from "@/app/components/admin-folder/AdminOverviewClient";
import { getAdminOverview } from "@/lib/api/adminApi";



const AdminOverviewPage = async () => {

    const result = await getAdminOverview();

    return <AdminOverviewClient result={result} />;
};

export default AdminOverviewPage;
