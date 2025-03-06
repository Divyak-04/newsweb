import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

// Additional timelines
const timelines = [
  [
    { id: 1, event: "COVID-19 declared a pandemic", order: 1 },
    { id: 2, event: "First vaccine approved", order: 2 },
    { id: 3, event: "Lockdowns begin worldwide", order: 0 },
  ],
  [
    { id: 1, event: "World War II ends", order: 2 },
    { id: 2, event: "United Nations founded", order: 1 },
    { id: 3, event: "Cold War begins", order: 0 },
  ],
  [
    { id: 1, event: "First moon landing", order: 1 },
    { id: 2, event: "Berlin Wall falls", order: 2 },
    { id: 3, event: "Internet becomes publicly available", order: 0 },
  ],
  [
    { id: 1, event: "iPhone introduced", order: 1 },
    { id: 2, event: "Facebook launched", order: 0 },
    { id: 3, event: "Tesla releases first electric car", order: 2 },
  ],
  [
    { id: 1, event: "Paris Climate Agreement signed", order: 1 },
    { id: 2, event: "COVID-19 vaccine rollout begins", order: 2 },
    { id: 3, event: "Russia invades Ukraine", order: 0 },
  ],
];

const NewsTimelineChallenge = () => {
  const { width, height } = useWindowSize();
  const [currentEvents, setCurrentEvents] = useState([]);
  const [message, setMessage] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  // Randomize the timeline for each game
  const randomizeTimeline = () => {
    const randomIndex = Math.floor(Math.random() * timelines.length);
    const shuffledEvents = [...timelines[randomIndex]].sort(() => Math.random() - 0.5);
    setCurrentEvents(shuffledEvents);
  };

  const checkOrder = () => {
    const isCorrect = currentEvents.every((event, index) => event.order === index);
    setMessage(isCorrect ? "Correct! 🎉" : "Incorrect. Try again! ❌");
    setShowResult(true);
  };

  const moveEvent = (id, direction) => {
    const updatedEvents = [...currentEvents];
    const index = updatedEvents.findIndex((event) => event.id === id);
    const newIndex = index + direction;

    if (newIndex >= 0 && newIndex < updatedEvents.length) {
      [updatedEvents[index], updatedEvents[newIndex]] = [
        updatedEvents[newIndex],
        updatedEvents[index],
      ];
      setCurrentEvents(updatedEvents);
    }
  };

  const resetGame = () => {
    randomizeTimeline(); // Randomize the timeline for the next game
    setMessage("");
    setShowResult(false);
  };

  const handleIntroComplete = () => {
    setTimeout(() => {
      setShowIntro(false);
      randomizeTimeline(); // Randomize the timeline when the intro ends
    }, 3000); // Show intro for 3 seconds
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white font-sans">
      {showResult && message === "Correct! 🎉" && <Confetti width={width} height={height} />}

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
              Timeline Challenge
            </motion.h1>
            <motion.p
              className="text-2xl text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
            >
              Arrange the Events!
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
                Arrange the Events in Correct Order
              </h1>
              <ul className="space-y-2">
                {currentEvents.map((event) => (
                  <motion.li
                    key={event.id}
                    className="flex items-center justify-between p-3 bg-gray-700 rounded-xl shadow-sm"
                    whileHover={{ scale: 1.02 }}
                  >
                    <span className="text-lg text-white">{event.event}</span>
                    <div className="flex gap-2">
                      <button
                        className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                        onClick={() => moveEvent(event.id, -1)}
                      >
                        ↑
                      </button>
                      <button
                        className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                        onClick={() => moveEvent(event.id, 1)}
                      >
                        ↓
                      </button>
                    </div>
                  </motion.li>
                ))}
              </ul>
              <motion.button
                className="w-full mt-6 p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={checkOrder}
              >
                Check Order
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-3xl p-6 bg-gray-800 backdrop-blur-lg bg-opacity-50 rounded-xl border border-gray-700 text-center"
            >
              <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text mb-4">
                {message}
              </h1>
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

export default NewsTimelineChallenge;