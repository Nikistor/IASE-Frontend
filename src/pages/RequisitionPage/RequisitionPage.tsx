import { useEffect, useState } from "react";
import { useRequisition } from "../../hooks/requisitions/useRequisition";
import { useNavigate, useParams } from "react-router-dom"
import CompanyCard from "../../components/CompanyCard/CompanyCard";
import "./RequisitionPage.sass"
import { useAuth } from "../../hooks/users/useAuth";
import { STATUSES, variables } from "../../utils/consts";
import { ru } from "../../utils/momentLocalization";
import moment from "moment";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import { useToken } from "../../hooks/users/useToken";
import { api } from "../../utils/api";

const RequisitionPage = () => {

    const { is_moderator } = useAuth()

    const navigate = useNavigate()
    const { access_token } = useToken()

    const { id } = useParams<{ id: string }>();
    const [reportFile, setReportFile] = useState<File | null>(null); // Состояние для хранения файла
    const [uploadedReportName, setUploadedReportName] = useState<string | null>(null);

    const { requisition, name, setName, fetchRequisition, sendRequisition, deleteRequisition, setRequisition, onUpdateComment } = useRequisition()

    useEffect(() => {
        id && fetchRequisition(id)

        return () => {
            setRequisition(undefined)
            setName("")
        };
    }, [])

    if (id == undefined || requisition == undefined) {
        return (
            <div className="requisition-page-wrapper">
                <h1>Пусто</h1>
            </div>
        )
    }

    const onSendRequisition = async () => {
        await sendRequisition()
        navigate("/requisitions")
    }

    const onDeleteRequisition = async () => {
        await deleteRequisition()
        navigate("/companies")
    }

    const onUploadReport = async () => {
        if (!reportFile) {
            alert("Выберите файл для загрузки");
            return;
        }

        let form_data = new FormData();

        form_data.append("report", reportFile, reportFile.name);

        try {
            const response = await api.patch(`requisitions/${requisition.id}/update/`, form_data, {
                headers: {
                    "content-type": "multipart/form-data",
                    authorization: access_token,
                },
            });

            if (response.status === 200) {
                setUploadedReportName(reportFile.name);
                setReportFile(null);
                fetchRequisition(id);
            }
        } catch (error) {
            console.error("Ошибка при загрузке отчета:", error);
            alert("Ошибка при загрузке отчета");
        }
    };

    const cards = requisition.companies.map(company => (
        <CompanyCard company={company} key={company.id} />
    ))

    const ButtonsContainer = () => {
        return (
            <div className="buttons-wrapper">

                <CustomButton onClick={onSendRequisition} bg={variables.primary}>Отправить</CustomButton>

                <CustomButton onClick={onDeleteRequisition} bg={variables.red}>Удалить</CustomButton>

            </div>
        )
    }

    const is_draft = requisition.status == 1

    const completed = [3, 4].includes(requisition.status)

    return (
        <div className="requisition-page-wrapper">

            <div className="requisition-companies-wrapper">
                <div className="top">
                    <h3>{is_draft ? "Новая заявка" : requisition.name}</h3>
                </div>

                <div className="requisition-info-container">
                    <span>Статус: {STATUSES.find(status => status.id == requisition.status).name}</span>
                    <span>Дата создания: {moment(requisition.date_created).locale(ru()).format("D MMMM HH:mm")}</span>
                    {[2, 3, 4].includes(requisition.status) && <span>Дата формирования: {moment(requisition.date_formation).locale(ru()).format("D MMMM HH:mm")}</span>}
                    {completed && <span>Дата завершения: {moment(requisition.date_complete).locale(ru()).format("D MMMM HH:mm")}</span>}
                    {is_moderator && <span>Пользователь: {requisition.employer.name}</span>}
                    {!is_draft && requisition.comment && (<span>Комментарий: {requisition.comment}</span>)}
                </div>

                {is_draft &&
                    <div className="inputs-container">
                        <CustomInput placeholder={"Название заявки"} value={name} setValue={setName} />
                    </div>
                }

                {is_draft && (
                    <>
                        <span>По какому показателю хотите получить отчетность?</span>
                        <textarea
                            placeholder="Комментарий"
                            value={requisition.comment || ""}
                            onChange={(e) => setRequisition({ ...requisition, comment: e.target.value })}
                            className="comment-textarea"
                        />

                        <CustomButton onClick={() => onUpdateComment(requisition.id)} bg={variables.primary}>
                            💾 Сохранить комментарий
                        </CustomButton>
                    </>
                )}

          

                <div className="bottom">

                    {cards}

                </div>
            </div>

            {is_draft && <ButtonsContainer />}

            {is_moderator && requisition.status == 2 && (
                <>
                    <label className="upload-report-button">
                        <input
                            type="file"
                            accept=".pdf"
                            style={{ display: "none" }}
                            onChange={(e) => setReportFile(e.target.files?.[0] || null)}
                        />
                        📎 Загрузить отчет
                    </label>
                    {uploadedReportName && (
                        <div className="uploaded-report-info">
                            ✅ Загруженный отчет: <strong>{uploadedReportName}</strong>
                        </div>
                    )}
                    <CustomButton onClick={onUploadReport} bg={variables.primary}>
                        Обновить с отчетом
                    </CustomButton>
                </>
            )}
        </div>
    )
}

export default RequisitionPage