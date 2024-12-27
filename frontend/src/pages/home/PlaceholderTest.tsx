import { useUser } from "@clerk/clerk-react";
import { useState } from "react"
import { useTestRecords } from "../../contexts/testRecordsContext";

export const PlaceholderTest = () => {
    const [speed, setSpeed] = useState<string>("")

    const { user } = useUser();
    const { addRecord } = useTestRecords();
    const handleSubmit = (event: React.FormEvent<HTMLFormElement> ) => {
        event.preventDefault();



        // TODO: Check case wehre user id is empty
        const newRecord = {
            userId: user?.id ?? "",
            date: new Date(),
            speed: parseFloat(speed),
        }

        setSpeed("");

        addRecord(newRecord);

    }

    return <div>
        <form onSubmit={handleSubmit}>
            <label>Typing Speed</label>
            <input type="number" required value={speed} onChange={(e) => {setSpeed(e.target.value)}}/>
            <button type="submit">Submit</button>
        </form>
    </div>
}