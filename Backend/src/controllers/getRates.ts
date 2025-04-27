import express, { Request, Response } from "express";
import Rates from "../db/rates";
import { fetchRatesFromApiNinja } from "./fetchRates";
import { isCurrentWeek } from "../helper/checkWeek";

const router = express.Router();



router.get("/getRates", async (req: Request, res: Response) => {
    try {
        const doc = await Rates.findOne().sort({ createdAt: -1 });

        // if db is empty
        if (!doc) {
            const data = await fetchRatesFromApiNinja();
            const rates = data.data[0];

            const result = await Rates.create({
                week: rates.data.week,
                from30: rates.data.frm_30,
                from15: rates.data.frm_15,
            });

            if (!result) {
                res.status(500).json({ error: "Failed to fetch rates!" });
                return
            }

            res.status(200).json({ rates: result });
            return
        }

        // db is not empty, check if this week's rate is present
        if (!isCurrentWeek(doc)) {
            const data = await fetchRatesFromApiNinja();
            const rates = data.data[0];

            const result = await Rates.create({
                week: rates.data.week,
                from30: rates.data.frm_30,
                from15: rates.data.frm_15,
            });

            if (!result) {
                res.status(500).json({ error: "Failed to fetch rates!" });
                return
            }

            res.status(200).json({ rates: result });
            return
        }

        // everything is fine, return the existing rate
        res.status(200).json({ rates: doc });
    } catch (e) {
        console.log(e);

        res.status(500).json({
            error: "Something went wrong!",
        });
    }
});



export default router;
