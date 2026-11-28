import AddMenuItemClient from "@/app/components/AddMenuItemClient";
import { getVendorPremium } from "@/lib/api/user";
import { getSession } from "@/lib/core/server";




const AddMenuItemPage = async () => {
  const session = await getSession()
  const premiumUser = await getVendorPremium(session?.user.id);

  return <AddMenuItemClient premiumUser={premiumUser} />;
};

export default AddMenuItemPage;
