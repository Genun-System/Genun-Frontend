

const handleLogout = ()=> {
    //const router = useRouter ();
    if ( typeof window !== "undefined") {
        localStorage.removeItem("_poostoken_")
        window.location.href = "/login"
    }
}

export default handleLogout;
