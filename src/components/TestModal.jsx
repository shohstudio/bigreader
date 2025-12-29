import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, BrainCircuit } from 'lucide-react';
import { Button } from './Button';

export function TestModal({ isOpen, onClose, book }) {
    const [currentStep, setCurrentStep] = useState('intro'); // intro, test, result
    const [score, setScore] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const startTest = () => {
        if (!book?.questions) return;

        // Shuffle and pick 10 questions
        const shuffled = [...book.questions].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 10);
        setQuestions(selected);
        setCurrentQuestionIndex(0);
        setScore(0);
        setCurrentStep('test');
    };

    const handleAnswer = (optionIndex) => {
        const currentQuestion = questions[currentQuestionIndex];
        if (optionIndex === currentQuestion.correctAnswer) {
            setScore(prev => prev + 1);
        }

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            setCurrentStep('result');
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="relative w-full max-w-2xl min-h-[400px] bg-[#0f172a] border border-white/10 rounded-3xl shadow-2xl p-8 flex flex-col items-center justify-center text-center overflow-hidden"
                    >
                        {/* Background Effects */}
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-500 via-purple-500 to-emerald-500 animate-gradient" />

                        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors">
                            <X size={24} />
                        </button>

                        {currentStep === 'intro' && (
                            <div className="space-y-6">
                                <div className="w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <BrainCircuit className="text-purple-400 w-10 h-10" />
                                </div>
                                <h2 className="text-3xl font-bold text-white">{book?.title || 'Test'}</h2>
                                <p className="text-white/60 text-lg max-w-md mx-auto">
                                    Kitobni o'qib bo'ldingizmi? Unda bilimingizni sinab ko'rish vaqti keldi!
                                    Bu test 10 ta savoldan iborat.
                                </p>
                                <Button onClick={startTest} className="px-8 py-4 text-lg font-bold bg-gradient-to-r from-purple-500 to-indigo-600 shadow-lg shadow-purple-500/25">
                                    Testni Boshlash
                                </Button>
                            </div>
                        )}

                        {currentStep === 'test' && questions.length > 0 && (
                            <div className="w-full max-w-lg space-y-6">
                                <div className="flex justify-between items-center text-white/40 text-sm font-medium">
                                    <span>Savol {currentQuestionIndex + 1}/{questions.length}</span>
                                    <span>Ball: {score}</span>
                                </div>

                                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-purple-500"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                                    />
                                </div>

                                <h3 className="text-xl font-bold text-white leading-relaxed">
                                    {questions[currentQuestionIndex].question}
                                </h3>

                                <div className="grid gap-3">
                                    {questions[currentQuestionIndex].options.map((option, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleAnswer(idx)}
                                            className="w-full text-left px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/50 transition-all text-white/90 hover:text-white font-medium group"
                                        >
                                            <span className="inline-block w-6 h-6 rounded-full bg-white/10 text-white/60 text-xs flex items-center justify-center mr-3 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                                                {String.fromCharCode(65 + idx)}
                                            </span>
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {currentStep === 'result' && (
                            <div className="space-y-6">
                                <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                                    <CheckCircle className="text-emerald-400 w-12 h-12" />
                                </div>
                                <h2 className="text-3xl font-bold text-white">Natija: {score} / {questions.length}</h2>
                                <p className="text-white/60 text-lg">
                                    {score >= 8 ? "Qoyil! Ajoyib natija." : score >= 5 ? "Yaxshi, lekin yanada yaxshiroq bo'lishi mumkin." : "Kitobni qayta o'qib chiqishni maslahat beramiz."}
                                </p>
                                <div className="flex gap-4 justify-center">
                                    <Button variant="secondary" onClick={onClose}>
                                        Yopish
                                    </Button>
                                    <Button onClick={startTest}>
                                        Qayta topshirish
                                    </Button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
