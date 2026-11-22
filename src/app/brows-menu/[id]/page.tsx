
import MenuDetails from "@/app/components/MenuDetails";
import { getMenuDetails } from "@/lib/api/myMenut";

type Props = {
    params: Promise<{ id: string }>;
};

const BrowsMenuDetailsPage = async ({ params }: Props) => {
    const { id } = await params;

    const item = await getMenuDetails(id);



    return <MenuDetails item={item} />;
};

export default BrowsMenuDetailsPage;
