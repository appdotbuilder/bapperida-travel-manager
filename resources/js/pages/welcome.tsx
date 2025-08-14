import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Bapperida Nias - Travel Order Management">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
                {/* Header */}
                <header className="w-full bg-white/80 backdrop-blur-sm shadow-sm dark:bg-gray-800/80">
                    <div className="container mx-auto px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">📋</span>
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                                        Bapperida Nias
                                    </h1>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Travel Order Management System
                                    </p>
                                </div>
                            </div>
                            <nav className="flex items-center space-x-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 active:bg-blue-900 focus:outline-none focus:border-blue-900 focus:ring ring-blue-300 disabled:opacity-25 transition ease-in-out duration-150"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 active:bg-blue-900 focus:outline-none focus:border-blue-900 focus:ring ring-blue-300 disabled:opacity-25 transition ease-in-out duration-150"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <main className="flex-1 flex items-center justify-center px-6 py-20">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="mb-8">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-2xl mb-6">
                                <span className="text-4xl">🏛️</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                                🚗 Travel Order Management
                            </h1>
                            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                                Sistem manajemen Surat Perintah Dinas (SPD) dan Surat Perintah Tugas (SPT) 
                                untuk Badan Perencanaan Pembangunan Daerah Kabupaten Nias
                            </p>
                        </div>

                        {/* Features Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                                <div className="text-3xl mb-3">📝</div>
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Create Orders</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Buat SPD dan SPT dengan mudah dan cepat
                                </p>
                            </div>
                            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                                <div className="text-3xl mb-3">✅</div>
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Approval System</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Proses persetujuan yang terstruktur dan terkontrol
                                </p>
                            </div>
                            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                                <div className="text-3xl mb-3">📊</div>
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Track Progress</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Pantau status dokumen secara real-time
                                </p>
                            </div>
                            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                                <div className="text-3xl mb-3">💰</div>
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Budget Control</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Kelola anggaran perjalanan dinas dengan tepat
                                </p>
                            </div>
                        </div>

                        {/* Document Types */}
                        <div className="grid md:grid-cols-2 gap-8 mb-12">
                            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-2xl p-8 shadow-lg">
                                <div className="text-4xl mb-4">🚗</div>
                                <h3 className="text-2xl font-bold text-green-800 dark:text-green-400 mb-3">
                                    Surat Perintah Dinas (SPD)
                                </h3>
                                <p className="text-green-700 dark:text-green-300 mb-4">
                                    Kelola perjalanan dinas dengan sistem yang terintegrasi untuk memastikan 
                                    kepatuhan terhadap regulasi dan efisiensi anggaran.
                                </p>
                                <ul className="text-sm text-green-600 dark:text-green-400 space-y-1">
                                    <li>• Pengelolaan destinasi perjalanan</li>
                                    <li>• Kalkulasi durasi dan anggaran</li>
                                    <li>• Tracking status perjalanan</li>
                                </ul>
                            </div>
                            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-2xl p-8 shadow-lg">
                                <div className="text-4xl mb-4">📋</div>
                                <h3 className="text-2xl font-bold text-purple-800 dark:text-purple-400 mb-3">
                                    Surat Perintah Tugas (SPT)
                                </h3>
                                <p className="text-purple-700 dark:text-purple-300 mb-4">
                                    Kelola penugasan pegawai dengan sistem dokumentasi yang lengkap 
                                    dan proses persetujuan yang transparan.
                                </p>
                                <ul className="text-sm text-purple-600 dark:text-purple-400 space-y-1">
                                    <li>• Penugasan khusus pegawai</li>
                                    <li>• Dokumentasi tujuan tugas</li>
                                    <li>• Monitoring pelaksanaan</li>
                                </ul>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        {!auth.user && (
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href={route('register')}
                                    className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 border border-transparent rounded-xl font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
                                >
                                    🚀 Mulai Sekarang
                                </Link>
                                <Link
                                    href={route('login')}
                                    className="inline-flex items-center justify-center px-8 py-3 bg-white/80 border border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 dark:bg-gray-800/80 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-800"
                                >
                                    🔐 Masuk ke Sistem
                                </Link>
                            </div>
                        )}

                        {auth.user && (
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href={route('dashboard')}
                                    className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 border border-transparent rounded-xl font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
                                >
                                    📊 Lihat Dashboard
                                </Link>
                                <Link
                                    href={route('travel-orders.create')}
                                    className="inline-flex items-center justify-center px-8 py-3 bg-green-600 border border-transparent rounded-xl font-semibold text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
                                >
                                    ➕ Buat Dokumen Baru
                                </Link>
                            </div>
                        )}
                    </div>
                </main>

                {/* Footer */}
                <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200 dark:bg-gray-800/80 dark:border-gray-700">
                    <div className="container mx-auto px-6 py-8">
                        <div className="text-center">
                            <p className="text-gray-600 dark:text-gray-400 mb-2">
                                © 2024 Badan Perencanaan Pembangunan Daerah Kabupaten Nias
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-500">
                                Sistem Manajemen Surat Perintah Dinas dan Tugas
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}