import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { DollarSign, TrendingUp, TrendingDown, AlertCircle, CheckCircle2, Target, Calendar, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BudgetChallenge() {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(1);
  const [monthlyIncome, setMonthlyIncome] = useState("");
  
  // Budget allocations
  const [budget, setBudget] = useState({
    needs: 0,      // 50%
    wants: 0,      // 30%
    savings: 0,    // 20%
  });
  
  const [currentBalance, setCurrentBalance] = useState(0);
  const [totalSavings, setTotalSavings] = useState(0);
  const [savingsGoal] = useState(5000);
  const [currentScenario, setCurrentScenario] = useState(null);
  const [scenarioHistory, setScenarioHistory] = useState([]);
  const [monthComplete, setMonthComplete] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const scenarios = [
    {
      id: 1,
      type: "expense",
      title: "Car Trouble! 🚗",
      description: "Your car broke down and needs immediate repair.",
      choices: [
        { text: "Pay for full repair ($400)", impact: -400, category: "needs", feedback: "Good choice - your car is essential for work!" },
        { text: "Get budget repair ($200)", impact: -200, category: "needs", feedback: "Smart compromise - saves money but gets you moving." },
        { text: "Skip repair, use public transit", impact: -50, category: "wants", feedback: "Risky but frugal. Hope it doesn't cause bigger problems!" }
      ]
    },
    {
      id: 2,
      type: "income",
      title: "Bonus Income! 💰",
      description: "You received a $300 bonus at work!",
      choices: [
        { text: "Save it all", impact: 300, category: "savings", feedback: "Excellent! Building your emergency fund." },
        { text: "Save half, spend half", impact: 150, category: "savings", split: 150, feedback: "Balanced approach - treating yourself responsibly." },
        { text: "Spend it on something fun", impact: 0, category: "wants", feedback: "You deserve it, but remember your savings goals!" }
      ]
    },
    {
      id: 3,
      type: "expense",
      title: "Friend's Birthday Party 🎉",
      description: "Your best friend invited you to an expensive dinner ($80).",
      choices: [
        { text: "Go and pay full amount", impact: -80, category: "wants", feedback: "Memories matter, but watch your budget!" },
        { text: "Suggest cheaper alternative", impact: -30, category: "wants", feedback: "Good negotiation! Friends understand budgets." },
        { text: "Politely decline", impact: 0, category: "wants", feedback: "Tough choice, but staying on budget." }
      ]
    },
    {
      id: 4,
      type: "expense",
      title: "Streaming Services 📺",
      description: "You have 4 streaming subscriptions totaling $60/month.",
      choices: [
        { text: "Keep all subscriptions", impact: -60, category: "wants", feedback: "Entertainment is nice, but adds up fast!" },
        { text: "Cancel 2 subscriptions", impact: -30, category: "wants", feedback: "Smart cut! You probably don't use them all anyway." },
        { text: "Cancel all but one", impact: -15, category: "wants", feedback: "Frugal choice! One service is enough." }
      ]
    },
    {
      id: 5,
      type: "expense",
      title: "Medical Bill 🏥",
      description: "Unexpected doctor visit and medication ($150).",
      choices: [
        { text: "Pay immediately", impact: -150, category: "needs", feedback: "Health is wealth! Good priority." },
        { text: "Set up payment plan", impact: -50, category: "needs", feedback: "Manageable approach. Spreads the cost." }
      ]
    },
    {
      id: 6,
      type: "income",
      title: "Side Hustle Opportunity 💼",
      description: "You can earn $200 doing freelance work this weekend.",
      choices: [
        { text: "Take the gig", impact: 200, category: "savings", feedback: "Hustle pays off! Extra income secured." },
        { text: "Decline - need rest", impact: 0, category: "wants", feedback: "Self-care matters too. Balance is key." }
      ]
    },
    {
      id: 7,
      type: "expense",
      title: "Grocery Shopping 🛒",
      description: "Time to buy groceries for the week.",
      choices: [
        { text: "Buy premium/organic ($120)", impact: -120, category: "needs", feedback: "Quality food, but expensive!" },
        { text: "Buy regular groceries ($80)", impact: -80, category: "needs", feedback: "Smart balance of quality and cost." },
        { text: "Buy budget basics ($50)", impact: -50, category: "needs", feedback: "Frugal choice! Meal planning helps." }
      ]
    },
    {
      id: 8,
      type: "expense",
      title: "New Phone? 📱",
      description: "Your phone is old but working. New model is $800 (or $40/month).",
      choices: [
        { text: "Buy new phone outright", impact: -800, category: "wants", feedback: "Big expense! Could have saved that money." },
        { text: "Finance it monthly", impact: -40, category: "wants", feedback: "Debt adds up. Is it really necessary?" },
        { text: "Keep current phone", impact: 0, category: "wants", feedback: "Wise choice! If it works, don't replace it." }
      ]
    },
    {
      id: 9,
      type: "income",
      title: "Tax Refund! 💵",
      description: "You got a $600 tax refund!",
      choices: [
        { text: "Save it all", impact: 600, category: "savings", feedback: "Amazing! Big boost to your savings goal." },
        { text: "Pay off debt", impact: 300, category: "needs", split: 300, feedback: "Smart! Reducing debt is investing in yourself." },
        { text: "Splurge on vacation", impact: 0, category: "wants", feedback: "Fun now, but goals delayed. Worth it?" }
      ]
    },
    {
      id: 10,
      type: "expense",
      title: "Coffee Habit ☕",
      description: "Daily $5 coffee = $150/month. Time to evaluate?",
      choices: [
        { text: "Keep buying daily", impact: -150, category: "wants", feedback: "Small purchases add up to big money!" },
        { text: "Cut to 3x per week", impact: -60, category: "wants", feedback: "Good compromise! Saves $90/month." },
        { text: "Make coffee at home", impact: -20, category: "wants", feedback: "Frugal win! Saves $130/month." }
      ]
    }
  ];

  const startGame = () => {
    const income = parseFloat(monthlyIncome);
    if (income < 1000 || income > 10000) {
      alert("Please enter a monthly income between $1,000 and $10,000");
      return;
    }

    const needs = income * 0.5;
    const wants = income * 0.3;
    const savings = income * 0.2;

    setBudget({ needs, wants, savings });
    setCurrentBalance(income);
    setTotalSavings(savings);
    setGameStarted(true);
    presentRandomScenario();
  };

  const presentRandomScenario = () => {
    const unusedScenarios = scenarios.filter(
      s => !scenarioHistory.some(h => h.id === s.id)
    );
    
    if (unusedScenarios.length === 0) {
      setMonthComplete(true);
      return;
    }

    const randomScenario = unusedScenarios[Math.floor(Math.random() * unusedScenarios.length)];
    setCurrentScenario(randomScenario);
  };

  const handleChoice = (choice) => {
    const impact = choice.impact;
    const newBalance = currentBalance + impact;

    if (newBalance < 0) {
      setGameOver(true);
      return;
    }

    setCurrentBalance(newBalance);
    
    if (choice.category === "savings" && impact > 0) {
      setTotalSavings(totalSavings + impact);
    }

    if (choice.split) {
      setTotalSavings(totalSavings + choice.split);
    }

    setScenarioHistory([
      ...scenarioHistory,
      {
        ...currentScenario,
        choice: choice.text,
        impact,
        feedback: choice.feedback
      }
    ]);

    setCurrentScenario(null);

    setTimeout(() => {
      if (scenarioHistory.length + 1 >= 5) {
        setMonthComplete(true);
      } else {
        presentRandomScenario();
      }
    }, 100);
  };

  const nextMonth = () => {
    setCurrentMonth(currentMonth + 1);
    setCurrentBalance(parseFloat(monthlyIncome));
    setTotalSavings(totalSavings + budget.savings);
    setScenarioHistory([]);
    setMonthComplete(false);
    presentRandomScenario();
  };

  const resetGame = () => {
    setGameStarted(false);
    setCurrentMonth(1);
    setMonthlyIncome("");
    setBudget({ needs: 0, wants: 0, savings: 0 });
    setCurrentBalance(0);
    setTotalSavings(0);
    setCurrentScenario(null);
    setScenarioHistory([]);
    setMonthComplete(false);
    setGameOver(false);
  };

  const savingsProgress = (totalSavings / savingsGoal) * 100;

  return (
    <div className="min-h-screen relative overflow-hidden pb-20">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-yellow-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-yellow-600/30 to-orange-600/30 border border-yellow-500/50 backdrop-blur-xl text-yellow-300 text-sm font-semibold mb-6"
          >
            <Sparkles className="w-4 h-4" />
            Interactive Learning Game
          </motion.div>

          <h1 className="text-5xl sm:text-6xl font-black text-white mb-6">
            Budget <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">Challenge</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Navigate real-world spending scenarios and learn to manage money wisely. Can you reach your savings goal?
          </p>
        </motion.div>

        {/* Game Setup */}
        {!gameStarted && !gameOver && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-800">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
                  <Target className="w-6 h-6 text-yellow-400" />
                  Start Your Budget Challenge
                </CardTitle>
                <p className="text-gray-400">Set your monthly income to begin</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Monthly Income</label>
                  <Input
                    type="number"
                    placeholder="Enter amount ($1,000 - $10,000)"
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(e.target.value)}
                    className="bg-slate-800/50 border-slate-700 text-white text-lg"
                  />
                </div>

                <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-700/30 rounded-xl p-6">
                  <h3 className="font-bold text-blue-400 mb-3">📊 50/30/20 Budget Rule</h3>
                  <div className="space-y-2 text-sm text-gray-300">
                    <p><strong className="text-white">50%</strong> - Needs (rent, groceries, bills)</p>
                    <p><strong className="text-white">30%</strong> - Wants (entertainment, dining out)</p>
                    <p><strong className="text-white">20%</strong> - Savings (emergency fund, goals)</p>
                  </div>
                </div>

                <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-xl p-6">
                  <h3 className="font-bold text-yellow-400 mb-2">🎯 Challenge Goal</h3>
                  <p className="text-gray-300 text-sm">Save ${savingsGoal.toLocaleString()} over multiple months while handling unexpected expenses and opportunities!</p>
                </div>

                <Button
                  onClick={startGame}
                  className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white text-lg py-6"
                >
                  Start Challenge
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Game Active */}
        {gameStarted && !gameOver && (
          <div className="space-y-8">
            {/* Stats Dashboard */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-800">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-blue-400" />
                    <p className="text-xs text-gray-400">Month</p>
                  </div>
                  <p className="text-2xl font-bold text-white">{currentMonth}</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-800">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-4 h-4 text-green-400" />
                    <p className="text-xs text-gray-400">Current Balance</p>
                  </div>
                  <p className="text-2xl font-bold text-white">${currentBalance.toFixed(0)}</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-800">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-yellow-400" />
                    <p className="text-xs text-gray-400">Total Savings</p>
                  </div>
                  <p className="text-2xl font-bold text-white">${totalSavings.toFixed(0)}</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-800">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-4 h-4 text-orange-400" />
                    <p className="text-xs text-gray-400">Goal Progress</p>
                  </div>
                  <p className="text-2xl font-bold text-white">{savingsProgress.toFixed(0)}%</p>
                </CardContent>
              </Card>
            </div>

            {/* Savings Goal Progress */}
            <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-white">Savings Goal Progress</h3>
                  <span className="text-sm text-gray-400">${totalSavings.toFixed(0)} / ${savingsGoal.toLocaleString()}</span>
                </div>
                <Progress value={savingsProgress} className="h-3" />
                {totalSavings >= savingsGoal && (
                  <div className="mt-4 bg-green-900/20 border border-green-700/30 rounded-xl p-4 flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-400" />
                    <div>
                      <p className="font-bold text-green-400">Goal Achieved! 🎉</p>
                      <p className="text-sm text-gray-300">You've reached your savings goal!</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Current Scenario */}
            <AnimatePresence mode="wait">
              {currentScenario && (
                <motion.div
                  key={currentScenario.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <Card className="bg-gradient-to-br from-slate-900 via-slate-900 to-blue-900/20 backdrop-blur-xl border-blue-500/30">
                    <CardHeader>
                      <CardTitle className="text-3xl font-bold text-white flex items-center gap-3">
                        {currentScenario.type === "income" ? (
                          <TrendingUp className="w-8 h-8 text-green-400" />
                        ) : (
                          <AlertCircle className="w-8 h-8 text-orange-400" />
                        )}
                        {currentScenario.title}
                      </CardTitle>
                      <p className="text-gray-300 text-lg">{currentScenario.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {currentScenario.choices.map((choice, index) => (
                          <Button
                            key={index}
                            onClick={() => handleChoice(choice)}
                            variant="outline"
                            className="w-full text-left justify-start h-auto py-4 px-6 bg-slate-800/50 border-slate-700 hover:border-blue-500/50 hover:bg-slate-800 transition-all"
                          >
                            <div className="flex items-center justify-between w-full">
                              <span className="text-white font-medium">{choice.text}</span>
                              <span className={`font-bold ${choice.impact >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {choice.impact >= 0 ? '+' : ''}{choice.impact !== 0 ? `$${choice.impact}` : '$0'}
                              </span>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Month Complete */}
            {monthComplete && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 backdrop-blur-xl border-green-700/30">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
                      <CheckCircle2 className="w-6 h-6 text-green-400" />
                      Month {currentMonth} Complete!
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-slate-800/50 rounded-xl p-4">
                        <p className="text-sm text-gray-400 mb-1">Ending Balance</p>
                        <p className="text-2xl font-bold text-white">${currentBalance.toFixed(0)}</p>
                      </div>
                      <div className="bg-slate-800/50 rounded-xl p-4">
                        <p className="text-sm text-gray-400 mb-1">Monthly Savings Added</p>
                        <p className="text-2xl font-bold text-green-400">+${budget.savings.toFixed(0)}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-bold text-white">Your Decisions This Month:</h3>
                      {scenarioHistory.map((scenario, index) => (
                        <div key={index} className="bg-slate-800/30 rounded-xl p-4">
                          <div className="flex items-start justify-between mb-2">
                            <p className="font-semibold text-white">{scenario.title}</p>
                            <span className={`font-bold ${scenario.impact >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                              {scenario.impact >= 0 ? '+' : ''}${scenario.impact}
                            </span>
                          </div>
                          <p className="text-sm text-gray-400 mb-1">Choice: {scenario.choice}</p>
                          <p className="text-sm text-blue-400">{scenario.feedback}</p>
                        </div>
                      ))}
                    </div>

                    <Button
                      onClick={nextMonth}
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white text-lg py-6"
                    >
                      Continue to Month {currentMonth + 1}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        )}

        {/* Game Over */}
        {gameOver && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="bg-gradient-to-br from-red-900/20 to-orange-900/20 backdrop-blur-xl border-red-700/30">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-white flex items-center gap-3">
                  <TrendingDown className="w-8 h-8 text-red-400" />
                  Budget Exceeded!
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-gray-300 text-lg">You ran out of money in Month {currentMonth}. Managing a budget is tough, but practice makes perfect!</p>
                
                <div className="bg-slate-800/50 rounded-xl p-6">
                  <h3 className="font-bold text-white mb-3">💡 Learning Points:</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Always prioritize needs over wants</li>
                    <li>• Build an emergency fund for unexpected expenses</li>
                    <li>• Small daily expenses add up quickly</li>
                    <li>• It's okay to say no to save money</li>
                  </ul>
                </div>

                <Button
                  onClick={resetGame}
                  className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white text-lg py-6"
                >
                  Try Again
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}