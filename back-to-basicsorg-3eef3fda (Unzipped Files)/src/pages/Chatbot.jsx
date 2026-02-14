import React, { useState, useRef, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Send, Loader2, Sparkles, BookOpen, TrendingUp, Lightbulb, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "👋 Hi! I'm your Civics & Finance Learning Assistant. I'm here to help you understand politics, government, and personal finance. Ask me anything!",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const textareaRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const suggestedQuestions = [
    { question: "What are the three branches of government?", icon: BookOpen, category: "Politics" },
    { question: "How does the Electoral College work?", icon: BookOpen, category: "Politics" },
    { question: "What is a credit score and why is it important?", icon: TrendingUp, category: "Finance" },
    { question: "How does compound interest work?", icon: TrendingUp, category: "Finance" },
    { question: "What's the 50/30/20 budgeting rule?", icon: TrendingUp, category: "Finance" },
    { question: "What rights does the First Amendment protect?", icon: BookOpen, category: "Politics" },
  ];

  const handleSend = async (messageText = input) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage = {
      role: "user",
      content: messageText.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Build conversation context
      const conversationHistory = messages.slice(-4).map(m => 
        `${m.role === 'user' ? 'Student' : 'Tutor'}: ${m.content}`
      ).join('\n');

      const systemPrompt = `You are a friendly and knowledgeable educational assistant for Civicents.org, helping students learn about U.S. politics, government, and personal finance.

Your role:
- Explain complex topics in simple, easy-to-understand language
- Use examples and analogies that teenagers and young adults can relate to
- Be encouraging and supportive
- Break down complicated concepts into digestible pieces
- Use emojis occasionally to make learning fun 🎓
- When explaining political concepts, remain neutral and factual
- For finance topics, give practical, actionable advice

Topics you help with:
- U.S. Government Structure (branches, checks and balances)
- The Constitution and Bill of Rights
- Elections and voting processes
- Budgeting and personal finance
- Credit scores and debt management
- Saving and investing basics

Keep responses concise (2-4 paragraphs max) unless the student asks for more detail.

Previous conversation:
${conversationHistory}

Student's question: ${messageText}`;

      const response = await base44.integrations.Core.InvokeLLM({
        prompt: systemPrompt,
        add_context_from_internet: false,
      });

      const assistantMessage = {
        role: "assistant",
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error calling chatbot:", error);
      const errorMessage = {
        role: "assistant",
        content: "Sorry, I'm having trouble responding right now. Please try again in a moment! 🤖",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestionClick = (question) => {
    setInput(question);
    textareaRef.current?.focus();
  };

  return (
    <div className="min-h-screen relative overflow-hidden pb-20">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-600/30 to-blue-600/30 border border-cyan-500/50 backdrop-blur-xl text-cyan-300 text-sm font-semibold mb-6"
          >
            <Sparkles className="w-4 h-4 animate-pulse" />
            AI Learning Assistant
          </motion.div>

          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Ask Me <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">Anything</span>
          </h1>
          
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Get instant answers to your questions about politics, government, and personal finance
          </p>
        </motion.div>

        {/* Chat Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-3xl blur opacity-20" />
          
          <div className="relative bg-slate-900/80 backdrop-blur-2xl border border-slate-800 rounded-3xl overflow-hidden">
            <div className="h-1.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500" />
            
            {/* Messages Area */}
            <div 
              ref={messagesContainerRef}
              className="h-[500px] overflow-y-auto p-6 space-y-4 scroll-smooth"
            >
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex gap-3 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      {/* Avatar */}
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.role === 'user' 
                          ? 'bg-gradient-to-br from-blue-500 to-purple-500' 
                          : 'bg-gradient-to-br from-cyan-500 to-teal-500'
                      }`}>
                        {message.role === 'user' ? (
                          <span className="text-xl">👤</span>
                        ) : (
                          <MessageCircle className="w-5 h-5 text-white" />
                        )}
                      </div>

                      {/* Message Bubble */}
                      <div className={`rounded-2xl p-4 ${
                        message.role === 'user'
                          ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white'
                          : 'bg-slate-800/80 text-gray-100'
                      }`}>
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                        <p className={`text-xs mt-2 ${
                          message.role === 'user' ? 'text-blue-200' : 'text-gray-500'
                        }`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex gap-3 max-w-[80%]">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-cyan-500 to-teal-500">
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <div className="bg-slate-800/80 rounded-2xl p-4">
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
                        <span className="text-gray-400 text-sm">Thinking...</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Suggested Questions (shown when chat is empty) */}
            {messages.length <= 1 && (
              <div className="px-6 pb-4">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-4 h-4 text-yellow-400" />
                  <p className="text-sm font-semibold text-gray-400">Try asking:</p>
                </div>
                <div className="grid md:grid-cols-2 gap-2">
                  {suggestedQuestions.map((sq, index) => {
                    const Icon = sq.icon;
                    return (
                      <button
                        key={index}
                        onClick={() => handleSend(sq.question)}
                        className="text-left p-3 bg-slate-800/50 hover:bg-slate-800 rounded-xl border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 group"
                      >
                        <div className="flex items-start gap-2">
                          <Icon className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="text-xs text-gray-400 mb-1">{sq.category}</p>
                            <p className="text-sm text-gray-300 group-hover:text-white transition-colors">{sq.question}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="border-t border-slate-800 p-4 bg-slate-900/50">
              <div className="flex gap-3">
                <Textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask a question about politics or finance..."
                  className="flex-1 min-h-[60px] max-h-[120px] bg-slate-800/50 border-slate-700 text-white placeholder:text-gray-500 resize-none focus:border-cyan-500 transition-colors"
                  disabled={isLoading}
                />
                <Button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isLoading}
                  className="h-[60px] px-6 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold shadow-lg shadow-cyan-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                <HelpCircle className="w-3 h-3" />
                Press Enter to send, Shift+Enter for new line
              </p>
            </div>
          </div>
        </motion.div>

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid md:grid-cols-3 gap-6 mt-8"
        >
          {[
            {
              icon: "🏛️",
              title: "Politics & Government",
              description: "Learn about the Constitution, branches of government, and how democracy works"
            },
            {
              icon: "💰",
              title: "Personal Finance",
              description: "Get help with budgeting, credit scores, saving, and investing basics"
            },
            {
              icon: "🎯",
              title: "Exam Prep",
              description: "Get clarification on quiz topics and reinforce your learning"
            }
          ].map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 text-center"
            >
              <div className="text-4xl mb-3">{card.icon}</div>
              <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
              <p className="text-sm text-gray-400">{card.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}