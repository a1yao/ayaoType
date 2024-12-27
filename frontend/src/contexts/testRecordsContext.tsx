import { createContext, useContext, useState } from "react"


interface TestRecord {
    id?: string;
    userId: string;
    date: Date;
    speed: number;

}

interface TestRecordsContextType {
    records: TestRecord[],
    addRecord: (record: TestRecord) => void;
    // updateRecord: (id: string, record: TestRecord) => void;
    // deleteRecord: (id: string) => void;
}

export const TestRecordsContext = createContext<TestRecordsContextType|undefined>(undefined);

export const TestRecordsProvider = ({children} : {children: React.ReactNode;}) => {
    const [records, setRecords] = useState<TestRecord[]>([]);


    // TODO: will port always be 3000? will endpoint always be localhost when deployed?
    const addRecord = async (record: TestRecord) => {
        const response = await fetch("http://localhost:3000/test-records", {method: "POST", body: JSON.stringify(record), headers: {
            "Content-Type": "application/json"
        }})

        try {
            if (response.ok) {
                const newRecord = await response.json();
                setRecords((prev) => [...prev, newRecord]);
            }
        }
        catch (err) {
            // TODO: error handle
        }
        
    };
    return <TestRecordsContext.Provider value={{records, addRecord}}>
        {" "}
        {children}
    </TestRecordsContext.Provider>
}

// TODO: Fully understand how providers work

export const useTestRecords = () => {
    const context = useContext<TestRecordsContextType | undefined> (TestRecordsContext);
    
    if (!context) {
        throw new Error("useTestRecords must be used within a TestRecordsProvider");
    }

    return context;
}