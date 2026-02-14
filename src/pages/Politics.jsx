import React from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { BookOpen, Trophy, ArrowRight, Loader2, Star, Award, Clock, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Politics() {
  const { data: user } = useQuery({
    queryKey: ['current-user'],
    queryFn: () => base44.auth.me(),
  });

  const { data: quizzes, isLoading } = useQuery({
    queryKey: ['politics-quizzes'],
    queryFn: () => base44.entities.Quiz.filter({ category: 'politics' }),
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

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-16"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-cyan-600/10 to-transparent rounded-3xl blur-2xl" />
          
          <div className="relative bg-slate-900/50 backdrop-blur-2xl border border-slate-800 rounded-3xl p-8 sm:p-12">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Left Content */}
              <div className="flex-1 text-center lg:text-left">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/20 border border-blue-500/40 text-blue-300 text-sm font-semibold mb-6"
                >
                  <BookOpen className="w-4 h-4" />
                  U.S. Politics & Government
                </motion.div>

                <h1 className="text-4xl sm:text-6xl font-black text-white mb-6 leading-tight">
                  Understand{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400">
                    Democracy
                  </span>
                </h1>

                <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl">
                  Master how the U.S. government works through engaging quizzes. Learn about the Constitution, branches of government, and your rights as a citizen.
                </p>

                {/* Stats */}
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  <div className="px-4 py-3 bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-xl">
                    <div className="flex items-center gap-2 mb-1">
                      <Star className="w-4 h-4 text-blue-400" />
                      <span className="text-xs text-gray-400">Available Quizzes</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{quizzes.length}</p>
                  </div>
                  <div className="px-4 py-3 bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-xl">
                    <div className="flex items-center gap-2 mb-1">
                      <Award className="w-4 h-4 text-cyan-400" />
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
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 rounded-full opacity-20 blur-2xl animate-pulse" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-8xl sm:text-9xl">🏛️</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Learning Topics */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-3 gap-6 mb-16"
        >
          {[
            { emoji: "🏛️", title: "Government Structure", desc: "Executive, legislative, and judicial branches", color: "from-blue-500 to-cyan-500", path: createPageUrl("GovernmentStructure") },
            { emoji: "📜", title: "The Constitution", desc: "Your rights and how they're protected", color: "from-cyan-500 to-teal-500", path: createPageUrl("ConstitutionRights") },
            { emoji: "🗳️", title: "Elections & Voting", desc: "How leaders are chosen and laws are passed", color: "from-teal-500 to-emerald-500", path: createPageUrl("ElectionsVoting") }
          ].map((topic, index) => (
            <motion.div
              key={topic.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <Link to={topic.path} className="block relative group h-full">
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${topic.color} rounded-2xl blur opacity-0 group-hover:opacity-40 transition-opacity duration-500`} />
                <div className="relative bg-slate-900/80 backdrop-blur-2xl border border-slate-800 rounded-2xl p-6 h-full">
                  <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {topic.emoji}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{topic.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{topic.desc}</p>
                  <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Quizzes Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Interactive Quizzes</h2>
            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-400">
              <Clock className="w-4 h-4" />
              <span>5-10 min each</span>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-10 h-10 text-blue-400 animate-spin" />
            </div>
          ) : quizzes.length === 0 ? (
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-16 text-center">
              <BookOpen className="w-20 h-20 text-gray-600 mx-auto mb-6" />
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
                    whileHover={{ scale: 1.02, y: -4 }}
                  >
                    <Link to={`${createPageUrl("Quiz")}?id=${quiz.id}`}>
                      <div className="group relative h-full">
                        {/* Glow Effect - Enhanced for mastered quizzes */}
                        <div className={`absolute -inset-0.5 ${isMastered ? 'bg-gradient-to-r from-yellow-600 to-orange-600' : 'bg-gradient-to-r from-blue-600 to-cyan-600'} rounded-2xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-500`} />
                        
                        <div className="relative bg-slate-900/80 backdrop-blur-2xl border border-slate-800 rounded-2xl overflow-hidden h-full">
                          {/* Top Bar - Changes color for mastered */}
                          <div className={`h-1.5 ${isMastered ? 'bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500' : 'bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500'}`} />
                          
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
                            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300 leading-tight">
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
                                  <BookOpen className="w-4 h-4" />
                                  <span>{quiz.questions?.length || 0} questions</span>
                                </div>
                                {isCompleted && (
                                  <div className="flex items-center gap-1.5 text-green-400">
                                    <CheckCircle2 className="w-4 h-4" />
                                    <span className="text-xs">{attempts} {attempts === 1 ? 'attempt' : 'attempts'}</span>
                                  </div>
                                )}
                              </div>
                              
                              <div className="flex items-center gap-2 text-blue-400 font-bold group-hover:gap-3 transition-all duration-300">
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