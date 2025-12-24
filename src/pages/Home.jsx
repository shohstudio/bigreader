import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, LogOut, User as UserIcon, Book, ShoppingBag, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { BookCard } from '../components/BookCard';
import { Input } from '../components/Input';
import { PurchaseModal } from '../components/PurchaseModal';
import { TestModal } from '../components/TestModal';
import { books } from '../data';

export default function Home() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('library'); // library, my_books, shop
    const [searchQuery, setSearchQuery] = useState('');
    const [user, setUser] = useState(null);
    const [selectedBook, setSelectedBook] = useState(null);
    const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
    const [isTestModalOpen, setIsTestModalOpen] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('current_user');
        if (!storedUser) {
            navigate('/login');
        } else {
            setUser(JSON.parse(storedUser));
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('current_user');
        navigate('/login');
    };

    const handleBuyClick = (book) => {
        setSelectedBook(book);
        setIsPurchaseModalOpen(true);
    };

    const handleReadClick = (book) => {
        if (book.isRead) {
            alert("Bu kitobni allaqachon o'qigansiz!");
            return;
        }
        // const confirmRead = window.confirm("Kitobni o'qib bo'ldingizmi? Test ishlashga tayyormisiz?");
        // if (confirmRead) {
        setIsTestModalOpen(true);
        // }
    };

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getDisplayedBooks = () => {
        if (activeTab === 'my_books') {
            return filteredBooks.filter(b => b.isRead); // Mock logic for 'my books'
        }
        return filteredBooks;
    };

    return (
        <div className="min-h-screen bg-[#0f172a] relative overflow-hidden font-sans">
            {/* Background Elements */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-900/20 rounded-full blur-[100px]" />
            </div>

            {isTestModalOpen && (
                <TestModal
                    isOpen={isTestModalOpen}
                    onClose={() => setIsTestModalOpen(false)}
                />
            )}

            {selectedBook && (
                <PurchaseModal
                    book={selectedBook}
                    isOpen={isPurchaseModalOpen}
                    onClose={() => setIsPurchaseModalOpen(false)}
                />
            )}

            {/* Header */}
            <div className="relative z-10 bg-white/5 backdrop-blur-xl border-b border-white/10 sticky top-0">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                                <Book className="text-white w-6 h-6" />
                            </div>
                            <span className="text-2xl font-bold text-white tracking-tight">Big Reader</span>
                        </div>

                        <div className="hidden md:flex flex-1 max-w-md mx-8">
                            <div className="relative w-full">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Kitob yoki muallifni qidiring..."
                                    className="w-full bg-white/10 border border-white/10 rounded-xl py-2.5 pl-12 pr-4 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="hidden sm:flex items-center gap-3 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
                                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                                    <UserIcon size={18} />
                                </div>
                                <span className="text-white font-medium">{user?.firstName}</span>
                            </div>

                            {user?.role === 'admin' && (
                                <Link
                                    to="/admin"
                                    className="hidden sm:flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl transition-colors font-medium text-sm"
                                >
                                    Admin Panel
                                </Link>
                            )}

                            <button
                                onClick={handleLogout}
                                className="p-2.5 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                                title="Chiqish"
                            >
                                <LogOut size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-6 mt-2 overflow-x-auto pb-4 scrollbar-hide">
                        <button
                            onClick={() => setActiveTab('library')}
                            className={`pb-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'library' ? 'border-emerald-500 text-white' : 'border-transparent text-white/50 hover:text-white/80'}`}
                        >
                            <div className="flex items-center gap-2">
                                <Book size={18} />
                                Kutubxona
                            </div>
                        </button>
                        <button
                            onClick={() => setActiveTab('my_books')}
                            className={`pb-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'my_books' ? 'border-emerald-500 text-white' : 'border-transparent text-white/50 hover:text-white/80'}`}
                        >
                            <div className="flex items-center gap-2">
                                <CheckCircle size={18} />
                                O'qilganlar
                            </div>
                        </button>
                        <button
                            onClick={() => setActiveTab('shop')}
                            className={`pb-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'shop' ? 'border-emerald-500 text-white' : 'border-transparent text-white/50 hover:text-white/80'}`}
                        >
                            <div className="flex items-center gap-2">
                                <ShoppingBag size={18} />
                                Kitob do'koni
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {getDisplayedBooks().map((book) => (
                            <BookCard
                                key={book.id}
                                book={book}
                                isPurchasable={activeTab === 'shop'}
                                onBuyClick={handleBuyClick}
                                onReadClick={handleReadClick}
                            />
                        ))}
                    </div>

                    {getDisplayedBooks().length === 0 && (
                        <div className="text-center py-20">
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Book className="text-white/20 w-8 h-8" />
                            </div>
                            <p className="text-white/40 text-lg">Hozircha kitoblar yo'q</p>
                        </div>
                    )}
                </motion.div>
            </main>
        </div>
    );
}
