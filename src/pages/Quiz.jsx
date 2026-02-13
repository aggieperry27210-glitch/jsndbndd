import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, XCircle, Trophy, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function Quiz() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const urlParams = new URLSearchParams(window.location.search);
  const quizId = urlParams.get('id');

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [quizComplete, setQuizComplete] = useState(false);

  const { data: quiz, isLoading } = useQuery({
    queryKey: ['quiz', quizId],
    queryFn: async () => {
      const quizzes = await base44.entities.Quiz.list();
      return quizzes.find(q => q.id === quizId);
    },
    enabled: !!quizId,
  });

  const { data: user } = useQuery({
    queryKey: ['current-user'],
    queryFn: async () => {
      try {
        return await base44.auth.me();
      } catch (error) {
        return null;
      }
    },
  });

  const saveProgressMutation = useMutation({
    mutationFn: async (progressData) => {
      await base44.entities.UserProgress.create(progressData);
    },
    onSuccess: () => {
      if (user?.email) {
        queryClient.invalidateQueries({ queryKey: ['user-progress', user.email] });
      }
      queryClient.invalidateQueries({ queryKey: ['user-progress'] });
    },
  });

  const handleAnswerSelect = (answer) => {
    if (showExplanation) return;
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = () => {
    const question = quiz.questions[currentQuestion];
    const isCorrect = selectedAnswer === question.correct_answer;
    
    setAnswers([...answers, { question: currentQuestion, isCorrect }]);
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      completeQuiz();
    }
  };

  const completeQuiz = async () => {
    const correctCount = answers.filter(a => a.isCorrect).length + (selectedAnswer === quiz.questions[currentQuestion].correct_answer ? 1 : 0);
    const score = Math.round((correctCount / quiz.questions.length) * 100);

    console.log("Completing quiz. User:", user);
    console.log("User email:", user?.email);

    if (user?.email) {
      console.log("Attempting to save progress...");
      try {
        const progressData = {
          quiz_id: quiz.id,
          quiz_title: quiz.title,
          score: score,
          total_questions: quiz.questions.length,
          correct_answers: correctCount,
          completed_at: new Date().toISOString(),
        };
        console.log("Progress data:", progressData);
        
        const result = await base44.entities.UserProgress.create(progressData);
        console.log("Progress saved successfully:", result);
        
        queryClient.invalidateQueries({ queryKey: ['user-progress', user.email] });
        queryClient.invalidateQueries({ queryKey: ['user-progress'] });
      } catch (error) {
        console.error("Failed to save progress:", error);
        alert("Failed to save progress: " + error.message);
      }
    } else {
      console.log("User not logged in, skipping progress save");
    }

    setQuizComplete(true);
  };

  const goBack = () => {
    navigate(createPageUrl(quiz.category === 'politics' ? 'Politics' : 'Finance'));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Quiz not found</p>
          <Button onClick={() => navigate(createPageUrl("Home"))}>
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  if (quizComplete) {
    const correctCount = answers.filter(a => a.isCorrect).length;
    const score = Math.round((correctCount / quiz.questions.length) * 100);

    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full"
        >
          <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-800">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trophy className="w-10 h-10 text-white" />
              </div>

              <h2 className="text-3xl font-bold text-white mb-4">Quiz Complete!</h2>
              
              <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-6">
                {score}%
              </div>

              <p className="text-xl text-gray-300 mb-8">
                You got {correctCount} out of {quiz.questions.length} questions correct
              </p>

              {!user?.email && (
                <div className="bg-blue-900/20 border border-blue-700/30 rounded-xl p-4 mb-6">
                  <p className="text-blue-300 text-sm">
                    Sign in to save your progress and track your achievements!
                  </p>
                  <Button
                    onClick={() => base44.auth.redirectToLogin(window.location.href)}
                    className="mt-3 bg-blue-600 hover:bg-blue-700"
                  >
                    Sign In to Save Progress
                  </Button>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => window.location.reload()}
                  variant="outline"
                  className="border-slate-700"
                >
                  Retake Quiz
                </Button>
                <Button
                  onClick={goBack}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Back to {quiz.category === 'politics' ? 'Politics' : 'Finance'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={goBack}
            className="text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="text-gray-400 text-sm">
            Question {currentQuestion + 1} of {quiz.questions.length}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-blue-600 to-cyan-600"
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-800 mb-6">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-white mb-8 leading-relaxed">
                  {question.question}
                </h2>

                <div className="space-y-4 mb-6">
                  {question.options.map((option, index) => {
                    const isSelected = selectedAnswer === option;
                    const isCorrect = option === question.correct_answer;
                    const showCorrect = showExplanation && isCorrect;
                    const showWrong = showExplanation && isSelected && !isCorrect;

                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(option)}
                        disabled={showExplanation}
                        className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                          showCorrect
                            ? "border-green-500 bg-green-500/20"
                            : showWrong
                            ? "border-red-500 bg-red-500/20"
                            : isSelected
                            ? "border-blue-500 bg-blue-500/20"
                            : "border-slate-700 bg-slate-800/50 hover:border-slate-600"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-white font-medium">{option}</span>
                          {showCorrect && <CheckCircle className="w-5 h-5 text-green-400" />}
                          {showWrong && <XCircle className="w-5 h-5 text-red-400" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {showExplanation && question.explanation && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-blue-900/20 border border-blue-700/30 rounded-xl p-4"
                  >
                    <p className="text-blue-300 font-medium mb-2">💡 Explanation</p>
                    <p className="text-gray-300 leading-relaxed">{question.explanation}</p>
                  </motion.div>
                )}

                {!showExplanation ? (
                  <Button
                    onClick={handleSubmitAnswer}
                    disabled={!selectedAnswer}
                    className="w-full bg-blue-600 hover:bg-blue-700 mt-6"
                  >
                    Submit Answer
                  </Button>
                ) : (
                  <Button
                    onClick={handleNextQuestion}
                    className="w-full bg-blue-600 hover:bg-blue-700 mt-6"
                  >
                    {currentQuestion < quiz.questions.length - 1 ? "Next Question" : "Finish Quiz"}
                  </Button>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}