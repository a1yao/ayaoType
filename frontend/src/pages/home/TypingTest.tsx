import {generate, count} from "random-words";
import { useEffect, useRef, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useTestRecords } from "../../contexts/testRecordsContext";

import "./TypingTest.css"

export const TypingTest = () => {
    let wordList : string[] = generate({exactly: 80}) as string[];
    let maxTime = 30;

    const inputRef = useRef<HTMLInputElement>(document.createElement("input"));
    const charRefs = useRef<HTMLSpanElement[]>([]);

    const { user } = useUser();
    const { addRecord } = useTestRecords();
    const [timeLeft, setTimeLeft] = useState(maxTime);
    const [words, setWords] = useState(wordList);
    const [charIdx, setCharIdx] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const [corr, setCorr] = useState(Array(charRefs.current.length).fill(""));
    const [wpm, setWpm] = useState(0);


    useEffect(() => {
        inputRef.current.focus();
    }, [])

    useEffect(() => {
        if (isTyping) {
            // Start timer
            let interval;
            interval = setInterval(() => {
                setTimeLeft(timeLeft - 1);
                console.log("run");
            }, 1000);

            if (timeLeft === 0) {
                clearInterval(interval);
                const currWPM = calculateWPM();
                setWpm(currWPM);
                setIsTyping(false);
                if (user) {
                    const newRecord = {
                        userId: user?.id ?? "",
                        date: new Date(),
                        speed: currWPM,
                    }
                    console.log(newRecord);
                    addRecord(newRecord);
                }
            }
            return () => clearInterval(interval)
        }

    }, [isTyping, timeLeft])

    const calculateWPM = () => {
        var wordCount = 0;
        var wordCorrect = true;
        for (let i = 0; i < charIdx; i++) {
            if (corr[i] === " incorrect ") {
                wordCorrect = false;
            }
            if (words.join(" ").charAt(i) == " " ) {
                if (wordCorrect) {
                    wordCount++;
                }
                else {
                    wordCorrect = true;
                }
            }
        }
        return wordCount * (60/maxTime);
    }

    const wordSpans = words.join(" ").split("").map((char, idx) => (
        <span key={`${char}_${idx}`} ref={(e) => charRefs.current[idx] = e!} className={`char ${idx === charIdx ? " active": ""} ${corr[idx]}`}>{char}</span>
    ))


    const handleKeyDown = (event: any) => {
        if (event.key.length === 1 && timeLeft > 0) {
            if (!isTyping) {
                setIsTyping(true);
            }
            const currChar = charRefs.current[charIdx].innerText;
            
            if (currChar === event.key) {
                corr[charIdx] = " correct ";
            }
            else {
                corr[charIdx] = " incorrect ";
            }
            setCharIdx(charIdx+1);
        }
        else {
            if (event.key === "Backspace" && charIdx > 0 && timeLeft > 0) {
                corr[charIdx - 1] = "";
                setCharIdx(charIdx - 1);
            }
        }
    }

    const handleRestart = () => {
        const newWordList = generate({exactly: 50}) as string[];

        setTimeLeft(maxTime);
        setWords(newWordList);
        setCharIdx(0);
        setCorr(Array(charRefs.current.length).fill(""));
        setWpm(0);
        inputRef.current.focus();
    }


    return (
    <div className="typing-test">
        <input className="typing-input" type="text" ref={inputRef} onKeyDown={handleKeyDown}/>
        <p className="stats-bar">
            Time Left: <strong className="stat-value">{timeLeft}</strong> 
            WPM: <strong className="stat-value">{!isTyping ? wpm: ""}</strong>
        </p>
        <div className="words-container">
        {wordSpans}
        </div>
        
        <br></br>
        <button className="restart-button" onClick={handleRestart}>
            Restart
        </button>
    </div>)
}