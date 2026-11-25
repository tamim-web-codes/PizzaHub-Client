
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import confetti from 'canvas-confetti'
import { motion, useReducedMotion } from 'framer-motion'
import {
    Crown,
    ShieldCheck,
    Sparkles,
    ArrowRight,
    Check,
    Star,
    PartyPopper,
} from 'lucide-react'

interface SuccessClientProps {
    customerEmail: string
}

const benefits = [
    'Access to Premium Features',
    'Enhanced Vendor Experience',
    'Manage Your Restaurant Easily',
]

const colors = [
    '#10b981',
    '#f59e0b',
    '#3b82f6',
    '#ec4899',
    '#8b5cf6',
    '#f97316',
]

export default function SuccessClient({
    customerEmail,
}: SuccessClientProps) {
    const router = useRouter()
    const shouldReduceMotion = useReducedMotion()

    useEffect(() => {
        if (shouldReduceMotion) return

        let animationFrame = 0

        // Initial celebration burst
        confetti({
            particleCount: 130,
            spread: 110,
            startVelocity: 50,
            gravity: 0.85,
            ticks: 220,
            origin: { x: 0.5, y: 0.55 },
            colors,
            zIndex: 999,
        })

        // Two-sided continuous confetti
        const duration = 4500
        const endTime = Date.now() + duration

        const fireConfetti = () => {
            confetti({
                particleCount: 4,
                angle: 60,
                spread: 60,
                startVelocity: 38,
                gravity: 0.9,
                origin: { x: 0, y: 0.65 },
                colors,
                ticks: 180,
                zIndex: 999,
            })

            confetti({
                particleCount: 4,
                angle: 120,
                spread: 60,
                startVelocity: 38,
                gravity: 0.9,
                origin: { x: 1, y: 0.65 },
                colors,
                ticks: 180,
                zIndex: 999,
            })

            if (Date.now() < endTime) {
                animationFrame = requestAnimationFrame(fireConfetti)
            }
        }

        const startTimer = setTimeout(fireConfetti, 250)

        // Final colorful celebration
        const finalBurst = setTimeout(() => {
            confetti({
                particleCount: 90,
                spread: 140,
                startVelocity: 35,
                origin: { x: 0.5, y: 0.5 },
                colors,
                zIndex: 999,
            })
        }, 2200)

        // Auto redirect after 10 seconds
        const redirectTimer = setTimeout(() => {
            router.push('/dashboard/vendor/subscription')
        }, 10000)

        return () => {
            cancelAnimationFrame(animationFrame)
            clearTimeout(startTimer)
            clearTimeout(finalBurst)
            clearTimeout(redirectTimer)
        }
    }, [router, shouldReduceMotion])

    const smoothTransition = {
        type: 'spring' as const,
        stiffness: 90,
        damping: 18,
        mass: 0.8,
    }

    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-green-100 px-4 py-12">

            {/* Background glow */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <motion.div
                    animate={
                        shouldReduceMotion
                            ? {}
                            : {
                                x: [0, 35, 0],
                                y: [0, -30, 0],
                                scale: [1, 1.15, 1],
                            }
                    }
                    transition={{
                        duration: 9,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-emerald-200/40 blur-3xl"
                />

                <motion.div
                    animate={
                        shouldReduceMotion
                            ? {}
                            : {
                                x: [0, -35, 0],
                                y: [0, 30, 0],
                                scale: [1, 1.2, 1],
                            }
                    }
                    transition={{
                        duration: 11,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-yellow-200/40 blur-3xl"
                />

                {/* Floating Sparkles */}
                <motion.div
                    animate={
                        shouldReduceMotion
                            ? {}
                            : {
                                y: [0, -25, 0],
                                rotate: [0, 20, 0],
                            }
                    }
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    className="absolute left-[9%] top-[13%] text-emerald-300"
                >
                    <Sparkles size={65} />
                </motion.div>

                <motion.div
                    animate={
                        shouldReduceMotion
                            ? {}
                            : {
                                y: [0, 25, 0],
                                rotate: [0, -20, 0],
                            }
                    }
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    className="absolute right-[10%] top-[18%] text-yellow-400"
                >
                    <Crown size={70} />
                </motion.div>

                <motion.div
                    animate={
                        shouldReduceMotion
                            ? {}
                            : {
                                rotate: 360,
                                scale: [1, 1.15, 1],
                            }
                    }
                    transition={{
                        rotate: {
                            duration: 20,
                            repeat: Infinity,
                            ease: 'linear',
                        },
                        scale: {
                            duration: 4,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        },
                    }}
                    className="absolute bottom-[14%] left-[12%] text-pink-300"
                >
                    <Star size={48} />
                </motion.div>
            </div>

            {/* Main Success Card */}
            <motion.section
                initial={{
                    opacity: 0,
                    y: 70,
                    scale: 0.88,
                    filter: 'blur(12px)',
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: 'blur(0px)',
                }}
                transition={{
                    duration: 1,
                    ease: [0.16, 1, 0.3, 1],
                }}
                className="relative z-10 w-full max-w-xl overflow-hidden rounded-3xl border border-emerald-100/80 bg-white/95 shadow-2xl shadow-emerald-200/50 backdrop-blur-xl"
            >
                {/* Success Header */}
                <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-500 to-green-500 px-6 py-12 text-center text-white">

                    {/* Header glow */}
                    <motion.div
                        animate={
                            shouldReduceMotion
                                ? {}
                                : { scale: [1, 1.5, 1], opacity: [0.15, 0.3, 0.15] }
                        }
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                        className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white blur-3xl"
                    />

                    <div className="relative z-10">

                        {/* Animated check circle */}
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{
                                ...smoothTransition,
                                delay: 0.25,
                                stiffness: 130,
                            }}
                            className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full border-[5px] border-white/30 bg-white/20 shadow-xl backdrop-blur-sm"
                        >
                            <motion.div
                                initial={{ pathLength: 0, scale: 0 }}
                                animate={{ pathLength: 1, scale: 1 }}
                                transition={{
                                    delay: 0.75,
                                    duration: 0.7,
                                    ease: 'easeOut',
                                }}
                            >
                                <Check size={58} strokeWidth={3} />
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.55, duration: 0.7 }}
                        >
                            <div className="mb-3 flex items-center justify-center gap-2">
                                <PartyPopper size={19} />
                                <p className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-100">
                                    Payment Successful
                                </p>
                                <PartyPopper size={19} />
                            </div>

                            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                                Congratulations!
                            </h1>

                            <p className="mt-3 text-sm font-medium text-emerald-50 sm:text-base">
                                Your Premium Subscription is Activated
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="px-6 py-8 sm:px-10">

                    {/* Welcome */}
                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.85, duration: 0.7 }}
                        className="mb-8 text-center"
                    >
                        <motion.div
                            animate={
                                shouldReduceMotion
                                    ? {}
                                    : {
                                        y: [0, -8, 0],
                                        rotate: [0, 5, -5, 0],
                                    }
                            }
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                            className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-amber-100 to-yellow-200 text-amber-600 shadow-lg shadow-amber-100"
                        >
                            <Crown size={42} />
                        </motion.div>

                        <h2 className="text-2xl font-extrabold text-gray-900">
                            Welcome to Premium!
                        </h2>

                        <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-gray-500">
                            Thank you for choosing our Premium plan.
                            You can now enjoy your premium vendor benefits.
                        </p>

                        {customerEmail && (
                            <p className="mt-4 break-all rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                                Confirmation email: {customerEmail}
                            </p>
                        )}
                    </motion.div>

                    {/* Premium Benefits */}
                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.1, duration: 0.7 }}
                        className="mb-7 rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-green-50 p-5"
                    >
                        <h3 className="mb-5 flex items-center gap-2 font-bold text-gray-800">
                            <Sparkles size={19} className="text-emerald-600" />
                            Your Premium Benefits
                        </h3>

                        <div className="space-y-4">
                            {benefits.map((benefit, index) => (
                                <motion.div
                                    key={benefit}
                                    initial={{ opacity: 0, x: -25 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                        delay: 1.3 + index * 0.2,
                                        duration: 0.65,
                                        ease: [0.16, 1, 0.3, 1],
                                    }}
                                    className="flex items-center gap-3 text-sm font-medium text-gray-700"
                                >
                                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md shadow-emerald-200">
                                        <Check size={16} strokeWidth={3} />
                                    </span>

                                    {benefit}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Secure Payment */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.9, duration: 0.8 }}
                        className="mb-7 flex items-center justify-center gap-2 text-xs font-medium text-gray-400"
                    >
                        <ShieldCheck size={18} className="text-emerald-500" />
                        Your payment has been securely processed.
                    </motion.div>

                    {/* Dashboard Button */}
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2.1, duration: 0.7 }}
                        whileHover={
                            shouldReduceMotion
                                ? {}
                                : {
                                    scale: 1.025,
                                    y: -3,
                                    boxShadow: '0 15px 30px rgba(16,185,129,0.25)',
                                }
                        }
                        whileTap={{ scale: 0.97 }}
                        onClick={() => router.push('/dashboard/vendor/subscription')}
                        className="group flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-emerald-600 to-green-500 px-6 py-4 font-bold text-white shadow-lg shadow-emerald-200 transition-colors hover:from-emerald-700 hover:to-green-600"
                    >
                        Go to Subscription Dashboard

                        <motion.span
                            animate={
                                shouldReduceMotion
                                    ? {}
                                    : { x: [0, 5, 0] }
                            }
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        >
                            <ArrowRight size={20} />
                        </motion.span>
                    </motion.button>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.3 }}
                        className="mt-5 text-center text-xs text-gray-400"
                    >
                        You will be redirected automatically in a few seconds.
                    </motion.p>
                </div>
            </motion.section>
        </main>
    )
}
