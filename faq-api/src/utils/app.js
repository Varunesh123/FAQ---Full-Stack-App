import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import faqRoutes from "../routes/faq.routes.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api/faqs", faqRoutes);

export default app;
