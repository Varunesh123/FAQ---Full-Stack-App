import mongoose from "mongoose";

const faqSchema = new mongoose.Schema({
    question: {
        type: Map,
        of: String,
    },
    answer: { 
        type: Map,
        of: String,
    }
}, {timestamps: true});

export default mongoose.model("FAQ", faqSchema);