
import { getVendorPremium } from "@/lib/api/user";
import { auth } from "@/lib/auth";
import {
  Check,
  Crown,
  Zap,
  ShieldCheck,
  Star,
  Sparkles,
  BadgeCheck,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const freeFeatures = [
  "Maximum 3 active menu items",
  "Basic restaurant profile",
  "Manage customer orders",
  "Standard restaurant visibility",
];

const premiumFeatures = [
  "Unlimited active menu items",
  "Premium restaurant badge",
  "Featured restaurant placement",
  "Better restaurant visibility",
  "Manage all customer orders",
];

const SubscriptionPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ canceled?: string }>;
}) => {
  const { canceled } = await searchParams;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== "vendor") {
    redirect("/unauthorized");
  }

  const vendor = await getVendorPremium(session.user.id);
  const isPremium = vendor?.premium === true;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-orange-600">
            <Sparkles size={15} />
            PizzaHub Vendor Membership
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Grow Your Restaurant
            <span className="block text-orange-500">
              With The Right Plan
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
            Choose a plan that fits your business. Unlock
            powerful features and take your restaurant to
            the next level with PizzaHub.
          </p>
        </div>

        {/* Cancelled Checkout Message */}
        {canceled && (
          <div className="mx-auto mb-6 max-w-3xl rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700">
            Your checkout was canceled. You can upgrade whenever you are ready.
          </div>
        )}

        {/* Benefits */}
        <div className="mb-9 flex flex-wrap items-center justify-center gap-3 sm:gap-7">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Check size={16} className="text-emerald-500" />
            Easy Upgrade
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-600">
            <ShieldCheck size={16} className="text-emerald-500" />
            Secure Payment
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Zap size={16} className="text-orange-500" />
            Premium Features
          </div>
        </div>

        {/* Subscription Cards */}
        <div className="mx-auto grid max-w-4xl items-stretch gap-6 md:grid-cols-2">

          {/* Free Plan */}
          <div
            className={`relative flex flex-col overflow-hidden rounded-2xl border bg-white p-6 transition-all duration-300 ${!isPremium
              ? "border-emerald-400 shadow-lg shadow-emerald-100"
              : "border-slate-200 shadow-sm"
              }`}
          >
            {/* Current Plan Indicator */}
            {!isPremium && (
              <div className="absolute right-0 top-0 flex items-center gap-1 rounded-bl-xl bg-emerald-500 px-4 py-2 text-[10px] font-extrabold text-white">
                <Check size={12} />
                CURRENT PLAN
              </div>
            )}

            <div className="mb-5 flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                <ShieldCheck size={25} />
              </div>

              {isPremium ? (
                <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold text-slate-500">
                  STARTER PLAN
                </span>
              ) : (
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-600">
                  ACTIVE PLAN
                </span>
              )}
            </div>

            <h2 className="text-xl font-bold text-slate-900">
              Free
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Start your restaurant journey with basic tools.
            </p>

            <div className="my-6">
              <span className="text-4xl font-extrabold text-slate-900">
                $0
              </span>
              <span className="ml-1 text-sm text-slate-500">
                / month
              </span>

              <p className="mt-1 text-xs text-slate-400">
                Free forever
              </p>
            </div>

            <div className="mb-5 h-px bg-slate-200" />

            <h3 className="mb-4 text-sm font-bold text-slate-900">
              What's included
            </h3>

            <ul className="flex-1 space-y-3">
              {freeFeatures.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-2.5 text-sm text-slate-600"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <Check size={13} />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>

            <button
              type="button"
              disabled
              className={`mt-7 flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-bold opacity-80 ${!isPremium
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-slate-200 bg-slate-50 text-slate-400"
                }`}
            >
              {!isPremium ? (
                <>
                  <BadgeCheck size={18} />
                  Current Free Plan
                </>
              ) : (
                "Free Plan"
              )}
            </button>
          </div>

          {/* Premium Plan */}
          <div
            className={`relative flex flex-col overflow-hidden rounded-2xl border-2 bg-white p-6 transition-all duration-300 ${isPremium
              ? "border-emerald-400 shadow-xl shadow-emerald-100"
              : "border-orange-400 shadow-xl shadow-orange-100"
              }`}
          >
            {/* Top Gradient */}
            <div
              className={`absolute left-0 top-0 h-1.5 w-full ${isPremium
                ? "bg-gradient-to-r from-emerald-400 to-teal-500"
                : "bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400"
                }`}
            />

            {/* Plan Status */}
            <div
              className={`absolute right-0 top-0 flex items-center gap-1 rounded-bl-xl px-4 py-2 text-[10px] font-extrabold text-white ${isPremium ? "bg-emerald-500" : "bg-orange-500"
                }`}
            >
              {isPremium ? (
                <>
                  <Check size={12} />
                  CURRENT PLAN
                </>
              ) : (
                <>
                  <Star size={11} />
                  POPULAR
                </>
              )}
            </div>

            <div className="mb-5 flex items-center justify-between">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${isPremium
                  ? "bg-emerald-100 text-emerald-600"
                  : "bg-orange-100 text-orange-600"
                  }`}
              >
                <Crown size={25} />
              </div>

              <span
                className={`rounded-full px-3 py-1 text-[11px] font-bold ${isPremium
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-orange-100 text-orange-600"
                  }`}
              >
                PREMIUM PLAN
              </span>
            </div>

            <h2 className="text-xl font-bold text-slate-900">
              Premium
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Everything you need to grow your restaurant faster.
            </p>

            <div className="my-6">
              <span className="text-4xl font-extrabold text-slate-900">
                $9.99
              </span>
              <span className="ml-1 text-sm text-slate-500">
                / month
              </span>

              <p
                className={`mt-1 text-xs font-medium ${isPremium ? "text-emerald-600" : "text-orange-600"
                  }`}
              >
                {isPremium
                  ? "Your Premium plan is currently active"
                  : "Billed monthly · Cancel anytime"}
              </p>
            </div>

            <div className="mb-5 h-px bg-slate-200" />

            <h3 className="mb-4 text-sm font-bold text-slate-900">
              Everything in Free, plus
            </h3>

            <ul className="flex-1 space-y-3">
              {premiumFeatures.map((feature, index) => (
                <li
                  key={feature}
                  className="flex items-start gap-2.5 text-sm text-slate-700"
                >
                  <span
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${isPremium
                      ? "bg-emerald-100 text-emerald-600"
                      : "bg-orange-100 text-orange-600"
                      }`}
                  >
                    {index === 0 ? (
                      <Zap size={13} />
                    ) : (
                      <Check size={13} />
                    )}
                  </span>

                  <span className="font-medium">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {/* Premium Status / Upgrade Button */}
            {isPremium ? (
              <button
                type="button"
                disabled
                className="mt-7 flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700 opacity-80"
              >
                <BadgeCheck size={19} />
                Premium Plan Active
              </button>
            ) : (
              <form action="/api/checkout_sessions" method="POST">
                <button
                  type="submit"
                  className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-orange-200 transition hover:-translate-y-0.5 hover:from-orange-600 hover:to-amber-600"
                >
                  <Crown size={17} />
                  Upgrade to Premium
                  <ArrowRight size={16} />
                </button>
              </form>
            )}

            <p className="mt-3 text-center text-[11px] text-slate-400">
              Secure checkout powered by Stripe
            </p>
          </div>
        </div>

        {/* Bottom Benefits */}
        <div className="mx-auto mt-9 grid max-w-4xl gap-4 sm:grid-cols-3">

          <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-4">
            <Zap size={22} className="text-orange-600" />
            <div>
              <h4 className="text-sm font-bold text-slate-800">
                Unlimited Menu
              </h4>
              <p className="text-xs text-slate-500">
                Add more food items
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-4">
            <BadgeCheck size={22} className="text-emerald-600" />
            <div>
              <h4 className="text-sm font-bold text-slate-800">
                Premium Badge
              </h4>
              <p className="text-xs text-slate-500">
                Build customer trust
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-4">
            <TrendingUp size={22} className="text-blue-600" />
            <div>
              <h4 className="text-sm font-bold text-slate-800">
                Featured Placement
              </h4>
              <p className="text-xs text-slate-500">
                More restaurant visibility
              </p>
            </div>
          </div>
        </div>

        {/* Security Information */}
        <div className="mx-auto mt-8 flex max-w-3xl items-start gap-3 rounded-xl border border-slate-200 bg-white p-4">
          <ShieldCheck
            className="mt-0.5 shrink-0 text-emerald-500"
            size={21}
          />

          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Secure Subscription Payment
            </h3>

            <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
              Your Premium subscription payment is processed
              securely through Stripe. Premium features are
              activated after payment verification.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SubscriptionPage;
