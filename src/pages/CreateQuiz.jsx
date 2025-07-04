// src/pages/CreateQuiz.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import api from "../api"; // 🔌 Axios instance

export default function CreateQuiz() {
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], correctIndex: 0 },
  ]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", "", "", ""], correctIndex: 0 },
    ]);
  };

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    if (field === "question") updated[index].question = value;
    if (field.startsWith("option")) {
      const optionIndex = parseInt(field.split("-")[1]);
      updated[index].options[optionIndex] = value;
    }
    if (field === "correctIndex") updated[index].correctIndex = parseInt(value);
    setQuestions(updated);
  };

  const handleSaveQuiz = async () => {
    try {
      const formattedQuestions = questions.map((q) => ({
        question: q.question,
        options: q.options,
        answer: q.options[q.correctIndex],
      }));

      const payload = {
        title,
        topic,
        questions: formattedQuestions,
      };

      const response = await api.post("/quiz/create", payload);
      console.log(response.data);
      alert("✅ Quiz Created Successfully");
    } catch (err) {
      console.error("Error creating quiz:", err);
      alert("❌ Failed to create quiz. " + (err.response?.data?.message || ""));
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-200 flex justify-center items-start p-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl bg-white/30 backdrop-blur-lg shadow-2xl rounded-3xl p-10 border border-white/20"
      >
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          ✍️ Create a New Quiz
        </h1>

        <div className="flex flex-col gap-4 mb-8">
          <input
            type="text"
            placeholder="Quiz Title"
            className="p-3 rounded-xl bg-white/50 placeholder-gray-700 text-gray-900"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Tag / Topic"
            className="p-3 rounded-xl bg-white/50 placeholder-gray-700 text-gray-900"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>

        {questions.map((q, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="mb-8 p-6 rounded-xl bg-white/40 border border-white/30 shadow-inner"
          >
            <label className="block text-lg font-semibold mb-2 text-gray-700">
              Question {index + 1}
            </label>
            <input
              type="text"
              placeholder="Enter question"
              className="p-3 w-full rounded-lg bg-white/60 mb-4 placeholder-gray-700"
              value={q.question}
              onChange={(e) =>
                handleQuestionChange(index, "question", e.target.value)
              }
            />

            {q.options.map((opt, i) => (
              <div key={i} className="mb-3">
                <label className="text-gray-600 font-medium">
                  Option {i + 1}
                </label>
                <input
                  type="text"
                  className="p-2 w-full rounded-md bg-white/60 mt-1"
                  value={opt}
                  onChange={(e) =>
                    handleQuestionChange(index, `option-${i}`, e.target.value)
                  }
                />
              </div>
            ))}

            <label className="text-gray-700 font-medium mt-4 block">
              Correct Answer
            </label>
            <select
              className="p-2 rounded-md bg-white/60 w-full mt-1"
              value={q.correctIndex}
              onChange={(e) =>
                handleQuestionChange(index, "correctIndex", e.target.value)
              }
            >
              {q.options.map((_, i) => (
                <option key={i} value={i}>
                  Option {i + 1}
                </option>
              ))}
            </select>
          </motion.div>
        ))}

        <div className="flex flex-wrap gap-4 justify-center mt-10">
          <button
            className="px-6 py-3 rounded-full bg-green-500 hover:bg-green-600 text-white font-bold shadow-lg transition"
            onClick={addQuestion}
          >
            ➕ Add Question
          </button>

          <button className="px-6 py-3 rounded-full bg-purple-500 hover:bg-purple-600 text-white font-bold shadow-lg transition">
            ✨ AI Assist
          </button>
          <button
            className="px-6 py-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-bold shadow-lg transition"
            onClick={handleSaveQuiz}
          >
            ✅ Save Quiz
          </button>
        </div>
      </motion.div>
    </div>
  );
}
