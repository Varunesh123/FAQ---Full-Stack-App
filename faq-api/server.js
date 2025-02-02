import express from 'express';
import cors from 'cors';
import faqRoutes from './src/routes/faq.routes.js';
import connectDB from './src/config/db.js';

const app = express();

connectDB();

// Enable CORS for all origins
app.use(cors());

app.use(express.json()); // Parse JSON bodies
app.use('/api/faqs', faqRoutes); // API route for FAQs

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
