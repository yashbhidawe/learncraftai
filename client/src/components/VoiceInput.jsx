import useSpeechRecognition from "../hooks/useSpeechRecognition";

const VoiceInput = () => {
  const { transcript, isListening, error, startListening, stopListening } =
    useSpeechRecognition();

  return (
    <div>
      <button onClick={isListening ? stopListening : startListening}>
        {isListening ? "Stop" : "Start"} Listening
      </button>
      {error && <p className="text-red-500">{error}</p>}
      <p>Transcript: {transcript}</p>
    </div>
  );
};

export default VoiceInput;
