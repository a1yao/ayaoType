import 'bootstrap/dist/css/bootstrap.min.css';
import { WebNavbar } from "./WebNavbar";
import { TypingTest } from "./TypingTest";

export const Home = () => {

    return <div className="home-container">
        <WebNavbar></WebNavbar>
        <TypingTest></TypingTest>

    </div>
}