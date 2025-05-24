import { useEffect, useRef, useState } from "react";

const useSpeechRecognition = () => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => console.log("Mic access works"))
      .catch((err) => console.error("Mic blocked", err));
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error("Browser does not support Speech Recognition");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const lastResult = event.results[event.results.length - 1][0].transcript;
      setTranscript((prev) => prev + " " + lastResult);
    };

    recognition.onend = () => {
      if (listening) recognition.start(); // auto-restart
    };

    recognitionRef.current = recognition;
  }, [listening]);

  const start = () => {
    setTranscript("");
    setListening(true);
    recognitionRef.current?.start();
  };

  const stop = () => {
    setListening(false);
    recognitionRef.current?.stop();
  };

  return { transcript, listening, start, stop };
};

export default useSpeechRecognition;
