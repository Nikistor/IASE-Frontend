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

    const handleClick = async () => {
        setLoading(true);
        setError(null);

        try {
            await handleDownloadReport(id);
        } catch (err) {
            setError("Ошибка при скачивании отчета");
        } finally {
            setLoading(false);
        }
    };

    if (status === 1 || !report) {
        return <span className="no-report">Нет отчета</span>;
    }

    if (status === 2 || !report) {
        return <span className="no-report">Нет отчета</span>;
    }

    if (status === 3 && report) {
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
    }

    if (status === 3 || !report) {
        return <span className="no-report">Нет отчета</span>;
    }

    if (status === 4 || !report) {
        return <span className="no-report">Нет отчета</span>;
    }
};

export default ReportDownloadButton;
