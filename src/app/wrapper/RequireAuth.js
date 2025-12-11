"use client"


import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


const RequireAuth = ({ children }) => {
    const router = useRouter();
    const [isTokenValid, setIsTokenValid] = useState(false);

    let token

    if (typeof window !== "undefined") {
        token = localStorage.getItem("_poostoken_");
    }
    useEffect(() => {
        if (!token) {
            router.push("/login")
            //return null;
            //window.history.pushState(null,"","/login")
        }

        else {
            setIsTokenValid(true)
        }
    }, [])

    return (
        <>
            {
                isTokenValid ?  children  :
                    null
            }
        </>
    )
}


export default RequireAuth;
