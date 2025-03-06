import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSpeechRecognition } from "react-speech-recognition";

const VoiceSearch = () => {
  const { transcript, resetTranscript, listening, startListening, stopListening } =
    useSpeechRecognition();

  const navigate = useNavigate();

  useEffect(() => {
    if (transcript) {
      navigate(`/search/${transcript}`);
      resetTranscript();
    }
  }, [transcript]);

  return (
    <button
      onClick={() => (listening ? stopListening() : startListening())}
      className="bg-red-600 text-white p-2 ml-2"
    >
      🎤 {listening ? "Listening..." : "Voice Search"}
    </button>
  );
};

export default VoiceSearch;
