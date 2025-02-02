import express from "express";
import { createFAQ, getFAQs } from "../controllers/faq.controller.js";

const router = express.Router();
console.log("Route started");

router.post("/", createFAQ);
router.get("", getFAQs);
router.get("/:lang", getFAQs);
console.log('Routes ended');

export default router;
