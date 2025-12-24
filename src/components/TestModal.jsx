import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, BrainCircuit } from 'lucide-react';
import { Button } from './Button';

export function TestModal({ isOpen, onClose }) {
    const [currentStep, setCurrentStep] = useState('intro'); // intro, test, result
    const [score, setScore] = useState(0);

    const startTest = () => {
        setCurrentStep('test');
        // Simulate test completion after 3 seconds for demo
        setTimeout(() => {
            setScore(85);
            setCurrentStep('result');
        }, 3000);
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
                                <h2 className="text-3xl font-bold text-white">Hot Potato Testi</h2>
                                <p className="text-white/60 text-lg max-w-md mx-auto">
                                    Kitobni o'qib bo'ldingizmi? Unda bilimingizni sinab ko'rish vaqti keldi!
                                    Test davomida savollarga tezkor javob berishingiz kerak.
                                </p>
                                <Button onClick={startTest} className="px-8 py-4 text-lg font-bold bg-gradient-to-r from-purple-500 to-indigo-600 shadow-lg shadow-purple-500/25">
                                    Testni Boshlash
                                </Button>
                            </div>
                        )}

                        {currentStep === 'test' && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-white animate-pulse">Test yuklanmoqda...</h2>
                                <p className="text-white/40">Hot Potato tizimi bilan aloqa o'rnatilmoqda</p>
                                <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden mx-auto">
                                    <div className="h-full bg-purple-500 animate-progress" />
                                </div>
                            </div>
                        )}

                        {currentStep === 'result' && (
                            <div className="space-y-6">
                                <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                                    <CheckCircle className="text-emerald-400 w-12 h-12" />
                                </div>
                                <h2 className="text-3xl font-bold text-white">Natija: {score}%</h2>
                                <p className="text-white/60 text-lg">
                                    Tabriklaymiz! Siz kitobni yaxshi o'zlashtiribsiz.
                                </p>
                                <div className="flex gap-4 justify-center">
                                    <Button variant="secondary" onClick={onClose}>
                                        Yopish
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
