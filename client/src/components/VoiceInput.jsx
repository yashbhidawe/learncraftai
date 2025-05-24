import { useState, useEffect } from "react";
import useSpeechRecognition from "../hooks/useSpeechRecognition";
import axios from "axios";
import { BASE_URL } from "../utils/constant";

const VoiceInput = () => {
  const { transcript, listening, start, stop } = useSpeechRecognition();
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!listening && transcript.trim()) {
      setInput(transcript);
    }
  }, [listening, transcript]);

  const fetchResponse = async (prompt) => {
    try {
      setIsLoading(true);
      const res = await axios.post(`${BASE_URL}/fetchResponse`, { prompt });
      setResponse(res.data.response || "No response received");
    } catch (err) {
      console.error("Fetch error:", err.message);
      setResponse("Error fetching response");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    if (input.trim()) fetchResponse(input);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl backdrop-blur-sm border border-gray-700/50">
        <div className="p-6 border-b border-gray-700/50">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              LearnCraftAI
            </h2>
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex justify-center">
            <button
              onClick={listening ? stop : start}
              className={`group relative px-12 py-6 rounded-2xl font-semibold text-lg transition-all duration-500 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-gray-900 ${
                listening
                  ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 focus:ring-red-500 shadow-lg shadow-red-500/25"
                  : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:ring-green-500 shadow-lg shadow-green-500/25"
              }`}
              aria-pressed={listening}
              aria-label={listening ? "Stop listening" : "Start listening"}
            >
              <div className="flex items-center space-x-3">
                <span className="text-white">
                  {listening ? " Stop Listening" : " Start Listening"}
                </span>
              </div>

              {listening && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-400/20 to-red-600/20 animate-pulse"></div>
              )}
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex space-x-4">
              <div className="flex-grow relative">
                <textarea
                  placeholder="Type your message here... (Press Enter to send)"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={listening}
                  rows="3"
                  className="w-full px-6 py-4 rounded-xl bg-gray-800/80 text-gray-100 placeholder-gray-400 border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 backdrop-blur-sm transition-all duration-300 resize-none"
                  aria-label="Input text"
                />
                {listening && (
                  <div className="absolute top-3 right-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-red-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-red-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={handleSubmit}
                disabled={listening || !input.trim() || isLoading}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/25"
                aria-label="Send input"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Sending</span>
                  </div>
                ) : (
                  "Send"
                )}
              </button>
            </div>
          </div>

          {transcript && (
            <div className="bg-gradient-to-r from-gray-800/60 to-gray-700/60 p-6 rounded-xl border border-gray-600/30 backdrop-blur-sm">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <p className="text-sm font-semibold text-green-400 uppercase tracking-wide">
                  Live Transcript
                </p>
              </div>
              <p className="text-gray-200 whitespace-pre-wrap leading-relaxed bg-gray-900/40 p-4 rounded-lg border border-gray-700/30">
                {transcript}
              </p>
            </div>
          )}

          <div className="bg-gradient-to-r from-gray-800/60 to-gray-700/60 p-6 rounded-xl border border-gray-600/30 backdrop-blur-sm min-h-[160px]">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <p className="text-sm font-semibold text-blue-400 uppercase tracking-wide">
                LearnCraftAI Response
              </p>
            </div>

            <div className="bg-gray-900/40 p-4 rounded-lg border border-gray-700/30 min-h-[100px] flex items-start">
              {isLoading ? (
                <div className="flex items-center space-x-3 text-gray-400">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                  <span className="text-sm">Thinking...</span>
                </div>
              ) : (
                <p className="text-gray-200 whitespace-pre-wrap break-words leading-relaxed">
                  {response || "Ready to assist you..."}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceInput;
