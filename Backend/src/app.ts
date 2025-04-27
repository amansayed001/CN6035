import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import router from "./controllers/getRates";

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api", router);




const port = 3001;

mongoose.connect("mongodb://0.0.0.0:27017/MortgageCalculator")
    .then(() => {
        app.listen(port, () => {
            console.log("server listening on port 3001");
        });
    })
    .catch((e) => {
        console.log(e);
    });

