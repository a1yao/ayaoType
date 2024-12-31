import 'bootstrap/dist/css/bootstrap.min.css';
import { WebNavbar } from "../../components/WebNavbar";
import { TypingTest } from "./TypingTest";
import "../../index.css"

export const Home = () => {

    return <div className="home-container">
        <WebNavbar></WebNavbar>
        <TypingTest></TypingTest>

    </div>
}