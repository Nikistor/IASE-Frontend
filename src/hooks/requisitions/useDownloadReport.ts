import { useState } from 'react';
import { useToken } from '../users/useToken';

export function useDownloadReport() {
    const { access_token } = useToken();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDownload = async (id: number) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/requisitions/${id}/download_report/`, {
                headers: {
                    Authorization: `authorization ${access_token}`,
                },
            });

            if (!response.ok) throw new Error('Ошибка при скачивании');

            // Проверка типа контента
            const contentType = response.headers.get('Content-Type');
            if (!contentType || !contentType.includes('application/pdf')) {
                throw new Error("Неверный формат файла");
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `report_${id}.pdf`;
            link.click();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            setError('Ошибка при скачивании отчета');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return {
        handleDownload,
        loading,
        error,
    };
}
