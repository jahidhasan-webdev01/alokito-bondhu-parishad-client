"use client";

import { motion } from "framer-motion";


export default function Loading() {

    return (

        <main className="flex min-h-screen items-center justify-center bg-brand-cream">


            <motion.div
                animate={{
                    rotate: 360
                }}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="h-12 w-12 rounded-full border-4 border-brand-green border-t-brand-gold"
            />


        </main>

    );
}