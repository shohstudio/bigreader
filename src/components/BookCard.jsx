
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle, ExternalLink, BrainCircuit } from 'lucide-react';
import { Button } from './Button';

export function BookCard({ book, onReadClick, onMarkAsRead }) {
    const handleReadBook = () => {
        if (book.pdfUrl && book.pdfUrl !== "#") {
            window.open(book.pdfUrl, '_blank');
        } else {
            alert("Ushbu kitobning elektron varianti tez orada yuklanadi.");
        }
    };

    const handleTestClick = () => {
        if (onReadClick) {
            onReadClick(book);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl overflow-hidden shadow-xl flex flex-col h-full group"
        >
            <div className="relative aspect-[2/3] overflow-hidden">
                <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <p className="text-white text-sm font-medium line-clamp-2">{book.description || "Ajoyib asar."}</p>
                </div>
                {book.isRead && (
                    <div className="absolute top-2 right-2 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
                        <CheckCircle size={12} /> O'qilgan
                    </div>
                )}
            </div>

            <div className="p-4 flex flex-col flex-grow">
                <div className="flex-grow">
                    <h3 className="text-lg font-bold text-teal-900 mb-1 leading-tight">{book.title}</h3>
                    <p className="text-teal-600 text-sm mb-3">{book.author}</p>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
                    {onReadClick && book.questions && book.questions.length > 0 ? (
                        <Button
                            onClick={() => onReadClick(book)}
                            className="w-full py-2 text-sm bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white shadow-lg shadow-purple-500/20"
                        >
                            <span className="flex items-center justify-center gap-2">
                                <BrainCircuit size={16} /> Testni Boshlash
                            </span>
                        </Button>
                    ) : (
                        <div className="grid grid-cols-2 gap-2">
                            <Button
                                onClick={handleReadBook}
                                className="w-full py-2 text-sm bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20"
                            >
                                <span className="flex items-center justify-center gap-2">
                                    <BookOpen size={16} /> O'qish
                                </span>
                            </Button>

                            {!book.isRead && onMarkAsRead && (
                                <Button
                                    onClick={() => onMarkAsRead(book)}
                                    className="w-full py-2 text-sm bg-teal-100/50 hover:bg-teal-100 text-teal-700 border-none backdrop-blur-sm"
                                >
                                    <span className="flex items-center justify-center gap-2 whitespace-nowrap">
                                        <CheckCircle size={16} /> O'qidim
                                    </span>
                                </Button>
                            )}
                        </div>
                    )}

                    {!book.questions && !book.isRead && (
                        <Button
                            variant="secondary"
                            className="w-full py-2 text-sm bg-white/10 hover:bg-white/20 text-white border-none"
                            onClick={() => alert("Hozircha test mavjud emas")}
                        >
                            Test ishlash
                        </Button>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
