"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
    return (
        <Toaster
            position="top-center"
            toastOptions={{
                duration: 3000,
                style: {
                    background: "#fffcf5",
                    color: "#064e3b",
                    border: "1px solid #064e3b20",
                },
            }}
        />
    );
}