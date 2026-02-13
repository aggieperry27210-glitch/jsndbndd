import React from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Trophy, Star, TrendingUp, BookOpen, Award, Calendar, Target, Zap, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Progress() {
  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ['current-user'],
    queryFn: () => base44.auth.me(),
  });

  const { data: allQuizzes, isLoading: quizzesLoading } = useQuery({
    queryKey: ['all-quizzes'],
    queryFn: () => base44.entities.Quiz.list(),
    initialData: [],
  });

  const { data: userProgress, isLoading: progressLoading } = useQuery({
    queryKey: ['user-progress', user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      return base44.entities.UserProgress.filter({ created_by: user.email }, '-completed_at');
    },
    initialData: [],
    enabled: !!user?.email,
  });

  if (quizzesLoading || progressLoading || userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-blue-400 animate-spin" />
      </div>
    );
  }

  // Calculate statistics
  const politicsQuizzes = allQuizzes.filter(q => q.category === 'politics');
  const financeQuizzes = allQuizzes.filter(q => q.category === 'finance');
  
  const completedQuizIds = [...new Set(userProgress.map(p => p.quiz_id))];
  const completedPolitics = completedQuizIds.filter(id => 
    politicsQuizzes.find(q => q.id === id)
  ).length;
  const completedFinance = completedQuizIds.filter(id => 
    financeQuizzes.find(q => q.id === id)
  ).length;

  const totalCompleted = completedQuizIds.length;
  const totalQuizzes = allQuizzes.length;
  const completionPercentage = totalQuizzes > 0 ? Math.round((totalCompleted / totalQuizzes) * 100) : 0;

  const averageScore = userProgress.length > 0 
    ? Math.round(userProgress.reduce((sum, p) => sum + p.score, 0) / userProgress.length)
    : 0;

  const politicsScores = userProgress.filter(p => 
    politicsQuizzes.find(q => q.id === p.quiz_id)
  );
  const financeScores = userProgress.filter(p => 
    financeQuizzes.find(q => q.id === p.quiz_id)
  );

  const avgPoliticsScore = politicsScores.length > 0
    ? Math.round(politicsScores.reduce((sum, p) => sum + p.score, 0) / politicsScores.length)
    : 0;
  const avgFinanceScore = financeScores.length > 0
    ? Math.round(financeScores.reduce((sum, p) => sum + p.score, 0) / financeScores.length)
    : 0;

  // Achievements
  const achievements = [
    {
      title: "Getting Started",
      description: "Complete your first quiz",
      icon: "🎯",
      earned: totalCompleted >= 1,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Quiz Master",
      description: "Complete 5 quizzes",
      icon: "📚",
      earned: totalCompleted >= 5,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Perfect Score",
      description: "Get 100% on any quiz",
      icon: "💯",
      earned: userProgress.some(p => p.score === 100),
      color: "from-yellow-500 to-orange-500"
    },
    {
      title: "Politics Expert",
      description: "Complete all Politics quizzes",
      icon: "🏛️",
      earned: completedPolitics === politicsQuizzes.length && politicsQuizzes.length > 0,
      color: "from-blue-500 to-indigo-500"
    },
    {
      title: "Finance Guru",
      description: "Complete all Finance quizzes",
      icon: "💰",
      earned: completedFinance === financeQuizzes.length && financeQuizzes.length > 0,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Overachiever",
      description: "Maintain 90%+ average score",
      icon: "⭐",
      earned: averageScore >= 90 && userProgress.length >= 3,
      color: "from-pink-500 to-rose-500"
    },
  ];

  const earnedAchievements = achievements.filter(a => a.earned);

  return (
    <div className="min-h-screen relative overflow-hidden pb-20">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600/30 to-purple-600/30 border border-blue-500/50 backdrop-blur-xl text-blue-300 text-sm font-semibold mb-6"
          >
            <Trophy className="w-4 h-4" />
            Your Learning Journey
          </motion.div>

          <h1 className="text-5xl sm:text-6xl font-black text-white mb-6">
            Progress <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Dashboard</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Track your achievements, review your quiz history, and see how far you've come
          </p>
        </motion.div>

        {/* Overview Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-4 gap-6 mb-12"
        >
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
            <div className="relative bg-slate-900/80 backdrop-blur-2xl border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Quizzes Completed</p>
                  <p className="text-3xl font-black text-white">{totalCompleted}</p>
                </div>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">{totalCompleted} of {totalQuizzes} ({completionPercentage}%)</p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
            <div className="relative bg-slate-900/80 backdrop-blur-2xl border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Average Score</p>
                  <p className="text-3xl font-black text-white">{averageScore}%</p>
                </div>
              </div>
              <p className="text-xs text-gray-400">
                {averageScore >= 90 ? "🔥 Excellent!" : averageScore >= 75 ? "👍 Great work!" : averageScore >= 60 ? "💪 Keep going!" : "📚 Practice more!"}
              </p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-600 to-teal-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
            <div className="relative bg-slate-900/80 backdrop-blur-2xl border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Politics</p>
                  <p className="text-3xl font-black text-white">{completedPolitics}/{politicsQuizzes.length}</p>
                </div>
              </div>
              <p className="text-xs text-gray-400">Avg: {avgPoliticsScore}%</p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-rose-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
            <div className="relative bg-slate-900/80 backdrop-blur-2xl border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Finance</p>
                  <p className="text-3xl font-black text-white">{completedFinance}/{financeQuizzes.length}</p>
                </div>
              </div>
              <p className="text-xs text-gray-400">Avg: {avgFinanceScore}%</p>
            </div>
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <Award className="w-8 h-8 text-yellow-400" />
            Achievements
            <span className="text-sm font-normal text-gray-400">({earnedAchievements.length}/{achievements.length})</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="relative group"
              >
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${achievement.color} rounded-2xl blur ${achievement.earned ? 'opacity-40' : 'opacity-10'} transition-opacity duration-500`} />
                
                <div className={`relative bg-slate-900/80 backdrop-blur-2xl border border-slate-800 rounded-2xl p-6 ${!achievement.earned && 'opacity-50 grayscale'}`}>
                  <div className="flex items-start gap-4">
                    <div className="text-5xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">{achievement.title}</h3>
                      <p className="text-gray-400 text-sm">{achievement.description}</p>
                      {achievement.earned && (
                        <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-green-500/20 border border-green-500/40 rounded-full">
                          <Zap className="w-3 h-3 text-green-400" />
                          <span className="text-xs font-semibold text-green-400">Unlocked!</span>
                        </div>
                      )}
                      {!achievement.earned && (
                        <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-gray-500/20 border border-gray-500/40 rounded-full">
                          <Target className="w-3 h-3 text-gray-400" />
                          <span className="text-xs font-semibold text-gray-400">Locked</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quiz History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <Calendar className="w-8 h-8 text-blue-400" />
            Quiz History
          </h2>

          {userProgress.length === 0 ? (
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-16 text-center">
              <BookOpen className="w-20 h-20 text-gray-600 mx-auto mb-6" />
              <p className="text-gray-400 text-xl mb-6">No quizzes completed yet</p>
              <div className="flex gap-4 justify-center">
                <Link
                  to={createPageUrl("Politics")}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all duration-300"
                >
                  Start Politics Quiz
                </Link>
                <Link
                  to={createPageUrl("Finance")}
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-all duration-300"
                >
                  Start Finance Quiz
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {userProgress.map((progress, index) => {
                const quiz = allQuizzes.find(q => q.id === progress.quiz_id);
                if (!quiz) return null;

                const scoreColor = progress.score >= 90 ? 'text-green-400' :
                                 progress.score >= 75 ? 'text-blue-400' :
                                 progress.score >= 60 ? 'text-yellow-400' : 'text-red-400';

                const categoryColor = quiz.category === 'politics' ? 'from-blue-500 to-cyan-500' : 'from-purple-500 to-pink-500';

                return (
                  <motion.div
                    key={progress.id || index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + index * 0.05 }}
                    className="relative group"
                  >
                    <div className={`absolute -inset-0.5 bg-gradient-to-r ${categoryColor} rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                    
                    <div className="relative bg-slate-900/80 backdrop-blur-2xl border border-slate-800 rounded-2xl p-6">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className={`px-3 py-1 bg-gradient-to-r ${categoryColor} rounded-full text-white text-xs font-bold uppercase`}>
                              {quiz.category}
                            </span>
                            {progress.score === 100 && (
                              <span className="text-2xl">💯</span>
                            )}
                            {progress.score >= 90 && progress.score < 100 && (
                              <span className="text-2xl">⭐</span>
                            )}
                          </div>
                          <h3 className="text-xl font-bold text-white mb-1">{progress.quiz_title}</h3>
                          <p className="text-sm text-gray-400">
                            Completed {new Date(progress.completed_at).toLocaleDateString()} at {new Date(progress.completed_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className={`text-4xl font-black ${scoreColor}`}>
                              {progress.score}%
                            </p>
                            <p className="text-xs text-gray-400">
                              {progress.correct_answers}/{progress.total_questions} correct
                            </p>
                          </div>

                          <Link
                            to={`${createPageUrl("Quiz")}?id=${quiz.id}`}
                            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-all duration-300 text-sm font-semibold"
                          >
                            Retake
                          </Link>
                        </div>
                      </div>
                    </div>
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