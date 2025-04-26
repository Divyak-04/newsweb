import { useState } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

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
  const { width, height } = useWindowSize();
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white font-sans p-4">
      {showResult && score === quizQuestions.length && <Confetti width={width} height={height} />}
      <motion.div
        className="w-full max-w-3xl p-6 bg-gray-800 backdrop-blur-lg bg-opacity-50 rounded-xl border border-gray-700 shadow-xl"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {!showResult ? (
          <>
            <h2 className="text-3xl font-bold text-white mb-6">
              {quizQuestions[currentQuestion].question}
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {quizQuestions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  className={`w-full p-3 rounded-xl text-lg font-medium transition-all duration-300 ${
                    selectedOption === option
                      ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white scale-105"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </button>
              ))}
            </div>
            <motion.button
              className="w-full mt-6 p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50"
              whileHover={{ scale: selectedOption ? 1.05 : 1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNextQuestion}
              disabled={!selectedOption}
            >
              Next
            </motion.button>
          </>
        ) : (
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text mb-4">
              Your Score: {score} / {quizQuestions.length}
            </h1>
            <motion.button
              className="w-full p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRestart}
            >
              Restart Quiz
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Quiz;
