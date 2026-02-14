import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TrendingUp, TrendingDown, DollarSign, PieChart, Sparkles, Plus, Minus, Newspaper, Loader2, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function InvestmentSimulator() {
  const [cash, setCash] = useState(10000);
  const [portfolio, setPortfolio] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [shares, setShares] = useState("");
  const [newsArticles, setNewsArticles] = useState([]);
  const [loadingNews, setLoadingNews] = useState(false);
  
  // Budgeting goals
  const [budgetGoals, setBudgetGoals] = useState({
    emergency: 0,
    shortTerm: 0,
    retirement: 0,
  });

  // Mock stock data - prices update every 5 seconds
  const [stocks, setStocks] = useState([
    { symbol: "AAPL", name: "Apple Inc.", price: 185.50, change: 0, owned: 0 },
    { symbol: "GOOGL", name: "Alphabet Inc.", price: 142.30, change: 0, owned: 0 },
    { symbol: "MSFT", name: "Microsoft", price: 380.75, change: 0, owned: 0 },
    { symbol: "TSLA", name: "Tesla", price: 242.80, change: 0, owned: 0 },
    { symbol: "AMZN", name: "Amazon", price: 178.20, change: 0, owned: 0 },
    { symbol: "NVDA", name: "NVIDIA", price: 495.60, change: 0, owned: 0 },
    { symbol: "VOO", name: "Vanguard S&P 500 ETF", price: 428.90, change: 0, owned: 0 },
    { symbol: "NDAQ", name: "NASDAQ Inc.", price: 68.30, change: 0, owned: 0 },
    { symbol: "QQQ", name: "Invesco QQQ Trust", price: 398.75, change: 0, owned: 0 },
  ]);

  const initialCash = 10000;
  const totalValue = cash + portfolio.reduce((sum, item) => {
    const stock = stocks.find(s => s.symbol === item.symbol);
    return sum + (stock ? stock.price * item.shares : 0);
  }, 0);

  // Simulate price changes
  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(prevStocks =>
        prevStocks.map(stock => {
          const changePercent = (Math.random() - 0.5) * 5; // -2.5% to +2.5%
          const priceChange = stock.price * (changePercent / 100);
          return {
            ...stock,
            price: Math.max(stock.price + priceChange, 0.01),
            change: changePercent,
          };
        })
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const buyStock = () => {
    if (!selectedStock || !shares || shares <= 0) return;

    const stock = stocks.find(s => s.symbol === selectedStock);
    const cost = stock.price * parseInt(shares);

    if (cost > cash) {
      alert("Not enough cash!");
      return;
    }

    setCash(cash - cost);
    const existingPosition = portfolio.find(p => p.symbol === selectedStock);
    
    if (existingPosition) {
      setPortfolio(portfolio.map(p =>
        p.symbol === selectedStock
          ? { ...p, shares: p.shares + parseInt(shares) }
          : p
      ));
    } else {
      setPortfolio([...portfolio, { symbol: selectedStock, shares: parseInt(shares) }]);
    }

    setShares("");
  };

  const sellStock = (symbol, sharesToSell) => {
    const stock = stocks.find(s => s.symbol === symbol);
    const position = portfolio.find(p => p.symbol === symbol);
    
    if (!position || sharesToSell > position.shares) return;

    const revenue = stock.price * sharesToSell;
    setCash(cash + revenue);

    if (sharesToSell === position.shares) {
      setPortfolio(portfolio.filter(p => p.symbol !== symbol));
    } else {
      setPortfolio(portfolio.map(p =>
        p.symbol === symbol
          ? { ...p, shares: p.shares - sharesToSell }
          : p
      ));
    }
  };

  const resetSimulation = () => {
    setCash(10000);
    setPortfolio([]);
    setSelectedStock(null);
    setShares("");
  };

  const fetchMarketNews = async () => {
    setLoadingNews(true);
    try {
      const stockSymbols = stocks.map(s => s.symbol).join(", ");
      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `Find the latest market news and updates for these stocks and ETFs: ${stockSymbols}. 
        Return 8-10 recent news articles with headlines, brief summaries, and source URLs. 
        Focus on market-moving news, earnings reports, analyst ratings, and industry trends.`,
        add_context_from_internet: true,
        response_json_schema: {
          type: "object",
          properties: {
            articles: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  headline: { type: "string" },
                  summary: { type: "string" },
                  source: { type: "string" },
                  url: { type: "string" },
                  stock_mentioned: { type: "string" }
                }
              }
            }
          }
        }
      });
      setNewsArticles(response.articles || []);
    } catch (error) {
      console.error("Failed to fetch news:", error);
    }
    setLoadingNews(false);
  };

  useEffect(() => {
    fetchMarketNews();
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden pb-20">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-green-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl animate-pulse delay-700" />
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
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-green-600/30 to-emerald-600/30 border border-green-500/50 backdrop-blur-xl text-green-300 text-sm font-semibold mb-6"
          >
            <Sparkles className="w-4 h-4" />
            Practice Investing Safely
          </motion.div>

          <h1 className="text-5xl sm:text-6xl font-black text-white mb-6">
            Investment <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">Simulator</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-6">
            Learn how to invest with virtual money. Buy and sell stocks, track your portfolio, and see how the market works in real-time.
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-4xl mx-auto bg-amber-900/20 border-2 border-amber-500/50 rounded-2xl p-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">⚠️</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-amber-400 mb-2">Educational Use Only - Not Financial Advice</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  This simulator is designed purely for educational purposes to help you understand how investing works. 
                  This is <span className="font-semibold text-amber-400">not financial advice</span>. Always consult with a licensed financial advisor before making real investment decisions. 
                  Past performance does not guarantee future results.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Portfolio Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-blue-400" />
                  </div>
                  <p className="text-sm text-gray-400">Cash Available</p>
                </div>
                <p className="text-3xl font-bold text-white">${cash.toFixed(2)}</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <PieChart className="w-5 h-5 text-green-400" />
                  </div>
                  <p className="text-sm text-gray-400">Portfolio Value</p>
                </div>
                <p className="text-3xl font-bold text-white">${totalValue.toFixed(2)}</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-10 h-10 ${totalValue >= initialCash ? 'bg-green-500/20' : 'bg-red-500/20'} rounded-xl flex items-center justify-center`}>
                    {totalValue >= initialCash ? (
                      <TrendingUp className="w-5 h-5 text-green-400" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-red-400" />
                    )}
                  </div>
                  <p className="text-sm text-gray-400">Profit/Loss</p>
                </div>
                <p className={`text-3xl font-bold ${totalValue >= initialCash ? 'text-green-400' : 'text-red-400'}`}>
                  {totalValue >= initialCash ? '+' : ''}${(totalValue - initialCash).toFixed(2)}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Available Stocks */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-800">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white">Available Stocks</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {stocks.map((stock, index) => (
                  <motion.div
                    key={stock.symbol}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      selectedStock === stock.symbol
                        ? "border-green-500 bg-green-500/10"
                        : "border-slate-700 bg-slate-800/50 hover:border-slate-600"
                    }`}
                    onClick={() => setSelectedStock(stock.symbol)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="text-lg font-bold text-white">{stock.symbol}</p>
                        <p className="text-sm text-gray-400">{stock.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-white">${stock.price.toFixed(2)}</p>
                        <div className={`flex items-center gap-1 justify-end ${stock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {stock.change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                          <span className="text-sm font-semibold">{Math.abs(stock.change).toFixed(2)}%</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Trading & Portfolio */}
          <div className="space-y-6">
            {/* Buy Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-800">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
                    <Plus className="w-6 h-6 text-green-400" />
                    Buy Stocks
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedStock ? (
                    <>
                      <div className="bg-green-900/20 border border-green-700/30 rounded-xl p-4">
                        <p className="text-green-400 font-semibold mb-2">Selected: {selectedStock}</p>
                        <p className="text-gray-300 text-sm">
                          Price: ${stocks.find(s => s.symbol === selectedStock)?.price.toFixed(2)}
                        </p>
                      </div>
                      
                      <div>
                        <label className="text-sm text-gray-400 mb-2 block">Number of Shares</label>
                        <Input
                          type="number"
                          min="1"
                          placeholder="Enter shares"
                          value={shares}
                          onChange={(e) => setShares(e.target.value)}
                          className="bg-slate-800/50 border-slate-700 text-white"
                        />
                      </div>

                      {shares && (
                        <div className="bg-slate-800/50 rounded-xl p-3">
                          <p className="text-sm text-gray-400">Total Cost</p>
                          <p className="text-2xl font-bold text-white">
                            ${(stocks.find(s => s.symbol === selectedStock)?.price * parseInt(shares) || 0).toFixed(2)}
                          </p>
                        </div>
                      )}

                      <Button
                        onClick={buyStock}
                        disabled={!shares || shares <= 0}
                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Buy Shares
                      </Button>
                    </>
                  ) : (
                    <p className="text-gray-400 text-center py-8">Select a stock to start trading</p>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Portfolio */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
            >
              <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-800">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white">Your Portfolio</CardTitle>
                </CardHeader>
                <CardContent>
                  {portfolio.length === 0 ? (
                    <p className="text-gray-400 text-center py-8">No investments yet. Start buying stocks!</p>
                  ) : (
                    <div className="space-y-3">
                      <AnimatePresence>
                        {portfolio.map((position) => {
                          const stock = stocks.find(s => s.symbol === position.symbol);
                          const value = stock ? stock.price * position.shares : 0;
                          
                          return (
                            <motion.div
                              key={position.symbol}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              className="bg-slate-800/50 border border-slate-700 rounded-xl p-4"
                            >
                              <div className="flex items-center justify-between mb-3">
                                <div>
                                  <p className="font-bold text-white text-lg">{position.symbol}</p>
                                  <p className="text-sm text-gray-400">{position.shares} shares</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-bold text-white">${value.toFixed(2)}</p>
                                  <p className="text-sm text-gray-400">${stock?.price.toFixed(2)}/share</p>
                                </div>
                              </div>
                              <Button
                                onClick={() => sellStock(position.symbol, position.shares)}
                                variant="outline"
                                size="sm"
                                className="w-full border-red-700 text-red-400 hover:bg-red-900/20"
                              >
                                <Minus className="w-4 h-4 mr-2" />
                                Sell All
                              </Button>
                            </motion.div>
                          );
                        })}
                      </AnimatePresence>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Reset Button */}
            <Button
              onClick={resetSimulation}
              variant="outline"
              className="w-full border-slate-700 hover:bg-slate-800"
            >
              Reset Simulation
            </Button>
          </div>
        </div>

        {/* Budgeting Goals Template */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-12"
        >
          <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-800">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
                <DollarSign className="w-6 h-6 text-yellow-400" />
                Budgeting Goals Template
              </CardTitle>
              <p className="text-gray-400 text-sm">Set your financial goals and track progress</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                {/* Emergency Fund */}
                <div className="bg-red-900/20 border border-red-700/30 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">🚨</span>
                    <h3 className="font-bold text-white">Emergency Fund</h3>
                  </div>
                  <p className="text-xs text-gray-400 mb-3">3-6 months of expenses</p>
                  <Input
                    type="number"
                    placeholder="Goal amount"
                    value={budgetGoals.emergency || ""}
                    onChange={(e) => setBudgetGoals({...budgetGoals, emergency: Number(e.target.value)})}
                    className="bg-slate-800/50 border-slate-700 text-white mb-2"
                  />
                  <p className="text-xs text-gray-400">Current: ${budgetGoals.emergency.toFixed(2)}</p>
                </div>

                {/* Short-term Savings */}
                <div className="bg-blue-900/20 border border-blue-700/30 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">🎯</span>
                    <h3 className="font-bold text-white">Short-term Goal</h3>
                  </div>
                  <p className="text-xs text-gray-400 mb-3">Car, vacation, etc.</p>
                  <Input
                    type="number"
                    placeholder="Goal amount"
                    value={budgetGoals.shortTerm || ""}
                    onChange={(e) => setBudgetGoals({...budgetGoals, shortTerm: Number(e.target.value)})}
                    className="bg-slate-800/50 border-slate-700 text-white mb-2"
                  />
                  <p className="text-xs text-gray-400">Current: ${budgetGoals.shortTerm.toFixed(2)}</p>
                </div>

                {/* Retirement */}
                <div className="bg-purple-900/20 border border-purple-700/30 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">🏖️</span>
                    <h3 className="font-bold text-white">Retirement</h3>
                  </div>
                  <p className="text-xs text-gray-400 mb-3">Long-term savings</p>
                  <Input
                    type="number"
                    placeholder="Goal amount"
                    value={budgetGoals.retirement || ""}
                    onChange={(e) => setBudgetGoals({...budgetGoals, retirement: Number(e.target.value)})}
                    className="bg-slate-800/50 border-slate-700 text-white mb-2"
                  />
                  <p className="text-xs text-gray-400">Current: ${budgetGoals.retirement.toFixed(2)}</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-700/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">💡</span>
                  <div>
                    <h4 className="font-bold text-yellow-400 mb-2">Budgeting Tips</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Follow the 50/30/20 rule: 50% needs, 30% wants, 20% savings</li>
                      <li>• Build your emergency fund first before investing</li>
                      <li>• Set specific, measurable goals with deadlines</li>
                      <li>• Review and adjust your budget monthly</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Market News Feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mt-12"
        >
          <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
                  <Newspaper className="w-6 h-6 text-blue-400" />
                  Market News Feed
                </CardTitle>
                <Button
                  onClick={fetchMarketNews}
                  disabled={loadingNews}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {loadingNews ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Refresh"
                  )}
                </Button>
              </div>
              <p className="text-gray-400 text-sm">Latest updates on your tracked stocks</p>
            </CardHeader>
            <CardContent>
              {loadingNews ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
                </div>
              ) : newsArticles.length === 0 ? (
                <p className="text-gray-400 text-center py-8">No news available. Click refresh to fetch latest updates.</p>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {newsArticles.map((article, index) => (
                    <motion.a
                      key={index}
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group bg-slate-800/50 border border-slate-700 rounded-xl p-4 hover:border-blue-500/50 hover:bg-slate-800 transition-all cursor-pointer"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                          {article.headline}
                        </h3>
                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-400 flex-shrink-0" />
                      </div>
                      
                      {article.stock_mentioned && (
                        <div className="mb-2">
                          <span className="inline-block px-2 py-1 bg-blue-500/20 border border-blue-500/40 rounded text-xs font-semibold text-blue-400">
                            {article.stock_mentioned}
                          </span>
                        </div>
                      )}
                      
                      <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                        {article.summary}
                      </p>
                      
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Newspaper className="w-3 h-3" />
                        <span>{article.source}</span>
                      </div>
                    </motion.a>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Educational Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-8 bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-700/30 rounded-3xl p-8"
        >
          <h2 className="text-2xl font-bold text-white mb-4">💡 Learning Points</h2>
          <div className="grid md:grid-cols-2 gap-4 text-gray-300">
            <div>
              <p className="font-semibold text-green-400 mb-2">Diversification</p>
              <p className="text-sm">Don't put all your money in one stock. Spread investments to reduce risk.</p>
            </div>
            <div>
              <p className="font-semibold text-cyan-400 mb-2">Long-term Thinking</p>
              <p className="text-sm">Real investing is about patience. Markets go up and down, but historically trend upward.</p>
            </div>
            <div>
              <p className="font-semibold text-blue-400 mb-2">Price Volatility</p>
              <p className="text-sm">Stock prices change based on company performance, market sentiment, and economic factors.</p>
            </div>
            <div>
              <p className="font-semibold text-purple-400 mb-2">Start Small</p>
              <p className="text-sm">In real life, start with small amounts and learn before investing larger sums.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}