"use client";

import Image from "next/image";
import {
    UserRound,
    Wallet,
    ReceiptText,
    BadgeDollarSign,
    CalendarDays,
} from "lucide-react";

import {
    motion
} from "framer-motion";

import {
    useEffect,
    useState
} from "react";

import Container from "@/components/ui/container";

import {
    useParams
} from "next/navigation";


const API_URL =
    process.env.NEXT_PUBLIC_API_URL;



export default function MemberDetailsPage() {


    const params =
        useParams();


    const memberId =
        params.memberId as string;



    const [
        member,
        setMember
    ] = useState<any>(null);



    const [
        loading,
        setLoading
    ] = useState(true);




    useEffect(() => {


        const fetchMember =
            async () => {


                try {


                    const res =
                        await fetch(
                            `${API_URL}/users/${memberId}`,
                            {
                                credentials: "include",
                                cache: "no-store"
                            }
                        );


                    const result =
                        await res.json();


                    setMember(
                        result.data
                    );


                }
                catch (error) {

                    console.log(error);

                }
                finally {

                    setLoading(false);

                }


            };


        if (memberId)
            fetchMember();


    }, [
        memberId
    ]);





    if (loading) {

        return (

            <Container>

                <div
                    className="
                        py-10
                        animate-pulse
                    "
                >

                    <div
                        className="
                            h-40
                            rounded-xl
                            border
                        "
                    />

                </div>

            </Container>

        );

    }





    if (!member) {

        return (

            <Container>

                <div
                    className="
                        py-20
                        text-center
                        text-gray-500
                    "
                >

                    Member not found

                </div>

            </Container>

        );

    }





    return (

        <Container>


            <motion.div

                initial={{
                    opacity: 0,
                    y: 20
                }}

                animate={{
                    opacity: 1,
                    y: 0
                }}

                className="
                space-y-8
                py-8
            "

            >



                {/* Profile Header */}

                <motion.section

                    initial={{
                        opacity: 0,
                        scale: .95
                    }}

                    animate={{
                        opacity: 1,
                        scale: 1
                    }}

                    className="
                    rounded-xl
                    border
                    border-brand-gold/30
                    p-6
                "

                >


                    <div
                        className="
                        flex
                        flex-col
                        items-center
                        gap-5
                        sm:flex-row
                    "
                    >


                        {
                            member.image ?

                                <Image

                                    src={member.image}

                                    alt={member.fullName}

                                    width={120}

                                    height={120}

                                    className="
                            h-28
                            w-28
                            rounded-full
                            object-cover
                            border
                            border-brand-gold/40
                        "

                                />

                                :

                                <div
                                    className="
                            flex
                            h-28
                            w-28
                            items-center
                            justify-center
                            rounded-full
                            bg-brand-green/10
                        "
                                >

                                    <UserRound
                                        size={45}
                                        className="
                                text-brand-green
                            "
                                    />

                                </div>

                        }




                        <div
                            className="
                            text-center
                            sm:text-left
                        "
                        >

                            <h1
                                className="
                                text-3xl
                                font-bold
                                text-brand-green
                            "
                            >
                                {member.fullName}
                            </h1>


                            <p className="
                            mt-2
                            text-gray-500
                        ">
                                Member ID:
                                {" "}
                                {member.memberId}
                            </p>


                            <p className="
                            text-gray-500
                        ">
                                {member.mobile}
                            </p>


                        </div>


                    </div>


                </motion.section>







                {/* Summary Cards */}

                <div
                    className="
                    grid
                    gap-5
                    sm:grid-cols-2
                    lg:grid-cols-4
                "
                >

                    <SummaryCard

                        title="Total Paid"

                        value={`৳ ${member.summary.totalPaid.toLocaleString()}`}

                        icon={Wallet}

                    />


                    <SummaryCard

                        title="Total Fine"

                        value={`৳ ${member.summary.totalFine.toLocaleString()}`}

                        icon={BadgeDollarSign}

                    />


                    <SummaryCard

                        title="Collection"

                        value={`৳ ${member.summary.totalCollection.toLocaleString()}`}

                        icon={ReceiptText}

                    />


                    <SummaryCard

                        title="Payments"

                        value={member.summary.totalPayments}

                        icon={CalendarDays}

                    />


                </div>








                {/* Personal Info */}

                <InfoSection title="Personal Information">

                    <Info label="Father Name" value={member.fatherName} />

                    <Info label="Mother Name" value={member.motherName} />

                    <Info label="Blood Group" value={member.bloodGroup} />

                    <Info label="Date of Birth" value={
                        new Date(member.dob)
                            .toLocaleDateString()
                    } />

                </InfoSection>







                {/* Address */}

                <InfoSection title="Address">

                    <Info label="Village" value={member.village} />

                    <Info label="Post" value={member.post} />

                    <Info label="Sub District" value={member.subdistrict} />

                    <Info label="District" value={member.district} />

                </InfoSection>








                {/* Payments */}

                <section>

                    <h2
                        className="
                        mb-5
                        text-xl
                        font-semibold
                        text-brand-green
                    "
                    >
                        Payment History
                    </h2>


                    {
                        member.payments.length === 0 ?

                            <p className="text-gray-500">
                                No payment history found.
                            </p>

                            :

                            <div
                                className="
                            overflow-x-auto
                        "
                            >

                                <table
                                    className="
                            w-full
                            text-left
                        "
                                >

                                    <thead>

                                        <tr
                                            className="
                            border-b
                            border-brand-gold/30
                            text-sm
                            text-brand-green
                        "
                                        >

                                            <th className="p-4">
                                                Month
                                            </th>

                                            <th className="p-4">
                                                Amount
                                            </th>

                                            <th className="p-4">
                                                Fine
                                            </th>

                                            <th className="p-4">
                                                Total
                                            </th>

                                            <th className="p-4">
                                                Type
                                            </th>

                                        </tr>

                                    </thead>



                                    <tbody>

                                        {
                                            member.payments.map(
                                                (payment: any, index: number) => (

                                                    <motion.tr

                                                        key={payment.id}

                                                        initial={{
                                                            opacity: 0
                                                        }}

                                                        animate={{
                                                            opacity: 1
                                                        }}

                                                        transition={{
                                                            delay: index * .05
                                                        }}

                                                        className="
                                    border-b
                                    border-brand-gold/20
                                "

                                                    >

                                                        <td className="p-4">
                                                            {new Date(
                                                                payment.year,
                                                                payment.month - 1
                                                            ).toLocaleString(
                                                                "en-US",
                                                                {
                                                                    month: "long",
                                                                    year: "numeric"
                                                                }
                                                            )}
                                                        </td>

                                                        <td className="p-4">
                                                            ৳ {payment.amount}
                                                        </td>

                                                        <td className="p-4">
                                                            ৳ {payment.fine}
                                                        </td>

                                                        <td className="p-4 font-semibold">
                                                            ৳ {payment.total}
                                                        </td>

                                                        <td className="p-4">
                                                            {payment.paymentType}
                                                        </td>


                                                    </motion.tr>

                                                ))

                                        }

                                    </tbody>


                                </table>

                            </div>

                    }


                </section>




            </motion.div>


        </Container>

    );

}






function SummaryCard({
    title,
    value,
    icon: Icon
}: any) {


    return (

        <motion.div

            whileHover={{
                y: -5
            }}

            className="
                rounded-xl
                border
                border-brand-gold/30
                p-5
            "

        >

            <Icon
                className="text-brand-green"
            />

            <p className="
                mt-3
                text-sm
                text-gray-500
            ">
                {title}
            </p>


            <h3 className="
                mt-2
                text-2xl
                font-bold
                text-brand-green
            ">
                {value}
            </h3>


        </motion.div>

    );

}





function InfoSection({
    title,
    children
}: any) {

    return (

        <section>

            <h2 className="
                mb-4
                text-xl
                font-semibold
                text-brand-green
            ">
                {title}
            </h2>


            <div
                className="
                    grid
                    gap-4
                    sm:grid-cols-2
                "
            >

                {children}

            </div>


        </section>

    );

}





function Info({
    label,
    value
}: any) {

    return (

        <div
            className="
                border-b
                border-brand-gold/20
                pb-3
            "
        >

            <p className="
                text-sm
                text-gray-500
            ">
                {label}
            </p>

            <p className="
                mt-1
                font-medium
            ">
                {value || "-"}
            </p>

        </div>

    );

}