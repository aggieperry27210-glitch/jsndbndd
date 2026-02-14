import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Trophy, BookOpen, Target, Clock, CheckCircle2, XCircle, Flame } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ELASimulator() {
  const navigate = useNavigate();
  const [gameMode, setGameMode] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [questionsCompleted, setQuestionsCompleted] = useState(0);
  const [showFeedback, setShowFeedback] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [totalXP, setTotalXP] = useState(0);

  const vocabularyWords = {
    easy: [
      { word: "Happy", options: ["Sad", "Joyful", "Angry", "Tired"], correct: 1 },
      { word: "Big", options: ["Small", "Large", "Tiny", "Little"], correct: 1 },
      { word: "Fast", options: ["Quick", "Slow", "Late", "Early"], correct: 0 },
      { word: "Smart", options: ["Dumb", "Intelligent", "Silly", "Funny"], correct: 1 },
      { word: "Beautiful", options: ["Ugly", "Pretty", "Mean", "Nice"], correct: 1 },
    ],
    medium: [
      { word: "Eloquent", options: ["Articulate", "Silent", "Confused", "Angry"], correct: 0 },
      { word: "Diligent", options: ["Lazy", "Hardworking", "Sleepy", "Quick"], correct: 1 },
      { word: "Benevolent", options: ["Mean", "Kind", "Strict", "Funny"], correct: 1 },
      { word: "Resilient", options: ["Weak", "Strong", "Tough", "Fragile"], correct: 2 },
      { word: "Meticulous", options: ["Careful", "Careless", "Fast", "Slow"], correct: 0 },
    ],
    hard: [
      { word: "Ubiquitous", options: ["Rare", "Everywhere", "Hidden", "Lost"], correct: 1 },
      { word: "Ephemeral", options: ["Permanent", "Temporary", "Eternal", "Long"], correct: 1 },
      { word: "Ambiguous", options: ["Clear", "Unclear", "Bright", "Dark"], correct: 1 },
      { word: "Pragmatic", options: ["Practical", "Idealistic", "Lazy", "Busy"], correct: 0 },
      { word: "Paradox", options: ["Truth", "Contradiction", "Lie", "Story"], correct: 1 },
    ],
  };

  const grammarQuestions = {
    easy: [
      { question: "She _____ to school every day.", options: ["go", "goes", "going", "went"], correct: 1 },
      { question: "They _____ playing soccer.", options: ["is", "am", "are", "be"], correct: 2 },
      { question: "I _____ my homework yesterday.", options: ["do", "did", "does", "doing"], correct: 1 },
    ],
    medium: [
      { question: "The book _____ on the table is mine.", options: ["laying", "lying", "lies", "laid"], correct: 1 },
      { question: "Neither the teacher nor the students _____ ready.", options: ["is", "are", "was", "be"], correct: 1 },
      { question: "She speaks _____ than her sister.", options: ["more clearly", "more clear", "clearer", "most clear"], correct: 0 },
    ],
    hard: [
      { question: "The committee _____ reached a decision.", options: ["have", "has", "had", "having"], correct: 1 },
      { question: "If I _____ you, I would study harder.", options: ["am", "was", "were", "be"], correct: 2 },
      { question: "The data _____ been analyzed carefully.", options: ["has", "have", "is", "are"], correct: 1 },
    ],
  };

  const generateQuestion = (mode, type) => {
    const questions = type === "vocabulary" ? vocabularyWords[mode] : grammarQuestions[mode];
    return questions[Math.floor(Math.random() * questions.length)];
  };

  const startGame = (mode) => {
    const type = ["vocabulary", "grammar"][Math.floor(Math.random() * 2)];
    setGameMode(mode);
    setGameStarted(true);
    setCurrentQuestion({ ...generateQuestion(mode, type), type });
    setScore(0);
    setStreak(0);
    setTimeLeft(60);
    setQuestionsCompleted(0);
    setGameOver(false);
    setTotalXP(0);
    setSelectedAnswer(null);
  };

  const submitAnswer = (index) => {
    if (showFeedback) return;
    
    setSelectedAnswer(index);
    const isCorrect = index === currentQuestion.correct;
    const xpEarned = isCorrect ? (streak + 1) * 15 : 0;

    if (isCorrect) {
      setScore(score + 100 + (streak * 25));
      setStreak(streak + 1);
      setTotalXP(totalXP + xpEarned);
      setShowFeedback("correct");
    } else {
      setStreak(0);
      setShowFeedback("wrong");
    }

    setQuestionsCompleted(questionsCompleted + 1);

    setTimeout(() => {
      const type = ["vocabulary", "grammar"][Math.floor(Math.random() * 2)];
      setShowFeedback(null);
      setSelectedAnswer(null);
      setCurrentQuestion({ ...generateQuestion(gameMode, type), type });
    }, 1500);
  };

  useEffect(() => {
    if (gameStarted && !gameOver && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !gameOver) {
      setGameOver(true);
    }
  }, [timeLeft, gameStarted, gameOver]);

  if (gameOver) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full"
        >
          <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-800">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trophy className="w-10 h-10 text-white" />
              </div>

              <h2 className="text-3xl font-bold text-white mb-4">Time's Up!</h2>
              
              <div className="space-y-4 mb-8">
                <div className="bg-slate-800/50 rounded-xl p-4">
                  <p className="text-gray-400 text-sm mb-1">Final Score</p>
                  <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                    {score}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Questions Answered</p>
                    <p className="text-3xl font-bold text-blue-400">{questionsCompleted}</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Total XP Earned</p>
                    <p className="text-3xl font-bold text-yellow-400">+{totalXP}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => startGame(gameMode)} className="bg-indigo-600 hover:bg-indigo-700">
                  Play Again
                </Button>
                <Button onClick={() => navigate(createPageUrl("ELA"))} variant="outline" className="border-slate-700">
                  Back to ELA
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  if (!gameStarted) {
    return (
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate(createPageUrl("ELA"))}
            className="text-gray-400 hover:text-white mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="text-7xl mb-6">📚</div>
            <h1 className="text-5xl font-black text-white mb-4">Word Master Challenge</h1>
            <p className="text-xl text-gray-400">Test your vocabulary and grammar in 60 seconds!</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { level: "easy", title: "Beginner", desc: "Simple words & basic grammar", color: "from-emerald-500 to-green-500", emoji: "📖" },
              { level: "medium", title: "Intermediate", desc: "Complex vocabulary & grammar", color: "from-amber-500 to-orange-500", emoji: "📝" },
              { level: "hard", title: "Advanced", desc: "Advanced words & tricky rules", color: "from-rose-500 to-red-500", emoji: "🎓" }
            ].map((mode) => (
              <motion.div
                key={mode.level}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05, y: -8 }}
                className="cursor-pointer"
                onClick={() => startGame(mode.level)}
              >
                <Card className="bg-slate-900/80 backdrop-blur-xl border-slate-800 overflow-hidden h-full hover:border-slate-600 transition-all">
                  <div className={`h-2 bg-gradient-to-r ${mode.color}`} />
                  <CardContent className="p-6 text-center">
                    <div className="text-5xl mb-4">{mode.emoji}</div>
                    <h3 className="text-2xl font-bold text-white mb-2">{mode.title}</h3>
                    <p className="text-gray-400 mb-6">{mode.desc}</p>
                    <Button className={`w-full bg-gradient-to-r ${mode.color}`}>
                      Start Challenge
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Stats Bar */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-xl p-4 text-center">
            <Clock className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <p className="text-2xl font-black text-white">{timeLeft}s</p>
            <p className="text-xs text-gray-400">Time Left</p>
          </div>
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-xl p-4 text-center">
            <Trophy className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
            <p className="text-2xl font-black text-white">{score}</p>
            <p className="text-xs text-gray-400">Score</p>
          </div>
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-xl p-4 text-center">
            <Flame className="w-6 h-6 text-orange-400 mx-auto mb-2" />
            <p className="text-2xl font-black text-white">{streak}</p>
            <p className="text-xs text-gray-400">Streak</p>
          </div>
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-xl p-4 text-center">
            <Target className="w-6 h-6 text-indigo-400 mx-auto mb-2" />
            <p className="text-2xl font-black text-white">{questionsCompleted}</p>
            <p className="text-xs text-gray-400">Answered</p>
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion?.word || currentQuestion?.question}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <Card className="bg-slate-900/80 backdrop-blur-xl border-slate-800">
              <CardContent className="p-8">
                <div className="mb-4">
                  <span className="px-3 py-1 bg-indigo-500/20 border border-indigo-500/40 rounded-full text-indigo-300 text-xs font-bold uppercase">
                    {currentQuestion?.type === "vocabulary" ? "📚 Vocabulary" : "✍️ Grammar"}
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                  {currentQuestion?.type === "vocabulary" ? "Find the synonym:" : "Choose the correct answer:"}
                </h2>
                <p className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-8">
                  {currentQuestion?.word || currentQuestion?.question}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentQuestion?.options.map((option, index) => {
                    const isSelected = selectedAnswer === index;
                    const isCorrect = index === currentQuestion.correct;
                    const showCorrect = showFeedback && isCorrect;
                    const showWrong = showFeedback && isSelected && !isCorrect;

                    return (
                      <button
                        key={index}
                        onClick={() => submitAnswer(index)}
                        disabled={showFeedback}
                        className={`p-6 rounded-xl border-2 transition-all duration-300 text-xl font-bold ${
                          showCorrect
                            ? "border-green-500 bg-green-500/20 text-green-400"
                            : showWrong
                            ? "border-red-500 bg-red-500/20 text-red-400"
                            : "border-slate-700 bg-slate-800/50 text-white hover:border-indigo-500 hover:bg-indigo-500/10"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{option}</span>
                          {showCorrect && <CheckCircle2 className="w-6 h-6" />}
                          {showWrong && <XCircle className="w-6 h-6" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <AnimatePresence>
                  {showFeedback && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="mt-6 text-center"
                    >
                      <span className={`text-xl font-bold ${showFeedback === "correct" ? "text-green-400" : "text-red-400"}`}>
                        {showFeedback === "correct" ? `🎉 Correct! +${(streak + 1) * 15} XP` : "❌ Try again next time!"}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}