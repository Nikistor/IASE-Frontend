import React, { useState } from 'react';
import { useAuth } from "../../hooks/users/useAuth";
import { useRequisition } from '../../hooks/requisitions/useRequisition';

const ReportDownloadButton = ({ row }) => {
    const { is_moderator } = useAuth()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { handleDownloadReport } = useRequisition();
    const status = row.values.status;
    const id = row.original.id;
    const report = row.original.report;
    // console.log(report)

    const handleClick = async () => {
        setLoading(true);
        setError(null);  // Очистим предыдущие ошибки

        try {
            await handleDownloadReport(id); // Выполняем скачивание отчета
        } catch (err) {
            setError("Ошибка при скачивании отчета");  // Обработка ошибки
        } finally {
            setLoading(false);  // Завершаем процесс загрузки
        }
    };

    if (status !== 3 || !report) {
        return <span className="no-report">Нет отчета</span>;
    }

    return (
        <div>
            <button
                onClick={handleClick}
                disabled={loading}
                className="download-report-button"
            >
                {loading ? 'Загрузка...' : 'Скачать'}
            </button>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default ReportDownloadButton;
