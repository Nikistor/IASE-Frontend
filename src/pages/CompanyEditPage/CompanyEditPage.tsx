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
        setDescription,
        setFoundationDate,
        setGRP,
        setClimate,
        setSquare,
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
        form_data.append("description", company.description);
        form_data.append("foundation_date", company.foundation_date);
        form_data.append("grp", company.grp);
        form_data.append("climate", company.climate);
        form_data.append("square", company.square);

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
                    <CustomTextarea
                        placeholder="Описание"
                        value={company.description}
                        setValue={setDescription}
                    />
                    <CustomInput
                        placeholder="Дата основания (г.)"
                        value={company.foundation_date}
                        setValue={setFoundationDate}
                    />
                    <CustomInput placeholder="Население (млн)" value={company.grp} setValue={setGRP} />
                    <CustomInput placeholder="Площадь (км^2)" value={company.square} setValue={setSquare} />
                    <CustomInput placeholder="Климат" value={company.climate} setValue={setClimate} />

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