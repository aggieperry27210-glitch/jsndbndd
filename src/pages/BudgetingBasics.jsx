import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Wallet, PiggyBank, TrendingDown, Calculator, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function BudgetingBasics() {
  const budgetSteps = [
    {
      step: "1",
      title: "Calculate Your Income",
      icon: "💰",
      description: "Know how much money you have coming in",
      tips: [
        "Include all sources: job, allowance, gifts",
        "Use your net income (after taxes)",
        "Track monthly average if income varies",
        "Don't count money you haven't received yet"
      ]
    },
    {
      step: "2",
      title: "List All Expenses",
      icon: "📝",
      description: "Write down everything you spend money on",
      tips: [
        "Track for a full month to get accurate picture",
        "Include small purchases (they add up!)",
        "Separate needs from wants",
        "Don't forget annual expenses (divide by 12)"
      ]
    },
    {
      step: "3",
      title: "Set Financial Goals",
      icon: "🎯",
      description: "Decide what you're saving for",
      tips: [
        "Short-term: Emergency fund, new phone",
        "Long-term: College, car, first apartment",
        "Make goals specific and measurable",
        "Write them down and review regularly"
      ]
    },
    {
      step: "4",
      title: "Create Your Budget",
      icon: "📊",
      description: "Plan where every dollar will go",
      tips: [
        "Use the 50/30/20 rule as a starting point",
        "Build in savings first (pay yourself first)",
        "Leave room for unexpected expenses",
        "Be realistic about your spending habits"
      ]
    },
    {
      step: "5",
      title: "Track & Adjust",
      icon: "🔄",
      description: "Monitor spending and make changes",
      tips: [
        "Review weekly to stay on track",
        "Use apps or spreadsheets to track",
        "Adjust categories as needed",
        "Celebrate when you meet goals!"
      ]
    }
  ];

  const budgetingMethods = [
    {
      name: "50/30/20 Rule",
      color: "from-blue-500 to-cyan-500",
      description: "Simple percentage-based budgeting",
      breakdown: [
        { percentage: "50%", category: "Needs", examples: "Rent, food, utilities, transportation" },
        { percentage: "30%", category: "Wants", examples: "Entertainment, dining out, hobbies" },
        { percentage: "20%", category: "Savings & Debt", examples: "Emergency fund, goals, paying off debt" }
      ]
    },
    {
      name: "Zero-Based Budget",
      color: "from-purple-500 to-pink-500",
      description: "Give every dollar a specific job",
      breakdown: [
        { percentage: "100%", category: "Assigned", examples: "Income - Expenses = $0 (on paper)" },
        { percentage: "✓", category: "Intentional", examples: "Every dollar has a purpose before the month starts" },
        { percentage: "📊", category: "Detailed", examples: "Track every category and transaction" }
      ]
    },
    {
      name: "Envelope System",
      color: "from-cyan-500 to-teal-500",
      description: "Cash-based spending control",
      breakdown: [
        { percentage: "💵", category: "Cash Only", examples: "Withdraw cash for spending categories" },
        { percentage: "✉️", category: "Envelopes", examples: "One envelope per category (groceries, fun, etc.)" },
        { percentage: "🛑", category: "Hard Limit", examples: "When envelope is empty, stop spending" }
      ]
    }
  ];

  const commonMistakes = [
    { mistake: "Not tracking small purchases", solution: "Small expenses add up! Track everything, even coffee." },
    { mistake: "Being too restrictive", solution: "Leave room for fun or you won't stick to it." },
    { mistake: "Forgetting irregular expenses", solution: "Plan for annual costs like gifts, insurance, etc." },
    { mistake: "Not building an emergency fund", solution: "Save for unexpected expenses first." },
    { mistake: "Giving up after one bad month", solution: "Budgeting is a skill - it takes practice!" }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden pb-20">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link
          to={createPageUrl("Finance")}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Finance
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
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-purple-500/50 backdrop-blur-xl text-purple-300 text-sm font-semibold mb-6"
          >
            <Wallet className="w-4 h-4" />
            Master Your Money
          </motion.div>

          <h1 className="text-5xl sm:text-6xl font-black text-white mb-6">
            Budgeting <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Basics</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Learn how to create and stick to a budget that helps you reach your financial goals
          </p>
        </motion.div>

        {/* What is a Budget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 mb-12"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Calculator className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-3">What is a Budget?</h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                A budget is simply a plan for your money. It helps you decide how to spend and save by tracking what comes in (income) 
                and what goes out (expenses). Think of it as a roadmap for your finances - it shows you where your money is going and 
                helps you get where you want to be financially.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-purple-900/20 border border-purple-700/30 rounded-xl p-4">
              <p className="text-purple-300 font-bold mb-2">✅ Spend Less Than You Earn</p>
              <p className="text-gray-400 text-sm">The golden rule of budgeting</p>
            </div>
            <div className="bg-pink-900/20 border border-pink-700/30 rounded-xl p-4">
              <p className="text-pink-300 font-bold mb-2">🎯 Reach Your Goals</p>
              <p className="text-gray-400 text-sm">Save for what matters to you</p>
            </div>
            <div className="bg-rose-900/20 border border-rose-700/30 rounded-xl p-4">
              <p className="text-rose-300 font-bold mb-2">😌 Reduce Money Stress</p>
              <p className="text-gray-400 text-sm">Know exactly where you stand</p>
            </div>
          </div>
        </motion.div>

        {/* 5 Steps to Budgeting */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-8 text-center">
            5 Steps to Create Your Budget
          </h2>

          <div className="space-y-6">
            {budgetSteps.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                
                <div className="relative bg-slate-900/80 backdrop-blur-2xl border border-slate-800 rounded-2xl p-6">
                  <div className="flex items-start gap-6">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-xl font-black text-white">
                        {item.step}
                      </div>
                      <div className="text-4xl">{item.icon}</div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-gray-400 mb-4">{item.description}</p>
                      
                      <div className="grid md:grid-cols-2 gap-3">
                        {item.tips.map((tip, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-gray-300 text-sm bg-slate-800/50 rounded-lg p-3">
                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                            <span>{tip}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Budgeting Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-8 text-center">
            Popular Budgeting Methods
          </h2>

          <div className="grid lg:grid-cols-3 gap-8">
            {budgetingMethods.map((method, index) => (
              <motion.div
                key={method.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 + index * 0.15 }}
                className="relative group"
              >
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${method.color} rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
                
                <div className="relative bg-slate-900/80 backdrop-blur-2xl border border-slate-800 rounded-3xl overflow-hidden h-full">
                  <div className={`h-2 bg-gradient-to-r ${method.color}`} />
                  
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-3">{method.name}</h3>
                    <p className="text-gray-400 mb-6">{method.description}</p>
                    
                    <div className="space-y-4">
                      {method.breakdown.map((item, idx) => (
                        <div key={idx} className="bg-slate-800/50 rounded-xl p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl font-black text-purple-400">{item.percentage}</span>
                            <span className="text-white font-bold">{item.category}</span>
                          </div>
                          <p className="text-gray-400 text-sm">{item.examples}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Common Mistakes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-8 text-center">
            Common Budgeting Mistakes
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {commonMistakes.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.7 + index * 0.1 }}
                className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-xl p-6"
              >
                <div className="flex items-start gap-3">
                  <span className="text-red-400 text-2xl">❌</span>
                  <div>
                    <h3 className="font-bold text-white mb-2">{item.mistake}</h3>
                    <p className="text-gray-400 text-sm flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      {item.solution}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Pro Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="bg-gradient-to-r from-purple-900/20 via-pink-900/20 to-rose-900/20 border border-purple-700/30 rounded-3xl p-8"
        >
          <h2 className="text-3xl font-bold text-white mb-6 text-center flex items-center justify-center gap-3">
            <PiggyBank className="w-8 h-8 text-purple-400" />
            Pro Budgeting Tips
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">🚀</div>
              <h3 className="font-bold text-white mb-2">Start Small</h3>
              <p className="text-gray-400 text-sm">Don't try to be perfect - start with tracking one category</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🔄</div>
              <h3 className="font-bold text-white mb-2">Review Regularly</h3>
              <p className="text-gray-400 text-sm">Check in weekly to catch problems early</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🎉</div>
              <h3 className="font-bold text-white mb-2">Celebrate Wins</h3>
              <p className="text-gray-400 text-sm">Reward yourself when you hit savings goals</p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2 }}
          className="mt-12 text-center"
        >
          <Link
            to={createPageUrl("Finance")}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-xl shadow-lg shadow-purple-500/30 transition-all duration-300 text-lg"
          >
            Ready to Test Your Knowledge?
            <ArrowLeft className="w-5 h-5 rotate-180" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}