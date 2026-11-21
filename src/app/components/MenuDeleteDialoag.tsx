import { AlertCircle, Trash2, X } from "lucide-react"
import { motion } from "framer-motion";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { TMenuItemData } from "@/components/types/type"
import { deletMenuItem } from "@/lib/actions/postAddMenu"
import { toast } from "sonner";
import { useRouter } from "next/navigation";



export function DeleteMenuItem({ item }: { item: TMenuItemData }) {
    const router = useRouter()
    const handlesubmit = async () => {
        try {
            const res = await deletMenuItem(item._id);

            if (res) {
                toast.success("Menu item deleted successfully!");
                router.refresh()
            } else {
                toast.error("Failed to delete menu item!");
            }
        } catch (error) {
            console.error("Delete error:", error);
            toast.error("Something went wrong!");
        }
    };
    return (
        <AlertDialog>
            <AlertDialogTrigger
                render={
                    <button
                        type="button"
                        className="group inline-flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 text-xs font-semibold text-slate-600 transition-all duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                    >
                        <Trash2
                            size={15}
                            className="transition-transform duration-200 group-hover:scale-110"
                        />
                        Delete
                    </button>
                }
            />

            <AlertDialogContent className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-0 shadow-[0_20px_70px_-20px_rgba(15,23,42,0.25)] sm:max-w-[400px]">

                <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.22 }}
                >
                    {/* Dialog Body */}
                    <AlertDialogHeader className="px-6 pb-2 pt-7 text-center sm:text-center">

                        {/* Delete Icon */}
                        <div className="mx-auto mb-4 flex size-[62px] items-center justify-center rounded-2xl bg-red-50 ring-1 ring-red-100">
                            <div className="flex size-11 items-center justify-center rounded-xl bg-red-100">
                                <Trash2
                                    size={22}
                                    strokeWidth={2}
                                    className="text-red-600"
                                />
                            </div>
                        </div>

                        <AlertDialogTitle className="text-lg font-bold tracking-tight text-slate-900">
                            Delete this menu item?
                        </AlertDialogTitle>

                        <AlertDialogDescription className="mx-auto max-w-[290px] text-[13px] leading-6 text-slate-500">
                            Are you sure you want to delete this item from your menu? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    {/* Warning Text */}
                    <div className="mx-6 mt-4 flex items-center gap-2.5 rounded-lg border border-amber-100 bg-amber-50/70 px-3 py-2.5">
                        <AlertCircle
                            size={16}
                            className="shrink-0 text-amber-600"
                        />
                        <p className="text-[11px] font-medium text-amber-800">
                            You will not be able to recover this item later.
                        </p>
                    </div>

                    {/* Footer Buttons */}
                    <AlertDialogFooter className="flex-row gap-2 border-t border-slate-100 bg-slate-50/60 px-6 py-4 sm:justify-end">

                        <AlertDialogCancel
                            className="mt-0 h-10 flex-1 rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-600 shadow-none transition hover:bg-slate-100 sm:flex-1"
                        >
                            <X size={15} />
                            Cancel
                        </AlertDialogCancel>

                        <AlertDialogAction
                            onClick={handlesubmit}
                            className="h-10 flex-1 rounded-lg bg-red-600 text-sm font-semibold text-white shadow-sm transition-all hover:bg-red-700 hover:shadow-md sm:flex-1"
                        >
                            <Trash2 size={15} />
                            Delete Item
                        </AlertDialogAction>

                    </AlertDialogFooter>
                </motion.div>
            </AlertDialogContent>
        </AlertDialog>
    )
}
