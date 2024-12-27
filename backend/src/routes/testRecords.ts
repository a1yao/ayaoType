import express, { Request, Response } from "express";
import TestRecordModel from "../schema/testRecord";

const router = express.Router();

router.get("/getAllByUserId/:userId", async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const records = await TestRecordModel.find({userId: userId});
        if (records.length === 0) {
            res.status(404).send(`No records found`);
            return;
        }
        else {
            res.status(200).send(records);
            return;
        }
    }
    catch (err) {
        res.status(500).send(err);
        return;
    }
});

router.post("/", async (req: Request, res: Response) => {
    try {
        const newRecordBody = req.body;
        const newRecord = new TestRecordModel(newRecordBody);

        const savedRecord = await newRecord.save();

        res.status(200).send(savedRecord);
        return;

    }
    catch (err) {
        res.status(500).send(err);
        return;
    }
})

router.put("/:id", async (req: Request, res: Response) => {
    try {
        const record = await TestRecordModel.findByIdAndUpdate(req.params.id, req.body, { new: true});

        if (!record) {
            res.status(404).send("Record not found");
            return;
        }
        else {
            res.status(200).send(record);
            return;
        }
    }
    catch (err) {
        res.status(500).send(err);
        return;
    }
})

router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const record = await TestRecordModel.findByIdAndDelete(req.params.id);
        if (!record) {
            res.status(404).send("Record not found");
            return;
        }
        else {
            res.status(200).send(record);
            return;
        }
    }
    catch (err) {
        res.status(500).send(err);
        return;
    }
})

export default router