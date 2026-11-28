import { protectedMutation } from "../core/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const getCustomerOrder= async(customerEmail:string)=>{
const api = `${BASE_URL}/order-now/${customerEmail}`
const res = await protectedMutation(api)

  if (!res.ok) {
    throw new Error("Order fetch filde ");
  }
 return res.json()
}
