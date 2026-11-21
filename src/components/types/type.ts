export type TMenuItemData = {
  _id: string;
  vendorId: string;
  status: "pending" | "approved" | "rejected";
  isAvailable: boolean;
  itemName: string;
  category: string;
  description: string;
  price: number;
  location: string;
  ImageUrl: string;
};