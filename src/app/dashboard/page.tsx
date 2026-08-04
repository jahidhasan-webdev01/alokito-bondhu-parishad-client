"use client";

import {
    Users,
    UserCheck,
    Wallet,
    HandCoins,
    ReceiptText,
    BadgeDollarSign,
} from "lucide-react";

import {
    motion
} from "framer-motion";

import {
    useEffect,
    useState
} from "react";


const API_URL =
    process.env.NEXT_PUBLIC_API_URL;



type DashboardData = {

    members:{
        total:number;
        active:number;
    };

    payments:{
        totalPayments:number;
        collectedAmount:number;
        totalFine:number;
        totalCollection:number;
    };

    balance:number;

};



export default function DashboardPage(){


    const [
        data,
        setData
    ] = useState<DashboardData | null>(null);


    const [
        loading,
        setLoading
    ] = useState(true);



    useEffect(()=>{


        const fetchDashboard =
        async()=>{


            try{


                const res =
                    await fetch(
                        `${API_URL}/dashboard`,
                        {
                            credentials:"include",
                            cache:"no-store"
                        }
                    );


                const result =
                    await res.json();


                setData(
                    result.data
                );


            }
            catch(error){

                console.log(
                    error
                );

            }
            finally{

                setLoading(false);

            }


        };



        fetchDashboard();


    },[]);





    const cards = data
    ? [

        {
            title:"Total Members",
            value:data.members.total,
            icon:Users,
        },

        {
            title:"Active Members",
            value:data.members.active,
            icon:UserCheck,
        },

        {
            title:"Total Balance",
            value:`৳ ${data.balance.toLocaleString()}`,
            icon:Wallet,
        },

        {
            title:"Total Collection",
            value:`৳ ${data.payments.totalCollection.toLocaleString()}`,
            icon:HandCoins,
        },

        {
            title:"Total Fine",
            value:`৳ ${data.payments.totalFine.toLocaleString()}`,
            icon:BadgeDollarSign,
        },

        {
            title:"Payments",
            value:data.payments.totalPayments,
            icon:ReceiptText,
        },

    ]
    :
    [];





    return (

        <motion.div

            initial={{
                opacity:0,
                y:20
            }}

            animate={{
                opacity:1,
                y:0
            }}

            transition={{
                duration:.4
            }}

            className="
                space-y-8
            "

        >


            <div>

                <h1
                    className="
                        text-3xl
                        font-bold
                        text-brand-green
                    "
                >
                    Dashboard
                </h1>


                <p className="
                    mt-2
                    text-gray-500
                ">
                    Overview of Alokito Bondhu Parishad.
                </p>

            </div>





            <div
                className="
                    grid
                    gap-5
                    sm:grid-cols-2
                    xl:grid-cols-3
                "
            >


            {
                loading ? (

                    Array
                    .from({
                        length:6
                    })
                    .map((_,i)=>(

                        <div

                            key={i}

                            className="
                                h-36
                                animate-pulse
                                border
                                border-brand-gold/20
                                rounded-xl
                            "

                        />

                    ))


                )
                :
                cards.map(
                    (
                        card,
                        index
                    )=>{


                    const Icon =
                        card.icon;



                    return (

                        <motion.div


                            key={card.title}


                            initial={{
                                opacity:0,
                                y:30
                            }}


                            animate={{
                                opacity:1,
                                y:0
                            }}


                            transition={{
                                delay:index*.08
                            }}


                            whileHover={{
                                y:-5
                            }}


                            className="
                                rounded-xl
                                border
                                border-brand-gold/30
                                p-6
                                transition
                            "

                        >


                            <div
                                className="
                                    flex
                                    items-center
                                    justify-between
                                "
                            >

                                <div>

                                    <p
                                        className="
                                            text-sm
                                            text-gray-500
                                        "
                                    >
                                        {card.title}
                                    </p>


                                    <h2
                                        className="
                                            mt-3
                                            text-3xl
                                            font-bold
                                            text-brand-green
                                        "
                                    >
                                        {card.value}
                                    </h2>

                                </div>



                                <div
                                    className="
                                        flex
                                        h-12
                                        w-12
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-brand-green/10
                                    "
                                >

                                    <Icon
                                        size={25}
                                        className="
                                            text-brand-green
                                        "
                                    />

                                </div>


                            </div>


                        </motion.div>


                    );


                })

            }


            </div>



        </motion.div>

    );

}