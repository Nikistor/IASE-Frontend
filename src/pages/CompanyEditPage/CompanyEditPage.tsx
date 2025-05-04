import "./CompanyEditPage.sass";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useCompany } from "../../hooks/companies/useCompany";
import React, { useEffect, useState } from "react";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomTextarea from "../../components/CustomTextarea/CustomTextarea";
import CustomButton from "../../components/CustomButton/CustomButton";
import { api } from "../../utils/api";
import { useToken } from "../../hooks/users/useToken";
import UploadButton from "../../components/UploadButton/UploadButton";
import { variables } from "../../utils/consts";

const CompanyEditPage = () => {
    const navigate = useNavigate();
    const { access_token } = useToken();
    const { id } = useParams<{ id: string }>();

    const {
        company,
        fetchCompany,
        setName,
		setTicker,
		setIndustry,
		setCapital,
		setEnterpriseValue,
		setRevenue,
		setNetProfit,
		setPE,
		setPS,
		setPB,
		setEvEbitda,
		setEbitdaMargin,
		setDebtEbitda,
		setReport,
		setYear,
    } = useCompany();

    const [imgFile, setImgFile] = useState<File | undefined>(undefined);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            fetchCompany(id).catch((error) => {
                console.error("Ошибка загрузки данных компании:", error);
            });
        }
    }, [id]);

    const handleFileChange = (e) => {
        if (e.target.files) {
            const file = e.target.files[0];
            setImgFile(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const saveCompany = async () => {
        let form_data = new FormData();

        form_data.append("name", company.name);
        form_data.append('ticker', company.ticker);
        form_data.append('industry', company.industry);
        form_data.append('capital', company.capital);
        form_data.append('enterprise_value', company.enterprise_value);
        form_data.append('revenue', company.revenue);
        form_data.append('net_profit', company.net_profit);
        form_data.append('pe', company.pe);
        form_data.append('ps', company.ps);
        form_data.append('pb', company.pb);
        form_data.append('ev_ebitda', company.ev_ebitda);
        form_data.append('ebitda_margin', company.ebitda_margin);
        form_data.append('debt_ebitda', company.debt_ebitda);
        form_data.append('report', company.report);
        form_data.append('year', company.year);

        if (imgFile) {
            form_data.append("image", imgFile, imgFile.name);
        }

        try {
            const response = await api.put(`companies/${company.id}/update/`, form_data, {
                headers: {
                    "content-type": "multipart/form-data",
                    authorization: access_token,
                },
            });

            if (response.status === 200) {
                setImgFile(undefined);
                setPreviewImage(null);
                navigate("/companies/");
            }
        } catch (error) {
            console.error("Ошибка сохранения компании:", error);
        }
    };

    const deleteCompany = async () => {
        try {
            const response = await api.delete(`companies/${company.id}/delete/`, {
                headers: {
                    authorization: access_token,
                },
            });

            if (response.status === 200) {
                setImgFile(undefined);
                setPreviewImage(null);
                navigate("/companies/");
            }
        } catch (error) {
            console.error("Ошибка удаления компании:", error);
        }
    };

    if (!id || !company) {
        return <div>Загрузка...</div>;
    }

    // Формируем URL для изображения компании
    const img = `http://127.0.0.1:8000/api/companies/${company.id}/image/`;

    return (
        <div className="edit-page-wrapper">
            <div className="left">
                <img
                    src={previewImage || img || "https://via.placeholder.com/150"}
                    alt="Company"
                    onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/150";
                    }}
                />
                <UploadButton handleFileChange={handleFileChange} />
            </div>

            <div className="right">
                <div className="info-container">
                    <CustomInput placeholder="Название" value={company.name} setValue={setName} />

                    <CustomInput placeholder="Тикер" value={company.ticker} setValue={setTicker} />

                    <CustomInput placeholder="Отрасль" value={company.industry} setValue={setIndustry} />

                    <CustomInput placeholder="Капитализация (млрд руб)" value={company.capital} setValue={setCapital} />

                    <CustomInput placeholder="Стоимость компании (млрд руб)" value={company.enterprise_value} setValue={setEnterpriseValue} />

                    <CustomInput placeholder="Выручка (млрд руб)" value={company.revenue} setValue={setRevenue} />

                    <CustomInput placeholder="Чистая прибыль (млрд руб)" value={company.net_profit} setValue={setNetProfit} />

                    <CustomInput placeholder="P/E" value={company.pe} setValue={setPE} />

                    <CustomInput placeholder="P/S" value={company.ps} setValue={setPS} />

                    <CustomInput placeholder="P/B" value={company.pb} setValue={setPB} />

                    <CustomInput placeholder="EV/EBITDA" value={company.ev_ebitda} setValue={setEvEbitda} />

                    <CustomInput placeholder="Рентабельность, EBITDA" value={company.ebitda_margin} setValue={setEbitdaMargin} />

                    <CustomInput placeholder="долг/EBITDA" value={company.debt_ebitda} setValue={setDebtEbitda} />

                    <CustomInput placeholder="Отчетность" value={company.report} setValue={setReport} />

                    <CustomInput placeholder="Год отчетности" value={company.year} setValue={setYear} />

                    <div className="buttons-container">
                        <CustomButton bg={variables.green} onClick={saveCompany}>
                            Сохранить
                        </CustomButton>
                        <CustomButton bg={variables.red} onClick={deleteCompany}>
                            Удалить
                        </CustomButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyEditPage;