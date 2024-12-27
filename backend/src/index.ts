// pwd: 

import express, { Express } from "express";
import mongoose from "mongoose";
import cors from 'cors';

import testRecordRouter from "./routes/testRecords";

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
const mongoURI: string = "mongodb+srv://ayao:sRbY8tW8QuXD0ajM@ayaotype.rsmcv.mongodb.net/";

mongoose.connect(mongoURI).then(() => console.log("Connected to mongoDB")).catch((err) => (console.error("Failed to connect to MongoDB:", err)));

app.use("/test-records", testRecordRouter);

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
})