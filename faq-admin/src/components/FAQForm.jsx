// src/components/FAQForm.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from '../api/faqApi';

const FAQForm = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const faqData = { question, answer };
    await Axios.post('/api/faqs', faqData).then(()=>{
      alert('question is successfully added')
    });
    location.reload()
  };

  return (
    <div className="container">
      <h2 className="text-center">Create FAQ</h2>
      <form onSubmit={handleSubmit} className="faq-form">
        <input
          type="text"
          placeholder="Enter Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
        <textarea
          placeholder="Enter Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          required
        />
        <button type="submit" className="btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default FAQForm;
