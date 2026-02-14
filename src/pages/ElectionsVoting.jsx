import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Vote, CheckCircle2, Calendar, MapPin, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function ElectionsVoting() {
  const votingProcess = [
    {
      step: "1",
      title: "Register to Vote",
      description: "Sign up before election deadlines, usually 30 days before",
      details: ["Must be 18 years old", "U.S. citizen", "Meet residency requirements", "Register online, by mail, or in person"]
    },
    {
      step: "2",
      title: "Research Candidates",
      description: "Learn about who's running and their positions on issues",
      details: ["Read candidate websites", "Watch debates", "Check voting records", "Use voter guides"]
    },
    {
      step: "3",
      title: "Know Your Polling Place",
      description: "Find out where and when to vote",
      details: ["Check your registration for location", "Polls usually open 7am-8pm", "Bring required ID", "Can vote early or by mail in many states"]
    },
    {
      step: "4",
      title: "Cast Your Ballot",
      description: "Vote in person or by mail",
      details: ["Follow ballot instructions carefully", "You can ask for help if needed", "Make sure to submit completely", "Get an 'I Voted' sticker!"]
    }
  ];

  const electionTypes = [
    {
      title: "Presidential Elections",
      icon: "🇺🇸",
      color: "from-blue-500 to-cyan-500",
      description: "Every 4 years to elect President and Vice President",
      facts: [
        "Electoral College system (need 270 votes)",
        "Held on first Tuesday after first Monday in November",
        "Primary elections choose party nominees",
        "Inauguration Day is January 20th"
      ]
    },
    {
      title: "Congressional Elections",
      icon: "🏛️",
      color: "from-purple-500 to-pink-500",
      description: "Elect members of Congress",
      facts: [
        "All 435 House seats every 2 years",
        "33-34 Senate seats every 2 years",
        "Called 'midterms' when not presidential year",
        "House members serve 2-year terms, Senators 6-year terms"
      ]
    },
    {
      title: "State & Local Elections",
      icon: "🏙️",
      color: "from-cyan-500 to-teal-500",
      description: "Governor, mayor, school board, and more",
      facts: [
        "Vary by state and locality",
        "Include ballot measures/propositions",
        "Can happen in odd or even years",
        "Directly impact your community"
      ]
    }
  ];

  const whyVoteMatters = [
    {
      title: "Your Voice Matters",
      icon: "📢",
      description: "Every vote helps decide who represents you and what policies are enacted"
    },
    {
      title: "Close Elections",
      icon: "⚖️",
      description: "Many elections are decided by small margins - your vote could be the difference"
    },
    {
      title: "Local Impact",
      icon: "🏘️",
      description: "Local elections affect schools, roads, police, and daily life in your community"
    },
    {
      title: "Honor and Duty",
      icon: "🗽",
      description: "Voting is both a right and responsibility - people fought hard for this right"
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
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600/30 to-purple-600/30 border border-blue-500/50 backdrop-blur-xl text-blue-300 text-sm font-semibold mb-6"
          >
            <Vote className="w-4 h-4" />
            Democracy in Action
          </motion.div>

          <h1 className="text-5xl sm:text-6xl font-black text-white mb-6">
            Elections & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Voting</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Learn how American democracy works through elections and discover why your vote is your voice
          </p>
        </motion.div>

        {/* Voting Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-8 text-center">
            How to Vote
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {votingProcess.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                
                <div className="relative bg-slate-900/80 backdrop-blur-2xl border border-slate-800 rounded-2xl p-6 h-full">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-2xl font-black text-white mb-4">
                    {item.step}
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{item.description}</p>
                  
                  <div className="space-y-2">
                    {item.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-gray-300 text-xs">
                        <CheckCircle2 className="w-3 h-3 text-green-400 flex-shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Types of Elections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-8 text-center">
            Types of Elections
          </h2>

          <div className="grid lg:grid-cols-3 gap-8">
            {electionTypes.map((election, index) => (
              <motion.div
                key={election.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.15 }}
                className="relative group"
              >
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${election.color} rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
                
                <div className="relative bg-slate-900/80 backdrop-blur-2xl border border-slate-800 rounded-3xl overflow-hidden h-full">
                  <div className={`h-2 bg-gradient-to-r ${election.color}`} />
                  
                  <div className="p-6">
                    <div className="text-5xl mb-4">{election.icon}</div>
                    <h3 className="text-2xl font-bold text-white mb-3">{election.title}</h3>
                    <p className="text-gray-300 mb-6">{election.description}</p>
                    
                    <div className="space-y-3">
                      {election.facts.map((fact, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-gray-400 text-sm">
                          <span className="text-cyan-400 mt-1">→</span>
                          <span>{fact}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Electoral College Explainer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <MapPin className="w-8 h-8 text-blue-400" />
            Understanding the Electoral College
          </h2>
          
          <p className="text-gray-300 leading-relaxed mb-6 text-lg">
            The Electoral College is a unique system for electing the President. Instead of a direct popular vote, each state gets electors 
            based on its number of Senators (2) plus Representatives (based on population). There are 538 total electors, and a candidate 
            needs 270 to win.
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-blue-900/20 border border-blue-700/30 rounded-xl p-4">
              <p className="text-blue-300 font-bold mb-2">🗳️ Winner-Take-All</p>
              <p className="text-gray-400 text-sm">Most states give all electors to the winner of that state</p>
            </div>
            <div className="bg-purple-900/20 border border-purple-700/30 rounded-xl p-4">
              <p className="text-purple-300 font-bold mb-2">🎯 270 to Win</p>
              <p className="text-gray-400 text-sm">Need majority of 538 electoral votes to become President</p>
            </div>
            <div className="bg-pink-900/20 border border-pink-700/30 rounded-xl p-4">
              <p className="text-pink-300 font-bold mb-2">⚖️ Swing States</p>
              <p className="text-gray-400 text-sm">Competitive states get more campaign attention</p>
            </div>
          </div>
        </motion.div>

        {/* Why Voting Matters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-8 text-center">
            Why Your Vote Matters
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyVoteMatters.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-700/40 rounded-xl p-6 text-center"
              >
                <div className="text-5xl mb-4">{reason.icon}</div>
                <h3 className="font-bold text-white mb-3">{reason.title}</h3>
                <p className="text-gray-400 text-sm">{reason.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Important Dates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
          className="bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-pink-900/20 border border-blue-700/30 rounded-3xl p-8"
        >
          <h2 className="text-3xl font-bold text-white mb-6 text-center flex items-center justify-center gap-3">
            <Calendar className="w-8 h-8 text-blue-400" />
            Key Election Dates
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-900/50 rounded-xl p-6">
              <p className="text-blue-400 font-bold text-lg mb-2">📅 Registration Deadlines</p>
              <p className="text-gray-300">Usually 15-30 days before Election Day (varies by state)</p>
            </div>
            <div className="bg-slate-900/50 rounded-xl p-6">
              <p className="text-purple-400 font-bold text-lg mb-2">📅 Early Voting</p>
              <p className="text-gray-300">Starts 2-4 weeks before Election Day in many states</p>
            </div>
            <div className="bg-slate-900/50 rounded-xl p-6">
              <p className="text-pink-400 font-bold text-lg mb-2">📅 Election Day</p>
              <p className="text-gray-300">First Tuesday after first Monday in November</p>
            </div>
            <div className="bg-slate-900/50 rounded-xl p-6">
              <p className="text-cyan-400 font-bold text-lg mb-2">📅 Inauguration</p>
              <p className="text-gray-300">January 20th following a presidential election</p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="mt-12 text-center"
        >
          <Link
            to={createPageUrl("Politics")}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all duration-300 text-lg"
          >
            Ready to Test Your Knowledge?
            <ArrowLeft className="w-5 h-5 rotate-180" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}