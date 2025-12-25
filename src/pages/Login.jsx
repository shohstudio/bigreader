import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, User, Lock, ArrowRight, Library } from 'lucide-react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

import { hashPassword, decryptData } from '../utils/security';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        if (email.trim() === 'admin@bigreader.uz' && password.trim() === 'admin123') {
            const adminUser = {
                firstName: 'Admin',
                lastName: 'User',
                email: 'admin@bigreader.uz',
                role: 'admin'
            };
            localStorage.setItem('current_user', JSON.stringify(adminUser));
            navigate('/admin');
            return;
        }

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
            localStorage.setItem('current_user', JSON.stringify({ ...user, role: 'user' }));
            navigate('/');
        } else {
            alert("Email yoki parol noto'g'ri!");
        }
    };

    return (
        <div className="min-h-screen w-full relative overflow-hidden bg-[#FDFBF7] flex items-center justify-center p-4">
            {/* Background Texture/Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}
            />

            {/* Soft Ambient Glows */}
            <div className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] bg-amber-200/20 rounded-full blur-[120px]" />
            <div className="absolute -bottom-[20%] -right-[10%] w-[70vw] h-[70vw] bg-orange-100/30 rounded-full blur-[120px]" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="bg-white border border-stone-200/60 rounded-xl p-8 shadow-xl shadow-stone-200/40">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-50 mb-6 border border-amber-100">
                            <Library className="w-10 h-10 text-amber-700" />
                        </div>
                        <h1 className="text-4xl font-serif font-bold text-stone-800 mb-3 tracking-tight">Big Reader</h1>
                        <p className="text-stone-500 font-medium">Adabiyotshunoslik olamiga xush kelibsiz</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-5">
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 group-focus-within:text-amber-600 transition-colors" />
                                <Input
                                    placeholder="Elektron pochta"
                                    className="pl-12 bg-stone-50 border-stone-200 text-stone-800 placeholder:text-stone-400 focus:border-amber-500 focus:ring-amber-500/20 rounded-lg h-12"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 group-focus-within:text-amber-600 transition-colors" />
                                <Input
                                    placeholder="Parol"
                                    className="pl-12 bg-stone-50 border-stone-200 text-stone-800 placeholder:text-stone-400 focus:border-amber-500 focus:ring-amber-500/20 rounded-lg h-12"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <Button className="w-full h-12 bg-amber-700 hover:bg-amber-800 text-amber-50 shadow-lg shadow-amber-900/10 hover:shadow-amber-900/20 transition-all duration-300 text-base font-medium rounded-lg group">
                            Kirish
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-stone-100 text-center">
                        <p className="text-stone-500">
                            Hali a'zo emasmisiz?{' '}
                            <Link to="/register" className="text-amber-700 hover:text-amber-900 font-bold font-serif hover:underline underline-offset-2 transition-colors">
                                Ro'yxatdan o'tish
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="mt-8 text-center">
                    <p className="text-stone-400 text-sm font-serif italic">"Kitob - aql chirog'i"</p>
                </div>
            </motion.div>
        </div>
    );
}
