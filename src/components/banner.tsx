
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Pizza } from "lucide-react";

const Banner = () => {
    return (
        <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
            <div className="relative isolate overflow-hidden rounded-2xl bg-gradient-to-r from-[#650000] via-[#A00000] to-[#300000] shadow-xl">

                {/* Background Decorations */}
                <div className="pointer-events-none absolute -right-10 -top-16 h-64 w-64 rounded-full bg-red-500/20 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-20 left-1/3 h-52 w-52 rounded-full bg-yellow-500/10 blur-3xl" />

                <div className="relative grid min-h-[300px] items-center md:grid-cols-2 lg:min-h-[360px]">

                    {/* Left Content */}
                    <div className="relative z-20 px-6 py-10 sm:px-10 lg:px-12 lg:py-14">

                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-3 py-1.5 text-xs font-semibold text-yellow-300">
                            <Pizza size={15} />
                            FRESHLY BAKED, EVERY DAY
                        </div>

                        <h1 className="max-w-xl text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
                            Hot & Fresh{" "}
                            <span className="text-yellow-400">Pizza</span>
                            <br className="hidden sm:block" />
                            Delivered to Your Door
                        </h1>

                        <p className="mt-4 max-w-md text-sm leading-6 text-red-100/90 sm:text-base">
                            Discover the best pizza in town. Order now and
                            enjoy delicious food at your doorstep.
                        </p>

                        <Link
                            href="/menu"
                            className="mt-6 inline-flex items-center gap-2 rounded-full bg-yellow-400 px-5 py-3 text-sm font-bold text-red-950 shadow-lg shadow-yellow-500/20 transition duration-300 hover:-translate-y-1 hover:bg-yellow-300"
                        >
                            Explore Pizza Menu
                            <ArrowRight size={17} />
                        </Link>
                    </div>

                    {/* Right Image */}
                    <div className="relative flex min-h-[250px] items-center justify-center px-5 pb-8 md:min-h-[360px] md:px-6 md:py-8">

                        {/* Image Glow */}
                        <div className="absolute h-56 w-56 rounded-full bg-yellow-400/20 blur-3xl sm:h-72 sm:w-72" />

                        {/* Pizza Image Container */}
                        <div className="relative aspect-[5/4] w-full max-w-[500px] overflow-hidden rounded-[45%] border-4 border-yellow-400/20 shadow-2xl shadow-black/40 transition duration-500 hover:scale-105">

                            <Image
                                src="https://s.yimg.com/fz/api/res/1.2/qFrSG7Ht0TBsRoGsWy3PcA--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpbGw7aD00MTI7cHhvZmY9NTA7cHlvZmY9MTAwO3E9ODA7c3M9MTt3PTM4OA--/https://i.pinimg.com/736x/ab/e6/57/abe65721a6d06545c99230151aab0177.jpg"
                                alt="Delicious hot and fresh pizza"
                                fill
                                priority
                                sizes="(max-width: 768px) 90vw, 500px"
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;
