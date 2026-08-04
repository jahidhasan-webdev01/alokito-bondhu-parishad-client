"use client";

import Image from "next/image";
import Link from "next/link";
import Container from "../ui/container";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/auth-context";
import { useState } from "react";
import { Menu, X } from "lucide-react";


const navItems = [
    { label: "Home", href: "/" },
    { label: "Members", href: "/members" },
];


export default function Navbar() {


    const {
        admin,
        loading,
        logout
    } = useAuth();


    const [open, setOpen] = useState(false);



    return (

        <header
            className="
                fixed
                top-0
                left-0
                z-50
                w-full
                border-b
                border-brand-green/10
                bg-brand-cream/90
                backdrop-blur
            "
        >


            <Container>


                <nav
                    className="
                        flex
                        h-24
                        items-center
                        justify-between
                    "
                >



                    {/* Logo */}

                    <Link
                        href="/"
                        className="flex items-center"
                    >

                        <Image

                            src="/logo.jpeg"

                            alt="Alokito Bondhu Parishad"

                            width={70}

                            height={70}

                            className="
                                h-16
                                w-16
                                rounded-full
                                object-contain
                            "

                            priority

                        />

                    </Link>





                    {/* Desktop Navigation */}

                    <ul
                        className="
                            hidden
                            items-center
                            gap-8
                            md:flex
                        "
                    >

                        {
                            navItems.map((item)=>(
                                
                                <li key={item.href}>

                                    <Link

                                        href={item.href}

                                        className="
                                            text-sm
                                            font-medium
                                            text-brand-blue
                                            transition-colors
                                            hover:text-brand-green
                                        "

                                    >
                                        {item.label}

                                    </Link>

                                </li>

                            ))
                        }



                        {
                            admin && (

                                <li>

                                    <Link

                                        href="/dashboard"

                                        className="
                                            text-sm
                                            font-semibold
                                            text-brand-green
                                            hover:text-brand-green-light
                                        "

                                    >

                                        Dashboard

                                    </Link>


                                </li>

                            )
                        }


                    </ul>






                    {/* Desktop Auth */}

                    <div className="hidden md:block">


                        {
                            loading ? (

                                <motion.div

                                    animate={{
                                        opacity:[
                                            .4,
                                            1,
                                            .4
                                        ]
                                    }}

                                    transition={{
                                        duration:1.2,
                                        repeat:Infinity
                                    }}

                                    className="
                                        flex
                                        items-center
                                        rounded-lg
                                        border
                                        border-brand-green/20
                                        px-4
                                        py-2
                                    "
                                >

                                    <span
                                        className="
                                            h-2
                                            w-2
                                            rounded-full
                                            bg-brand-green
                                        "
                                    />


                                    <span
                                        className="
                                            ml-2
                                            text-sm
                                            text-brand-green
                                        "
                                    >
                                        Checking
                                    </span>


                                </motion.div>


                            ) : admin ? (


                                <button

                                    onClick={logout}

                                    className="
                                        rounded-lg
                                        bg-brand-gold
                                        px-4
                                        py-2
                                        text-sm
                                        font-medium
                                        text-brand-cream
                                        transition
                                        hover:bg-brand-gold/90
                                    "

                                >

                                    Logout

                                </button>


                            ) : (


                                <Link

                                    href="/login"

                                    className="
                                        rounded-lg
                                        bg-brand-green
                                        px-4
                                        py-2
                                        text-sm
                                        font-medium
                                        text-brand-cream
                                        transition
                                        hover:bg-brand-green-light
                                    "

                                >

                                    Login

                                </Link>


                            )
                        }


                    </div>






                    {/* Mobile Menu Button */}

                    <button

                        onClick={() => setOpen(!open)}

                        className="
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-md
                            text-brand-green
                            md:hidden
                        "

                    >

                        {
                            open ? (

                                <X size={18}/>

                            ) : (

                                <Menu size={18}/>

                            )
                        }


                    </button>



                </nav>







                {/* Mobile Menu */}

                <AnimatePresence>


                    {
                        open && (

                            <motion.div

                                initial={{
                                    opacity:0,
                                    height:0
                                }}

                                animate={{
                                    opacity:1,
                                    height:"auto"
                                }}

                                exit={{
                                    opacity:0,
                                    height:0
                                }}

                                transition={{
                                    duration:.25
                                }}

                                className="
                                    overflow-hidden
                                    border-t
                                    border-brand-green/10
                                    pb-5
                                    md:hidden
                                "

                            >


                                <div
                                    className="
                                        flex
                                        flex-col
                                        gap-4
                                        pt-5
                                    "
                                >


                                    {
                                        navItems.map((item)=>(

                                            <Link

                                                key={item.href}

                                                href={item.href}

                                                onClick={() => setOpen(false)}

                                                className="
                                                    text-sm
                                                    font-medium
                                                    text-brand-blue
                                                "

                                            >

                                                {item.label}

                                            </Link>

                                        ))
                                    }





                                    {
                                        admin && (

                                            <Link

                                                href="/dashboard"

                                                onClick={() => setOpen(false)}

                                                className="
                                                    text-sm
                                                    font-semibold
                                                    text-brand-green
                                                "

                                            >

                                                Dashboard

                                            </Link>

                                        )
                                    }





                                    {
                                        loading ? (

                                            <span className="text-sm text-brand-green">
                                                Checking...
                                            </span>

                                        ) : admin ? (


                                            <button

                                                onClick={logout}

                                                className="
                                                    w-fit
                                                    rounded-lg
                                                    bg-brand-gold
                                                    px-4
                                                    py-2
                                                    text-sm
                                                    font-medium
                                                    text-brand-cream
                                                "

                                            >

                                                Logout

                                            </button>


                                        ) : (


                                            <Link

                                                href="/login"

                                                onClick={() => setOpen(false)}

                                                className="
                                                    w-fit
                                                    rounded-lg
                                                    bg-brand-green
                                                    px-4
                                                    py-2
                                                    text-sm
                                                    font-medium
                                                    text-brand-cream
                                                "

                                            >

                                                Login

                                            </Link>

                                        )
                                    }


                                </div>


                            </motion.div>

                        )
                    }


                </AnimatePresence>



            </Container>


        </header>

    );
}