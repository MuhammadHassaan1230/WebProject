import React, { useState } from 'react';

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput('');
      // Add bot response after sending user message
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'This is a bot response!', sender: 'bot' },
        ]);
      }, 1000);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-4">
      {/* Chat Area */}
      <div className="h-64 overflow-y-auto border-b mb-4 flex flex-col space-y-2">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`max-w-[70%] px-4 py-2 rounded-lg ${
              message.sender === 'user'
                ? 'bg-blue-500 text-white self-end'
                : 'bg-gray-200 text-black self-start'
            }`}
            style={{ wordWrap: 'break-word' }} // Ensure long words break correctly
          >
            {message.text}
          </div>
        ))}
      </div>
      {/* Input Area */}
      <div className="flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}
