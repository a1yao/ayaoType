import {generate, count} from "random-words";

export const TypingTest = () => {
    let wordList : string[] = generate({exactly: 50}) as string[];


    return <div className="typing-test">
        <input placeholder={wordList.join(" ")}></input>
    </div>
}