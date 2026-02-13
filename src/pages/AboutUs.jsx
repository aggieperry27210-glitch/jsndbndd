import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Heart, Users, Target, Lightbulb, Award } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="min-h-screen relative overflow-hidden pb-20">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600/30 to-purple-600/30 border border-blue-500/50 backdrop-blur-xl text-blue-300 text-sm font-semibold mb-6"
          >
            <Sparkles className="w-4 h-4" />
            Our Story
          </motion.div>

          <h1 className="text-5xl sm:text-6xl font-black text-white mb-6">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Civiccents</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Empowering the next generation with essential knowledge about politics and financial literacy
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white">Our Mission</h2>
          </div>
          <p className="text-gray-300 text-lg leading-relaxed mb-4">
            Civiccents was created to teach young people about financial literacy and political awareness through engaging, interactive learning experiences. We believe that understanding how government works and how to manage money are essential life skills that everyone should have access to.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            Through our platform, students can learn at their own pace, test their knowledge with quizzes, and develop critical thinking skills that will serve them throughout their lives.
          </p>
        </motion.div>

        {/* Founders Section - Side by Side */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid md:grid-cols-2 gap-8 mb-12"
        >
          {/* Tanaya Patton */}
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-20" />
            
            <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700 rounded-3xl overflow-hidden h-full">
              <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
              
              <div className="p-8">
                <div className="flex items-center justify-center mb-6">
                  <div className="relative">
                    <div className="w-28 h-28 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center text-5xl">
                      👩‍💼
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center border-4 border-slate-900">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>

                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold text-white mb-2">Tanaya Patton</h2>
                  <p className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-semibold">
                    Co-Founder & CEO
                  </p>
                </div>

                <div className="space-y-3 text-gray-300 leading-relaxed">
                  <p>
                    I am the co-founder and CEO of Civiccents. I grew up learning about financial literacy from movies and my family, who taught me the importance of understanding money. I first learned about the stock market from a film, and later, through research, I gained a deeper understanding of it.
                  </p>
                  <p>
                    Additionally, I grew up watching JFK's speeches, which inspired me to learn about politics. I eventually hope to pursue a career in politics in the future, using the knowledge and passion I've developed over the years.
                  </p>
                  <p>
                    We created Civiccents to teach young people about financial literacy and political awareness—essential skills that will help them navigate the world with confidence. We teamed up with an engineer to help build this website, as well as other dedicated individuals who assisted with creating educational content and questions.
                  </p>
                  <p className="text-blue-400 font-semibold pt-2">
                    Together, we're empowering the next generation! 🚀
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tricia Johnson */}
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-600 to-teal-600 rounded-3xl blur opacity-20" />
            
            <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700 rounded-3xl overflow-hidden h-full">
              <div className="h-2 bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500" />
              
              <div className="p-8">
                <div className="flex items-center justify-center mb-6">
                  <div className="relative">
                    <div className="w-28 h-28 bg-gradient-to-br from-cyan-500 via-teal-500 to-emerald-500 rounded-full flex items-center justify-center text-5xl">
                      👩‍⚖️
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center border-4 border-slate-900">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>

                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold text-white mb-2">Tricia Johnson</h2>
                  <p className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400 font-semibold">
                    Co-Founder & COO
                  </p>
                </div>

                <div className="space-y-3 text-gray-300 leading-relaxed">
                  <p>
                    I am the co-founder and COO of Civiccents. Currently in college at age 19, I am pursuing a degree in political science with a clear vision for my future. My academic journey is driven by a deep passion for law and justice.
                  </p>
                  <p>
                    My goal with my education is to dive into becoming a licensed attorney, building up diverse experiences and expertise in the legal field. I'm particularly interested in constitutional law and civil rights, areas that directly impact the topics we teach at Civiccents.
                  </p>
                  <p>
                    Beyond passing the bar, I aspire to start my own law firm where I can advocate for justice and help those who need legal representation. This entrepreneurial spirit is what drew me to co-founding Civiccents—I believe in creating platforms that empower and educate.
                  </p>
                  <p className="text-cyan-400 font-semibold pt-2">
                    Education and civic engagement are the foundations of a better future! ⚖️
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* What We Offer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">What We Offer</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "🏛️",
                title: "Political Education",
                description: "Learn about government structure, the Constitution, voting, and how democracy works",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: "💰",
                title: "Financial Literacy",
                description: "Master budgeting, credit management, saving, and investing for a secure future",
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: "🔍",
                title: "Critical Thinking",
                description: "Develop analytical skills with our AI-powered news bias checker tool",
                color: "from-emerald-500 to-teal-500"
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="relative group"
              >
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${item.color} rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                
                <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 h-full">
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-pink-900/20 border border-blue-700/30 rounded-3xl p-8"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Our Values</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Lightbulb, title: "Education First", desc: "Making complex topics accessible to everyone" },
              { icon: Heart, title: "Passion Driven", desc: "Built with genuine care for student success" },
              { icon: Users, title: "Community Focused", desc: "Empowering the next generation together" },
              { icon: Target, title: "Results Oriented", desc: "Helping students achieve real understanding" }
            ].map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1 + index * 0.1 }}
                  className="flex items-start gap-4 bg-slate-900/50 rounded-xl p-4"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{value.title}</h3>
                    <p className="text-gray-400 text-sm">{value.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Thank You Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="mt-12 text-center"
        >
          <div className="inline-block bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-3">Thank You for Being Here! 🎓</h3>
            <p className="text-gray-300 text-lg mb-6">
              We're excited to be part of your learning journey
            </p>
            
            {/* Tooltip Button Demo */}
            <div className="inline-block relative group">
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors">
                Hover for Info
              </button>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-4 py-2 bg-slate-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap pointer-events-none shadow-xl border border-slate-700">
                This is a CSS-only tooltip! 💡
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-800"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}