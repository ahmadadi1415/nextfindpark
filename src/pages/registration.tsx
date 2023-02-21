import { useRouter } from "next/navigation"


export default function Registration(){

    const router = useRouter()
    async function handleLogin() {
        
        const registrationData = new FormData()

        const res = await fetch("/api/register",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // Get data from registration form based on name each form
                // Get here
            })
        });
        const data = await res.json();
        console.log(data)
        router.refresh()

        // Redirect to login page after registration
        router.push("/login")
    }

    // Front End Registration Form

    return (
        <>
        </>
    )
}