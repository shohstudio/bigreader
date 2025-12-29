import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, LogOut, User as UserIcon, Book, CheckCircle, Smartphone, ClipboardList } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { BookCard } from '../components/BookCard';
import { TestModal } from '../components/TestModal';
import { books } from '../data';

export default function Home() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('library'); // library, my_books
    const [bookCategory, setBookCategory] = useState('ozbek'); // 'ozbek' or 'xorijiy'
    const [searchQuery, setSearchQuery] = useState('');
    const [user, setUser] = useState(null);
    const [readBooks, setReadBooks] = useState([]); // Array of book IDs
    const [isTestModalOpen, setIsTestModalOpen] = useState(false);
    const [selectedTestBook, setSelectedTestBook] = useState(null);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('current_user');
        if (!storedUser) {
            navigate('/login');
        } else {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            // Load read books for this user
            const storageKey = `read_books_${parsedUser.username || parsedUser.email}`;
            const storedReadBooks = JSON.parse(localStorage.getItem(storageKey) || '[]');
            setReadBooks(storedReadBooks);
        }
    }, [navigate]);

    const handleMarkAsRead = (book) => {
        if (!user) return;

        const newReadBooks = [...readBooks, book.id];
        // Deduplicate just in case
        const uniqueReadBooks = [...new Set(newReadBooks)];

        setReadBooks(uniqueReadBooks);

        // Save to local storage specific to user
        const storageKey = `read_books_${user.username || user.email}`;
        localStorage.setItem(storageKey, JSON.stringify(uniqueReadBooks));

        // Optional: switch to 'my_books' tab to show it moved?
        // setActiveTab('my_books'); 
    };

    const handleLogout = () => {
        localStorage.removeItem('current_user');
        navigate('/login');
    };

    const handleTestClick = (book) => {
        // If coming from 'tests' tab, we start the test
        if (activeTab === 'tests') {
            if (book.questions && book.questions.length > 0) {
                setSelectedTestBook(book);
                setIsTestModalOpen(true);
            } else {
                alert("Bu kitob uchun testlar hali yuklanmagan.");
            }
        }
        // Logic for 'read' check can remain if needed for other contexts, 
        // but for now the button in BookCard only calls this locally if we passed it.
    };

    const filteredBooks = books.filter(book => {
        const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.author.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory = activeTab === 'library' ? book.type === bookCategory : true;

        return matchesSearch && matchesCategory;
    });

    const getDisplayedBooks = () => {
        if (activeTab === 'my_books' || activeTab === 'tests') {
            return books.filter(b =>
                readBooks.includes(b.id) &&
                (b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    b.author.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }
        return filteredBooks;
    };

    return (
        <div className="min-h-screen bg-[#F0FDF4] flex font-sans text-teal-900 overflow-hidden relative">
            {/* Ambient Background */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-200/30 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-200/30 rounded-full blur-[100px] pointer-events-none" />

            {isTestModalOpen && selectedTestBook && (
                <TestModal
                    isOpen={isTestModalOpen}
                    onClose={() => {
                        setIsTestModalOpen(false);
                        setSelectedTestBook(null);
                    }}
                    book={selectedTestBook}
                />
            )}

            {/* Sidebar with Glassmorphism */}
            <div className="w-72 relative z-20 hidden lg:flex flex-col p-6">
                <div className="bg-white/80 backdrop-blur-xl border border-white/60 h-full rounded-3xl shadow-2xl shadow-teal-900/5 flex flex-col p-6">
                    <div className="flex items-center gap-3 mb-10 mt-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-400 to-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
                            <Book size={20} />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-teal-900 tracking-tight leading-none">Big Reader</h2>
                            <span className="text-teal-500 text-xs font-bold uppercase tracking-wider">Kutubxona</span>
                        </div>
                    </div>

                    <nav className="flex-1 space-y-2">
                        <SidebarItem
                            icon={Book}
                            label="Umumiy Kutubxona"
                            active={activeTab === 'library'}
                            onClick={() => setActiveTab('library')}
                        />
                        <SidebarItem
                            icon={CheckCircle}
                            label="O'qilgan Kitoblar"
                            active={activeTab === 'my_books'}
                            onClick={() => setActiveTab('my_books')}
                        />
                        <SidebarItem
                            icon={ClipboardList}
                            label="Bilim Testlari"
                            active={activeTab === 'tests'}
                            onClick={() => setActiveTab('tests')}
                        />
                    </nav>

                    <div className="border-t border-teal-100 pt-6 mt-6 space-y-2">
                        {/* Mobile App Promo (Optional) */}
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white mb-4 shadow-lg shadow-emerald-500/20">
                            <div className="flex items-center gap-2 mb-2">
                                <Smartphone size={18} />
                                <span className="font-bold text-sm">Mobil Ilova</span>
                            </div>
                            <p className="text-xs text-white/80 leading-relaxed">Tez kunda Play Market va App Store da!</p>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-red-400 hover:bg-red-50 hover:text-red-500 transition-all text-sm font-bold"
                        >
                            <LogOut size={20} />
                            Chiqish
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto relative p-4 lg:p-8">
                <div className="max-w-7xl mx-auto h-full flex flex-col">
                    <header className="flex flex-col md:flex-row justify-between items-end md:items-center mb-10 bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white/50 shadow-sm gap-4">
                        <div>
                            <h1 className="text-3xl font-black text-teal-900 mb-1 tracking-tight">
                                {activeTab === 'library' && 'Kutubxona Fondi'}
                                {activeTab === 'my_books' && 'Mening Kitoblarim'}
                                {activeTab === 'tests' && 'Bilim Testlari'}
                            </h1>
                            <p className="text-teal-600 font-medium">Xush kelibsiz, bilimlar olamiga!</p>
                        </div>

                        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                            {/* Search Bar */}
                            <div className="relative w-full md:w-64 group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-teal-400 group-focus-within:text-emerald-500 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Kitob izlash..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-2.5 bg-white border border-teal-100 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none text-teal-900 placeholder:text-teal-300 transition-all"
                                />
                            </div>

                            <div className="relative">
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-2xl border border-white shadow-sm w-full md:w-auto hover:bg-white/80 transition-colors"
                                >
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-100 to-emerald-200 flex items-center justify-center text-teal-700">
                                        <UserIcon size={18} />
                                    </div>
                                    <div className="flex flex-col items-start">
                                        <span className="font-bold text-sm text-teal-900 leading-none">{user?.firstName || 'Foydalanuvchi'}</span>
                                        <span className="text-xs text-teal-400 font-medium">{user?.role === 'admin' ? 'Admin' : 'Kitobxon'}</span>
                                    </div>
                                </button>

                                <AnimatePresence>
                                    {isProfileOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            className="absolute right-0 top-full mt-2 w-64 bg-white/90 backdrop-blur-xl border border-white rounded-3xl shadow-xl overflow-hidden z-50 p-4"
                                        >
                                            <div className="flex flex-col items-center text-center p-4 bg-teal-50/50 rounded-2xl border border-teal-100 mb-2">
                                                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-teal-400 to-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 mb-3">
                                                    <span className="text-2xl font-bold">{user?.firstName?.[0] || 'F'}</span>
                                                </div>
                                                <h3 className="font-bold text-teal-900">{user?.firstName} {user?.lastName}</h3>
                                                <p className="text-xs text-teal-500 font-medium mb-1">@{user?.username || 'username'}</p>
                                                <span className="px-3 py-1 bg-teal-100 text-teal-700 text-[10px] font-bold uppercase tracking-wider rounded-full">
                                                    {user?.role === 'admin' ? 'Admin Administrator' : 'Foydalanuvchi'}
                                                </span>
                                            </div>

                                            <div className="space-y-1">
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 hover:text-red-600 transition-all text-sm font-bold"
                                                >
                                                    <LogOut size={18} />
                                                    Tizimdan chiqish
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </header>

                    {/* Category Tabs (Large) */}
                    {activeTab === 'library' && (
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <button
                                onClick={() => setBookCategory('ozbek')}
                                className={`p-6 rounded-3xl border-2 transition-all duration-300 flex flex-col items-center justify-center gap-3 group ${bookCategory === 'ozbek'
                                    ? 'bg-gradient-to-br from-teal-500 to-emerald-600 border-transparent shadow-xl shadow-emerald-500/20 scale-[1.02]'
                                    : 'bg-white/40 border-white hover:bg-white/60 hover:scale-[1.01]'
                                    }`}
                            >
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-colors ${bookCategory === 'ozbek'
                                    ? 'bg-white/20 text-white'
                                    : 'bg-teal-100 text-teal-600'
                                    }`}>
                                    <Book size={24} />
                                </div>
                                <div className="text-center">
                                    <h3 className={`text-xl font-black mb-1 ${bookCategory === 'ozbek' ? 'text-white' : 'text-teal-900'}`}>O'zbek Adabiyoti</h3>
                                    <p className={`text-sm font-medium ${bookCategory === 'ozbek' ? 'text-white/80' : 'text-teal-500'}`}>Milliy durdonalar</p>
                                </div>
                            </button>

                            <button
                                onClick={() => setBookCategory('xorijiy')}
                                className={`p-6 rounded-3xl border-2 transition-all duration-300 flex flex-col items-center justify-center gap-3 group ${bookCategory === 'xorijiy'
                                    ? 'bg-gradient-to-br from-blue-500 to-indigo-600 border-transparent shadow-xl shadow-blue-500/20 scale-[1.02]'
                                    : 'bg-white/40 border-white hover:bg-white/60 hover:scale-[1.01]'
                                    }`}
                            >
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-colors ${bookCategory === 'xorijiy'
                                    ? 'bg-white/20 text-white'
                                    : 'bg-blue-100 text-blue-600'
                                    }`}>
                                    <Book size={24} />
                                </div>
                                <div className="text-center">
                                    <h3 className={`text-xl font-black mb-1 ${bookCategory === 'xorijiy' ? 'text-white' : 'text-teal-900'}`}>Xorijiy Adabiyot</h3>
                                    <p className={`text-sm font-medium ${bookCategory === 'xorijiy' ? 'text-white/80' : 'text-teal-500'}`}>Jahon bestsellerlari</p>
                                </div>
                            </button>
                        </div>
                    )}

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                {getDisplayedBooks().map((book) => (
                                    <BookCard
                                        key={book.id}
                                        book={{ ...book, isRead: readBooks.includes(book.id) }}
                                        onReadClick={activeTab === 'tests' ? handleTestClick : undefined}
                                        onMarkAsRead={handleMarkAsRead}
                                    />
                                ))}
                            </div>

                            {getDisplayedBooks().length === 0 && (
                                <div className="text-center py-20 bg-white/40 backdrop-blur-sm rounded-3xl border border-white/40">
                                    <div className="w-20 h-20 bg-white/50 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-teal-900/5">
                                        <Book className="text-teal-300 w-10 h-10" />
                                    </div>
                                    <p className="text-teal-800 font-bold text-xl mb-1">Kitoblar topilmadi</p>
                                    <p className="text-teal-500">Boshqa so'z bilan qidirib ko'ring</p>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

function SidebarItem({ icon: Icon, label, active, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 text-sm font-bold relative overflow-hidden group
                ${active
                    ? 'text-white shadow-lg shadow-emerald-500/25'
                    : 'text-teal-500 hover:bg-teal-50 hover:text-teal-700'
                }`}
        >
            {active && (
                <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-teal-500 to-emerald-500"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
            )}
            <span className="relative z-10 flex items-center gap-3">
                <Icon size={20} className={active ? 'text-white' : 'group-hover:scale-110 transition-transform'} />
                {label}
            </span>
        </button>
    );
}
