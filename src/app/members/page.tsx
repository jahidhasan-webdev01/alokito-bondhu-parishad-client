"use client";

import Image from "next/image";
import {
    Search,
    UserRound,
    Wallet,
    Users,
} from "lucide-react";

import {
    motion
} from "framer-motion";

import {
    useEffect,
    useMemo,
    useState
} from "react";

import Link from "next/link";

import Container from "@/components/ui/container";


const API_URL =
    process.env.NEXT_PUBLIC_API_URL;



enum UserStatus {

    ACTIVE="ACTIVE",
    INACTIVE="INACTIVE",
    REMOVED="REMOVED"

}



type Member = {

    id:string;

    memberId:string;

    fullName:string;

    mobile:string;

    district:string;

    image?:string;

    status:UserStatus;

    totalBalance:number;

};




export default function MembersPage(){


    const [
        members,
        setMembers
    ] = useState<Member[]>([]);



    const [
        loading,
        setLoading
    ] = useState(true);



    const [
        search,
        setSearch
    ] = useState("");





    useEffect(()=>{


        const fetchMembers =
        async()=>{


            try{


                const res =
                    await fetch(
                        `${API_URL}/users`,
                        {
                            credentials:"include",
                            cache:"no-store"
                        }
                    );


                const result =
                    await res.json();



                setMembers(
                    result.data ?? []
                );


            }
            catch(error){

                console.log(error);

            }
            finally{

                setLoading(false);

            }


        };



        fetchMembers();


    },[]);







    const filteredMembers =
    useMemo(()=>{


        const keyword =
            search
            .toLowerCase()
            .trim();



        if(!keyword)
            return members;



        return members.filter(
            member=>

                member.memberId
                .toLowerCase()
                .includes(keyword)

                ||

                member.fullName
                .toLowerCase()
                .includes(keyword)

                ||

                member.mobile
                .includes(keyword)

        );


    },[
        search,
        members
    ]);







    return (

        <Container>


            <motion.div

                initial={{
                    opacity:0,
                    y:20
                }}

                animate={{
                    opacity:1,
                    y:0
                }}

                className="
                    space-y-8
                    py-8
                "

            >



                {/* Header */}

                <div>

                    <h1
                        className="
                            text-3xl
                            font-bold
                            text-brand-green
                        "
                    >
                        All Members
                    </h1>


                    <p
                        className="
                            mt-2
                            text-gray-500
                        "
                    >
                        View and manage all members.
                    </p>

                </div>







                {/* Search */}

                <div
                    className="
                        flex
                        items-center
                        gap-3
                        border-b
                        border-brand-gold/30
                        pb-3
                    "
                >

                    <Search
                        size={20}
                        className="text-brand-green"
                    />


                    <input

                        value={search}

                        onChange={(e)=>
                            setSearch(
                                e.target.value
                            )
                        }

                        placeholder="
                            Search by name, ID or mobile
                        "

                        className="
                            w-full
                            bg-transparent
                            outline-none
                        "

                    />

                </div>







                {/* Cards */}


                {
                    loading ?


                    <div
                        className="
                            grid
                            gap-5
                            sm:grid-cols-2
                            xl:grid-cols-3
                        "
                    >

                        {
                            Array
                            .from({
                                length:6
                            })
                            .map((_,i)=>(

                                <div

                                    key={i}

                                    className="
                                        h-56
                                        animate-pulse
                                        rounded-xl
                                        border
                                        border-brand-gold/20
                                    "

                                />

                            ))
                        }

                    </div>


                    :


                    filteredMembers.length===0 ?


                    <motion.div

                        initial={{
                            opacity:0
                        }}

                        animate={{
                            opacity:1
                        }}

                        className="
                            flex
                            flex-col
                            items-center
                            justify-center
                            py-20
                            text-center
                        "

                    >

                        <Users
                            size={60}
                            className="
                                text-brand-green/40
                            "
                        />


                        <h2
                            className="
                                mt-5
                                text-xl
                                font-semibold
                                text-brand-green
                            "
                        >
                            No members found
                        </h2>


                        <p
                            className="
                                mt-2
                                text-gray-500
                            "
                        >
                            There are currently no members available.
                        </p>


                    </motion.div>


                    :


                    <div

                        className="
                            grid
                            gap-5
                            sm:grid-cols-2
                            lg:grid-cols-3
                        "

                    >


                    {
                        filteredMembers.map(
                            (
                                member,
                                index
                            )=>(


                            <Link

                                key={member.id}

                                href={
                                    `/members/${member.memberId}`
                                }

                            >


                            <motion.div


                                initial={{
                                    opacity:0,
                                    y:30
                                }}


                                animate={{
                                    opacity:1,
                                    y:0
                                }}


                                transition={{
                                    delay:index*.05
                                }}


                                whileHover={{
                                    y:-6
                                }}


                                className="
                                    cursor-pointer
                                    rounded-xl
                                    border
                                    border-brand-gold/30
                                    p-5
                                    transition
                                    hover:border-brand-green/50
                                "

                            >



                                <div
                                    className="
                                        flex
                                        items-center
                                        gap-4
                                    "
                                >


                                {
                                    member.image ?

                                    <Image

                                        src={
                                            member.image
                                        }

                                        alt={
                                            member.fullName
                                        }

                                        width={80}

                                        height={80}

                                        className="
                                            h-20
                                            w-20
                                            rounded-full
                                            object-cover
                                        "

                                    />

                                    :


                                    <div
                                        className="
                                            flex
                                            h-20
                                            w-20
                                            items-center
                                            justify-center
                                            rounded-full
                                            bg-brand-green/10
                                        "
                                    >

                                        <UserRound
                                            className="
                                                text-brand-green
                                            "
                                        />

                                    </div>


                                }



                                    <div>

                                        <h2
                                            className="
                                                font-bold
                                                text-brand-green
                                            "
                                        >

                                            {
                                                member.fullName
                                            }

                                        </h2>


                                        <p
                                            className="
                                                text-sm
                                                text-gray-500
                                            "
                                        >

                                            {
                                                member.memberId
                                            }

                                        </p>


                                        <p
                                            className="
                                                text-sm
                                                text-gray-500
                                            "
                                        >

                                            {
                                                member.mobile
                                            }

                                        </p>


                                    </div>


                                </div>






                                <div
                                    className="
                                        mt-5
                                        flex
                                        items-center
                                        justify-between
                                        border-t
                                        border-brand-gold/20
                                        pt-4
                                    "
                                >


                                    <div>

                                        <p
                                            className="
                                                text-xs
                                                text-gray-500
                                            "
                                        >
                                            Balance
                                        </p>


                                        <div
                                            className="
                                                flex
                                                items-center
                                                gap-2
                                                font-bold
                                                text-brand-green
                                            "
                                        >

                                            <Wallet size={16}/>

                                            ৳
                                            {
                                                member.totalBalance
                                                .toLocaleString()
                                            }

                                        </div>


                                    </div>



                                    <StatusBadge
                                        status={
                                            member.status
                                        }
                                    />


                                </div>


                            </motion.div>


                            </Link>


                        ))

                    }


                    </div>


                }



            </motion.div>


        </Container>

    );

}







function StatusBadge({
    status
}:{
    status:UserStatus
}){


    return (

        <span
            className={`
                rounded-full
                px-3
                py-1
                text-xs
                font-semibold

                ${
                    status==="ACTIVE"
                    ?
                    "bg-green-100 text-green-700"

                    :
                    status==="INACTIVE"
                    ?
                    "bg-yellow-100 text-yellow-700"

                    :
                    "bg-red-100 text-red-700"
                }
            `}
        >

            {status}

        </span>

    );

}