import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Phone, Book, GraduationCap, Globe, Plus, Trash2, ArrowRight, CheckCircle } from 'lucide-react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { clsx } from 'clsx';
import { hashPassword, encryptData } from '../utils/security';

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        password: '',
        degree: 'student', // student, bachelor, master, teacher, researcher, professor
        booksRead: '',
        languages: [{ language: '', level: 'B1' }],
        consent: false
    });

    const degrees = [
        { value: 'student', label: 'O\'quvchi' },
        { value: 'student_uni', label: 'Talaba' },
        { value: 'master', label: 'Magistr' },
        { value: 'teacher', label: 'O\'qituvchi' },
        { value: 'researcher', label: 'Ilmiy izlanuvchi' },
        { value: 'professor', label: 'Professor' }
    ];

    const handleLanguageChange = (index, field, value) => {
        const newLanguages = [...formData.languages];
        newLanguages[index][field] = value;
        setFormData({ ...formData, languages: newLanguages });
    };

    const addLanguage = () => {
        setFormData({
            ...formData,
            languages: [...formData.languages, { language: '', level: 'B1' }]
        });
    };

    const removeLanguage = (index) => {
        const newLanguages = formData.languages.filter((_, i) => i !== index);
        setFormData({ ...formData, languages: newLanguages });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.consent) {
            alert("Ma'lumotlar saqlanishiga rozilik bildiring!");
            return;
        }

        // Hashing password
        const secureData = {
            ...formData,
            password: hashPassword(formData.password)
        };

        // Encrypting user profile for storage
        const encryptedProfile = encryptData(secureData);

        console.log("Secure Data:", secureData);
        // Save encrypted profile
        localStorage.setItem('user_profile', encryptedProfile);
        // Also save simple flag for easier login check in this demo (optional)
        // localStorage.setItem('is_registered', 'true');

        navigate('/login');
    };

    return (
        <div className="min-h-screen w-full relative overflow-hidden bg-[#0f172a] flex items-center justify-center p-4 py-12">
            {/* Background Anime */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] right-[10%] w-[60vw] h-[60vw] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen animate-blob" />
                <div className="absolute bottom-[10%] left-[10%] w-[60vw] h-[60vw] bg-emerald-600/20 rounded-full blur-[120px] mix-blend-screen animate-blob animation-delay-2000" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-2xl relative z-10"
            >
                <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">Ro'yxatdan o'tish</h1>
                        <p className="text-blue-100/60">Malumotlaringizni to'ldiring</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Personal Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Ismingiz"
                                placeholder="Ismingizni kiriting"
                                value={formData.firstName}
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                required
                            />
                            <Input
                                label="Familiyangiz"
                                placeholder="Familiyangizni kiriting"
                                value={formData.lastName}
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Telefon raqam"
                                placeholder="+998 90 123 45 67"
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                required
                            />
                            <Input
                                label="Email"
                                placeholder="example@mail.com"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1">
                            <Input
                                label="Parol"
                                placeholder="Parolingizni kiriting"
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                            />
                        </div>

                        {/* Degree & Books */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium text-white/90 ml-1">Darajangiz</label>
                                <div className="relative">
                                    <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400" />
                                    <select
                                        className="w-full px-4 py-3 pl-12 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 appearance-none cursor-pointer"
                                        value={formData.degree}
                                        onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                                    >
                                        {degrees.map(d => (
                                            <option key={d.value} value={d.value} className="bg-slate-800 text-white">
                                                {d.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium text-white/90 ml-1">O'qilgan kitoblar soni</label>
                                <div className="relative">
                                    <Book className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400" />
                                    <Input
                                        type="number"
                                        placeholder="0"
                                        className="pl-12"
                                        value={formData.booksRead}
                                        onChange={(e) => setFormData({ ...formData, booksRead: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Languages Section */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-white/90 ml-1">Til bilish darajasi</label>
                                <button
                                    type="button"
                                    onClick={addLanguage}
                                    className="text-xs flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors font-medium px-2 py-1 rounded-lg hover:bg-emerald-500/10"
                                >
                                    <Plus size={14} /> Qo'shish
                                </button>
                            </div>

                            <AnimatePresence>
                                {formData.languages.map((lang, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="flex gap-2 items-start"
                                    >
                                        <div className="flex-1">
                                            <Input
                                                placeholder="Masalan: Ingliz tili"
                                                value={lang.language}
                                                onChange={(e) => handleLanguageChange(index, 'language', e.target.value)}
                                            />
                                        </div>
                                        <div className="w-1/3">
                                            <select
                                                className="w-full px-3 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 appearance-none"
                                                value={lang.level}
                                                onChange={(e) => handleLanguageChange(index, 'level', e.target.value)}
                                            >
                                                <option className="bg-slate-800" value="A1">A1</option>
                                                <option className="bg-slate-800" value="A2">A2</option>
                                                <option className="bg-slate-800" value="B1">B1</option>
                                                <option className="bg-slate-800" value="B2">B2</option>
                                                <option className="bg-slate-800" value="C1">C1</option>
                                                <option className="bg-slate-800" value="C2">C2</option>
                                            </select>
                                        </div>
                                        {index > 0 && (
                                            <button
                                                type="button"
                                                onClick={() => removeLanguage(index)}
                                                className="p-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors border border-red-500/20"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        )}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Consent Checkbox */}
                        <label className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
                            <div className="relative flex items-center">
                                <input
                                    type="checkbox"
                                    className="peer appearance-none w-5 h-5 rounded border border-white/30 checked:bg-emerald-500 checked:border-emerald-500 transition-all"
                                    checked={formData.consent}
                                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                                />
                                <CheckCircle className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity pointer-events-none" />
                            </div>
                            <span className="text-sm text-white/80 leading-tight">
                                Men shaxsiy ma'lumotlarimning saqlanishiga va qayta ishlanishiga rozilik bildiraman.
                            </span>
                        </label>

                        <Button className="w-full text-lg group font-bold bg-gradient-to-r from-emerald-500 to-teal-400 hover:to-teal-300">
                            Saqlash va Davom etish
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </form>

                    <div className="mt-8 text-center border-t border-white/10 pt-6">
                        <p className="text-white/60 text-sm">
                            Akkauntingiz bormi?{' '}
                            <Link to="/login" className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors">
                                Kirish
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
