import useSpeechRecognition from "../hooks/useSpeechRecognition";

const VoiceInput = () => {
  const { transcript, listening, start, stop } = useSpeechRecognition();

  return (
    <div>
      <button onClick={listening ? stop : start}>
        {listening ? "Stop" : "Start"} Listening
      </button>
      <p>Transcript: {transcript}</p>
    </div>
  );
};

export default VoiceInput;
