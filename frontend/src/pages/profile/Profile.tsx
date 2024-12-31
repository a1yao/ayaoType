import { WebNavbar } from "../../components/WebNavbar"
import { useEffect, useState } from "react"
import { useUser } from "@clerk/clerk-react";

export const Profile = () => {

    const [topSpeed, setTopSpeed] = useState(0);
    const { user } = useUser();

    const fetchData = async () => {
        console.log("fetching");
        const response = await fetch(`http://localhost:3000/test-records/getAllByUserId/${user?.id}`, {method: "GET"})
        try {
            if (response.ok) {
                const records = await response.json();
                console.log(records);
                
            }
        }
        catch (err) {
            // TODO: error handle
            console.log(err);
        }
    }

    useEffect(() => {
        console.log(user?.firstName ?? "no");
        if (user) {
            fetchData();
            console.log('ehr')
        }
        console.log("hee")
    }, [user])
    return (
        <WebNavbar></WebNavbar>
    )
}