// src/components/FAQList.jsx
import React, { useEffect, useState } from 'react';
import Axios from '../api/faqApi';

const FAQList = () => {
  const [faqs, setFaqs] = useState([]);
  const [language, setLanguage] = useState('en');

  // Fetch FAQs on component load or language change
  useEffect(() => {
    const fetchFAQs = async () => {
      const data = await Axios.get(`/api/faqs/${language}`).then(response=>response.data);
      setFaqs(data);
      console.log(data);
    };
    fetchFAQs();

  }, [language]);

  return (
    <div className="container">
      <h2 className="text-center">Frequently Asked Questions</h2>

      <div className='text-red-500'>If you can't see any faq's or they take too long to fetch, please wait for 2 minutes, as this service is hosted on a free Instance or Render, and therefore, it shuts down with 15 minutes of inactivity. The server soft boots in approximately 2 minutes.</div>
      
      <div>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="language-select"
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="bn">Bengali</option>
        </select>
      </div>

      <ul className="faq-list">
        {faqs.map((faq, index) => (
          <li key={index} className="faq-item">
            <h1>{faq.question}</h1>
            <div>{faq.answer}</div>
          </li>
        )) }
      </ul>
    </div>
  );
};

export default FAQList;
