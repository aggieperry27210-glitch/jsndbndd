import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Building2, Scale, Landmark, Users, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function GovernmentStructure() {
  const branches = [
    {
      name: "Executive Branch",
      icon: Landmark,
      color: "from-blue-500 to-cyan-500",
      leader: "The President",
      role: "Enforces Laws",
      description: "The Executive Branch carries out and enforces laws. It includes the President, Vice President, Cabinet, and federal agencies.",
      keyPoints: [
        "President is Commander in Chief of the military",
        "President can veto bills passed by Congress",
        "President appoints federal judges and cabinet members",
        "President conducts foreign policy and makes treaties",
        "Executive agencies implement and enforce federal regulations"
      ],
      examples: [
        "FBI, CIA, EPA are executive agencies",
        "President signs bills into law or vetoes them",
        "Cabinet members advise the President",
        "President nominates Supreme Court justices"
      ]
    },
    {
      name: "Legislative Branch",
      icon: Users,
      color: "from-purple-500 to-pink-500",
      leader: "Congress (Senate & House)",
      role: "Makes Laws",
      description: "The Legislative Branch makes federal laws. It consists of two chambers: the Senate (100 members) and House of Representatives (435 members).",
      keyPoints: [
        "Congress writes and passes bills that become laws",
        "Senate confirms presidential appointments",
        "Congress controls federal spending and taxation",
        "Can override presidential vetoes with 2/3 vote",
        "Senate ratifies treaties; House initiates revenue bills"
      ],
      examples: [
        "Senators serve 6-year terms, Representatives serve 2-year terms",
        "Each state gets 2 senators; House seats based on population",
        "Congress can impeach and remove federal officials",
        "Must approve the federal budget each year"
      ]
    },
    {
      name: "Judicial Branch",
      icon: Scale,
      color: "from-cyan-500 to-teal-500",
      leader: "Supreme Court",
      role: "Interprets Laws",
      description: "The Judicial Branch interprets the meaning of laws and determines if they follow the Constitution. The Supreme Court is the highest court.",
      keyPoints: [
        "Supreme Court has 9 justices who serve for life",
        "Can declare laws unconstitutional (judicial review)",
        "Settles disputes between states",
        "Hears appeals from lower federal courts",
        "Protects constitutional rights"
      ],
      examples: [
        "Brown v. Board ended school segregation",
        "Marbury v. Madison established judicial review",
        "Federal district courts handle most federal trials",
        "Circuit Courts of Appeals review district court decisions"
      ]
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden pb-20">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link
          to={createPageUrl("Politics")}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Politics
        </Link>

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
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600/30 to-cyan-600/30 border border-blue-500/50 backdrop-blur-xl text-blue-300 text-sm font-semibold mb-6"
          >
            <Building2 className="w-4 h-4" />
            Learn the Basics
          </motion.div>

          <h1 className="text-5xl sm:text-6xl font-black text-white mb-6">
            Government <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Structure</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Understanding the three branches of government and how they work together to run the country
          </p>
        </motion.div>

        {/* Introduction Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Why Three Branches?</h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            The Founding Fathers created three separate branches of government to prevent any single person or group from having too much power. 
            This system of <span className="text-blue-400 font-semibold">"separation of powers"</span> ensures that each branch has specific responsibilities 
            and can check the power of the other branches.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-blue-900/20 border border-blue-700/30 rounded-xl p-4">
              <p className="text-blue-300 font-bold mb-2">🏛️ Separation of Powers</p>
              <p className="text-gray-400 text-sm">Each branch has distinct responsibilities</p>
            </div>
            <div className="bg-purple-900/20 border border-purple-700/30 rounded-xl p-4">
              <p className="text-purple-300 font-bold mb-2">⚖️ Checks and Balances</p>
              <p className="text-gray-400 text-sm">Branches limit each other's power</p>
            </div>
            <div className="bg-cyan-900/20 border border-cyan-700/30 rounded-xl p-4">
              <p className="text-cyan-300 font-bold mb-2">🛡️ Prevents Tyranny</p>
              <p className="text-gray-400 text-sm">No single branch can dominate</p>
            </div>
          </div>
        </motion.div>

        {/* Three Branches */}
        <div className="space-y-8">
          {branches.map((branch, index) => {
            const Icon = branch.icon;
            return (
              <motion.div
                key={branch.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.2 }}
                className="relative group"
              >
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${branch.color} rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
                
                <div className="relative bg-slate-900/80 backdrop-blur-2xl border border-slate-800 rounded-3xl overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${branch.color}`} />
                  
                  <div className="p-8">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-16 h-16 bg-gradient-to-br ${branch.color} rounded-2xl flex items-center justify-center`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-white">{branch.name}</h3>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-blue-400 font-semibold">{branch.leader}</span>
                          <span className="text-gray-600">•</span>
                          <span className="text-cyan-400 font-semibold">{branch.role}</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 leading-relaxed mb-6 text-lg">
                      {branch.description}
                    </p>

                    {/* Key Points */}
                    <div className="mb-6">
                      <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        Key Responsibilities
                      </h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        {branch.keyPoints.map((point, idx) => (
                          <div key={idx} className="flex items-start gap-3 bg-slate-800/50 rounded-xl p-3">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-white text-xs font-bold">{idx + 1}</span>
                            </div>
                            <span className="text-gray-300 text-sm leading-relaxed">{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Examples */}
                    <div>
                      <h4 className="text-lg font-bold text-white mb-3">💡 Real-World Examples</h4>
                      <div className="space-y-2">
                        {branch.examples.map((example, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-gray-400 text-sm">
                            <span className="text-cyan-400 mt-1">→</span>
                            <span>{example}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* How They Work Together */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-12 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-cyan-900/20 border border-blue-700/30 rounded-3xl p-8"
        >
          <h2 className="text-3xl font-bold text-white mb-6 text-center">How They Work Together</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-900/50 rounded-xl p-6">
              <p className="text-blue-400 font-bold mb-3">✓ Congress passes a bill</p>
              <p className="text-gray-400 text-sm">The Legislative Branch writes and votes on legislation</p>
            </div>
            <div className="bg-slate-900/50 rounded-xl p-6">
              <p className="text-purple-400 font-bold mb-3">✓ President signs or vetoes</p>
              <p className="text-gray-400 text-sm">The Executive Branch can approve or reject the bill</p>
            </div>
            <div className="bg-slate-900/50 rounded-xl p-6">
              <p className="text-cyan-400 font-bold mb-3">✓ Courts review if challenged</p>
              <p className="text-gray-400 text-sm">The Judicial Branch ensures laws follow the Constitution</p>
            </div>
          </div>
        </motion.div>

        {/* Ready for Quizzes CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-12 text-center"
        >
          <Link
            to={createPageUrl("Politics")}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all duration-300 text-lg"
          >
            Ready to Test Your Knowledge?
            <ArrowLeft className="w-5 h-5 rotate-180" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}