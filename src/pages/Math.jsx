import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Calculator, Trophy, ArrowRight, Loader2, Star, Award, Clock, CheckCircle2, Zap, Target, Flame } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Math() {
  const { data: user } = useQuery({
    queryKey: ['current-user'],
    queryFn: () => base44.auth.me(),
  });

  const { data: quizzes, isLoading } = useQuery({
    queryKey: ['math-quizzes'],
    queryFn: () => base44.entities.Quiz.filter({ category: 'math' }),
    initialData: [],
  });

  const { data: userProgress } = useQuery({
    queryKey: ['user-progress', user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      return base44.entities.UserProgress.filter({ created_by: user.email }, '-completed_at');
    },
    initialData: [],
    enabled: !!user?.email,
  });

  const getDifficultyColor = (difficulty) => {
    const colors = {
      beginner: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40",
      intermediate: "bg-amber-500/20 text-amber-400 border-amber-500/40",
      advanced: "bg-rose-500/20 text-rose-400 border-rose-500/40",
    };
    return colors[difficulty] || colors.beginner;
  };

  const getQuizScore = (quizId) => {
    const attempts = userProgress.filter(p => p.quiz_id === quizId);
    if (attempts.length === 0) return null;
    return Math.max(...attempts.map(a => a.score));
  };

  const getAttemptCount = (quizId) => {
    return userProgress.filter(p => p.quiz_id === quizId).length;
  };

  const totalCompleted = [...new Set(userProgress.map(p => p.quiz_id))].filter(id =>
    quizzes.find(q => q.id === id)
  ).length;

  // Game mechanics
  const [showLevelUp, setShowLevelUp] = useState(false);
  const totalXP = userProgress.reduce((sum, p) => sum + p.score, 0);
  const currentLevel = window.Math.floor(totalXP / 100) + 1;
  const xpForNextLevel = currentLevel * 100;
  const xpProgress = (totalXP % 100);

  // Daily streak (simplified - tracks if completed today)
  const today = new Date().toDateString();
  const lastActivity = userProgress.length > 0 
    ? new Date(userProgress[0].completed_at).toDateString()
    : null;
  const dailyStreak = lastActivity === today ? 1 : 0;

  // Fun badges based on level
  const getBadge = (level) => {
    if (level < 3) return { emoji: "🌟", title: "Superstar" };
    if (level < 5) return { emoji: "🚀", title: "Rocket Kid" };
    if (level < 8) return { emoji: "🦸", title: "Super Hero" };
    if (level < 12) return { emoji: "👑", title: "Math King" };
    return { emoji: "🏆", title: "Champion" };
  };
  const badge = getBadge(currentLevel);

  useEffect(() => {
    if (totalXP > 0 && totalXP % 100 === 0) {
      setShowLevelUp(true);
      setTimeout(() => setShowLevelUp(false), 3000);
    }
  }, [totalXP]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-0 w-96 h-96 bg-green-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Level Up Animation */}
        <AnimatePresence>
          {showLevelUp && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: -50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 50 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
            >
              <div className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-3xl p-8 shadow-2xl">
                <div className="text-center">
                  <div className="text-6xl mb-4">🎉</div>
                  <h2 className="text-4xl font-black text-white mb-2">LEVEL UP!</h2>
                  <p className="text-xl text-white font-bold">Level {currentLevel}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Game Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          {/* Super Fun Badge Display */}
          <div className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-3xl p-1 mb-4">
            <div className="bg-slate-900 rounded-3xl p-6 text-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-8xl mb-2"
              >
                {badge.emoji}
              </motion.div>
              <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 mb-1">
                Level {currentLevel}
              </h3>
              <p className="text-xl font-bold text-white">{badge.title}</p>
            </div>
          </div>

          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-6">
            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* Stars Earned */}
              <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-2 border-yellow-500/50 rounded-2xl p-4 text-center">
                <div className="text-4xl mb-2">⭐</div>
                <p className="text-3xl font-black text-yellow-400">{totalXP}</p>
                <p className="text-sm text-yellow-300 font-bold">Stars!</p>
              </div>

              {/* Quests Done */}
              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-2 border-green-500/50 rounded-2xl p-4 text-center">
                <div className="text-4xl mb-2">✅</div>
                <p className="text-3xl font-black text-green-400">{totalCompleted}</p>
                <p className="text-sm text-green-300 font-bold">Quests Done!</p>
              </div>
            </div>

            {/* Fun Progress Bar */}
            <div className="bg-slate-800/50 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-bold text-white">🎯 Next Level!</span>
                <span className="text-lg font-bold text-green-400">{xpProgress}/{xpForNextLevel} ⭐</span>
              </div>
              <div className="h-6 bg-slate-700 rounded-full overflow-hidden relative">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(xpProgress / xpForNextLevel) * 100}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 relative"
                >
                  <motion.div
                    animate={{ x: [0, 10, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-lg"
                  >
                    🚀
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-16"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 via-emerald-600/10 to-transparent rounded-3xl blur-2xl" />
          
          <div className="relative bg-slate-900/50 backdrop-blur-2xl border border-slate-800 rounded-3xl p-8 sm:p-12">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Left Content */}
              <div className="flex-1 text-center lg:text-left">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white text-lg font-black mb-6 shadow-lg"
                >
                  <Calculator className="w-5 h-5" />
                  Math Adventure! 🎮
                </motion.div>

                <h1 className="text-5xl sm:text-7xl font-black text-white mb-6 leading-tight">
                  Let's Learn{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400">
                    Math! 🚀
                  </span>
                </h1>

                <p className="text-2xl text-gray-300 mb-8 leading-relaxed max-w-2xl font-bold">
                  Play fun math games and collect stars! 🌟 Level up and become a Math Champion! 🏆
                </p>

                {/* Stats */}
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  <div className="px-4 py-3 bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-xl">
                    <div className="flex items-center gap-2 mb-1">
                      <Star className="w-4 h-4 text-green-400" />
                      <span className="text-xs text-gray-400">Available Quizzes</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{quizzes.length}</p>
                  </div>
                  <div className="px-4 py-3 bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-xl">
                    <div className="flex items-center gap-2 mb-1">
                      <Award className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs text-gray-400">Completed</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{totalCompleted}</p>
                  </div>
                  <div className="px-4 py-3 bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-xl">
                    <div className="flex items-center gap-2 mb-1">
                      <Trophy className="w-4 h-4 text-yellow-400" />
                      <span className="text-xs text-gray-400">Progress</span>
                    </div>
                    <p className="text-2xl font-bold text-white">
                      {quizzes.length > 0 ? Math.round((totalCompleted / quizzes.length) * 100) : 0}%
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Visual */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="relative"
              >
                <div className="w-48 h-48 sm:w-64 sm:h-64 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-full opacity-20 blur-2xl animate-pulse" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-8xl sm:text-9xl">📐</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Speed Challenge Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <Link to={createPageUrl("MathSimulator")}>
            <div className="relative group cursor-pointer">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity" />
              <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 group-hover:border-green-500/50 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                      <Zap className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">🎯 Speed Challenge</h3>
                      <p className="text-gray-400">Solve problems in 60 seconds - Earn bonus XP!</p>
                    </div>
                  </div>
                  <ArrowRight className="w-6 h-6 text-green-400 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Quizzes Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">📋 Quest Board</h2>
              <p className="text-gray-400">Complete quests to earn XP and level up!</p>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-400">
              <Clock className="w-4 h-4" />
              <span>5-10 min each</span>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-10 h-10 text-green-400 animate-spin" />
            </div>
          ) : quizzes.length === 0 ? (
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-16 text-center">
              <Calculator className="w-20 h-20 text-gray-600 mx-auto mb-6" />
              <p className="text-gray-400 text-xl">No quizzes available yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {quizzes.map((quiz, index) => {
                const score = getQuizScore(quiz.id);
                const attempts = getAttemptCount(quiz.id);
                const isCompleted = score !== null;
                const isMastered = score !== null && score >= 90;
                
                return (
                  <motion.div
                    key={quiz.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ scale: 1.02, y: -4, rotate: [0, -1, 1, 0] }}
                  >
                    <Link to={`${createPageUrl("Quiz")}?id=${quiz.id}`}>
                      <div className="group relative h-full">
                        {/* Glow Effect */}
                        <div className={`absolute -inset-0.5 ${isMastered ? 'bg-gradient-to-r from-yellow-600 to-orange-600' : 'bg-gradient-to-r from-green-600 to-emerald-600'} rounded-2xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-500`} />
                        
                        {/* Quest Reward Badge */}
                        {!isCompleted && (
                          <motion.div
                            initial={{ rotate: -10 }}
                            animate={{ rotate: [10, -10, 10], scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-3 -right-3 z-10 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-full text-base font-black shadow-2xl border-4 border-white"
                          >
                            🌟 +{quiz.questions?.length * 10 || 100}
                          </motion.div>
                        )}

                        {isMastered && (
                          <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="absolute -top-3 -left-3 z-10 text-5xl"
                          >
                            🏆
                          </motion.div>
                        )}
                        
                        <div className="relative bg-slate-900/80 backdrop-blur-2xl border border-slate-800 rounded-2xl overflow-hidden h-full">
                          {/* Top Bar */}
                          <div className={`h-1.5 ${isMastered ? 'bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500' : 'bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500'}`} />
                          
                          <div className="p-6">
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center gap-2 flex-wrap">
                                <div className={`px-3 py-1.5 rounded-xl border text-xs font-bold uppercase tracking-wider ${getDifficultyColor(quiz.difficulty)}`}>
                                  {quiz.difficulty || 'beginner'}
                                </div>
                                {isMastered && (
                                  <div className="px-3 py-1.5 bg-yellow-500/20 border border-yellow-500/40 rounded-xl flex items-center gap-1">
                                    <span className="text-lg">🏆</span>
                                    <span className="text-xs font-bold text-yellow-400">MASTERED</span>
                                  </div>
                                )}
                              </div>
                              {isCompleted && (
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-500/20 border border-yellow-500/40 rounded-xl">
                                  <Trophy className="w-4 h-4 text-yellow-400" />
                                  <span className="text-sm font-bold text-yellow-400">{score}%</span>
                                </div>
                              )}
                            </div>

                            {/* Title */}
                            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors duration-300 leading-tight">
                              {quiz.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-400 mb-6 leading-relaxed">
                              {quiz.description}
                            </p>

                            {/* Footer */}
                            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                              <div className="flex items-center gap-4 text-sm">
                                <div className="flex items-center gap-1.5 text-gray-400">
                                  <Calculator className="w-4 h-4" />
                                  <span>{quiz.questions?.length || 0} questions</span>
                                </div>
                                {isCompleted && (
                                  <div className="flex items-center gap-1.5 text-green-400">
                                    <CheckCircle2 className="w-4 h-4" />
                                    <span className="text-xs">{attempts} {attempts === 1 ? 'attempt' : 'attempts'}</span>
                                  </div>
                                )}
                              </div>
                              
                              <div className="flex items-center gap-2 text-green-400 font-bold group-hover:gap-3 transition-all duration-300">
                                <span>{isCompleted ? 'Retake' : 'Start'}</span>
                                <ArrowRight className="w-5 h-5" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}