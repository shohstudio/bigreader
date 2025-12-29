import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Lock, ArrowRight, Sparkles } from 'lucide-react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { hashPassword, decryptData } from '../utils/security';

export default function Login() {
    const navigate = useNavigate();
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Interactive background effect
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();

        // Check hardcoded admin fallback
        if (identifier.trim() === 'admin@bigreader.uz' && password.trim() === 'admin123') {
            const adminUser = { firstName: 'Admin', lastName: 'User', email: 'admin@bigreader.uz', role: 'admin' };
            localStorage.setItem('current_user', JSON.stringify(adminUser));
            navigate('/admin');
            return;
        }

        // Check against all_users
        const allUsers = JSON.parse(localStorage.getItem('all_users') || "[]");

        // Find user by username OR email
        const user = allUsers.find(u =>
            (u.username === identifier || u.email === identifier) &&
            u.password === password
        );

        if (user) {
            localStorage.setItem('current_user', JSON.stringify(user));
            if (user.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/');
            }
        } else {
            // Legacy check for single user_profile (optional, can be kept for backward compatibility)
            const encryptedProfile = localStorage.getItem('user_profile');
            if (encryptedProfile) {
                const legacyUser = decryptData(encryptedProfile);
                const inputHash = hashPassword(password);
                if (legacyUser && legacyUser.email === identifier && legacyUser.password === inputHash) {
                    localStorage.setItem('current_user', JSON.stringify({ ...legacyUser, role: 'user' }));
                    navigate('/');
                    return;
                }
            }
            alert("Login, email yoki parol noto'g'ri!");
        }
    };

    return (
        <div className="min-h-screen w-full relative overflow-hidden bg-[#E0F7FA] flex items-center justify-center p-4 selection:bg-teal-200">
            {/* Dynamic Background Blobs */}
            <motion.div
                animate={{ x: mousePosition.x * 0.05, y: mousePosition.y * 0.05 }}
                className="absolute top-0 left-0 w-[600px] h-[600px] bg-emerald-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-70"
            />
            <motion.div
                animate={{ x: mousePosition.x * -0.05, y: mousePosition.y * -0.05 }}
                className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-teal-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-70"
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-100 rounded-full mix-blend-multiply filter blur-[120px] opacity-50" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="w-full max-w-md relative z-10"
            >
                {/* Glassmorphism Card */}
                <div className="bg-white/40 backdrop-blur-xl border border-white/50 rounded-3xl p-8 shadow-2xl shadow-teal-900/10 relative overflow-hidden group">
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />

                    <div className="text-center mb-8 relative">
                        <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-400 to-emerald-500 mb-6 shadow-lg shadow-emerald-500/30 text-white transform hover:scale-110 transition-transform"
                        >
                            <Sparkles className="w-10 h-10" />
                        </motion.div>
                        <h1 className="text-4xl font-black text-teal-900 mb-2 tracking-tight">Big Reader</h1>
                        <p className="text-teal-700 font-medium">Yorqin Kelajak Sari</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-4">
                            <div className="relative group/input">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-teal-600 group-focus-within/input:text-emerald-600 transition-colors" />
                                <Input
                                    placeholder="Login yoki Email"
                                    className="pl-12 bg-white/50 border-white/50 text-teal-900 placeholder:text-teal-600/60 focus:bg-white focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/20 rounded-2xl h-14 transition-all"
                                    type="text"
                                    value={identifier}
                                    onChange={(e) => setIdentifier(e.target.value)}
                                />
                            </div>
                            <div className="relative group/input">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-teal-600 group-focus-within/input:text-emerald-600 transition-colors" />
                                <Input
                                    placeholder="Parol"
                                    className="pl-12 bg-white/50 border-white/50 text-teal-900 placeholder:text-teal-600/60 focus:bg-white focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/20 rounded-2xl h-14 transition-all"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <Button className="w-full h-14 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all duration-300 text-lg font-bold rounded-2xl flex items-center justify-center gap-2 group/btn">
                            Kirish
                            <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                    </form>

                    <div className="mt-8 text-center bg-white/30 rounded-xl py-4 backdrop-blur-sm">
                        <p className="text-teal-800 font-medium">
                            Hali a'zo emasmisiz?{' '}
                            <Link to="/register" className="text-emerald-700 hover:text-emerald-900 font-extrabold hover:underline decoration-2 underline-offset-4 transition-colors">
                                Ro'yxatdan o'tish
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
} 14
