import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface Props {
    stats?: {
        totalDocuments: number;
        pendingApproval: number;
        approved: number;
        drafts: number;
        spdCount: number;
        sptCount: number;
    };
    [key: string]: unknown;
}

export default function Dashboard({ stats }: Props) {
    // Mock stats if not provided
    const defaultStats = {
        totalDocuments: 0,
        pendingApproval: 0,
        approved: 0,
        drafts: 0,
        spdCount: 0,
        sptCount: 0,
    };
    
    const documentStats = stats || defaultStats;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard - Bapperida Travel Orders" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Welcome Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-6">
                    <h1 className="text-2xl font-bold mb-2">🏛️ Selamat Datang di Dashboard Bapperida</h1>
                    <p className="text-blue-100">
                        Kelola Surat Perintah Dinas (SPD) dan Surat Perintah Tugas (SPT) dengan mudah dan efisien
                    </p>
                </div>

                {/* Quick Actions */}
                <div className="flex flex-wrap gap-4 mb-6">
                    <Link href={route('travel-orders.create')}>
                        <Button className="bg-green-600 hover:bg-green-700 text-white">
                            ➕ Buat Dokumen Baru
                        </Button>
                    </Link>
                    <Link href={route('travel-orders.index')}>
                        <Button variant="outline">
                            📋 Lihat Semua Dokumen
                        </Button>
                    </Link>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Total Dokumen
                                </p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {documentStats.totalDocuments}
                                </p>
                            </div>
                            <div className="text-3xl">📊</div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Menunggu Persetujuan
                                </p>
                                <p className="text-2xl font-bold text-yellow-600">
                                    {documentStats.pendingApproval}
                                </p>
                            </div>
                            <div className="text-3xl">⏳</div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Disetujui
                                </p>
                                <p className="text-2xl font-bold text-green-600">
                                    {documentStats.approved}
                                </p>
                            </div>
                            <div className="text-3xl">✅</div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Draft
                                </p>
                                <p className="text-2xl font-bold text-gray-600">
                                    {documentStats.drafts}
                                </p>
                            </div>
                            <div className="text-3xl">📝</div>
                        </div>
                    </div>
                </div>

                {/* Document Type Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6 shadow-lg">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-green-800 dark:text-green-400">
                                🚗 Surat Perintah Dinas (SPD)
                            </h3>
                            <span className="text-2xl font-bold text-green-600">
                                {documentStats.spdCount}
                            </span>
                        </div>
                        <p className="text-sm text-green-700 dark:text-green-300">
                            Dokumen untuk perjalanan dinas pegawai
                        </p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-6 shadow-lg">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-400">
                                📋 Surat Perintah Tugas (SPT)
                            </h3>
                            <span className="text-2xl font-bold text-purple-600">
                                {documentStats.sptCount}
                            </span>
                        </div>
                        <p className="text-sm text-purple-700 dark:text-purple-300">
                            Dokumen untuk penugasan khusus pegawai
                        </p>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        📈 Aktivitas Terkini
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div className="text-xl">📝</div>
                            <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    Sistem Siap Digunakan
                                </p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                    Mulai buat dokumen SPD atau SPT pertama Anda
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center justify-center py-8 text-gray-500 dark:text-gray-400">
                            <div className="text-center">
                                <div className="text-4xl mb-2">🚀</div>
                                <p>Belum ada dokumen. Mulai buat yang pertama!</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Guide */}
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                    <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-400 mb-4">
                        💡 Panduan Cepat
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center">
                            <div className="text-2xl mb-2">1️⃣</div>
                            <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-1">
                                Buat Dokumen
                            </h4>
                            <p className="text-xs text-blue-700 dark:text-blue-400">
                                Pilih jenis SPD atau SPT dan isi informasi yang diperlukan
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl mb-2">2️⃣</div>
                            <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-1">
                                Submit untuk Persetujuan
                            </h4>
                            <p className="text-xs text-blue-700 dark:text-blue-400">
                                Kirim dokumen ke atasan untuk mendapat persetujuan
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl mb-2">3️⃣</div>
                            <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-1">
                                Track Status
                            </h4>
                            <p className="text-xs text-blue-700 dark:text-blue-400">
                                Pantau status persetujuan dokumen secara real-time
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}