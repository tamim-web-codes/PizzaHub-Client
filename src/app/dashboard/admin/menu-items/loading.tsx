import { MenuItemsLoading } from "../../../components/admin-folder/AdminMenuItemsClient";



export default function Loading() {
    return (
        <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-7xl space-y-7">
                <div className="animate-pulse">
                    <div className="h-9 w-64 rounded-lg bg-gray-100" />
                    <div className="mt-3 h-4 w-80 rounded bg-gray-100" />
                </div>

                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div
                            key={index}
                            className="h-28 rounded-2xl bg-gray-100 animate-pulse"
                        />
                    ))}
                </div>

                <div className="h-16 rounded-2xl bg-gray-100 animate-pulse" />

                <div className="overflow-hidden rounded-2xl border border-gray-100">
                    <MenuItemsLoading />
                </div>
            </div>
        </div>
    );
}
