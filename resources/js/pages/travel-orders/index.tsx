import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Travel Orders',
        href: '/travel-orders',
    },
];

interface TravelOrder {
    id: number;
    document_number: string;
    document_type: 'SPD' | 'SPT';
    employee_name: string;
    employee_nip: string;
    position: string;
    destination: string;
    purpose: string;
    start_date: string;
    end_date: string;
    duration_days: number;
    budget: number | null;
    status: 'draft' | 'pending_approval' | 'approved' | 'rejected' | 'completed';
    notes: string | null;
    created_at: string;
    creator: {
        name: string;
    };
    approver?: {
        name: string;
    };
}

interface Props {
    travelOrders: {
        data: TravelOrder[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    [key: string]: unknown;
}

const statusColors = {
    draft: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
    pending_approval: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    approved: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    rejected: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    completed: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
};

const statusLabels = {
    draft: 'Draft',
    pending_approval: 'Menunggu Persetujuan',
    approved: 'Disetujui',
    rejected: 'Ditolak',
    completed: 'Selesai',
};

const statusIcons = {
    draft: '📝',
    pending_approval: '⏳',
    approved: '✅',
    rejected: '❌',
    completed: '🏁',
};

export default function TravelOrdersIndex({ travelOrders }: Props) {
    const formatCurrency = (amount: number | null) => {
        if (!amount) return '-';
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Travel Orders - Bapperida" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            📋 Daftar Surat Perintah
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Kelola semua dokumen SPD dan SPT
                        </p>
                    </div>
                    <Link href={route('travel-orders.create')}>
                        <Button className="bg-green-600 hover:bg-green-700">
                            ➕ Buat Dokumen Baru
                        </Button>
                    </Link>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap gap-2 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border">
                    <Button variant="outline" size="sm">
                        📊 Semua ({travelOrders.total})
                    </Button>
                    <Button variant="outline" size="sm">
                        📝 Draft
                    </Button>
                    <Button variant="outline" size="sm">
                        ⏳ Pending
                    </Button>
                    <Button variant="outline" size="sm">
                        ✅ Disetujui
                    </Button>
                    <Button variant="outline" size="sm">
                        🚗 SPD
                    </Button>
                    <Button variant="outline" size="sm">
                        📋 SPT
                    </Button>
                </div>

                {/* Travel Orders List */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border overflow-hidden">
                    {travelOrders.data.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">📄</div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                Belum Ada Dokumen
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                Mulai buat dokumen SPD atau SPT pertama Anda
                            </p>
                            <Link href={route('travel-orders.create')}>
                                <Button className="bg-blue-600 hover:bg-blue-700">
                                    🚀 Buat Dokumen Pertama
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <>
                            {/* Table Header */}
                            <div className="hidden lg:grid lg:grid-cols-8 gap-4 p-4 bg-gray-50 dark:bg-gray-700 border-b text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                <div>Nomor Dokumen</div>
                                <div>Pegawai</div>
                                <div>Tujuan</div>
                                <div>Tanggal</div>
                                <div>Durasi</div>
                                <div>Anggaran</div>
                                <div>Status</div>
                                <div>Aksi</div>
                            </div>

                            {/* Table Body */}
                            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                                {travelOrders.data.map((order) => (
                                    <div key={order.id} className="lg:grid lg:grid-cols-8 gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                        {/* Mobile Layout */}
                                        <div className="lg:hidden space-y-3">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <div className="flex items-center space-x-2">
                                                        <span className="text-lg">
                                                            {order.document_type === 'SPD' ? '🚗' : '📋'}
                                                        </span>
                                                        <span className="font-medium text-gray-900 dark:text-white">
                                                            {order.document_number}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                        {order.employee_name} • {order.position}
                                                    </p>
                                                </div>
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                                                    {statusIcons[order.status]} {statusLabels[order.status]}
                                                </span>
                                            </div>
                                            <div className="text-sm">
                                                <p className="text-gray-900 dark:text-white font-medium">
                                                    📍 {order.destination}
                                                </p>
                                                <p className="text-gray-600 dark:text-gray-400">
                                                    📅 {formatDate(order.start_date)} - {formatDate(order.end_date)} ({order.duration_days} hari)
                                                </p>
                                                {order.budget && (
                                                    <p className="text-gray-600 dark:text-gray-400">
                                                        💰 {formatCurrency(order.budget)}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="flex space-x-2">
                                                <Link href={route('travel-orders.show', order.id)}>
                                                    <Button size="sm" variant="outline">
                                                        👁️ Lihat
                                                    </Button>
                                                </Link>
                                                {order.status === 'draft' && (
                                                    <Link href={route('travel-orders.edit', order.id)}>
                                                        <Button size="sm" variant="outline">
                                                            ✏️ Edit
                                                        </Button>
                                                    </Link>
                                                )}
                                            </div>
                                        </div>

                                        {/* Desktop Layout */}
                                        <div className="hidden lg:block">
                                            <div className="flex items-center space-x-2">
                                                <span className="text-lg">
                                                    {order.document_type === 'SPD' ? '🚗' : '📋'}
                                                </span>
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-white">
                                                        {order.document_number}
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        {order.document_type}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="hidden lg:block">
                                            <p className="font-medium text-gray-900 dark:text-white">
                                                {order.employee_name}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                {order.employee_nip} • {order.position}
                                            </p>
                                        </div>
                                        <div className="hidden lg:block">
                                            <p className="text-sm text-gray-900 dark:text-white">
                                                {order.destination}
                                            </p>
                                        </div>
                                        <div className="hidden lg:block">
                                            <p className="text-sm text-gray-900 dark:text-white">
                                                {formatDate(order.start_date)}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                s/d {formatDate(order.end_date)}
                                            </p>
                                        </div>
                                        <div className="hidden lg:block">
                                            <p className="text-sm text-gray-900 dark:text-white">
                                                {order.duration_days} hari
                                            </p>
                                        </div>
                                        <div className="hidden lg:block">
                                            <p className="text-sm text-gray-900 dark:text-white">
                                                {formatCurrency(order.budget)}
                                            </p>
                                        </div>
                                        <div className="hidden lg:block">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                                                {statusIcons[order.status]} {statusLabels[order.status]}
                                            </span>
                                        </div>
                                        <div className="hidden lg:flex space-x-2">
                                            <Link href={route('travel-orders.show', order.id)}>
                                                <Button size="sm" variant="outline">
                                                    👁️
                                                </Button>
                                            </Link>
                                            {order.status === 'draft' && (
                                                <Link href={route('travel-orders.edit', order.id)}>
                                                    <Button size="sm" variant="outline">
                                                        ✏️
                                                    </Button>
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Pagination */}
                {travelOrders.last_page > 1 && (
                    <div className="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 border rounded-lg">
                        <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                            Menampilkan {((travelOrders.current_page - 1) * travelOrders.per_page) + 1} - {Math.min(travelOrders.current_page * travelOrders.per_page, travelOrders.total)} dari {travelOrders.total} dokumen
                        </div>
                        <div className="flex space-x-2">
                            {travelOrders.current_page > 1 && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => router.get(route('travel-orders.index', { page: travelOrders.current_page - 1 }))}
                                >
                                    ← Sebelumnya
                                </Button>
                            )}
                            {travelOrders.current_page < travelOrders.last_page && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => router.get(route('travel-orders.index', { page: travelOrders.current_page + 1 }))}
                                >
                                    Selanjutnya →
                                </Button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}