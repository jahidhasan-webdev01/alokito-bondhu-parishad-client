import Sidebar from "@/components/dashboard/sidebar";
import Container from "@/components/ui/container";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";


const API_URL = process.env.NEXT_PUBLIC_API_URL;



export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {


    const cookieStore = await cookies();


    const token =
        cookieStore.get(
            "accessToken"
        );



    if (!token) {

        redirect("/login");

    }



    // Verify token with backend

    try {


        const res =
            await fetch(
                `${API_URL}/admin/me`,
                {
                    method:"GET",

                    headers:{
                        Cookie:
                            `${token.name}=${token.value}`
                    },

                    cache:"no-store"
                }
            );



        if(!res.ok){

            redirect("/login");

        }


    } catch(error){

        redirect("/login");

    }




    return (

        <Container>

            <div
                className="
                    flex
                    h-[calc(100vh-96px)]
                    overflow-hidden
                "
            >

                <Sidebar />


                <main
                    className="
                        flex-1
                        overflow-y-auto
                        px-8
                        py-8
                    "
                >

                    {children}

                </main>


            </div>


        </Container>

    );

}