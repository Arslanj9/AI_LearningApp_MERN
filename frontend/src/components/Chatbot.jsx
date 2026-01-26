import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';

const Chatbot = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello! I'm your AI/ML learning assistant. Ask me anything about the topics in your learning roadmap!",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');

    const newMessages = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const conversationHistory = newMessages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      const response = await api.post('/api/chatbot/chat', {
        message: userMessage,
        conversationHistory: conversationHistory,
      });

      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: response.data.response,
          relevantTopics: response.data.relevantTopics,
        },
      ]);
    } catch (error) {
      console.error('Error:', error);
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ height: "calc(100vh - 64px)" }} className="flex flex-col h-screen mt-6 max-w-7xl mx-auto bg-gray-50">
      {/* Header with Gradient */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-600 text-white p-6 shadow-lg">
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">AI/ML Learning Assistant</h2>
            <p className="text-purple-100 text-sm mt-1">
              Your personal guide to mastering AI and Machine Learning
            </p>
          </div>
          
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-medium">Back</span>
          </button>
        </div>
        
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[75%] rounded-lg p-4 shadow-md ${
                msg.role === 'user'
                  ? 'bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-600 text-white'
                  : 'bg-white text-gray-800 border border-purple-100'
              }`}
            >
              <p className="whitespace-pre-wrap break-words">{msg.content}</p>
              
              {msg.relevantTopics && msg.relevantTopics.length > 0 && (
                <div className={`mt-3 pt-3 ${msg.role === 'user' ? 'border-t border-white/20' : 'border-t border-purple-100'}`}>
                  <p className={`text-xs font-semibold mb-2 ${msg.role === 'user' ? 'text-white/90' : 'text-purple-700'}`}>
                    Related Topics:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {msg.relevantTopics.map((topic, idx) => (
                      <span
                        key={idx}
                        className={`inline-block text-xs px-3 py-1 rounded-full ${
                          msg.role === 'user'
                            ? 'bg-white/20 text-white border border-white/30'
                            : 'bg-gradient-to-r from-indigo-100 to-purple-100 text-purple-700 border border-purple-200'
                        }`}
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-800 rounded-lg p-4 shadow-md border border-purple-100">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-fuchsia-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="border-t border-purple-200 bg-white p-4 shadow-lg">
        <form onSubmit={sendMessage} className="flex gap-3 max-w-4xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about AI/ML concepts..."
            disabled={loading}
            className="flex-1 px-4 py-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-8 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:via-purple-700 hover:to-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:from-gray-300 disabled:via-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : (
              'Send'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;