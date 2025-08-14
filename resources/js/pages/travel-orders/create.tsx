import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { FormEvent } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Travel Orders',
        href: '/travel-orders',
    },
    {
        title: 'Buat Baru',
        href: '/travel-orders/create',
    },
];

export default function CreateTravelOrder() {
    const { data, setData, post, processing, errors } = useForm({
        document_type: 'SPD',
        employee_name: '',
        employee_nip: '',
        position: '',
        destination: '',
        purpose: '',
        start_date: '',
        end_date: '',
        budget: '',
        notes: '',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('travel-orders.store'));
    };

    const calculateDuration = () => {
        if (data.start_date && data.end_date) {
            const start = new Date(data.start_date);
            const end = new Date(data.end_date);
            const diffTime = Math.abs(end.getTime() - start.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
            return diffDays;
        }
        return 0;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Buat Dokumen Baru - Bapperida" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl p-6">
                    <h1 className="text-2xl font-bold mb-2">➕ Buat Dokumen Baru</h1>
                    <p className="text-green-100">
                        Isi formulir di bawah untuk membuat Surat Perintah Dinas (SPD) atau Surat Perintah Tugas (SPT)
                    </p>
                </div>

                {/* Form */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Document Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                Jenis Dokumen
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <label className={`relative flex cursor-pointer rounded-lg border p-4 focus:outline-none ${
                                    data.document_type === 'SPD' 
                                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                                        : 'border-gray-300 bg-white dark:bg-gray-700 dark:border-gray-600'
                                }`}>
                                    <input
                                        type="radio"
                                        name="document_type"
                                        value="SPD"
                                        checked={data.document_type === 'SPD'}
                                        onChange={(e) => setData('document_type', e.target.value as 'SPD')}
                                        className="sr-only"
                                    />
                                    <div className="flex items-center">
                                        <div className="text-2xl mr-3">🚗</div>
                                        <div>
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                Surat Perintah Dinas (SPD)
                                            </div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                Untuk perjalanan dinas pegawai
                                            </div>
                                        </div>
                                    </div>
                                </label>
                                <label className={`relative flex cursor-pointer rounded-lg border p-4 focus:outline-none ${
                                    data.document_type === 'SPT' 
                                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' 
                                        : 'border-gray-300 bg-white dark:bg-gray-700 dark:border-gray-600'
                                }`}>
                                    <input
                                        type="radio"
                                        name="document_type"
                                        value="SPT"
                                        checked={data.document_type === 'SPT'}
                                        onChange={(e) => setData('document_type', e.target.value as 'SPT')}
                                        className="sr-only"
                                    />
                                    <div className="flex items-center">
                                        <div className="text-2xl mr-3">📋</div>
                                        <div>
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                Surat Perintah Tugas (SPT)
                                            </div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                Untuk penugasan khusus pegawai
                                            </div>
                                        </div>
                                    </div>
                                </label>
                            </div>
                            {errors.document_type && (
                                <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.document_type}</p>
                            )}
                        </div>

                        {/* Employee Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="employee_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    👤 Nama Pegawai
                                </label>
                                <input
                                    type="text"
                                    id="employee_name"
                                    value={data.employee_name}
                                    onChange={(e) => setData('employee_name', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="Masukkan nama lengkap pegawai"
                                    required
                                />
                                {errors.employee_name && (
                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.employee_name}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="employee_nip" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    🆔 NIP Pegawai
                                </label>
                                <input
                                    type="text"
                                    id="employee_nip"
                                    value={data.employee_nip}
                                    onChange={(e) => setData('employee_nip', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="Masukkan NIP pegawai"
                                    required
                                />
                                {errors.employee_nip && (
                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.employee_nip}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="position" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                💼 Jabatan
                            </label>
                            <input
                                type="text"
                                id="position"
                                value={data.position}
                                onChange={(e) => setData('position', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                placeholder="Masukkan jabatan pegawai"
                                required
                            />
                            {errors.position && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.position}</p>
                            )}
                        </div>

                        {/* Travel Details */}
                        <div>
                            <label htmlFor="destination" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                📍 Tujuan
                            </label>
                            <input
                                type="text"
                                id="destination"
                                value={data.destination}
                                onChange={(e) => setData('destination', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                placeholder="Masukkan tujuan perjalanan/penugasan"
                                required
                            />
                            {errors.destination && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.destination}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                🎯 Tujuan/Maksud
                            </label>
                            <textarea
                                id="purpose"
                                rows={4}
                                value={data.purpose}
                                onChange={(e) => setData('purpose', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                placeholder="Jelaskan tujuan dan maksud perjalanan/penugasan ini"
                                required
                            />
                            {errors.purpose && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.purpose}</p>
                            )}
                        </div>

                        {/* Date Range */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="start_date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    📅 Tanggal Mulai
                                </label>
                                <input
                                    type="date"
                                    id="start_date"
                                    value={data.start_date}
                                    onChange={(e) => setData('start_date', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    required
                                />
                                {errors.start_date && (
                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.start_date}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="end_date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    📅 Tanggal Selesai
                                </label>
                                <input
                                    type="date"
                                    id="end_date"
                                    value={data.end_date}
                                    onChange={(e) => setData('end_date', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    required
                                />
                                {errors.end_date && (
                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.end_date}</p>
                                )}
                            </div>
                        </div>

                        {/* Duration Display */}
                        {data.start_date && data.end_date && (
                            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                                <p className="text-sm text-blue-800 dark:text-blue-400">
                                    ⏱️ <strong>Durasi:</strong> {calculateDuration()} hari
                                </p>
                            </div>
                        )}

                        {/* Budget */}
                        <div>
                            <label htmlFor="budget" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                💰 Anggaran (Opsional)
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                                    Rp
                                </span>
                                <input
                                    type="number"
                                    id="budget"
                                    value={data.budget}
                                    onChange={(e) => setData('budget', e.target.value)}
                                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="0"
                                    min="0"
                                />
                            </div>
                            {errors.budget && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.budget}</p>
                            )}
                        </div>

                        {/* Notes */}
                        <div>
                            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                📝 Catatan (Opsional)
                            </label>
                            <textarea
                                id="notes"
                                rows={3}
                                value={data.notes}
                                onChange={(e) => setData('notes', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                placeholder="Catatan tambahan (jika ada)"
                            />
                            {errors.notes && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.notes}</p>
                            )}
                        </div>

                        {/* Submit Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                            <Button
                                type="submit"
                                disabled={processing}
                                className="bg-green-600 hover:bg-green-700 flex-1 sm:flex-none"
                            >
                                {processing ? '⏳ Menyimpan...' : '💾 Simpan sebagai Draft'}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => window.history.back()}
                                className="flex-1 sm:flex-none"
                            >
                                ❌ Batal
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}