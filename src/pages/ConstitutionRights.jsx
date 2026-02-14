import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ScrollText, Shield, Users, Gavel, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function ConstitutionRights() {
  const billOfRights = [
    {
      number: "1st",
      title: "Freedom of Expression",
      icon: "🗣️",
      rights: ["Freedom of speech", "Freedom of religion", "Freedom of the press", "Right to assemble", "Right to petition government"],
      explanation: "Protects your right to express yourself, practice your religion, and peacefully protest."
    },
    {
      number: "2nd",
      title: "Right to Bear Arms",
      icon: "🔫",
      rights: ["Right to keep and bear arms"],
      explanation: "Protects the right to own weapons for self-defense and militia service."
    },
    {
      number: "3rd",
      title: "No Quartering of Soldiers",
      icon: "🏠",
      rights: ["Can't be forced to house soldiers"],
      explanation: "Prevents the government from forcing you to let soldiers live in your home."
    },
    {
      number: "4th",
      title: "Protection from Searches",
      icon: "🔒",
      rights: ["Protection from unreasonable searches", "Warrants required"],
      explanation: "Police need a warrant to search your property, protecting your privacy."
    },
    {
      number: "5th",
      title: "Rights in Criminal Cases",
      icon: "⚖️",
      rights: ["Right to remain silent", "No double jeopardy", "Due process", "Just compensation for property"],
      explanation: "You can't be forced to testify against yourself or be tried twice for the same crime."
    },
    {
      number: "6th",
      title: "Right to Fair Trial",
      icon: "👨‍⚖️",
      rights: ["Speedy and public trial", "Impartial jury", "Right to lawyer", "Face your accuser"],
      explanation: "Guarantees a fair and speedy trial with legal representation."
    },
    {
      number: "7th",
      title: "Right to Jury in Civil Cases",
      icon: "📋",
      rights: ["Jury trial in civil cases over $20"],
      explanation: "Preserves the right to jury trials in civil lawsuits."
    },
    {
      number: "8th",
      title: "No Cruel Punishment",
      icon: "🚫",
      rights: ["No excessive bail", "No cruel and unusual punishment"],
      explanation: "Protects against torture and excessive punishments."
    },
    {
      number: "9th",
      title: "Other Rights Retained",
      icon: "✨",
      rights: ["Rights not listed are still protected"],
      explanation: "Just because a right isn't in the Constitution doesn't mean you don't have it."
    },
    {
      number: "10th",
      title: "Powers Reserved to States",
      icon: "🏛️",
      rights: ["Powers not given to federal government belong to states and people"],
      explanation: "Limits federal power and reserves other powers for states and citizens."
    }
  ];

  const importantAmendments = [
    { number: "13th", title: "Abolished Slavery", year: "1865", description: "Ended slavery in the United States" },
    { number: "14th", title: "Equal Protection", year: "1868", description: "Granted citizenship and equal protection under law" },
    { number: "15th", title: "Voting Rights (Race)", year: "1870", description: "Prohibited denying vote based on race" },
    { number: "19th", title: "Women's Suffrage", year: "1920", description: "Gave women the right to vote" },
    { number: "26th", title: "Voting Age", year: "1971", description: "Lowered voting age to 18" }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden pb-20">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl animate-pulse delay-700" />
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
            <ScrollText className="w-4 h-4" />
            Your Fundamental Rights
          </motion.div>

          <h1 className="text-5xl sm:text-6xl font-black text-white mb-6">
            The Constitution & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Your Rights</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Learn about the supreme law of the land and the rights that protect every American citizen
          </p>
        </motion.div>

        {/* Constitution Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 mb-12"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center flex-shrink-0">
              <ScrollText className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-3">What is the Constitution?</h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                The U.S. Constitution, written in 1787, is the supreme law of the United States. It establishes the framework of our government 
                and guarantees fundamental rights and freedoms to all citizens. It's the oldest written national constitution still in use today.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-blue-900/20 border border-blue-700/30 rounded-xl p-4">
              <p className="text-blue-300 font-bold mb-2">📜 7 Articles</p>
              <p className="text-gray-400 text-sm">Original structure and framework</p>
            </div>
            <div className="bg-cyan-900/20 border border-cyan-700/30 rounded-xl p-4">
              <p className="text-cyan-300 font-bold mb-2">✍️ 27 Amendments</p>
              <p className="text-gray-400 text-sm">Changes and additions over time</p>
            </div>
            <div className="bg-teal-900/20 border border-teal-700/30 rounded-xl p-4">
              <p className="text-teal-300 font-bold mb-2">🛡️ Supreme Law</p>
              <p className="text-gray-400 text-sm">All other laws must follow it</p>
            </div>
          </div>
        </motion.div>

        {/* Bill of Rights */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-8 text-center">
            The Bill of Rights
          </h2>
          <p className="text-gray-300 text-center mb-12 text-lg max-w-3xl mx-auto">
            The first 10 amendments to the Constitution, ratified in 1791, guarantee essential rights and liberties to all Americans
          </p>

          <div className="grid lg:grid-cols-2 gap-6">
            {billOfRights.map((amendment, index) => (
              <motion.div
                key={amendment.number}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                
                <div className="relative bg-slate-900/80 backdrop-blur-2xl border border-slate-800 rounded-2xl p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-4xl">{amendment.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl font-black text-blue-400">{amendment.number}</span>
                        <h3 className="text-xl font-bold text-white">{amendment.title}</h3>
                      </div>
                      <p className="text-gray-400 text-sm mb-4">{amendment.explanation}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {amendment.rights.map((right, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                        <span>{right}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Other Important Amendments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-8 text-center">
            Other Important Amendments
          </h2>
          <p className="text-gray-300 text-center mb-12 text-lg max-w-3xl mx-auto">
            These amendments expanded rights and freedoms to more Americans
          </p>

          <div className="grid md:grid-cols-5 gap-4">
            {importantAmendments.map((amendment, index) => (
              <motion.div
                key={amendment.number}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.3 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border border-blue-700/40 rounded-xl p-6 text-center"
              >
                <div className="text-4xl font-black text-blue-400 mb-2">{amendment.number}</div>
                <h3 className="font-bold text-white mb-2 text-sm">{amendment.title}</h3>
                <p className="text-xs text-gray-500 mb-2">{amendment.year}</p>
                <p className="text-xs text-gray-400">{amendment.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why It Matters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="bg-gradient-to-r from-blue-900/20 via-cyan-900/20 to-teal-900/20 border border-blue-700/30 rounded-3xl p-8"
        >
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Why These Rights Matter</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <Shield className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="font-bold text-white mb-2">Protection from Government</h3>
              <p className="text-gray-400 text-sm">These rights limit government power and protect individual freedom</p>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="font-bold text-white mb-2">Equal Treatment</h3>
              <p className="text-gray-400 text-sm">Constitutional rights apply to all citizens equally under the law</p>
            </div>
            <div className="text-center">
              <Gavel className="w-12 h-12 text-teal-400 mx-auto mb-4" />
              <h3 className="font-bold text-white mb-2">Legal Foundation</h3>
              <p className="text-gray-400 text-sm">Courts use these rights to make decisions and strike down unjust laws</p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7 }}
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