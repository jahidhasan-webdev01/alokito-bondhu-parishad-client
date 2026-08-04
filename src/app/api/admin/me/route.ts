import { NextRequest, NextResponse } from "next/server";


export async function GET(
    req: NextRequest
) {

    try {

        const cookie =
            req.headers.get("cookie");


        const response =
            await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/me`,
                {
                    method: "GET",

                    headers: {
                        Cookie: cookie || "",
                    },

                    cache: "no-store",
                }
            );


        const data =
            await response.json();



        return NextResponse.json(
            data,
            {
                status: response.status,
            }
        );


    } catch (error) {


        return NextResponse.json(
            {
                success: false,
                message: "Authentication failed"
            },
            {
                status: 401
            }
        );


    }

}