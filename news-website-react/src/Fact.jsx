import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

// Additional questions
const allQuestions = [
  {
    statement: "The Great Wall of China is visible from space.",
    answer: false,
  },
  {
    statement: "Bananas are berries, but strawberries are not.",
    answer: true,
  },
  {
    statement: "The Eiffel Tower grows taller in the summer.",
    answer: true,
  },
  {
    statement: "Sharks are mammals.",
    answer: false,
  },
  {
    statement: "The human body has four lungs.",
    answer: false,
  },
  {
    statement: "Venus is the hottest planet in the solar system.",
    answer: true,
  },
  {
    statement: "The capital of Australia is Sydney.",
    answer: false,
  },
  {
    statement: "Lightning never strikes the same place twice.",
    answer: false,
  },
  {
    statement: "The heart of a blue whale is the size of a small car.",
    answer: true,
  },
  {
    statement: "Goldfish have a memory span of only a few seconds.",
    answer: false,
  },
  {
    statement: "The Amazon rainforest produces 20% of the world's oxygen.",
    answer: false,
  },
  {
    statement: "The Great Pyramid of Giza has eight sides.",
    answer: true,
  },
  {
    statement: "The currency of Japan is the yen.",
    answer: true,
  },
  {
    statement: "Mount Everest is the tallest mountain in the solar system.",
    answer: false,
  },
  {
    statement: "The human brain weighs about 1.5 kilograms.",
    answer: true,
  },
];

const FactOrFiction = () => {
  const { width, height } = useWindowSize();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showIntro, setShowIntro] = useState(true);
  const [questions, setQuestions] = useState([]);

  // Randomize questions for each game
  const randomizeQuestions = () => {
    const shuffledQuestions = [...allQuestions]
      .sort(() => Math.random() - 0.5)
      .slice(0, 5); // Select 5 random questions
    setQuestions(shuffledQuestions);
  };

  const handleAnswer = (userAnswer) => {
    setSelectedAnswer(userAnswer);
    setTimeout(() => {
      if (userAnswer === questions[currentQuestion].answer) {
        setScore(score + 1);
      }
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const resetGame = () => {
    randomizeQuestions(); // Randomize questions for the next game
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
  };

  const handleIntroComplete = () => {
    setTimeout(() => {
      setShowIntro(false);
      randomizeQuestions(); // Randomize questions when the intro ends
    }, 3000); // Show intro for 3 seconds
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white font-sans">
      {showResult && score === questions.length && <Confetti width={width} height={height} />}

      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="flex flex-col items-center justify-center h-screen"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 1 }}
            onAnimationComplete={handleIntroComplete}
          >
            <motion.h1
              className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              Fact or Fiction?
            </motion.h1>
            <motion.p
              className="text-2xl text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
            >
              Test Your Knowledge!
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {!showIntro && (
        <>
          {!showResult ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="w-full max-w-3xl p-6 bg-gray-800 backdrop-blur-lg bg-opacity-50 rounded-xl border border-gray-700"
            >
              <h1 className="text-3xl font-bold text-white mb-6">
                {questions[currentQuestion]?.statement}
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.button
                  className={`p-4 text-lg font-semibold rounded-xl transition-all ${
                    selectedAnswer === true
                      ? questions[currentQuestion]?.answer === true
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                      : "bg-gray-700 text-white hover:bg-gray-600"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(true)}
                >
                  Fact
                </motion.button>
                <motion.button
                  className={`p-4 text-lg font-semibold rounded-xl transition-all ${
                    selectedAnswer === false
                      ? questions[currentQuestion]?.answer === false
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                      : "bg-gray-700 text-white hover:bg-gray-600"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(false)}
                >
                  Fiction
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-3xl p-6 bg-gray-800 backdrop-blur-lg bg-opacity-50 rounded-xl border border-gray-700 text-center"
            >
              <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text mb-4">
                Game Over!
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Your score: <span className="font-bold text-green-400">{score}</span>/{questions.length}
              </p>
              <motion.button
                className="w-full p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetGame}
              >
                Play Again
              </motion.button>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
};

export default FactOrFiction;