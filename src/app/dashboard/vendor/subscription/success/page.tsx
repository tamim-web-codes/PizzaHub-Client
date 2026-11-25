import SuccessClient from '@/app/components/vendorMyCustomer/premium-successPage'
import { checkoutVerify } from '@/lib/actions/payments'
import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'


export default async function Success({
    searchParams,
}: {
    searchParams: Promise<{ session_id?: string }>
}) {
    const { session_id } = await searchParams

    if (!session_id) {
        throw new Error('Please provide a valid session_id (`cs_test_...`)')
    }

    const {
        status,
        payment_status,
        customer_email,
        metadata,
        payment_intent,
    } = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items', 'payment_intent'],
    })

    // Payment এখনো complete না হলে
    if (status === 'open') {
        return redirect('/')
    }

    // Payment সফল হলে
    if (status === 'complete' && payment_status === 'paid') {
        console.log({
            status,
            payment_intent,
            metadata,
            customer_email,
            payment_status,
        })

        const result = await checkoutVerify(session_id)

        console.log(result)

        return (
            <SuccessClient
                customerEmail={customer_email ?? ''}
            />
        )
    }

    // Payment complete এবং paid না হলে
    return redirect('/')
}