import mongoose from "mongoose";


const ratesSchema = new mongoose.Schema({
    week: {
        type: String,
        trim: true,
        lowercase: true,
        required: true
    },
    from30: {
        type: String,
        trim: true,
        lowercase: true,
        required: true
    },
    from15: {
        type: String,
        trim: true,
        lowercase: true,
        required: true
    }
},{
    timestamps: true
});

const Rates = mongoose.model("rates", ratesSchema);


export default Rates;
