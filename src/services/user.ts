const API_URL = process.env.NEXT_PUBLIC_API_URL;


export const createUser = async (payload: any) => {

    const token = localStorage.getItem("token");


    const response = await fetch(
        `${API_URL}/users`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",

                Authorization: `Bearer ${token}`,
            },

            body: JSON.stringify(payload),
        }
    );


    const data = await response.json();


    if (!response.ok) {
        throw new Error(
            data.message || "Failed to create user"
        );
    }


    return data;

};