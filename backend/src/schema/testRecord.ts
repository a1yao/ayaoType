import mongoose from "mongoose";


interface TestRecord {
    userId: string;
    date: Date;
    speed: number;
}

const testRecordSchema = new mongoose.Schema<TestRecord>({
    userId: { type: String, required: true },
    date: { type: Date, required: true},
    speed: { type: Number, required: true }
})

const TestRecordModel = mongoose.model<TestRecord>("TestRecord", testRecordSchema);

export default TestRecordModel;