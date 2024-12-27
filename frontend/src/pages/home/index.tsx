import { useUser } from "@clerk/clerk-react";

import { Auth } from "./Auth"
import { PlaceholderTest } from "./PlaceholderTest";

export const Home = () => {
    const { user } = useUser();

    return <div className="home-container">
        <Auth/>
        <h1>Welcome {user?.username}! This is AyaoType</h1>
        <PlaceholderTest/>

    </div>
}