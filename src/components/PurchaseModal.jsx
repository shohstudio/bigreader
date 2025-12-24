import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, CreditCard, Truck } from 'lucide-react';
import { Input } from './Input';
import { Button } from './Button';

export function PurchaseModal({ book, isOpen, onClose }) {
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('cash'); // cash, card

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Buyurtma qabul qilindi!\nKitob: ${book.title}\nManzil: ${address}\nTo'lov turi: ${paymentMethod === 'cash' ? 'Naqd' : 'Karta'}`);
        onClose();
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
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-lg bg-[#0f172a] border border-white/10 rounded-3xl shadow-2xl p-6 overflow-hidden"
                    >
                        {/* Background Blob */}
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <Truck className="text-emerald-400" /> Buyurtma berish
                            </h2>
                            <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="flex gap-4 mb-6">
                            <img src={book.image} alt={book.title} className="w-20 h-28 object-cover rounded-lg shadow-md" />
                            <div>
                                <h3 className="text-white font-bold text-lg">{book.title}</h3>
                                <p className="text-white/60 text-sm mb-1">{book.author}</p>
                                <p className="text-emerald-400 font-bold">{book.price?.toLocaleString()} so'm</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                label="Yetkazib berish manzili"
                                placeholder="Viloyat, shahar, ko'cha, uy..."
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-white/90 ml-1">To'lov turi</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setPaymentMethod('cash')}
                                        className={`p-3 rounded-xl border flex items-center justify-center gap-2 transition-all ${paymentMethod === 'cash' ? 'bg-emerald-500/20 border-emerald-500 text-white' : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'}`}
                                    >
                                        <ShoppingCart size={18} /> Naqd
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setPaymentMethod('card')}
                                        className={`p-3 rounded-xl border flex items-center justify-center gap-2 transition-all ${paymentMethod === 'card' ? 'bg-emerald-500/20 border-emerald-500 text-white' : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'}`}
                                    >
                                        <CreditCard size={18} /> Karta
                                    </button>
                                </div>
                            </div>

                            <div className="pt-4">
                                <Button className="w-full font-bold">
                                    Tasdiqlash
                                </Button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
