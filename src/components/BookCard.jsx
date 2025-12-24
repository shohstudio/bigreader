import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle, ShoppingCart } from 'lucide-react';
import { Button } from './Button';
import { startTest } from '../utils/testHandler';

export function BookCard({ book, isPurchasable = false }) {
    const handleReadClick = () => {
        if (book.isRead) {
            alert("Bu kitobni allaqachon o'qigansiz!");
            return;
        }
        const confirmRead = window.confirm("Kitobni o'qib bo'ldingizmi? Test ishlashga tayyormisiz?");
        if (confirmRead) {
            startTest(book.id);
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

                <div className="mt-4 pt-4 border-t border-white/10">
                    {isPurchasable ? (
                        <div className="flex items-center justify-between">
                            <span className="text-emerald-400 font-bold text-lg">{book.price?.toLocaleString()} so'm</span>
                            <Button variant="primary" className="py-2 px-4 text-sm">
                                <ShoppingCart size={16} /> Sotib olish
                            </Button>
                        </div>
                    ) : (
                        <Button
                            variant={book.isRead ? "secondary" : "primary"}
                            className="w-full py-2 text-sm"
                            onClick={handleReadClick}
                        >
                            {book.isRead ? (
                                <span className="flex items-center gap-2"><CheckCircle size={16} /> Test topshirilgan</span>
                            ) : (
                                <span className="flex items-center gap-2"><BookOpen size={16} /> O'qib bo'ldim</span>
                            )}
                        </Button>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
