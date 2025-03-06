import { useState } from "react";
import "./quiz.css"; // Import the CSS file

// Sample quiz questions (You can update them dynamically)
const quizQuestions = [
  {
    question: "Who won the 2024 Cricket World Cup?",
    options: ["India", "Australia", "England", "Pakistan"],
    answer: "India",
  },
  {
    question: "Which country recently launched the Chandrayaan-3 mission?",
    options: ["USA", "China", "India", "Russia"],
    answer: "India",
  },
  {
    question: "What is the capital of Tamil Nadu?",
    options: ["Coimbatore", "Madurai", "Chennai", "Trichy"],
    answer: "Chennai",
  },
  {
    question: "Who is the current Prime Minister of India (2024)?",
    options: ["Narendra Modi", "Rahul Gandhi", "Amit Shah", "Arvind Kejriwal"],
    answer: "Narendra Modi",
  },
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (selectedOption === quizQuestions[currentQuestion].answer) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setShowResult(false);
  };

  return (
    <div className="quiz-container">
      {!showResult ? (
        <div className="quiz-box">
          <h2>{quizQuestions[currentQuestion].question}</h2>
          <div className="options">
            {quizQuestions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={`option-btn ${selectedOption === option ? "selected" : ""}`}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
          <button className="next-btn" onClick={handleNextQuestion} disabled={!selectedOption}>
            Next
          </button>
        </div>
      ) : (
        <div className="quiz-result">
          <h2>Your Score: {score} / {quizQuestions.length}</h2>
          <button className="restart-btn" onClick={handleRestart}>Restart Quiz</button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
