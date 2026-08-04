"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import {
    useEffect,
    useMemo,
    useState,
} from "react";


const API_URL = process.env.NEXT_PUBLIC_API_URL;


enum UserStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    REMOVED = "REMOVED",
}


type Member = {
    id: string;
    memberId: string;
    fullName: string;
    mobile: string;
    district: string;
    status: UserStatus;
    totalBalance: number;
};



export default function MembersPage() {


    const [search, setSearch] = useState("");

    const [members, setMembers] = useState<Member[]>([]);

    const [loading, setLoading] = useState(true);




    useEffect(() => {


        const loadMembers = async () => {

            try {

                const res = await fetch(
                    `${API_URL}/users`,
                    {
                        credentials: "include",
                    }
                );


                const data = await res.json();


                setMembers(
                    data.data ?? data
                );


            } catch (error) {

                console.error(
                    "Failed to load members:",
                    error
                );

            } finally {

                setLoading(false);

            }

        };


        loadMembers();


    }, []);





    const filteredMembers = useMemo(() => {


        const keyword =
            search
                .toLowerCase()
                .trim();


        if (!keyword)
            return members;



        return members.filter(
            (member) =>

                member.memberId
                    .toLowerCase()
                    .includes(keyword)

                ||

                member.fullName
                    .toLowerCase()
                    .includes(keyword)

                ||

                member.mobile
                    .toLowerCase()
                    .includes(keyword)

                ||

                member.district
                    .toLowerCase()
                    .includes(keyword)

                ||

                member.status
                    .toLowerCase()
                    .includes(keyword)

        );


    }, [
        members,
        search,
    ]);





    const totalMembers =
        members.length;


    const activeMembers =
        members.filter(
            (m) =>
                m.status === UserStatus.ACTIVE
        )
        .length;



    const inactiveMembers =
        members.filter(
            (m) =>
                m.status === UserStatus.INACTIVE
        )
        .length;





    return (

        <motion.div

            initial={{
                opacity:0,
                y:20,
            }}

            animate={{
                opacity:1,
                y:0,
            }}

            className="
                space-y-8
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
                    Members
                </h1>


                <p
                    className="
                        mt-2
                        text-gray-500
                    "
                >
                    Manage all members of Alokito Bondhu Parishad.
                </p>


            </div>





            {/* Stats */}

            <div
                className="
                    grid
                    gap-5
                    sm:grid-cols-2
                    lg:grid-cols-3
                "
            >

                <Stat
                    title="Total Members"
                    value={String(totalMembers)}
                />

                <Stat
                    title="Active Members"
                    value={String(activeMembers)}
                />

                <Stat
                    title="Inactive Members"
                    value={String(inactiveMembers)}
                />

            </div>






            {/* Search */}

            <div
                className="
                    flex
                    items-center
                    gap-3
                    border-b
                    border-brand-gold/30
                    pb-5
                "
            >

                <Search
                    size={18}
                    className="text-brand-green"
                />


                <input

                    value={search}

                    onChange={(e)=>
                        setSearch(e.target.value)
                    }

                    placeholder="Search member..."

                    className="
                        w-full
                        bg-transparent
                        text-sm
                        outline-none
                    "

                />


            </div>






            {/* Cards */}


            {
                loading ? (

                    <div
                        className="
                            py-10
                            text-center
                            text-gray-500
                        "
                    >
                        Loading members...
                    </div>


                ) : filteredMembers.length === 0 ? (


                    <div
                        className="
                            py-10
                            text-center
                            text-gray-500
                        "
                    >
                        No members found.
                    </div>


                ) : (


                    <div
                        className="
                            grid
                            gap-5
                            sm:grid-cols-2
                            xl:grid-cols-3
                        "
                    >


                        {
                            filteredMembers.map(
                                (
                                    member,
                                    index
                                ) => (

                                    <motion.div

                                        key={member.id}

                                        initial={{
                                            opacity:0,
                                            y:20,
                                        }}

                                        animate={{
                                            opacity:1,
                                            y:0,
                                        }}

                                        transition={{
                                            delay:
                                                index * 0.05,
                                        }}

                                        whileHover={{
                                            y:-5,
                                        }}

                                        className="
                                            rounded-xl
                                            border
                                            border-brand-gold/30
                                            bg-brand-cream
                                            p-5
                                            shadow-sm
                                            transition
                                        "

                                    >


                                        <div
                                            className="
                                                flex
                                                items-start
                                                justify-between
                                            "
                                        >

                                            <div>

                                                <p
                                                    className="
                                                        text-xs
                                                        text-gray-500
                                                    "
                                                >
                                                    Member ID
                                                </p>


                                                <h3
                                                    className="
                                                        font-bold
                                                        text-brand-green
                                                    "
                                                >
                                                    {member.memberId}
                                                </h3>

                                            </div>


                                            <StatusBadge
                                                status={
                                                    member.status
                                                }
                                            />

                                        </div>





                                        <div
                                            className="
                                                mt-5
                                                space-y-3
                                                text-sm
                                            "
                                        >

                                            <Info
                                                label="Name"
                                                value={
                                                    member.fullName
                                                }
                                            />


                                            <Info
                                                label="Mobile"
                                                value={
                                                    member.mobile
                                                }
                                            />


                                            <Info
                                                label="District"
                                                value={
                                                    member.district
                                                }
                                            />


                                            <Info
                                                label="Balance"
                                                value={
                                                    `৳ ${member.totalBalance.toLocaleString()}`
                                                }
                                            />


                                        </div>



                                    </motion.div>


                                )
                            )
                        }


                    </div>


                )
            }



        </motion.div>

    );
}






function Info({
    label,
    value,
}:{
    label:string;
    value:string;
}) {


    return (

        <div
            className="
                flex
                justify-between
                border-b
                border-brand-gold/10
                pb-2
            "
        >

            <span className="text-gray-500">
                {label}
            </span>


            <span
                className="
                    max-w-[60%]
                    text-right
                    font-medium
                "
            >
                {value}
            </span>


        </div>

    );

}






function Stat({
    title,
    value,
}:{
    title:string;
    value:string;
}) {


    return (

        <motion.div

            whileHover={{
                y:-4,
            }}

            className="
                border-b
                border-brand-gold/40
                p-5
            "
        >

            <p
                className="
                    text-sm
                    text-gray-500
                "
            >
                {title}
            </p>


            <h3
                className="
                    mt-2
                    text-3xl
                    font-bold
                    text-brand-green
                "
            >
                {value}
            </h3>


        </motion.div>

    );

}







function StatusBadge({
    status,
}:{
    status:UserStatus;
}) {


    return (

        <motion.span

            initial={{
                scale:0.8,
            }}

            animate={{
                scale:1,
            }}

            className={`
                rounded-full
                px-3
                py-1
                text-xs
                font-semibold

                ${
                    status === UserStatus.ACTIVE

                    ? "bg-green-100 text-green-700"

                    : status === UserStatus.INACTIVE

                    ? "bg-yellow-100 text-yellow-700"

                    : "bg-red-100 text-red-700"
                }
            `}

        >

            {status}

        </motion.span>

    );

}