
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle, ExternalLink } from 'lucide-react';
import { Button } from './Button';

export function BookCard({ book, onReadClick }) {
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
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shadow-xl flex flex-col h-full group"
        >
            <div className="relative aspect-[2/3] overflow-hidden">
                <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
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
                    <h3 className="text-lg font-bold text-white mb-1 leading-tight">{book.title}</h3>
                    <p className="text-white/60 text-sm mb-3">{book.author}</p>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
                    <Button
                        onClick={handleReadBook}
                        className="w-full py-2 text-sm bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20"
                    >
                        <span className="flex items-center justify-center gap-2">
                            <BookOpen size={16} /> O'qish
                        </span>
                    </Button>

                    {!book.isRead && (
                        <Button
                            variant="secondary"
                            className="w-full py-2 text-sm bg-white/10 hover:bg-white/20 text-white border-none"
                            onClick={handleTestClick}
                        >
                            Test ishlash
                        </Button>
                    )}

                    {book.isRead && (
                        <div className="text-center text-emerald-400 text-xs font-medium">
                            Test muvaffaqiyatli topshirildi
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
