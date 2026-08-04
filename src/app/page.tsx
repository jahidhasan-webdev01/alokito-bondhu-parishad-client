"use client";

import Image from "next/image";
import Link from "next/link";

import {
    Users,
    HeartHandshake,
    ShieldCheck,
    HandCoins,
    ArrowRight,
} from "lucide-react";

import {
    motion
} from "framer-motion";

import Container from "@/components/ui/container";



const features = [
    {
        title:"Member Management",
        description:
            "Maintain all member information in an organized and secure system.",
        icon:Users,
    },

    {
        title:"Transparent Contribution",
        description:
            "Track monthly payments and financial activities easily.",
        icon:HandCoins,
    },

    {
        title:"Trusted Organization",
        description:
            "Built with transparency, responsibility and community values.",
        icon:ShieldCheck,
    },

    {
        title:"Community Support",
        description:
            "Working together to create a stronger and brighter future.",
        icon:HeartHandshake,
    },
];



export default function HomePage(){


    return (

        <main>


        {/* Hero */}

        <section
            className="
                relative
                overflow-hidden
                pt-32
                pb-20
            "
        >

            <Container>


            <div
                className="
                    grid
                    items-center
                    gap-12
                    lg:grid-cols-2
                "
            >


                <motion.div

                    initial={{
                        opacity:0,
                        x:-40
                    }}

                    animate={{
                        opacity:1,
                        x:0
                    }}

                    transition={{
                        duration:.6
                    }}

                >

                    <p
                        className="
                            mb-4
                            font-semibold
                            text-brand-gold
                        "
                    >
                        Alokito Bondhu Parishad
                    </p>


                    <h1
                        className="
                            text-4xl
                            font-bold
                            leading-tight
                            text-brand-green
                            md:text-6xl
                        "
                    >
                        Building a Better
                        <br/>
                        Community Together
                    </h1>


                    <p
                        className="
                            mt-6
                            max-w-xl
                            text-gray-600
                            leading-relaxed
                        "
                    >
                        A platform dedicated to connecting members,
                        maintaining transparency and supporting
                        community growth through unity and cooperation.
                    </p>



                    <div
                        className="
                            mt-8
                            flex
                            flex-wrap
                            gap-4
                        "
                    >

                        <Link
                            href="/members"
                            className="
                                flex
                                items-center
                                gap-2
                                rounded-lg
                                bg-brand-green
                                px-6
                                py-3
                                text-white
                                transition
                                hover:bg-brand-green-light
                            "
                        >

                            Explore Members

                            <ArrowRight size={18}/>

                        </Link>


                        <Link
                            href="/about"
                            className="
                                rounded-lg
                                border
                                border-brand-gold
                                px-6
                                py-3
                                text-brand-green
                            "
                        >

                            Learn More

                        </Link>


                    </div>


                </motion.div>





                <motion.div

                    initial={{
                        opacity:0,
                        scale:.8
                    }}

                    animate={{
                        opacity:1,
                        scale:1
                    }}

                    transition={{
                        duration:.7
                    }}

                    className="
                        flex
                        justify-center
                    "

                >

                    <motion.div

                        animate={{
                            y:[
                                0,
                                -15,
                                0
                            ]
                        }}

                        transition={{
                            duration:4,
                            repeat:Infinity
                        }}

                    >

                        <Image

                            src="/logo.jpeg"

                            alt="Alokito Bondhu Parishad"

                            width={320}

                            height={320}

                            className="
                                rounded-full
                                border-8
                                border-brand-gold/20
                                shadow-xl
                            "

                            priority

                        />

                    </motion.div>


                </motion.div>



            </div>


            </Container>


        </section>









        {/* Stats */}


        <section
            className="
                py-16
            "
        >

        <Container>


            <div
                className="
                    grid
                    gap-5
                    sm:grid-cols-3
                "
            >


            {
                [
                    ["Members","Growing Together"],
                    ["Transparency","Every Transaction"],
                    ["Support","For Everyone"]
                ]
                .map(
                    (item,index)=>(


                    <motion.div

                        key={index}

                        initial={{
                            opacity:0,
                            y:30
                        }}

                        whileInView={{
                            opacity:1,
                            y:0
                        }}

                        viewport={{
                            once:true
                        }}

                        transition={{
                            delay:index*.1
                        }}

                        className="
                            border-b
                            border-brand-gold/40
                            p-6
                            text-center
                        "

                    >

                        <h3
                            className="
                                text-2xl
                                font-bold
                                text-brand-green
                            "
                        >
                            {item[0]}
                        </h3>


                        <p
                            className="
                                mt-2
                                text-gray-500
                            "
                        >
                            {item[1]}
                        </p>


                    </motion.div>


                ))

            }


            </div>


        </Container>

        </section>










        {/* Features */}


        <section
            className="
                py-16
            "
        >

        <Container>


            <motion.div

                initial={{
                    opacity:0,
                    y:20
                }}

                whileInView={{
                    opacity:1,
                    y:0
                }}

                viewport={{
                    once:true
                }}

                className="
                    mb-10
                    text-center
                "

            >

                <h2
                    className="
                        text-3xl
                        font-bold
                        text-brand-green
                    "
                >
                    Why Choose Us?
                </h2>


                <p
                    className="
                        mt-3
                        text-gray-500
                    "
                >
                    Simple, transparent and community focused.
                </p>


            </motion.div>






            <div
                className="
                    grid
                    gap-6
                    sm:grid-cols-2
                    lg:grid-cols-4
                "
            >

            {
                features.map(
                    (
                        feature,
                        index
                    )=>{


                    const Icon =
                        feature.icon;


                    return (

                    <motion.div


                        key={feature.title}


                        whileHover={{
                            y:-8
                        }}


                        initial={{
                            opacity:0,
                            y:30
                        }}


                        whileInView={{
                            opacity:1,
                            y:0
                        }}


                        viewport={{
                            once:true
                        }}


                        transition={{
                            delay:index*.1
                        }}


                        className="
                            rounded-xl
                            border
                            border-brand-gold/30
                            p-6
                        "

                    >

                        <Icon
                            size={35}
                            className="
                                text-brand-green
                            "
                        />


                        <h3
                            className="
                                mt-5
                                font-bold
                                text-brand-green
                            "
                        >
                            {feature.title}
                        </h3>


                        <p
                            className="
                                mt-3
                                text-sm
                                text-gray-500
                            "
                        >
                            {feature.description}
                        </p>


                    </motion.div>

                    );

                })

            }

            </div>


        </Container>

        </section>










        {/* CTA */}


        <section
            className="
                py-20
            "
        >

        <Container>


            <motion.div

                initial={{
                    opacity:0,
                    scale:.95
                }}

                whileInView={{
                    opacity:1,
                    scale:1
                }}

                className="
                    rounded-2xl
                    bg-brand-green
                    p-10
                    text-center
                    text-white
                "

            >

                <h2
                    className="
                        text-3xl
                        font-bold
                    "
                >
                    Join Our Community
                </h2>


                <p
                    className="
                        mx-auto
                        mt-4
                        max-w-xl
                        text-white/80
                    "
                >
                    Together we can create a stronger,
                    more connected community.
                </p>



                <Link

                    href="/members"

                    className="
                        mt-8
                        inline-block
                        rounded-lg
                        bg-brand-gold
                        px-7
                        py-3
                        font-semibold
                        text-brand-green
                    "

                >
                    Become Connected

                </Link>


            </motion.div>


        </Container>


        </section>



        </main>

    );

}