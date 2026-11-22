
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const getCustomerOrder= async(customerEmail:string)=>{

const res = await fetch(`${BASE_URL}/order-now/${customerEmail}`,)

  if (!res.ok) {
    throw new Error("Order fetch filde ");
  }
 return res.json()
}
