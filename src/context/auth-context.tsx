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

    login: () => Promise<void>;

    logout: () => Promise<void>;

    refreshAuth: () => Promise<void>;

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




    const refreshAuth = async () => {


        try {


            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/me`,
                {
                    method: "GET",
                    credentials: "include",
                    cache: "no-store",
                }
            );


            console.log(
                "AUTH STATUS:",
                res.status
            );

            console.log("res.ok", res.ok);

            if (res.ok) {

                setAdmin(true);

            }
            else {

                setAdmin(false);

            }


        }
        catch(error) {


            console.log(
                "AUTH ERROR:",
                error
            );


            setAdmin(false);


        }
        finally {

            setLoading(false);

        }

    };






    useEffect(() => {

        refreshAuth();

    }, []);








    const login = async () => {


        await refreshAuth();


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
        catch(error) {


            console.log(
                "Logout error:",
                error
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

                refreshAuth,

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