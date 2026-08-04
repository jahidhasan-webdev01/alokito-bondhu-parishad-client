"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-brand-cream px-4">

            {/* Background Animation */}
            <motion.div
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, 10, 0],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute left-10 top-20 h-32 w-32 rounded-full bg-brand-green/10"
            />

            <motion.div
                animate={{
                    y: [0, 20, 0],
                    rotate: [0, -10, 0],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute bottom-20 right-10 h-40 w-40 rounded-full bg-brand-gold/20"
            />


            {/* Content */}
            <motion.div
                initial={{
                    opacity: 0,
                    y: 80,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.8,
                    ease: "easeOut",
                }}
                className="relative z-10 w-full max-w-lg text-center"
            >

                {/* Logo */}
                <motion.div
                    initial={{
                        scale: 0,
                    }}
                    animate={{
                        scale: 1,
                    }}
                    transition={{
                        delay: 0.3,
                        type: "spring",
                    }}
                    className="mb-6 flex justify-center"
                >
                    <Image
                        src="/logo.jpeg"
                        alt="Alokito Bondhu Parishad"
                        width={90}
                        height={90}
                        className="rounded-full shadow-lg"
                    />
                </motion.div>


                {/* 404 */}
                <motion.h1
                    animate={{
                        scale: [1, 1.05, 1],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                    }}
                    className="text-8xl font-extrabold text-brand-green md:text-9xl"
                >
                    404
                </motion.h1>


                <motion.h2
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        delay: 0.5,
                    }}
                    className="mt-4 text-2xl font-bold text-brand-blue"
                >
                    Page Not Found
                </motion.h2>


                <motion.p
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    transition={{
                        delay: 0.7,
                    }}
                    className="mx-auto mt-3 max-w-md text-sm text-brand-blue/70"
                >
                    Sorry, the page you are looking for does not exist
                    or has been moved.
                </motion.p>



                <motion.div
                    initial={{
                        opacity: 0,
                        y: 30,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        delay: 0.9,
                    }}
                    className="mt-8"
                >
                    <Link
                        href="/"
                        className="inline-flex items-center rounded-xl bg-brand-green px-6 py-3 font-semibold text-brand-cream shadow-lg transition hover:bg-brand-green-light"
                    >
                        Back To Home
                    </Link>
                </motion.div>


            </motion.div>

        </main>
    );
}