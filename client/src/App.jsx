import { useState } from "react";
import "./index.css";

function App() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [input, setInput] = useState("");
  const [question, setQuestion] = useState("");
  const [chat, setChat] = useState([]); // [{type: 'question'|'answer', text: string}]

  const handleAddFeedback = () => {
    if (input.trim()) {
      setFeedbacks([...feedbacks, input]);
      setInput("");
    }
  };

  const handleAsk = async () => {
    if (!question.trim()) return;
    const q = question;
    setChat((prev) => [...prev, { type: "question", text: q }]);
    setQuestion("");
    try {
      const res = await fetch("https://feedback-backend-7zp9.onrender.com/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q }),
      });
      const data = await res.json();
      setChat((prev) => [...prev, { type: "answer", text: data.answer }]);
    } catch (err) {
      setChat((prev) => [
        ...prev,
        { type: "answer", text: "Error fetching answer." },
      ]);
    }
  };

  return (
    <div className="app bg-black h-screen w-screen text-white sm:flex p-1 gap-4">
      <div className="feedbackTracker w-full sm:w-[60%] mt-3">
        <div className="p-3 bg-gray-900 rounded-[5px] w-full flex items-center">
          <h1 className="text-[5vw] sm:text-[2vw] font-bold ">Feedback Tracker</h1>
        </div>
        <div className="bg-gray-800 w-full mt-1 p-4 rounded-[5px]">
          <div className="section flex justify-between">
            <input
              type="text"
              placeholder="Enter feedback..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bg-gray-700 p-3 w-[70%] rounded-[10px] focus:outline-none focus:ring-0 focus:border-none text-[4vw] sm:text-[1.3vw]"
            />
            <button
              onClick={handleAddFeedback}
              className="sm:bg-gray-500 rounded-[10px] w-[26%] text-[2.5vw] sm:text-[1vw] cursor-pointer hover:bg-[#284C76] transition-all duration-300 text-gray-800 hover:text-white font-bold bg-[#2B7FFF]"
            >
              Add Feedback
            </button>
          </div>

          <ul className="max-h-[50vh] min-h-[50vh] sm:min-h-[70vh] sm:max-h-[70vh] overflow-y-auto scrollbar-hide m-1">
            {feedbacks.map((f, i) => (
              <li
                key={i}
                className="bg-gray-700 mt-1 py-2 pl-2 text-[2.3] sm:text-[1vw] rounded-[5px]"
              >
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Chat Section */}
      <div className="chatbox bg-gray-800 w-full  h-[30vh] sm:h-[95.5vh] mt-3 rounded-[10px] p-2 flex flex-col sm:w-[40%] ">
        <div className="p-3 bg-gray-900 rounded-[5px] w-full flex items-center gap-[10px]">
          <h1 className="text-[4vw] sm:text-[2vw] font-bold ">Ask Us</h1>
          <i className="ri-chat-smile-ai-line text-[4vw] sm:text-[2vw]"></i>
        </div>
        {/* Chat messages */}
        <div
          className="flex-1 overflow-y-auto my-2 px-2 scrollbar-hide"
          style={{ minHeight: 0 }}
        >
          {chat.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.type === "question" ? "justify-end" : "justify-start"
              } mb-2`}
            >
              <div
                className={`max-w-[70%] px-4 py-2 rounded-[10px] text-4vw] sm:text-[1vw] ${
                  msg.type === "question"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-100"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        {/* Input at the bottom */}
        <div className="section flex gap-2 mt-2">
          <input
            type="text"
            placeholder="Ask a question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="bg-gray-700 p-3 flex-1 rounded-[10px] focus:outline-none focus:ring-0 focus:border-none"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAsk();
            }}
          />
          <button
            onClick={handleAsk}
            className="bg-blue-500 rounded-[10px] px-6 text-[3vw] sm:text-[1vw] cursor-pointer hover:bg-blue-700 transition-all duration-300 text-white font-bold"
          >
            Ask
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
