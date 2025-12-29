import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    Users,
    Book,
    ShoppingCart,
    LogOut,
    Settings,
    TrendingUp,
    DollarSign,
    Sparkles,
    Search,
    X,
    Upload
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { books, users, orders } from '../data';

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [searchQuery, setSearchQuery] = useState('');

    const handleLogout = () => {
        localStorage.removeItem('current_user');
        navigate('/login');
    };

    const [usersList, setUsersList] = useState(() => {
        const localUsers = JSON.parse(localStorage.getItem('all_users') || "[]");
        return [...users, ...localUsers];
    });
    const [booksList, setBooksList] = useState(books);

    const handleDeleteUser = (id) => {
        if (window.confirm("Foydalanuvchini o'chirmoqchimisiz?")) {
            setUsersList(usersList.filter(u => u.id !== id));
        }
    };

    const handleDeleteBook = (id) => {
        if (window.confirm("Kitobni o'chirmoqchimisiz?")) {
            setBooksList(booksList.filter(b => b.id !== id));
        }
    };

    // Add Book State
    const [isAddBookOpen, setIsAddBookOpen] = useState(false);
    const [bookCategory, setBookCategory] = useState('ozbek'); // 'ozbek' or 'xorijiy'
    const [newBook, setNewBook] = useState({
        title: '',
        author: '',
        price: '',
        year: '',
        image: null
    });

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewBook({ ...newBook, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddBook = (e) => {
        e.preventDefault();
        const book = {
            id: Date.now(),
            title: newBook.title,
            author: newBook.author,
            price: Number(newBook.price) || 0,
            image: newBook.image || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=2730&ixlib=rb-4.0.3', // Fallback image
            category: 'Badiiy', // Default
            type: bookCategory, // Assign current category
            rating: 5,
            year: newBook.year
        };

        setBooksList([book, ...booksList]);
        setIsAddBookOpen(false);
        setNewBook({ title: '', author: '', price: '', year: '', image: null });
    };

    // Add User State
    const [isAddUserOpen, setIsAddUserOpen] = useState(false);
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        role: 'user',
        username: '',
        password: ''
    });

    const handleAddUser = (e) => {
        e.preventDefault();
        const user = {
            id: Date.now(),
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            username: newUser.username,
            password: newUser.password,
            joinedDate: new Date().toISOString().split('T')[0]
        };

        setUsersList([user, ...usersList]);

        // Update localStorage as well to persist
        const currentLocalUsers = JSON.parse(localStorage.getItem('all_users') || "[]");
        localStorage.setItem('all_users', JSON.stringify([...currentLocalUsers, user]));

        setIsAddUserOpen(false);
        setNewUser({ name: '', email: '', role: 'user', username: '', password: '' });
    };

    const stats = {
        totalUsers: users.length,
        totalBooks: books.length,
        totalOrders: orders.length,
        totalRevenue: orders.reduce((acc, order) => acc + order.amount, 0)
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        <StatsCard
                            title="Foydalanuvchilar"
                            value={usersList.length}
                            icon={Users}
                            gradient="from-teal-400 to-emerald-400"
                        />
                        <StatsCard
                            title="Kitoblar"
                            value={booksList.length}
                            icon={Book}
                            gradient="from-emerald-400 to-cyan-400"
                        />
                        <StatsCard
                            title="Buyurtmalar"
                            value={orders.length}
                            icon={ShoppingCart}
                            gradient="from-cyan-400 to-blue-400"
                        />
                        <StatsCard
                            title="Daromad"
                            value={`${stats.totalRevenue.toLocaleString()} so'm`}
                            icon={DollarSign}
                            gradient="from-blue-400 to-indigo-400"
                        />

                        {/* Recent Orders Table */}
                        <div className="col-span-1 md:col-span-2 lg:col-span-4 bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-8 mt-6 shadow-xl shadow-teal-900/5">
                            <h3 className="text-xl font-bold text-teal-900 mb-6 flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-teal-500" />
                                So'nggi buyurtmalar
                            </h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-teal-800">
                                    <thead>
                                        <tr className="border-b border-teal-100 text-teal-500 text-xs uppercase tracking-wider">
                                            <th className="pb-3 pl-2 font-bold">ID</th>
                                            <th className="pb-3 font-bold">Sana</th>
                                            <th className="pb-3 font-bold">Summa</th>
                                            <th className="pb-3 font-bold">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-teal-50">
                                        {orders.map(order => (
                                            <tr key={order.id} className="hover:bg-teal-50/50 transition-colors">
                                                <td className="py-4 pl-2 font-bold text-teal-900">#{order.id}</td>
                                                <td className="py-4 font-medium">{order.date}</td>
                                                <td className="py-4 font-bold text-emerald-600">{order.amount.toLocaleString()} so'm</td>
                                                <td className="py-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </motion.div>
                );
            case 'users':
                return (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-8 shadow-xl shadow-teal-900/5">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-bold text-teal-900">Barcha Foydalanuvchilar</h3>
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-teal-400" />
                                    <input
                                        type="text"
                                        placeholder="Qidirish..."
                                        className="pl-12 pr-4 py-2 bg-white border border-teal-100 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none text-teal-900 placeholder:text-teal-300 transition-shadow"
                                    />
                                </div>
                                <button
                                    onClick={() => setIsAddUserOpen(true)}
                                    className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-emerald-500/20 transition-all hover:-translate-y-0.5 active:scale-95 flex items-center gap-2"
                                >
                                    <span className="text-xl leading-none">+</span> Qo'shish
                                </button>
                            </div>
                        </div>

                        {/* Add User Modal */}
                        <AnimatePresence>
                            {isAddUserOpen && (
                                <>
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onClick={() => setIsAddUserOpen(false)}
                                        className="fixed inset-0 bg-teal-900/20 backdrop-blur-sm z-50"
                                    />
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                        className="fixed inset-0 m-auto w-full max-w-md h-fit bg-white rounded-3xl p-8 shadow-2xl z-50 border border-teal-100"
                                    >
                                        <div className="flex justify-between items-center mb-6">
                                            <h3 className="text-2xl font-bold text-teal-900">Yangi foydalanuvchi</h3>
                                            <button
                                                onClick={() => setIsAddUserOpen(false)}
                                                className="p-2 rounded-xl hover:bg-red-50 text-teal-400 hover:text-red-500 transition-colors"
                                            >
                                                <X size={24} />
                                            </button>
                                        </div>

                                        <form onSubmit={handleAddUser} className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-bold text-teal-700 mb-1">Ism Familiya</label>
                                                <input
                                                    required
                                                    type="text"
                                                    value={newUser.name}
                                                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                                    className="w-full px-4 py-3 rounded-xl bg-teal-50/50 border border-teal-100 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 outline-none font-medium text-teal-900"
                                                    placeholder="Vali Aliyev"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-bold text-teal-700 mb-1">Login</label>
                                                <input
                                                    required
                                                    type="text"
                                                    value={newUser.username}
                                                    onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                                                    className="w-full px-4 py-3 rounded-xl bg-teal-50/50 border border-teal-100 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 outline-none font-medium text-teal-900"
                                                    placeholder="vali_aliyev"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-bold text-teal-700 mb-1">Parol</label>
                                                <input
                                                    required
                                                    type="password"
                                                    value={newUser.password}
                                                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                                    className="w-full px-4 py-3 rounded-xl bg-teal-50/50 border border-teal-100 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 outline-none font-medium text-teal-900"
                                                    placeholder="********"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-bold text-teal-700 mb-1">Email</label>
                                                <input
                                                    required
                                                    type="email"
                                                    value={newUser.email}
                                                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                                    className="w-full px-4 py-3 rounded-xl bg-teal-50/50 border border-teal-100 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 outline-none font-medium text-teal-900"
                                                    placeholder="vali@example.com"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-bold text-teal-700 mb-1">Ro'l</label>
                                                <select
                                                    value={newUser.role}
                                                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                                                    className="w-full px-4 py-3 rounded-xl bg-teal-50/50 border border-teal-100 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 outline-none font-medium text-teal-900"
                                                >
                                                    <option value="user">Odatiy foydalanuvchi</option>
                                                    <option value="admin">Admin</option>
                                                </select>
                                            </div>

                                            <button
                                                type="submit"
                                                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-lg shadow-lg shadow-emerald-500/20 transition-all hover:-translate-y-1 mt-2"
                                            >
                                                Qo'shish
                                            </button>
                                        </form>
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-teal-800">
                                <thead>
                                    <tr className="border-b border-teal-100 text-teal-500 text-xs uppercase tracking-wider">
                                        <th className="pb-4 pl-2 font-bold">Ism</th>
                                        <th className="pb-4 font-bold">Email</th>
                                        <th className="pb-4 font-bold">Ro'l</th>
                                        <th className="pb-4 font-bold">Sana</th>
                                        <th className="pb-4 text-right font-bold">Amallar</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-teal-50">
                                    {usersList.map((user, i) => (
                                        <motion.tr
                                            key={user.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="hover:bg-teal-50/50 transition-colors group"
                                        >
                                            <td className="py-4 pl-2 font-bold text-teal-900">{user.name}</td>
                                            <td className="py-4 font-medium text-teal-700">{user.email}</td>
                                            <td className="py-4">
                                                <span className={`px-2 py-1 rounded-md text-xs font-bold uppercase ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-teal-100 text-teal-700'}`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="py-4 text-teal-600">{user.joinedDate}</td>
                                            <td className="py-4 text-right">
                                                <button
                                                    onClick={() => handleDeleteUser(user.id)}
                                                    className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                                                >
                                                    <LogOut size={16} />
                                                </button>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                );
            case 'books':
                return (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white/60 backdrop-blur-md p-4 rounded-2xl border border-white/50">

                            {/* Category Tabs */}
                            <div className="flex items-center gap-2 p-1 bg-teal-50/50 rounded-xl border border-teal-100">
                                <button
                                    onClick={() => setBookCategory('ozbek')}
                                    className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-all duration-300 ${bookCategory === 'ozbek'
                                        ? 'bg-white text-teal-600 shadow-sm'
                                        : 'text-teal-400 hover:text-teal-600 hover:bg-teal-50'
                                        }`}
                                >
                                    O'zbek adabiyoti
                                </button>
                                <button
                                    onClick={() => setBookCategory('xorijiy')}
                                    className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-all duration-300 ${bookCategory === 'xorijiy'
                                        ? 'bg-white text-teal-600 shadow-sm'
                                        : 'text-teal-400 hover:text-teal-600 hover:bg-teal-50'
                                        }`}
                                >
                                    Xorijiy adabiyot
                                </button>
                            </div>

                            <button
                                onClick={() => setIsAddBookOpen(true)}
                                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-emerald-500/20 transition-all hover:-translate-y-0.5 active:scale-95 flex items-center gap-2"
                            >
                                <span className="text-xl leading-none">+</span> Yangi kitob
                            </button>
                        </div>

                        {/* Add Book Modal */}
                        <AnimatePresence>
                            {isAddBookOpen && (
                                <>
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onClick={() => setIsAddBookOpen(false)}
                                        className="fixed inset-0 bg-teal-900/20 backdrop-blur-sm z-50"
                                    />
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                        className="fixed inset-0 m-auto w-full max-w-lg h-fit bg-white rounded-3xl p-8 shadow-2xl z-50 border border-teal-100"
                                    >
                                        <div className="flex justify-between items-center mb-6">
                                            <div>
                                                <h3 className="text-2xl font-bold text-teal-900">Yangi kitob qo'shish</h3>
                                                <p className="text-sm font-medium text-teal-500 mt-1">
                                                    Bo'lim: <span className="text-emerald-600 font-bold">{bookCategory === 'ozbek' ? "O'zbek adabiyoti" : "Xorijiy adabiyot"}</span>
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => setIsAddBookOpen(false)}
                                                className="p-2 rounded-xl hover:bg-red-50 text-teal-400 hover:text-red-500 transition-colors"
                                            >
                                                <X size={24} />
                                            </button>
                                        </div>

                                        <form onSubmit={handleAddBook} className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-bold text-teal-700 mb-1">Kitob nomi</label>
                                                <input
                                                    required
                                                    type="text"
                                                    value={newBook.title}
                                                    onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                                                    className="w-full px-4 py-3 rounded-xl bg-teal-50/50 border border-teal-100 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 connection-none outline-none font-medium text-teal-900"
                                                    placeholder="Masalan: O'tkan kunlar"
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-bold text-teal-700 mb-1">Muallif</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        value={newBook.author}
                                                        onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                                                        className="w-full px-4 py-3 rounded-xl bg-teal-50/50 border border-teal-100 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 outline-none font-medium text-teal-900"
                                                        placeholder="Abdulla Qodiriy"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-bold text-teal-700 mb-1">Yili</label>
                                                    <input
                                                        type="number"
                                                        value={newBook.year}
                                                        onChange={(e) => setNewBook({ ...newBook, year: e.target.value })}
                                                        className="w-full px-4 py-3 rounded-xl bg-teal-50/50 border border-teal-100 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 outline-none font-medium text-teal-900"
                                                        placeholder="2024"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-bold text-teal-700 mb-1">Narxi (so'm)</label>
                                                <input
                                                    required
                                                    type="number"
                                                    value={newBook.price}
                                                    onChange={(e) => setNewBook({ ...newBook, price: e.target.value })}
                                                    className="w-full px-4 py-3 rounded-xl bg-teal-50/50 border border-teal-100 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 outline-none font-medium text-teal-900"
                                                    placeholder="50000"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-bold text-teal-700 mb-1">Muqova rasmi</label>
                                                <div className="relative group">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleImageUpload}
                                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                    />
                                                    <div className={`w-full p-4 rounded-xl border-2 border-dashed transition-colors flex items-center justify-center gap-3
                                                        ${newBook.image ? 'border-emerald-400 bg-emerald-50' : 'border-teal-200 bg-teal-50 group-hover:bg-teal-100 group-hover:border-teal-300'}`}
                                                    >
                                                        {newBook.image ? (
                                                            <>
                                                                <img src={newBook.image} alt="Preview" className="w-12 h-12 rounded object-cover" />
                                                                <span className="text-emerald-600 font-bold">Rasm yuklandi</span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Upload className="text-teal-400" />
                                                                <span className="text-teal-600 font-medium">Rasm yuklash</span>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <button
                                                type="submit"
                                                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-lg shadow-lg shadow-emerald-500/20 transition-all hover:-translate-y-1 mt-2"
                                            >
                                                Qo'shish
                                            </button>
                                        </form>
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {booksList
                                .filter(book => book.type === bookCategory)
                                .map((book, i) => (
                                    <motion.div
                                        key={book.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="bg-white/80 border border-white/60 rounded-2xl overflow-hidden group hover:shadow-2xl hover:shadow-teal-900/10 transition-all duration-300 hover:-translate-y-1"
                                    >
                                        <div className="relative aspect-[2/3] overflow-hidden">
                                            <img src={book.image} alt={book.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                            <div className="absolute inset-0 bg-teal-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-sm">
                                                <button
                                                    onClick={() => handleDeleteBook(book.id)}
                                                    className="p-3 rounded-full bg-white text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-lg hover:scale-110"
                                                >
                                                    <LogOut size={20} />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="p-5">
                                            <h3 className="text-teal-900 font-bold text-lg truncate mb-1">{book.title}</h3>
                                            <p className="text-teal-500 text-sm mb-3 font-medium">{book.author}</p>
                                            <p className="text-emerald-700 font-bold bg-emerald-50 inline-block px-3 py-1 rounded-lg border border-emerald-100">{(book.price || 0).toLocaleString()} so'm</p>
                                        </div>
                                    </motion.div>
                                ))}
                        </div>
                    </motion.div>
                );
            case 'orders':
                return (
                    <div className="flex flex-col items-center justify-center py-20 bg-white/50 rounded-3xl border border-dashed border-teal-200">
                        <ShoppingCart className="w-16 h-16 text-teal-200 mb-4" />
                        <h3 className="text-xl font-bold text-teal-800">Buyurtmalar boshqaruvi</h3>
                        <p className="text-teal-500">Tez kunda ishga tushadi</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-[#F0FDF4] flex font-sans text-teal-900 overflow-hidden relative">
            {/* Ambient Background */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-200/30 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-200/30 rounded-full blur-[100px] pointer-events-none" />

            {/* Sidebar with Glassmorphism */}
            <div className="w-72 relative z-20 hidden lg:flex flex-col p-6">
                <div className="bg-white/80 backdrop-blur-xl border border-white/60 h-full rounded-3xl shadow-2xl shadow-teal-900/5 flex flex-col p-6">
                    <div className="flex items-center gap-3 mb-10 mt-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-400 to-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
                            <LayoutDashboard size={20} />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-teal-900 tracking-tight leading-none">Admin</h2>
                            <span className="text-teal-500 text-xs font-bold uppercase tracking-wider">Panel</span>
                        </div>
                    </div>

                    <nav className="flex-1 space-y-2">
                        <SidebarItem icon={TrendingUp} label="Statistika" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
                        <SidebarItem icon={Users} label="Foydalanuvchilar" active={activeTab === 'users'} onClick={() => setActiveTab('users')} />
                        <SidebarItem icon={Book} label="Kitoblar" active={activeTab === 'books'} onClick={() => setActiveTab('books')} />
                        <SidebarItem icon={ShoppingCart} label="Buyurtmalar" active={activeTab === 'orders'} onClick={() => setActiveTab('orders')} />
                    </nav>

                    <div className="border-t border-teal-100 pt-6 mt-6 space-y-2">
                        <SidebarItem icon={Settings} label="Sozlamalar" />
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
                    <header className="flex justify-between items-end mb-10 bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white/50 shadow-sm">
                        <div>
                            <h1 className="text-3xl font-black text-teal-900 mb-1 tracking-tight">
                                {activeTab === 'dashboard' && 'Umumiy Statistika'}
                                {activeTab === 'users' && 'Foydalanuvchilar'}
                                {activeTab === 'books' && 'Kutubxona Fondi'}
                                {activeTab === 'orders' && 'Buyurtmalar'}
                            </h1>
                            <p className="text-teal-600 font-medium">Bugun {new Date().toLocaleDateString('uz-UZ', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-2xl border border-white shadow-sm">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-100 to-emerald-200 flex items-center justify-center text-teal-700">
                                    <Users size={18} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-bold text-sm text-teal-900 leading-none">Admin User</span>
                                    <span className="text-xs text-teal-400 font-medium">Boshqaruvchi</span>
                                </div>
                            </div>
                        </div>
                    </header>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {renderContent()}
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

function StatsCard({ title, value, icon: Icon, gradient }) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-xl shadow-teal-900/5 relative overflow-hidden group"
        >
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${gradient} opacity-10 rounded-bl-full group-hover:scale-110 transition-transform duration-500`} />

            <div className="flex flex-col h-full justify-between relative z-10">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-lg mb-4`}>
                    <Icon size={24} />
                </div>
                <div>
                    <h4 className="text-teal-500 text-sm font-bold uppercase tracking-wider mb-1">{title}</h4>
                    <p className="text-3xl font-black text-teal-900">{value}</p>
                </div>
            </div>
        </motion.div>
    );
}
