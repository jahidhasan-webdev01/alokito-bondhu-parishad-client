"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "@/context/auth-context";


export default function LoginPage() {

    const router = useRouter();

    const {
        login,
        admin,
        loading: authLoading
    } = useAuth();



    const [step, setStep] = useState<"login" | "otp">(
        "login"
    );

    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] =
        useState(false);



    const [form, setForm] = useState({

        email: "",
        password: "",
        code: "",

    });



    // Prevent logged-in user visiting login
    useEffect(() => {

        if (!authLoading && admin) {

            router.replace("/");

        }

    }, [
        admin,
        authLoading,
        router
    ]);




    const handleLogin = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();



        if (!form.email) {

            toast.error(
                "Email is required"
            );

            return;
        }



        if (!form.password) {

            toast.error(
                "Password is required"
            );

            return;
        }



        if (form.password.length < 8) {

            toast.error(
                "Password must be at least 8 characters"
            );

            return;
        }




        try {

            setLoading(true);



            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/login`,
                {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    credentials: "include",

                    body: JSON.stringify({

                        email: form.email,
                        password: form.password,

                    }),

                }
            );



            const data =
                await res.json();



            if (!res.ok) {

                throw new Error(
                    data.message ||
                    "Login failed"
                );

            }



            toast.success(
                "OTP sent to your email"
            );



            setStep("otp");



        }
        catch (error: any) {

            toast.error(
                error.message
            );

        }
        finally {

            setLoading(false);

        }

    };






    const handleVerifyOTP = async (

        e: React.FormEvent

    ) => {


        e.preventDefault();



        if (!/^\d{6}$/.test(form.code)) {

            toast.error(
                "OTP must be exactly 6 digits"
            );

            return;

        }





        try {

            setLoading(true);



            const res = await fetch(

                `${process.env.NEXT_PUBLIC_API_URL}/admin/verify-otp`,

                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json",

                    },

                    credentials: "include",


                    body: JSON.stringify({

                        email: form.email,

                        password: form.password,

                        code: form.code,

                    }),

                }

            );




            const data =
                await res.json();




            if (!res.ok) {

                throw new Error(
                    data.message ||
                    "OTP verification failed"
                );

            }




            toast.success(
                "Login successful"
            );



            // update navbar instantly
            login();



            router.push("/");



        }
        catch (error: any) {

            toast.error(
                error.message
            );

        }
        finally {

            setLoading(false);

        }

    };







    if (authLoading) {


        return (

            <main className="flex min-h-screen items-center justify-center bg-brand-cream">

                <Loader2
                    size={40}
                    className="animate-spin text-brand-green"
                />

            </main>

        );

    }







    return (

        <main className="flex min-h-screen items-center justify-center bg-brand-cream px-4">


            <motion.div

                initial={{
                    opacity: 0,
                    y: 80
                }}

                animate={{
                    opacity: 1,
                    y: 0
                }}

                transition={{
                    duration: .7
                }}

                className="w-full max-w-md"

            >


                <div className="rounded-2xl border border-brand-green/10 p-8 shadow-xl">


                    {/* Logo */}

                    <div className="mb-6 flex justify-center">

                        <Image

                            src="/logo.jpeg"

                            width={100}

                            height={100}

                            alt="Logo"

                            className="rounded-full"

                            priority

                        />

                    </div>





                    {
                        step === "login" ? (


                            <>


                                <h1 className="text-center text-2xl font-bold text-brand-green">

                                    Admin Login

                                </h1>





                                <form

                                    onSubmit={handleLogin}

                                    className="mt-8 space-y-5"

                                >



                                    <input

                                        type="email"

                                        placeholder="Email"

                                        value={form.email}

                                        onChange={(e) =>


                                            setForm({

                                                ...form,

                                                email: e.target.value

                                            })

                                        }

                                        className="w-full rounded-lg border border-brand-green/20 bg-brand-cream px-4 py-3 outline-none focus:border-brand-green"

                                    />






                                    <div className="relative">


                                        <input

                                            type={
                                                showPassword
                                                    ?
                                                    "text"
                                                    :
                                                    "password"
                                            }


                                            placeholder="Password"


                                            value={form.password}


                                            onChange={(e) =>

                                                setForm({

                                                    ...form,

                                                    password: e.target.value

                                                })

                                            }


                                            className="w-full rounded-lg border border-brand-green/20 bg-brand-cream px-4 py-3 pr-12 outline-none focus:border-brand-green"

                                        />



                                        <button

                                            type="button"

                                            onClick={() =>


                                                setShowPassword(
                                                    !showPassword
                                                )

                                            }


                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-green"

                                        >

                                            {
                                                showPassword
                                                    ?
                                                    <EyeOff size={20} />
                                                    :
                                                    <Eye size={20} />
                                            }

                                        </button>


                                    </div>





                                    <button

                                        disabled={loading}

                                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-green py-3 font-semibold text-brand-cream transition hover:bg-brand-green-light disabled:opacity-60"

                                    >


                                        {
                                            loading
                                                ?

                                                <>

                                                    <Loader2
                                                        size={18}
                                                        className="animate-spin"
                                                    />

                                                    Sending OTP

                                                </>

                                                :

                                                "Login"

                                        }


                                    </button>



                                </form>


                            </>



                        ) : (



                            <motion.form


                                initial={{
                                    opacity: 0,
                                    x: 50
                                }}


                                animate={{
                                    opacity: 1,
                                    x: 0
                                }}



                                onSubmit={handleVerifyOTP}


                                className="space-y-5"


                            >



                                <h1 className="text-center text-2xl font-bold text-brand-green">

                                    Verify OTP

                                </h1>



                                <p className="text-center text-sm text-brand-blue">

                                    Enter OTP sent to your email

                                </p>






                                <input

                                    type="text"

                                    maxLength={6}

                                    placeholder="Enter OTP"

                                    value={form.code}


                                    onChange={(e) => {


                                        const value =
                                            e.target.value.replace(
                                                /\D/g,
                                                ""
                                            );


                                        setForm({

                                            ...form,

                                            code: value

                                        });


                                    }}


                                    className="w-full rounded-lg border border-brand-green/20 bg-brand-cream px-4 py-3 text-center tracking-[8px] outline-none focus:border-brand-green"

                                />





                                <button

                                    disabled={loading}

                                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-green py-3 font-semibold text-brand-cream transition hover:bg-brand-green-light disabled:opacity-60"

                                >

                                    {
                                        loading

                                            ?

                                            <>

                                                <Loader2
                                                    size={18}
                                                    className="animate-spin"
                                                />

                                                Verifying

                                            </>

                                            :

                                            "Verify OTP"

                                    }


                                </button>




                                <button

                                    type="button"

                                    onClick={() => {

                                        setStep("login");

                                        setForm({

                                            ...form,

                                            code: ""

                                        });

                                    }}

                                    className="w-full text-sm text-brand-green hover:underline"

                                >

                                    Change email or password

                                </button>



                            </motion.form>


                        )
                    }


                </div>


            </motion.div>


        </main>

    );
}