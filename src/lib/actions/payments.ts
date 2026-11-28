'use server'
import { getToken } from "../core/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const checkoutVerify = async(sessionId:string)=>{
  const token = await getToken()
const res = await fetch(`${BASE_URL}/payments/checkout-verify`,{
    method:'POST',
    headers:{
       "Content-Type": "application/json",
        authorization : `Bearer ${token}`
    },
    body:JSON.stringify({sessionId})
})

  if (!res.ok) {
    throw new Error('Payments faild');
  }
 return res.json()
}
