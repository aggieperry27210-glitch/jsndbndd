import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { BookOpen, TrendingUp, FileSearch, Sparkles, ArrowRight, Star, Zap, Target } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const pathways = [
    {
      title: "Politics",
      description: "Understand how our government works, from the Constitution to current events",
      icon: BookOpen,
      gradient: "from-blue-500 via-blue-600 to-cyan-600",
      hoverGradient: "group-hover:from-blue-400 group-hover:via-blue-500 group-hover:to-cyan-500",
      bgPattern: "bg-[radial-gradient(circle_at_20%_50%,rgba(59,130,246,0.1),transparent_50%)]",
      path: createPageUrl("Politics"),
      stats: { quizzes: "12+", topics: "Government, Rights, Elections" },
      emoji: "🏛️"
    },
    {
      title: "Finance",
      description: "Master money management, budgeting, and financial decision-making",
      icon: TrendingUp,
      gradient: "from-purple-500 via-pink-600 to-rose-600",
      hoverGradient: "group-hover:from-purple-400 group-hover:via-pink-500 group-hover:to-rose-500",
      bgPattern: "bg-[radial-gradient(circle_at_80%_50%,rgba(168,85,247,0.1),transparent_50%)]",
      path: createPageUrl("Finance"),
      stats: { quizzes: "12+", topics: "Budgeting, Credit, Investing" },
      emoji: "💰"
    },
    {
      title: "Math",
      description: "Build essential math skills from arithmetic to advanced problem-solving",
      icon: TrendingUp,
      gradient: "from-green-500 via-emerald-600 to-teal-600",
      hoverGradient: "group-hover:from-green-400 group-hover:via-emerald-500 group-hover:to-teal-500",
      bgPattern: "bg-[radial-gradient(circle_at_50%_20%,rgba(34,197,94,0.1),transparent_50%)]",
      path: createPageUrl("Math"),
      stats: { quizzes: "Coming Soon", topics: "Algebra, Geometry, Statistics" },
      emoji: "📐"
    },
    {
      title: "ELA",
      description: "Improve reading comprehension, writing, grammar, and vocabulary skills",
      icon: BookOpen,
      gradient: "from-indigo-500 via-violet-600 to-purple-600",
      hoverGradient: "group-hover:from-indigo-400 group-hover:via-violet-500 group-hover:to-purple-500",
      bgPattern: "bg-[radial-gradient(circle_at_80%_80%,rgba(99,102,241,0.1),transparent_50%)]",
      path: createPageUrl("ELA"),
      stats: { quizzes: "Coming Soon", topics: "Reading, Writing, Grammar" },
      emoji: "📚"
    },
    {
      title: "Investment Simulator",
      description: "Practice investing with virtual money and learn how the stock market works",
      icon: TrendingUp,
      gradient: "from-green-500 via-emerald-600 to-teal-600",
      hoverGradient: "group-hover:from-green-400 group-hover:via-emerald-500 group-hover:to-teal-500",
      bgPattern: "bg-[radial-gradient(circle_at_50%_80%,rgba(16,185,129,0.1),transparent_50%)]",
      path: createPageUrl("InvestmentSimulator"),
      stats: { feature: "Virtual Trading", capability: "Real-time Simulation" },
      emoji: "📈"
    },
    {
      title: "Budget Challenge",
      description: "Navigate real-world spending scenarios and master money management skills",
      icon: Target,
      gradient: "from-yellow-500 via-orange-600 to-red-600",
      hoverGradient: "group-hover:from-yellow-400 group-hover:via-orange-500 group-hover:to-red-500",
      bgPattern: "bg-[radial-gradient(circle_at_30%_60%,rgba(234,179,8,0.1),transparent_50%)]",
      path: createPageUrl("BudgetChallenge"),
      stats: { feature: "Interactive Game", capability: "Real Scenarios" },
      emoji: "🎯"
    },
    {
      title: "News Bias Checker",
      description: "Analyze articles to detect political bias and become a critical thinker",
      icon: FileSearch,
      gradient: "from-cyan-500 via-sky-600 to-blue-600",
      hoverGradient: "group-hover:from-cyan-400 group-hover:via-sky-500 group-hover:to-blue-500",
      bgPattern: "bg-[radial-gradient(circle_at_50%_20%,rgba(6,182,212,0.1),transparent_50%)]",
      path: createPageUrl("NewsBiasChecker"),
      stats: { feature: "AI-Powered", capability: "Real-time Analysis" },
      emoji: "🔍"
    },
  ];

  const features = [
    { icon: Target, title: "Focused Learning", desc: "Bite-sized lessons for complex topics", color: "text-blue-400" },
    { icon: Star, title: "Track Progress", desc: "See improvement with quiz scores", color: "text-purple-400" },
    { icon: Zap, title: "Critical Thinking", desc: "Develop analysis skills", color: "text-cyan-400" }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Hero Section */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center relative z-10"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600/30 to-cyan-600/30 border border-blue-500/50 backdrop-blur-xl text-blue-300 text-sm font-semibold mb-8 shadow-lg shadow-blue-500/20"
            >
              <Sparkles className="w-4 h-4 animate-pulse" />
              Empowering the Next Generation
            </motion.div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black text-white mb-8 tracking-tight">
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 animate-gradient">
                  Civiccents
                </span>
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                />
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
              Master politics and finance through <span className="text-blue-400 font-semibold">interactive quizzes</span> and 
              use powerful <span className="text-cyan-400 font-semibold">analysis tools</span> designed just for you.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-6 mb-12"
            >
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-full"
                  >
                    <Icon className={`w-4 h-4 ${feature.color}`} />
                    <span className="text-gray-300 text-sm font-medium">{feature.title}</span>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center gap-3 text-sm"
            >
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-ping absolute" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                </div>
                <span className="text-gray-400">Start learning in seconds</span>
              </div>
              <span className="text-gray-600">•</span>
              <span className="text-gray-400">Free to use</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Pathways Grid */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Choose Your Path
            </h2>
            <p className="text-gray-400 text-lg">Select a topic to begin your learning journey</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-20">
            {pathways.map((pathway, index) => {
              const Icon = pathway.icon;
              return (
                <motion.div
                  key={pathway.title}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.15, duration: 0.6 }}
                  whileHover={{ y: -8 }}
                  className="relative group"
                >
                  <Link to={pathway.path}>
                    {/* Glow Effect */}
                    <div className={`absolute -inset-0.5 bg-gradient-to-r ${pathway.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                    
                    {/* Card */}
                    <div className={`relative bg-slate-900/80 backdrop-blur-2xl border border-slate-800 rounded-3xl overflow-hidden ${pathway.bgPattern} h-full`}>
                      {/* Top Gradient Bar */}
                      <div className={`h-2 bg-gradient-to-r ${pathway.gradient} ${pathway.hoverGradient} transition-all duration-500`} />
                      
                      <div className="p-8">
                        {/* Icon & Emoji */}
                        <div className="flex items-center justify-between mb-6">
                          <div className={`relative w-16 h-16 bg-gradient-to-br ${pathway.gradient} rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                            <Icon className="w-8 h-8 text-white" />
                            <div className={`absolute -inset-1 bg-gradient-to-br ${pathway.gradient} rounded-2xl blur-lg opacity-50`} />
                          </div>
                          <span className="text-5xl transform group-hover:scale-125 transition-transform duration-500">
                            {pathway.emoji}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                          {pathway.title}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-400 mb-6 leading-relaxed text-base">
                          {pathway.description}
                        </p>

                        {/* Stats */}
                        <div className="flex gap-3 mb-6 flex-wrap">
                          {pathway.stats.quizzes && (
                            <div className="px-3 py-1.5 bg-slate-800/50 rounded-lg border border-slate-700">
                              <span className="text-xs text-gray-400">Quizzes: </span>
                              <span className="text-xs text-white font-semibold">{pathway.stats.quizzes}</span>
                            </div>
                          )}
                          {pathway.stats.feature && (
                            <div className="px-3 py-1.5 bg-slate-800/50 rounded-lg border border-slate-700">
                              <span className="text-xs text-white font-semibold">{pathway.stats.feature}</span>
                            </div>
                          )}
                        </div>

                        {/* Topics */}
                        <div className="mb-6">
                          <p className="text-xs text-gray-500 mb-2">
                            {pathway.stats.topics ? 'Topics covered:' : 'Features:'}
                          </p>
                          <p className="text-sm text-gray-300">{pathway.stats.topics || pathway.stats.capability}</p>
                        </div>

                        {/* CTA Button */}
                        <div className={`flex items-center justify-between p-4 bg-gradient-to-r ${pathway.gradient} rounded-xl group-hover:shadow-2xl transition-all duration-500`}>
                          <span className="text-white font-bold text-lg">
                            Start Learning
                          </span>
                          <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-2 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Why Choose Civiccents */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                Why Choose Civiccents?
              </h2>
              <p className="text-gray-400 text-lg">Everything you need to become financially and politically literate</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { emoji: "🎯", title: "Focused Lessons", desc: "Complex topics broken down into bite-sized, digestible lessons that anyone can understand", color: "blue" },
                { emoji: "🏆", title: "Track Progress", desc: "Monitor your learning journey with detailed analytics and achievement badges", color: "purple" },
                { emoji: "🧠", title: "Build Skills", desc: "Develop critical thinking abilities through interactive quizzes and real-world scenarios", color: "cyan" },
                { emoji: "📊", title: "Practical Tools", desc: "Use simulators and analyzers to apply what you've learned in safe environments", color: "green" },
                { emoji: "🎓", title: "Expert Content", desc: "Learn from carefully curated material covering essential civic and financial topics", color: "pink" },
                { emoji: "🚀", title: "Free Forever", desc: "Access all features at no cost. Education should be accessible to everyone", color: "orange" }
              ].map((item, index) => {
                const colorClasses = {
                  blue: "hover:border-blue-500/50",
                  purple: "hover:border-purple-500/50",
                  cyan: "hover:border-cyan-500/50",
                  green: "hover:border-green-500/50",
                  pink: "hover:border-pink-500/50",
                  orange: "hover:border-orange-500/50"
                };
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className={`bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 ${colorClasses[item.color]} transition-all duration-300`}
                  >
                    <div className="text-5xl mb-4">{item.emoji}</div>
                    <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
            className="mb-20"
          >
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur-xl opacity-20" />
              <div className="relative bg-slate-900/80 backdrop-blur-2xl border border-slate-800 rounded-3xl p-12">
                <div className="grid md:grid-cols-4 gap-8">
                  {[
                    { number: "24+", label: "Interactive Quizzes", icon: "📚" },
                    { number: "6", label: "Learning Paths", icon: "🛤️" },
                    { number: "100%", label: "Free Access", icon: "🎁" },
                    { number: "∞", label: "Unlimited Retakes", icon: "🔄" }
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.7 + index * 0.1 }}
                      className="text-center"
                    >
                      <div className="text-4xl mb-3">{stat.icon}</div>
                      <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
                        {stat.number}
                      </div>
                      <div className="text-gray-400 font-medium">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
            className="text-center mb-20"
          >
            <div className="relative inline-block">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-lg opacity-40" />
              <div className="relative bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 sm:p-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  Ready to Start Learning?
                </h2>
                <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
                  Join thousands of young people building essential life skills in politics and finance
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link to={createPageUrl("Politics")}>
                    <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white px-8 py-6 text-lg font-bold">
                      Explore Politics
                    </Button>
                  </Link>
                  <Link to={createPageUrl("Finance")}>
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-8 py-6 text-lg font-bold">
                      Explore Finance
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Volunteer Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2 }}
            className="mb-20"
          >
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 via-rose-600 to-orange-600 rounded-3xl blur-xl opacity-20" />
              
              <div className="relative bg-slate-900/80 backdrop-blur-2xl border border-slate-800 rounded-3xl p-8 sm:p-12">
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 2.3, type: "spring" }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-pink-600/30 to-orange-600/30 border border-pink-500/50 backdrop-blur-xl text-pink-300 text-sm font-semibold mb-6"
                  >
                    <Sparkles className="w-4 h-4" />
                    Make a Difference
                  </motion.div>

                  <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                    Volunteer With <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400">Civiccents</span>
                  </h2>
                  <p className="text-gray-300 text-lg mb-8 max-w-3xl mx-auto leading-relaxed">
                    Join our mission to educate the next generation! Whether you're passionate about teaching, content creation, or community building, we'd love to have you on our team.
                  </p>
                </div>

                {/* Embedded Google Form */}
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-orange-600 rounded-2xl blur opacity-10" />
                  <div className="relative bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700">
                    <iframe
                      src="https://docs.google.com/forms/d/e/1FAIpQLSdSZXG3HpLSRxufj0OzJLL6Ueb9Gf-CzDoFQE8vtaSm1SWUbQ/viewform?embedded=true"
                      width="100%"
                      height="800"
                      frameBorder="0"
                      marginHeight="0"
                      marginWidth="0"
                      className="w-full"
                    >
                      Loading…
                    </iframe>
                  </div>
                </div>

                <div className="mt-8 grid md:grid-cols-3 gap-4">
                  {[
                    { emoji: "✍️", title: "Content Creation", desc: "Help create quizzes and educational materials" },
                    { emoji: "🎨", title: "Design & Media", desc: "Contribute graphics, videos, or web design" },
                    { emoji: "🤝", title: "Community Support", desc: "Help moderate and engage with learners" }
                  ].map((role, index) => (
                    <motion.div
                      key={role.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 2.4 + index * 0.1 }}
                      className="bg-slate-800/30 border border-slate-700 rounded-xl p-4 text-center"
                    >
                      <div className="text-4xl mb-2">{role.emoji}</div>
                      <h3 className="font-bold text-white mb-1">{role.title}</h3>
                      <p className="text-sm text-gray-400">{role.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}