import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, BrainCircuit } from 'lucide-react';
import { books } from '../data';
import { Button } from '../components/Button';
import { TestModal } from '../components/TestModal';

export default function BookDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const book = books.find(b => b.id === parseInt(id));
    const [isTestModalOpen, setIsTestModalOpen] = useState(false);

    if (!book) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F0FDF4] text-teal-900">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Kitob topilmadi</h2>
                    <Button onClick={() => navigate('/')}>Bosh sahifaga qaytish</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F0FDF4] p-6 lg:p-12 font-sans relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-200/30 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-200/30 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-teal-600 hover:text-teal-800 font-bold mb-8 transition-colors"
                >
                    <ArrowLeft size={20} /> Orqaga
                </button>

                <div className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl p-8 lg:p-12 shadow-2xl shadow-teal-900/5 grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Book Image */}
                    <div className="flex justify-center lg:justify-start">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="relative group"
                        >
                            <div className="absolute inset-0 bg-teal-900/20 blur-xl rounded-lg group-hover:bg-teal-900/30 transition-all duration-500" />
                            <img
                                src={book.image}
                                alt={book.title}
                                className="relative w-64 lg:w-full max-w-[300px] rounded-lg shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-500"
                            />
                        </motion.div>
                    </div>

                    {/* Book Info */}
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <span className="inline-block px-3 py-1 bg-teal-100 text-teal-700 text-xs font-bold uppercase tracking-wider rounded-full mb-3">
                                {book.category === 'novel' ? 'Roman' : book.category === 'story' ? 'Hikoya' : 'Bolalar adabiyoti'}
                            </span>
                            <h1 className="text-4xl md:text-5xl font-black text-teal-900 mb-2 leading-tight">{book.title}</h1>
                            <p className="text-xl text-teal-600 font-medium">{book.author}</p>
                        </div>

                        <div className="bg-white/50 rounded-2xl p-6 border border-white/50">
                            <h3 className="font-bold text-teal-900 mb-3 flex items-center gap-2">
                                <BookOpen size={20} className="text-teal-500" />
                                Annotatsiya
                            </h3>
                            <p className="text-teal-800/80 leading-relaxed">
                                Ushbu kitob o'zbek va jahon adabiyotining nodir namunalaridan biridir.
                                Mutolaa davomida siz qahramonlar hayoti, ularning kechinmalari va taqdiri bilan yaqindan tanishasiz.
                                Asar sizga o'zgacha taassurot va ma'naviy ozuqa berishiga ishonamiz.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            {book.pdfUrl && book.pdfUrl !== '#' && (
                                <Button
                                    onClick={() => window.open(book.pdfUrl, '_blank')}
                                    className="px-8 py-4 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-xl shadow-lg shadow-teal-500/30 flex items-center gap-2"
                                >
                                    <BookOpen size={20} />
                                    O'qish
                                </Button>
                            )}

                            <Button
                                onClick={() => setIsTestModalOpen(true)}
                                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-purple-500/30 flex items-center gap-2"
                            >
                                <BrainCircuit size={20} />
                                Bilimni Sinash (Test)
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {isTestModalOpen && (
                <TestModal
                    isOpen={isTestModalOpen}
                    onClose={() => setIsTestModalOpen(false)}
                    book={book}
                />
            )}
        </div>
    );
}
