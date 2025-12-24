import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    Users,
    Book,
    ShoppingCart,
    LogOut,
    Settings,
    TrendingUp,
    DollarSign
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { books, users, orders } from '../data';

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('dashboard');

    const handleLogout = () => {
        localStorage.removeItem('current_user');
        navigate('/login');
    };

    const [usersList, setUsersList] = useState(users);
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatsCard
                            title="Foydalanuvchilar"
                            value={usersList.length}
                            icon={Users}
                            color="bg-blue-500"
                        />
                        <StatsCard
                            title="Kitoblar"
                            value={booksList.length}
                            icon={Book}
                            color="bg-emerald-500"
                        />
                        <StatsCard
                            title="Buyurtmalar"
                            value={orders.length}
                            icon={ShoppingCart}
                            color="bg-purple-500"
                        />
                        <StatsCard
                            title="Daromad"
                            value={`${stats.totalRevenue.toLocaleString()} so'm`}
                            icon={DollarSign}
                            color="bg-amber-500"
                        />

                        {/* Recent Orders Chart / List Placeholder */}
                        <div className="col-span-1 md:col-span-2 lg:col-span-4 bg-white/5 border border-white/10 rounded-2xl p-6 mt-6">
                            <h3 className="text-xl font-bold text-white mb-4">So'nggi buyurtmalar</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-white/80">
                                    <thead>
                                        <tr className="border-b border-white/10">
                                            <th className="pb-3 pl-2">ID</th>
                                            <th className="pb-3">Sana</th>
                                            <th className="pb-3">Summa</th>
                                            <th className="pb-3">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map(order => (
                                            <tr key={order.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                                                <td className="py-3 pl-2">#{order.id}</td>
                                                <td className="py-3">{order.date}</td>
                                                <td className="py-3 font-semibold text-emerald-400">{order.amount.toLocaleString()} so'm</td>
                                                <td className="py-3">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${order.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                );
            case 'users':
                return (
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-white/80">
                                <thead>
                                    <tr className="border-b border-white/10 text-white/60 text-sm">
                                        <th className="pb-4 pl-2">Ism</th>
                                        <th className="pb-4">Email</th>
                                        <th className="pb-4">Ro'l</th>
                                        <th className="pb-4">A'zo bo'lgan sana</th>
                                        <th className="pb-4 text-right">Amallar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usersList.map(user => (
                                        <tr key={user.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors group">
                                            <td className="py-4 pl-2 font-medium text-white">{user.name}</td>
                                            <td className="py-4">{user.email}</td>
                                            <td className="py-4">
                                                <span className={`px-2 py-1 rounded-md text-xs font-bold uppercase ${user.role === 'admin' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'}`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="py-4">{user.joinedDate}</td>
                                            <td className="py-4 text-right">
                                                <button
                                                    onClick={() => handleDeleteUser(user.id)}
                                                    className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors opacity-0 group-hover:opacity-100"
                                                    title="O'chirish"
                                                >
                                                    <LogOut size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            case 'books':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-end">
                            <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl font-bold transition-colors flex items-center gap-2">
                                <span className="text-xl">+</span> Yangi kitob
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {booksList.map(book => (
                                <div key={book.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden group">
                                    <div className="relative aspect-[2/3]">
                                        <img src={book.image} alt={book.title} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                            <button
                                                onClick={() => handleDeleteBook(book.id)}
                                                className="p-3 rounded-full bg-red-500/80 text-white hover:bg-red-600 transition-colors"
                                            >
                                                <LogOut size={20} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-white font-bold truncate">{book.title}</h3>
                                        <p className="text-white/60 text-sm mb-2">{book.author}</p>
                                        <p className="text-emerald-400 font-bold">{book.price.toLocaleString()} so'm</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'orders':
                return <div className="text-white text-center py-20">Buyurtmalar boshqaruvi (Tez kunda)</div>;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-[#0f172a] flex font-sans text-white overflow-hidden">
            {/* Sidebar */}
            <div className="w-64 bg-slate-900 border-r border-white/10 flex flex-col p-4">
                <div className="flex items-center gap-3 px-2 mb-8 mt-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                        <LayoutDashboard size={18} />
                    </div>
                    <span className="text-xl font-bold tracking-tight">Admin Panel</span>
                </div>

                <nav className="flex-1 space-y-1">
                    <SidebarItem icon={TrendingUp} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
                    <SidebarItem icon={Users} label="Foydalanuvchilar" active={activeTab === 'users'} onClick={() => setActiveTab('users')} />
                    <SidebarItem icon={Book} label="Kitoblar" active={activeTab === 'books'} onClick={() => setActiveTab('books')} />
                    <SidebarItem icon={ShoppingCart} label="Buyurtmalar" active={activeTab === 'orders'} onClick={() => setActiveTab('orders')} />
                </nav>

                <div className="border-t border-white/10 pt-4 mt-4 space-y-1">
                    <SidebarItem icon={Settings} label="Sozlamalar" />
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors text-sm font-medium"
                    >
                        <LogOut size={20} />
                        Chiqish
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto p-8 relative">
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />

                <header className="flex justify-between items-center mb-8 relative z-10">
                    <h1 className="text-3xl font-bold">
                        {activeTab === 'dashboard' && 'Umumiy Statistika'}
                        {activeTab === 'users' && 'Foydalanuvchilar'}
                        {activeTab === 'books' && 'Kitoblar'}
                        {activeTab === 'orders' && 'Buyurtmalar'}
                    </h1>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center">
                            <Users size={20} className="text-white/60" />
                        </div>
                    </div>
                </header>

                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative z-10"
                >
                    {renderContent()}
                </motion.div>
            </div>
        </div>
    );
}

function SidebarItem({ icon: Icon, label, active, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium
                ${active
                    ? 'bg-indigo-600 shadow-lg shadow-indigo-500/25 text-white'
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
        >
            <Icon size={20} />
            {label}
        </button>
    );
}

function StatsCard({ title, value, icon: Icon, color }) {
    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/10 transition-colors group">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h4 className="text-white/60 text-sm font-medium mb-1">{title}</h4>
                    <p className="text-2xl font-bold text-white group-hover:scale-105 transition-transform origin-left">{value}</p>
                </div>
                <div className={`w-10 h-10 rounded-xl ${color} bg-opacity-20 flex items-center justify-center text-white shadow-lg`}>
                    <Icon size={20} />
                </div>
            </div>
        </div>
    );
}
