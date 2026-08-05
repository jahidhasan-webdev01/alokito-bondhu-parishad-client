"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";


type AuthContextType = {

    admin: boolean;

    loading: boolean;

    login: () => void;

    logout: () => void;

};



const AuthContext =
    createContext<AuthContextType | undefined>(
        undefined
    );



export function AuthProvider({
    children,
}: {
    children: ReactNode;
}) {


    const [admin, setAdmin] =
        useState(false);


    const [loading, setLoading] =
        useState(true);




    useEffect(() => {


        const checkAuth = async () => {


            try {


                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/admin/me`,
                    {
                        method: "GET",
                        credentials: "include",
                        cache: "no-store",
                    }
                );

                console.log("STATUS:", res.status);

                const data = await res.json();

                console.log("DATA:", data);



                if (res.ok) {

                    setAdmin(true);

                }
                else {

                    setAdmin(false);

                }


            }
            catch (error) {

                setAdmin(false);

            }
            finally {

                setLoading(false);

            }

        };


        checkAuth();


    }, []);






    const login = () => {

        setAdmin(true);

    };





    const logout = async () => {


        try {

            await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/logout`,
                {
                    method: "POST",
                    credentials: "include",
                }
            );


        }
        finally {


            setAdmin(false);


        }


    };





    return (

        <AuthContext.Provider

            value={{

                admin,

                loading,

                login,

                logout,

            }}

        >

            {children}

        </AuthContext.Provider>

    );

}





export function useAuth() {

    const context =
        useContext(AuthContext);


    if (!context) {

        throw new Error(
            "useAuth must be inside AuthProvider"
        );

    }


    return context;

}