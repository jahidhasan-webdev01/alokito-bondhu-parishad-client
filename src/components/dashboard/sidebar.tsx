"use client";

import Link from "next/link";
import {
    LayoutDashboard,
    UserPlus,
    CreditCard,
    ReceiptText,
    BarChart3,
    ChevronRight,
    UserStar,
} from "lucide-react";

import { useState } from "react";
import { motion } from "framer-motion";


const menus = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "All Members",
        href: "/dashboard/members",
        icon: UserStar,
    },
    {
        title: "Add Member",
        href: "/dashboard/members/add",
        icon: UserPlus,
    },
    {
        title: "Add Payment",
        href: "/dashboard/payment/add",
        icon: CreditCard,
    },
    {
        title: "All Payments",
        href: "/dashboard/payment",
        icon: ReceiptText,
    },
    {
        title: "Reports",
        href: "/dashboard/reports",
        icon: BarChart3,
    },
];



export default function Sidebar() {

    const [open, setOpen] = useState(false);


    return (
        <>


            {/* Mobile Open Button */}

            {
                !open && (

                    <motion.button

                        onClick={() => setOpen(true)}

                        whileHover={{
                            scale: 1.1,
                        }}

                        whileTap={{
                            scale: 0.9,
                        }}

                        className="
                            fixed
                            left-3
                            top-24
                            z-50
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-md
                            bg-brand-green
                            text-brand-cream
                            shadow-md
                            lg:hidden
                        "

                    >

                        <motion.div

                            animate={{
                                x: [0, 3, 0],
                            }}

                            transition={{
                                duration: 1,
                                repeat: Infinity,
                            }}

                        >

                            <ChevronRight size={16}/>

                        </motion.div>


                    </motion.button>

                )
            }




            {/* Overlay */}

            {
                open && (

                    <motion.div

                        initial={{
                            opacity: 0,
                        }}

                        animate={{
                            opacity: 1,
                        }}

                        onClick={() => setOpen(false)}

                        className="
                            fixed
                            inset-0
                            top-20
                            z-30
                            bg-black/40
                            lg:hidden
                        "

                    />

                )
            }





            {/* Desktop Sidebar */}

            <aside

                className="
                    hidden
                    h-full
                    w-72
                    shrink-0
                    border-r
                    border-brand-gold/30
                    bg-brand-cream
                    px-6
                    pt-5
                    text-brand-green
                    lg:block
                "

            >

                <SidebarContent/>


            </aside>






            {/* Mobile Sidebar */}

            <motion.aside

                initial={{
                    x: "-100%",
                }}

                animate={{
                    x: open ? 0 : "-100%",
                }}

                transition={{
                    duration: 0.25,
                    ease: "easeInOut",
                }}

                className="
                    fixed
                    left-0
                    top-20
                    z-40
                    h-[calc(100vh-5rem)]
                    w-64
                    border-r
                    border-brand-gold/30
                    bg-brand-cream
                    px-5
                    pt-5
                    text-brand-green
                    lg:hidden
                "

            >



                {/* Close Arrow */}

                <button

                    onClick={() => setOpen(false)}

                    className="
                        absolute
                        right-4
                        top-5
                        flex
                        h-7
                        w-7
                        items-center
                        justify-center
                        rounded-md
                        hover:bg-brand-gold/20
                    "

                >

                    <motion.div

                        animate={{
                            rotate: 180,
                        }}

                        transition={{
                            duration: 0.3,
                        }}

                    >

                        <ChevronRight size={16}/>


                    </motion.div>


                </button>





                <SidebarContent/>


            </motion.aside>



        </>
    );
}






function SidebarContent(){


    return (

        <>


            <h2
                className="
                    mb-8
                    text-xl
                    font-bold
                "
            >

                Admin Panel

            </h2>




            <nav className="space-y-2">


                {
                    menus.map((item)=>{


                        const Icon = item.icon;


                        return (

                            <Link

                                key={item.href}

                                href={item.href}

                                className="
                                    flex
                                    items-center
                                    gap-3
                                    rounded-lg
                                    px-3
                                    py-2.5
                                    text-sm
                                    transition
                                    hover:bg-brand-gold
                                    hover:text-brand-cream
                                "

                            >

                                <Icon size={17}/>


                                <span>
                                    {item.title}
                                </span>


                            </Link>

                        );

                    })
                }


            </nav>


        </>

    );

}