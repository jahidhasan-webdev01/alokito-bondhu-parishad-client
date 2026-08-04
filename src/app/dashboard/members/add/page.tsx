"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { DateInput } from "@/components/ui/date";


const API_URL = process.env.NEXT_PUBLIC_API_URL;



export default function AddMemberPage() {


    const router = useRouter();


    const [loading, setLoading] = useState(false);


    const [imagePreview, setImagePreview] =
        useState<string | null>(null);



    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {

        e.preventDefault();


        function formatDate(date: string) {

            const [year, month, day] =
                date.split("-");


            return `${day}-${month}-${year}`;

        }

        const formData =
            new FormData(
                e.currentTarget
            );


        // Convert date fields to ISO DateTime
        const dob =
            formData.get("dob") as string;


        const membershipDate =
            formData.get("membershipDate") as string;



        if (dob) {

            formData.set(
                "dob",
                formatDate(dob)
            );

        }



        if (membershipDate) {

            formData.set(
                "membershipDate",
                formatDate(membershipDate)
            );

        }




        try {


            setLoading(true);



            const res =
                await fetch(
                    `${API_URL}/users`,
                    {
                        method: "POST",

                        credentials: "include",

                        body: formData,
                    }
                );



            const data =
                await res.json();




            if (!res.ok) {

                throw new Error(
                    data.message ||
                    "Failed to create member"
                );

            }



            toast.success(
                "Member created successfully"
            );



            router.push(
                "/dashboard/members"
            );



        } catch (error: any) {


            toast.error(
                error.message
            );


        } finally {


            setLoading(false);


        }

    };





    return (

        <motion.div

            initial={{
                opacity: 0,
                y: 20
            }}

            animate={{
                opacity: 1,
                y: 0
            }}

            transition={{
                duration: .4
            }}

            className="
                mx-auto
                max-w-6xl
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
                    Add New Member
                </h1>


                <p className="
                    mt-2
                    text-gray-500
                ">
                    Create a new member profile.
                </p>


            </div>






            <form
                onSubmit={handleSubmit}
                className="space-y-10"
            >




                <Section title="Personal Information">



                    {/* IMAGE */}

                    <motion.div

                        initial={{
                            scale: .9,
                            opacity: 0
                        }}

                        animate={{
                            scale: 1,
                            opacity: 1
                        }}

                        className="
                            flex
                            flex-col
                            items-center
                            md:col-span-2
                        "

                    >

                        <label className="
                            mb-4
                            text-sm
                            font-medium
                            text-brand-green
                        ">

                            Profile Image

                            <span className="text-red-500">
                                *
                            </span>

                        </label>




                        <label
                            htmlFor="image"
                            className="
                                cursor-pointer
                            "
                        >

                            {
                                imagePreview ? (

                                    <Image

                                        src={imagePreview}

                                        alt="Profile"

                                        width={160}

                                        height={160}

                                        className="
                                            h-40
                                            w-40
                                            rounded-full
                                            border-4
                                            border-brand-gold/40
                                            object-cover
                                        "

                                    />


                                ) : (


                                    <div

                                        className="
                                            flex
                                            h-40
                                            w-40
                                            items-center
                                            justify-center
                                            rounded-full
                                            border
                                            border-brand-gold/40
                                            text-center
                                            text-sm
                                            text-gray-500
                                            transition
                                            hover:border-brand-green
                                        "

                                    >

                                        Upload
                                        <br />
                                        Photo


                                    </div>


                                )
                            }


                        </label>




                        <input

                            id="image"

                            name="image"

                            type="file"

                            accept="image/*"

                            required

                            className="hidden"


                            onChange={(e) => {


                                const file =
                                    e.target.files?.[0];


                                if (file) {

                                    setImagePreview(
                                        URL.createObjectURL(file)
                                    );

                                }


                            }}

                        />

                    </motion.div>





                    <Input
                        name="fullName"
                        label="Full Name"
                        required
                    />

                    <Input
                        name="fatherName"
                        label="Father Name"
                        required
                    />

                    <Input
                        name="motherName"
                        label="Mother Name"
                        required
                    />

                    <DateInput
                        name="dob"
                        label="Date of Birth"
                        required
                    />


                    <Input
                        name="nid"
                        label="NID Number"
                    />


                    <Input
                        name="mobile"
                        label="Mobile"
                        required
                    />


                    <Input
                        name="email"
                        label="Email"
                        type="email"
                    />



                    <Select
                        name="bloodGroup"
                        label="Blood Group"
                        options={[
                            ["A+", "A_POSITIVE"],
                            ["A-", "A_NEGATIVE"],
                            ["B+", "B_POSITIVE"],
                            ["B-", "B_NEGATIVE"],
                            ["AB+", "AB_POSITIVE"],
                            ["AB-", "AB_NEGATIVE"],
                            ["O+", "O_POSITIVE"],
                            ["O-", "O_NEGATIVE"],
                        ]}
                    />


                </Section>







                <Section title="Address">


                    <Input
                        name="village"
                        label="Village"
                    />


                    <Input
                        name="post"
                        label="Post Office"
                    />


                    <Select
                        name="subdistrict"
                        label="Sub District"
                        options={[
                            [
                                "Godagari",
                                "GODAGARI"
                            ],
                            [
                                "Chapainawabganj Sadar",
                                "CHAPAINAWABGANJ_SADAR"
                            ],
                        ]}
                    />



                    <Select
                        name="district"
                        label="District"
                        options={[
                            [
                                "Rajshahi",
                                "RAJSHAHI"
                            ],
                            [
                                "Chapainawabganj",
                                "CHAPAINAWABGANJ"
                            ],
                        ]}
                    />


                </Section>






                <Section title="Membership">


                    <DateInput
                        name="membershipDate"
                        label="Membership Date"
                        required
                    />


                </Section>






                <div
                    className="
                        flex
                        flex-col-reverse
                        gap-4
                        sm:flex-row
                        sm:justify-end
                    "
                >


                    <motion.button

                        whileTap={{
                            scale: .95
                        }}

                        type="button"

                        onClick={() =>
                            router.back()
                        }

                        className="
                            rounded-lg
                            border
                            border-brand-gold/40
                            px-6
                            py-3
                        "

                    >

                        Cancel

                    </motion.button>





                    <motion.button

                        whileTap={{
                            scale: .95
                        }}

                        disabled={loading}

                        className="
                            rounded-lg
                            bg-brand-green
                            px-8
                            py-3
                            text-white
                            hover:bg-brand-green/90
                            disabled:opacity-50
                        "

                    >

                        {
                            loading
                                ?
                                "Saving..."
                                :
                                "Save Member"
                        }

                    </motion.button>


                </div>



            </form>


        </motion.div>

    );

}






function Section({
    title,
    children
}: {
    title: string;
    children: React.ReactNode;
}) {


    return (

        <motion.section

            initial={{
                opacity: 0,
                y: 15
            }}

            animate={{
                opacity: 1,
                y: 0
            }}

            transition={{
                duration: .3
            }}

            className="
                border-b
                border-brand-gold/30
                pb-8
            "

        >

            <h2
                className="
                    mb-6
                    text-xl
                    font-semibold
                    text-brand-green
                "
            >
                {title}
            </h2>



            <div
                className="
                    grid
                    gap-5
                    md:grid-cols-2
                "
            >

                {children}

            </div>


        </motion.section>

    );

}







function Input({
    label,
    name,
    required,
    ...props
}: any) {


    return (

        <motion.div

            initial={{
                opacity: 0,
            }}

            animate={{
                opacity: 1,
            }}

        >

            <label
                className="
                    mb-2
                    block
                    text-sm
                    font-medium
                    text-brand-green
                "
            >

                {label}

                {
                    required &&
                    <span className="text-red-500">
                        *
                    </span>
                }

            </label>



            <input

                name={name}

                required={required}

                {...props}

                className="
                    w-full
                    rounded-lg
                    border
                    border-brand-gold/30
                    bg-transparent
                    px-4
                    py-3
                    outline-none
                    transition
                    focus:border-brand-green
                "

            />


        </motion.div>

    );

}






function Select({
    label,
    name,
    options
}: {
    label: string;
    name: string;
    options: [string, string][];
}) {


    return (

        <div>

            <label
                className="
                    mb-2
                    block
                    text-sm
                    font-medium
                    text-brand-green
                "
            >
                {label}
            </label>


            <select

                name={name}

                className="
                    w-full
                    rounded-lg
                    border
                    border-brand-gold/30
                    bg-transparent
                    px-4
                    py-3
                    outline-none
                "

            >

                <option value="">
                    Select {label}
                </option>


                {
                    options.map(
                        ([label, value]) => (

                            <option
                                key={value}
                                value={value}
                            >
                                {label}
                            </option>

                        )
                    )
                }


            </select>


        </div>

    );

}