import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CreditCard, TrendingDown, AlertCircle, CheckCircle, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function CreditDebt() {
  const creditScoreFactors = [
    {
      factor: "Payment History",
      weight: "35%",
      icon: "📅",
      color: "from-blue-500 to-cyan-500",
      description: "Most important factor - do you pay bills on time?",
      tips: [
        "Always pay at least the minimum by due date",
        "Set up automatic payments",
        "One late payment can hurt your score for years",
        "Payment history from all credit accounts matters"
      ]
    },
    {
      factor: "Credit Utilization",
      weight: "30%",
      icon: "📊",
      color: "from-purple-500 to-pink-500",
      description: "How much credit you're using vs. available credit",
      tips: [
        "Keep usage below 30% of available credit",
        "Lower is better - aim for under 10%",
        "Pay down balances before statement closes",
        "Don't max out credit cards"
      ]
    },
    {
      factor: "Credit History Length",
      weight: "15%",
      icon: "⏳",
      color: "from-cyan-500 to-teal-500",
      description: "How long you've had credit accounts",
      tips: [
        "Older accounts help your score",
        "Keep oldest credit cards open",
        "Don't close unused cards with good history",
        "Time builds good credit - be patient"
      ]
    },
    {
      factor: "Credit Mix",
      weight: "10%",
      icon: "🔀",
      color: "from-pink-500 to-rose-500",
      description: "Types of credit you have (cards, loans, etc.)",
      tips: [
        "Having different types can help",
        "Don't open accounts just for mix",
        "Credit cards, car loans, student loans, mortgages",
        "Not as important as other factors"
      ]
    },
    {
      factor: "New Credit",
      weight: "10%",
      icon: "✨",
      color: "from-teal-500 to-emerald-500",
      description: "Recent credit applications and new accounts",
      tips: [
        "Too many applications hurt your score",
        "Hard inquiries stay on report 2 years",
        "Opening many accounts looks risky",
        "Shop for rates within 30 days (counts as one inquiry)"
      ]
    }
  ];

  const debtTypes = [
    {
      type: "Good Debt",
      icon: "✅",
      color: "from-green-500 to-emerald-500",
      description: "Debt that can increase your net worth or income",
      examples: [
        "Student loans - investing in education and future earnings",
        "Mortgage - building equity in a home",
        "Business loans - growing income potential",
        "Low-interest loans for appreciating assets"
      ]
    },
    {
      type: "Bad Debt",
      icon: "❌",
      color: "from-red-500 to-rose-500",
      description: "High-interest debt for things that lose value",
      examples: [
        "Credit card debt with high interest (15%+)",
        "Payday loans - extremely high rates",
        "Financing depreciating items (furniture, phones)",
        "Any debt you can't afford to repay"
      ]
    }
  ];

  const payoffStrategies = [
    {
      name: "Debt Avalanche",
      emoji: "🏔️",
      bestFor: "Saving the most money",
      how: "Pay off highest interest rate debts first",
      pros: ["Saves most money on interest", "Mathematically optimal", "Fastest way out of debt"],
      cons: ["Can feel slow if highest rate has big balance", "Requires discipline"]
    },
    {
      name: "Debt Snowball",
      emoji: "⛄",
      bestFor: "Quick wins and motivation",
      how: "Pay off smallest balances first",
      pros: ["Quick wins boost motivation", "Fewer bills to manage sooner", "Psychologically satisfying"],
      cons: ["May pay more interest overall", "Takes longer mathematically"]
    },
    {
      name: "Debt Consolidation",
      emoji: "🔄",
      bestFor: "Simplifying multiple debts",
      how: "Combine debts into one loan",
      pros: ["One payment instead of many", "May lower interest rate", "Easier to manage"],
      cons: ["May extend repayment time", "Needs good credit for best rates", "Possible fees"]
    }
  ];

  const creditCardTips = [
    { tip: "Pay full balance every month", why: "Avoid interest charges completely" },
    { tip: "Never pay just the minimum", why: "You'll pay massive interest over time" },
    { tip: "Use less than 30% of limit", why: "Keeps credit score healthy" },
    { tip: "Pay before due date", why: "Late payments hurt credit score" },
    { tip: "Check statements for errors", why: "Catch fraud or billing mistakes" },
    { tip: "Don't cash advance", why: "High fees and interest start immediately" }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden pb-20">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl animate-pulse delay-700" />
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
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600/30 to-rose-600/30 border border-purple-500/50 backdrop-blur-xl text-purple-300 text-sm font-semibold mb-6"
          >
            <CreditCard className="w-4 h-4" />
            Build Strong Credit
          </motion.div>

          <h1 className="text-5xl sm:text-6xl font-black text-white mb-6">
            Credit & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400">Debt</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Understand credit scores, manage debt wisely, and build a strong financial foundation
          </p>
        </motion.div>

        {/* Credit Score Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 mb-12"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-3">What is a Credit Score?</h2>
              <p className="text-gray-300 leading-relaxed text-lg mb-4">
                Your credit score is a three-digit number (300-850) that represents how trustworthy you are with borrowed money. 
                Lenders use it to decide whether to loan you money and what interest rate to charge. Higher scores = better loan terms.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-5 gap-4">
            <div className="bg-red-900/20 border border-red-700/30 rounded-xl p-4 text-center">
              <p className="text-red-300 font-bold mb-1">300-579</p>
              <p className="text-gray-400 text-sm">Poor</p>
            </div>
            <div className="bg-orange-900/20 border border-orange-700/30 rounded-xl p-4 text-center">
              <p className="text-orange-300 font-bold mb-1">580-669</p>
              <p className="text-gray-400 text-sm">Fair</p>
            </div>
            <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-xl p-4 text-center">
              <p className="text-yellow-300 font-bold mb-1">670-739</p>
              <p className="text-gray-400 text-sm">Good</p>
            </div>
            <div className="bg-lime-900/20 border border-lime-700/30 rounded-xl p-4 text-center">
              <p className="text-lime-300 font-bold mb-1">740-799</p>
              <p className="text-gray-400 text-sm">Very Good</p>
            </div>
            <div className="bg-green-900/20 border border-green-700/30 rounded-xl p-4 text-center">
              <p className="text-green-300 font-bold mb-1">800-850</p>
              <p className="text-gray-400 text-sm">Excellent</p>
            </div>
          </div>
        </motion.div>

        {/* Credit Score Factors */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-8 text-center">
            What Affects Your Credit Score
          </h2>

          <div className="space-y-6">
            {creditScoreFactors.map((item, index) => (
              <motion.div
                key={item.factor}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="relative group"
              >
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${item.color} rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
                
                <div className="relative bg-slate-900/80 backdrop-blur-2xl border border-slate-800 rounded-2xl p-6">
                  <div className="flex items-start gap-6">
                    <div className="flex flex-col items-center gap-2 min-w-[100px]">
                      <div className="text-5xl">{item.icon}</div>
                      <div className="text-2xl font-black text-purple-400">{item.weight}</div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">{item.factor}</h3>
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

        {/* Good Debt vs Bad Debt */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-8 text-center">
            Understanding Different Types of Debt
          </h2>

          <div className="grid lg:grid-cols-2 gap-8">
            {debtTypes.map((debt, index) => (
              <motion.div
                key={debt.type}
                initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3 + index * 0.2 }}
                className="relative group"
              >
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${debt.color} rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
                
                <div className="relative bg-slate-900/80 backdrop-blur-2xl border border-slate-800 rounded-3xl overflow-hidden h-full">
                  <div className={`h-2 bg-gradient-to-r ${debt.color}`} />
                  
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-5xl">{debt.icon}</span>
                      <h3 className="text-3xl font-bold text-white">{debt.type}</h3>
                    </div>
                    
                    <p className="text-gray-300 mb-6 text-lg">{debt.description}</p>
                    
                    <div className="space-y-3">
                      {debt.examples.map((example, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-gray-400 text-sm bg-slate-800/50 rounded-lg p-3">
                          <span className="text-cyan-400 mt-1">→</span>
                          <span>{example}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Debt Payoff Strategies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7 }}
          className="mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-8 text-center">
            Debt Payoff Strategies
          </h2>

          <div className="grid lg:grid-cols-3 gap-6">
            {payoffStrategies.map((strategy, index) => (
              <motion.div
                key={strategy.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 + index * 0.15 }}
                whileHover={{ scale: 1.02 }}
                className="bg-slate-900/80 backdrop-blur-2xl border border-slate-800 rounded-2xl p-6"
              >
                <div className="text-5xl mb-4">{strategy.emoji}</div>
                <h3 className="text-2xl font-bold text-white mb-2">{strategy.name}</h3>
                <p className="text-purple-400 font-semibold mb-3 text-sm">Best for: {strategy.bestFor}</p>
                <p className="text-gray-400 mb-4 text-sm">{strategy.how}</p>
                
                <div className="mb-4">
                  <p className="text-green-400 font-bold text-xs mb-2">✓ Pros:</p>
                  <ul className="space-y-1">
                    {strategy.pros.map((pro, idx) => (
                      <li key={idx} className="text-gray-400 text-xs pl-4">• {pro}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <p className="text-red-400 font-bold text-xs mb-2">⚠ Cons:</p>
                  <ul className="space-y-1">
                    {strategy.cons.map((con, idx) => (
                      <li key={idx} className="text-gray-400 text-xs pl-4">• {con}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Credit Card Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.1 }}
          className="bg-gradient-to-r from-purple-900/20 via-pink-900/20 to-rose-900/20 border border-purple-700/30 rounded-3xl p-8 mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-6 text-center flex items-center justify-center gap-3">
            <CreditCard className="w-8 h-8 text-purple-400" />
            Credit Card Best Practices
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {creditCardTips.map((item, index) => (
              <div key={index} className="bg-slate-900/50 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white mb-1">{item.tip}</p>
                    <p className="text-gray-400 text-sm">{item.why}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.3 }}
          className="text-center"
        >
          <Link
            to={createPageUrl("Finance")}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 hover:from-purple-500 hover:via-pink-500 hover:to-rose-500 text-white font-bold rounded-xl shadow-lg shadow-purple-500/30 transition-all duration-300 text-lg"
          >
            Ready to Test Your Knowledge?
            <ArrowLeft className="w-5 h-5 rotate-180" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}