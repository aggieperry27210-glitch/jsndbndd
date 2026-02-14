import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Trophy, Zap, Target, Clock, CheckCircle2, XCircle, Flame } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MathSimulator() {
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentProblem, setCurrentProblem] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [problemsCompleted, setProblemsCompleted] = useState(0);
  const [showFeedback, setShowFeedback] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [totalXP, setTotalXP] = useState(0);

  const generateProblem = (diff) => {
    let num1, num2, operation, answer;
    
    if (diff === "easy") {
      num1 = Math.floor(Math.random() * 20) + 1;
      num2 = Math.floor(Math.random() * 20) + 1;
      operation = ["+", "-"][Math.floor(Math.random() * 2)];
    } else if (diff === "medium") {
      num1 = Math.floor(Math.random() * 50) + 10;
      num2 = Math.floor(Math.random() * 50) + 10;
      operation = ["+", "-", "×"][Math.floor(Math.random() * 3)];
    } else {
      num1 = Math.floor(Math.random() * 100) + 20;
      num2 = Math.floor(Math.random() * 100) + 20;
      operation = ["+", "-", "×", "÷"][Math.floor(Math.random() * 4)];
    }

    if (operation === "+") answer = num1 + num2;
    else if (operation === "-") answer = num1 - num2;
    else if (operation === "×") answer = num1 * num2;
    else {
      num1 = num1 * num2;
      answer = num1 / num2;
    }

    return { num1, num2, operation, answer, question: `${num1} ${operation} ${num2}` };
  };

  const startGame = (diff) => {
    setDifficulty(diff);
    setGameStarted(true);
    setCurrentProblem(generateProblem(diff));
    setScore(0);
    setStreak(0);
    setTimeLeft(60);
    setProblemsCompleted(0);
    setGameOver(false);
    setTotalXP(0);
  };

  const submitAnswer = () => {
    if (!userAnswer) return;

    const isCorrect = parseFloat(userAnswer) === currentProblem.answer;
    const xpEarned = isCorrect ? (streak + 1) * 10 : 0;

    if (isCorrect) {
      setScore(score + 100 + (streak * 20));
      setStreak(streak + 1);
      setTotalXP(totalXP + xpEarned);
      setShowFeedback("correct");
    } else {
      setStreak(0);
      setShowFeedback("wrong");
    }

    setProblemsCompleted(problemsCompleted + 1);

    setTimeout(() => {
      setShowFeedback(null);
      setUserAnswer("");
      setCurrentProblem(generateProblem(difficulty));
    }, 1000);
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
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trophy className="w-10 h-10 text-white" />
              </div>

              <h2 className="text-3xl font-bold text-white mb-4">Time's Up!</h2>
              
              <div className="space-y-4 mb-8">
                <div className="bg-slate-800/50 rounded-xl p-4">
                  <p className="text-gray-400 text-sm mb-1">Final Score</p>
                  <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                    {score}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Problems Solved</p>
                    <p className="text-3xl font-bold text-blue-400">{problemsCompleted}</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Total XP Earned</p>
                    <p className="text-3xl font-bold text-yellow-400">+{totalXP}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => startGame(difficulty)} className="bg-green-600 hover:bg-green-700">
                  Play Again
                </Button>
                <Button onClick={() => navigate(createPageUrl("Math"))} variant="outline" className="border-slate-700">
                  Back to Math
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
            onClick={() => navigate(createPageUrl("Math"))}
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
            <div className="text-7xl mb-6">🎯</div>
            <h1 className="text-5xl font-black text-white mb-4">Math Speed Challenge</h1>
            <p className="text-xl text-gray-400">Solve as many problems as you can in 60 seconds!</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { level: "easy", title: "Easy", desc: "Addition & Subtraction (1-20)", color: "from-emerald-500 to-green-500", emoji: "🌱" },
              { level: "medium", title: "Medium", desc: "Mixed Operations (1-50)", color: "from-amber-500 to-orange-500", emoji: "🔥" },
              { level: "hard", title: "Hard", desc: "All Operations (1-100)", color: "from-rose-500 to-red-500", emoji: "⚡" }
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
            <Target className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <p className="text-2xl font-black text-white">{problemsCompleted}</p>
            <p className="text-xs text-gray-400">Solved</p>
          </div>
        </div>

        {/* Problem Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProblem?.question}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <Card className="bg-slate-900/80 backdrop-blur-xl border-slate-800">
              <CardContent className="p-12 text-center">
                <div className="text-6xl sm:text-8xl font-black text-white mb-8">
                  {currentProblem?.question}
                </div>

                <div className="flex gap-4 max-w-md mx-auto mb-6">
                  <input
                    type="number"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && submitAnswer()}
                    placeholder="Your answer..."
                    className="flex-1 px-6 py-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white text-2xl text-center focus:outline-none focus:border-green-500"
                    autoFocus
                    disabled={showFeedback}
                  />
                  <Button
                    onClick={submitAnswer}
                    disabled={!userAnswer || showFeedback}
                    className="bg-green-600 hover:bg-green-700 px-8 py-4 text-lg"
                  >
                    <Zap className="w-5 h-5" />
                  </Button>
                </div>

                <AnimatePresence>
                  {showFeedback && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex items-center justify-center gap-3"
                    >
                      {showFeedback === "correct" ? (
                        <>
                          <CheckCircle2 className="w-8 h-8 text-green-400" />
                          <span className="text-2xl font-bold text-green-400">
                            Correct! +{(streak + 1) * 10} XP
                          </span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-8 h-8 text-red-400" />
                          <span className="text-2xl font-bold text-red-400">
                            Wrong! Answer: {currentProblem?.answer}
                          </span>
                        </>
                      )}
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