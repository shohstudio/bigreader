import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, User, Lock, ArrowRight } from 'lucide-react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

import { hashPassword, decryptData } from '../utils/security';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        const encryptedProfile = localStorage.getItem('user_profile');
        if (!encryptedProfile) {
            alert("Foydalanuvchi topilmadi. Iltimos avval ro'yxatdan o'ting.");
            return;
        }

        const user = decryptData(encryptedProfile);
        if (!user) {
            alert("Xatolik: Ma'lumotlarni o'qib bo'lmadi.");
            return;
        }

        const inputHash = hashPassword(password);

        if (user.email === email && user.password === inputHash) {
            localStorage.setItem('current_user', JSON.stringify(user));
            navigate('/');
        } else {
            alert("Email yoki parol noto'g'ri!");
        }
    };

    return (
        <div className="min-h-screen w-full relative overflow-hidden bg-[#0f172a] flex items-center justify-center p-4">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] bg-purple-500/30 rounded-full blur-[100px] mix-blend-screen animate-blob" />
                <div className="absolute -bottom-[20%] -right-[10%] w-[70vw] h-[70vw] bg-emerald-500/30 rounded-full blur-[100px] mix-blend-screen animate-blob animation-delay-2000" />
                <div className="absolute top-[20%] left-[20%] w-[50vw] h-[50vw] bg-blue-500/30 rounded-full blur-[100px] mix-blend-screen animate-blob animation-delay-4000" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 mb-4 shadow-lg shadow-emerald-500/30">
                            <BookOpen className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">Big Reader</h1>
                        <p className="text-blue-100/80">Adabiyotshunoslik platformasiga kiring</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-4">
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                                <Input
                                    placeholder="Email"
                                    className="pl-12"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                                <Input
                                    placeholder="Parol"
                                    className="pl-12"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <Button className="w-full group">
                            Kirish
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-white/60 text-sm">
                            Hali a'zo emasmisiz?{' '}
                            <Link to="/register" className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors">
                                Ro'yxatdan o'tish
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
