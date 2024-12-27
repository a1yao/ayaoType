import { useUser } from "@clerk/clerk-react";

import { Auth } from "./Auth"
import { PlaceholderTest } from "./PlaceholderTest";
import { TypingTest } from "./TypingTest";

export const Home = () => {
    const { user } = useUser();

    return <div className="home-container">
        <Auth/>
        <h1>Welcome {user?.username}! This is AyaoType</h1>
        <PlaceholderTest/>
        <TypingTest></TypingTest>

    </div>
}