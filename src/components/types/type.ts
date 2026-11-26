export type TMenuItemData = {
  _id: string;
  vendorId: string;
  status: "pending" | "approved" | "rejected";
  isAvailable: boolean;
  itemName: string;
  category: string;
  description: string;
  isPremiumVendor:boolean
  price: number;
  location: string;
  ImageUrl?: string;
  images?: string[];
  isPremium?: boolean;
  isActive?:boolean;

  

  vendor?: {
    _id?: string;
    name?: string;
    businessName?: string;
    image?: string;
  };
};

export type MenuDetailsData = TMenuItemData;

export type OrderPostData = {
  menuItemId: string;
  itemName: string;
  price: number;
  quantity: number;
  vendorId: string;

  customerId: string;
  customerName: string;
  customerEmail: string;
    imageUrl?: string;
  deliveryDate: string;
  deliveryAddress: string;
  phone: string;
  totalPrice: number;

  status: "pending";
};

export type TOrderData = {
  _id: string;
  menuItemId: string;
  imageUrl?: string;
  itemName: string;
  price: number;
  quantity: number;
  vendorId: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  deliveryDate: string;
  deliveryAddress: string;
  phone: string;
  totalPrice: number;
  status:
    | "pending"
    | "accepted"
    | "rejected"
    | "cancelled"
    | "delivered";
};