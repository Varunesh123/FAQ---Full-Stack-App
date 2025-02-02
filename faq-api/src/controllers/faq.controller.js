import FAQ from "../models/faq.model.js";
import redisClient from "../config/redis.js";
import { TranslateClient, TranslateTextCommand } from "@aws-sdk/client-translate";

const translateClient = new TranslateClient({ region: "ap-south-1" });
const Languages = ["hi", "bn","en"];

const createFAQ = async (req, res) => {
  try {
    const { question, answer } = req.body;

    console.log("body",req.body);

    if (!question || !answer) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const translate = async (text, lang) => {
      const params = {
        Text: text,
        SourceLanguageCode: "en",
        TargetLanguageCode: lang,
      };

      const command = new TranslateTextCommand(params);
      const response = await translateClient.send(command);
      return response.TranslatedText;
    }
    
    const question_translated = {};
    const question_promises = Languages.map(async(lang)=>{
      question_translated[lang] = await translate(question, lang);
    })
    await Promise.all(question_promises)

    const answer_translated = {};
    const answer_promises = Languages.map(async(lang)=>{
      answer_translated[lang] = await translate(answer, lang);
    })
    await Promise.all(answer_promises)

    const data = {
      question: {
        ...question_translated,
        'en': question
      }, 
      answer: {
        ...answer_translated,
        'en': answer
      },
    }

    const faq = new FAQ(data);
    await faq.save();

    return res.status(201).json(faq);
  } catch (error) {
    console.error("Error in createFAQ:", error);
    return res.status(500).json({ message: "Unable to create FAQ", error: error.toString() });
  }
};

const getFAQs = async (req, res) => {
  try {

    let lang = (req.params ? req.params.lang : 'en') || 'en';
    
    if (redisClient){
      const cacheKey = `faqs_${lang}`;

      const cachedData = await redisClient.get(cacheKey);
      if (cachedData) {
        return res.status(200).json(JSON.parse(cachedData));
      }
    }

    let faqs = await FAQ.find();

    
    if (lang && Languages.includes(lang)) {
      faqs = faqs.map((faq) => ({
        question: faq.question.get(lang),
        answer: faq.answer.get(lang),
      }));
    }

    if (redisClient){
      await redisClient.setEx(cacheKey, process.env.CACHE_TTL || 300, JSON.stringify(faqs));
    }
    return res.status(200).json(faqs);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { 
  createFAQ, 
  getFAQs 
};
