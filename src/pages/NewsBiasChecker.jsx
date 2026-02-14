import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileSearch, Loader2, AlertCircle, TrendingUp, TrendingDown, Minus, Sparkles, Link2, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function NewsBiasChecker() {
  const [articleUrl, setArticleUrl] = useState("");
  const [articleText, setArticleText] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const analyzeArticle = async () => {
    if (!articleUrl && !articleText) {
      setError("Please provide either an article URL or paste the article text");
      return;
    }

    setAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      let contentToAnalyze = articleText;

      if (articleUrl && !articleText) {
        contentToAnalyze = `Please fetch and analyze the article from this URL: ${articleUrl}`;
      }

      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `Analyze the following news article for political bias. Provide a detailed analysis including:
        1. Overall bias rating (Left, Center-Left, Center, Center-Right, Right)
        2. Confidence level (0-100)
        3. Key indicators of bias found in the article
        4. Specific examples of biased language or framing
        5. Suggestions for more balanced coverage

        Article content:
        ${contentToAnalyze}`,
        add_context_from_internet: !!articleUrl,
        response_json_schema: {
          type: "object",
          properties: {
            bias_rating: {
              type: "string",
              enum: ["Left", "Center-Left", "Center", "Center-Right", "Right"]
            },
            confidence: {
              type: "number",
              description: "Confidence level 0-100"
            },
            key_indicators: {
              type: "array",
              items: { type: "string" }
            },
            examples: {
              type: "array",
              items: { type: "string" }
            },
            suggestions: {
              type: "string"
            },
            summary: {
              type: "string"
            }
          }
        }
      });

      setResult(response);
    } catch (err) {
      setError("Failed to analyze the article. Please try again.");
      console.error(err);
    }

    setAnalyzing(false);
  };

  const getBiasColor = (bias) => {
    const colors = {
      "Left": "text-blue-400",
      "Center-Left": "text-cyan-400",
      "Center": "text-gray-300",
      "Center-Right": "text-orange-400",
      "Right": "text-red-400",
    };
    return colors[bias] || "text-gray-400";
  };

  const getBiasGradient = (bias) => {
    const gradients = {
      "Left": "from-blue-500 to-cyan-500",
      "Center-Left": "from-cyan-500 to-teal-500",
      "Center": "from-gray-400 to-gray-500",
      "Center-Right": "from-orange-500 to-amber-500",
      "Right": "from-red-500 to-rose-500",
    };
    return gradients[bias] || "from-gray-400 to-gray-500";
  };

  const getBiasIcon = (bias) => {
    if (bias === "Center") return <Minus className="w-8 h-8" />;
    if (bias.includes("Left")) return <TrendingDown className="w-8 h-8 transform -rotate-45" />;
    return <TrendingUp className="w-8 h-8 transform rotate-45" />;
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-600/30 to-teal-600/30 border border-cyan-500/50 backdrop-blur-xl text-cyan-300 text-sm font-semibold mb-8 shadow-lg"
          >
            <Sparkles className="w-4 h-4 animate-pulse" />
            AI-Powered Media Analysis
          </motion.div>

          <h1 className="text-4xl sm:text-6xl font-black text-white mb-6 leading-tight">
            News <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400">Bias Checker</span>
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Develop critical thinking skills by analyzing news articles for political bias. Understanding different perspectives helps you become a more informed reader.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { icon: FileSearch, text: "Instant Analysis" },
              { icon: Sparkles, text: "AI-Powered" },
              { icon: TrendingUp, text: "Detailed Insights" }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-full"
                >
                  <Icon className="w-4 h-4 text-cyan-400" />
                  <span className="text-gray-300 text-sm font-medium">{feature.text}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="relative mb-8"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-600 to-teal-600 rounded-3xl blur opacity-20" />
          
          <Card className="relative bg-slate-900/80 backdrop-blur-2xl border-slate-800 overflow-hidden">
            <div className="h-1.5 bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500" />
            
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl flex items-center justify-center">
                  <FileSearch className="w-5 h-5 text-white" />
                </div>
                Analyze an Article
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* URL Input */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-3">
                  <Link2 className="w-4 h-4 text-cyan-400" />
                  Article URL (Optional)
                </label>
                <Input
                  type="url"
                  placeholder="https://example.com/news-article"
                  value={articleUrl}
                  onChange={(e) => setArticleUrl(e.target.value)}
                  className="bg-slate-800/50 border-slate-700 text-white placeholder:text-gray-500 h-12 text-base focus:border-cyan-500 transition-colors"
                />
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-800"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-4 text-sm text-gray-500 bg-slate-900">OR</span>
                </div>
              </div>

              {/* Text Area */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-3">
                  <FileText className="w-4 h-4 text-cyan-400" />
                  Paste Article Text
                </label>
                <Textarea
                  placeholder="Paste the full article text here for analysis..."
                  value={articleText}
                  onChange={(e) => setArticleText(e.target.value)}
                  className="bg-slate-800/50 border-slate-700 text-white placeholder:text-gray-500 min-h-48 text-base focus:border-cyan-500 transition-colors resize-none"
                />
              </div>

              {error && (
                <Alert variant="destructive" className="border-red-500/50 bg-red-500/10">
                  <AlertCircle className="h-5 w-5" />
                  <AlertDescription className="text-base">{error}</AlertDescription>
                </Alert>
              )}

              <Button
                onClick={analyzeArticle}
                disabled={analyzing || (!articleUrl && !articleText)}
                className="w-full h-14 text-base font-bold bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 shadow-lg shadow-cyan-500/30"
              >
                {analyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Analyzing Article...
                  </>
                ) : (
                  <>
                    <FileSearch className="w-5 h-5 mr-2" />
                    Analyze for Bias
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Results Section */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Main Result Card */}
            <div className="relative">
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${getBiasGradient(result.bias_rating)} rounded-3xl blur-lg opacity-30`} />
              
              <Card className="relative bg-slate-900/80 backdrop-blur-2xl border-slate-800 overflow-hidden">
                <div className={`h-1.5 bg-gradient-to-r ${getBiasGradient(result.bias_rating)}`} />
                
                <CardContent className="p-8">
                  {/* Bias Rating Display */}
                  <div className="flex flex-col sm:flex-row items-center gap-8 mb-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 }}
                      className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${getBiasGradient(result.bias_rating)} flex items-center justify-center shadow-2xl`}
                    >
                      <div className="text-white">
                        {getBiasIcon(result.bias_rating)}
                      </div>
                    </motion.div>
                    
                    <div className="flex-1 text-center sm:text-left">
                      <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Detected Bias</p>
                      <p className={`text-5xl font-black ${getBiasColor(result.bias_rating)} mb-3`}>
                        {result.bias_rating}
                      </p>
                      <div className="flex items-center gap-3 justify-center sm:justify-start">
                        <div className="px-4 py-2 bg-slate-800/50 rounded-xl border border-slate-700">
                          <span className="text-xs text-gray-400">Confidence: </span>
                          <span className="text-lg font-bold text-white">{result.confidence}%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className={`bg-gradient-to-r ${getBiasGradient(result.bias_rating)} bg-opacity-10 rounded-2xl p-6 mb-6 border border-slate-700`}>
                    <p className="text-gray-200 leading-relaxed text-base">{result.summary}</p>
                  </div>

                  {/* Key Indicators */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <div className="w-1 h-6 bg-gradient-to-b from-cyan-500 to-teal-500 rounded-full" />
                      Key Indicators of Bias
                    </h3>
                    <div className="space-y-3">
                      {result.key_indicators?.map((indicator, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          className="flex items-start gap-3 p-3 bg-slate-800/30 rounded-xl border border-slate-700/50"
                        >
                          <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-cyan-400 font-bold text-sm">{index + 1}</span>
                          </div>
                          <span className="text-gray-300 leading-relaxed">{indicator}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Examples */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
                      Specific Examples
                    </h3>
                    <div className="space-y-3">
                      {result.examples?.map((example, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50"
                        >
                          <p className="text-gray-300 italic leading-relaxed">"{example}"</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Suggestions */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="bg-gradient-to-r from-cyan-900/30 to-teal-900/30 border border-cyan-700/40 rounded-2xl p-6"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-cyan-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">💡</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-cyan-400 mb-2 text-lg">Critical Thinking Tip</h3>
                        <p className="text-gray-300 leading-relaxed">{result.suggestions}</p>
                      </div>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}