// server/controllers/quizController.js
import db from "../config/db.js";

// CREATE QUIZ (admin only)
export const createQuiz = async (req, res) => {
  const { title, topic, questions } = req.body;

  if (!title || !questions || !Array.isArray(questions)) {
    return res.status(400).json({ message: "Title and valid questions required" });
  }

  try {
    await db.query(
      "INSERT INTO quizzes (title, topic, questions) VALUES ($1, $2, $3)",
      [title, topic, JSON.stringify(questions)]
    );

    res.status(200).json({ message: "Quiz created" });
  } catch (err) {
    console.error("Error creating quiz:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// GET ALL QUIZZES (admin & user)
export const getAllQuizzes = async (req, res) => {
  try {
    const result = await db.query("SELECT id, title, topic FROM quizzes");
    res.status(200).json({ quizzes: result.rows });
  } catch (err) {
    console.error("Error fetching quizzes:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// GET QUIZ BY ID
export const getQuizById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query("SELECT * FROM quizzes WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.status(200).json({ quiz: result.rows[0] });
  } catch (err) {
    console.error("Error fetching quiz by ID:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
