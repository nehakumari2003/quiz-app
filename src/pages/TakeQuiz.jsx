// src/pages/TakeQuiz.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function TakeQuiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:5000/api/quiz/${id}`)
      .then((res) => setQuiz(res.data.quiz))
      .catch((err) => console.error("Error loading quiz:", err));
  }, [id]);

  const handleOptionSelect = (qIndex, optIndex) => {
    setAnswers({ ...answers, [qIndex]: optIndex });
  };

  const handleSubmit = () => {
    alert("Quiz submitted!");
    navigate(`/quiz/${id}/score`);
  };

  if (!quiz) return <div className="p-10 text-center">Loading quiz...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-100 to-pink-100 flex justify-center items-start p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl bg-white/40 backdrop-blur-lg p-8 rounded-3xl shadow-2xl"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          📝 {quiz.title}
        </h1>

        {quiz.questions.map((q, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="mb-6 bg-white/60 p-4 rounded-xl border border-white/30"
          >
            <h2 className="font-semibold mb-2 text-gray-800">
              {i + 1}. {q.question}
            </h2>
            {q.options.map((opt, j) => (
              <div key={j} className="flex items-center gap-2 mb-1">
                <input
                  type="radio"
                  name={`question-${i}`}
                  checked={answers[i] === j}
                  onChange={() => handleOptionSelect(i, j)}
                  className="accent-purple-600"
                />
                <label className="text-gray-700">{opt}</label>
              </div>
            ))}
          </motion.div>
        ))}

        <div className="text-center mt-6">
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-bold shadow-lg transition"
          >
            ✅ Submit Quiz
          </button>
        </div>
      </motion.div>
    </div>
  );
}
