import { getMenuBrows } from "@/lib/api/myMenut";
import { TMenuItemData } from "@/components/types/type";
import BrowseMenuClient from "../components/BrowseMenuClient";

const BrowseMenuPage = async ({
    searchParams,
}: {
    searchParams: Promise<{
        [key: string]: string | string[] | undefined;
    }>;
}) => {
    const search = await searchParams;

    const urlSearch = new URLSearchParams(
        search as Record<string, string>
    );

    const query = urlSearch.toString();

    let menuItems: TMenuItemData[] = [];

    try {
        menuItems = await getMenuBrows(query);
    } catch (error) {
        console.error(error);
    }

    return (
        <BrowseMenuClient
            menuItems={menuItems}
            query={query}

        />
    );
};

export default BrowseMenuPage;