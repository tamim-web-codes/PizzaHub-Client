
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const MouseGlow = () => {
    const [position, setPosition] = useState({ x: -100, y: -100 });
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setPosition({
                x: e.clientX,
                y: e.clientY,
            });
            setVisible(true);
        };

        const handleMouseLeave = () => setVisible(false);
        const handleMouseEnter = () => setVisible(true);

        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseleave", handleMouseLeave);
        document.addEventListener("mouseenter", handleMouseEnter);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("mouseenter", handleMouseEnter);
        };
    }, []);

    return (
        <>
            {/* Smooth Circle Follower */}
            <motion.div
                className="pointer-events-none fixed left-0 top-0 z-[9998] hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/80 bg-transparent md:block"
                animate={{
                    x: position.x,
                    y: position.y,
                    opacity: visible ? 1 : 0,
                }}
                transition={{
                    type: "spring",
                    stiffness: 180,
                    damping: 22,
                    mass: 0.5,
                }}
            />

            {/* Dot follows actual mouse instantly */}
            <div
                className="pointer-events-none fixed z-[9999] hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white md:block"
                style={{
                    left: position.x,
                    top: position.y,
                    opacity: visible ? 1 : 0,
                }}
            />
        </>
    );

};

export default MouseGlow;
