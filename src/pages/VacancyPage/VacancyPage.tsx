import { useEffect, useState } from "react";
import { useVacancy } from "../../hooks/vacancies/useVacancy";
import { useNavigate, useParams } from "react-router-dom"
import CompanyCard from "../../components/CompanyCard/CompanyCard";
import "./VacancyPage.sass"
import { useAuth } from "../../hooks/users/useAuth";
import { STATUSES, variables } from "../../utils/consts";
import { ru } from "../../utils/momentLocalization";
import moment from "moment";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import { useToken } from "../../hooks/users/useToken";
import { api } from "../../utils/api";

const VacancyPage = () => {

    const { is_moderator } = useAuth()

    const navigate = useNavigate()
    const { access_token } = useToken()

    const { id } = useParams<{ id: string }>();
    const [reportFile, setReportFile] = useState<File | null>(null); // Состояние для хранения файла

    const { vacancy, name, setName, fetchVacancy, saveVacancy, sendVacancy, deleteVacancy, setVacancy } = useVacancy()

    useEffect(() => {
        id && fetchVacancy(id)

        return () => {
            setVacancy(undefined)
            setName("")
        };
    }, [])

    if (id == undefined || vacancy == undefined) {
        return (
            <div className="vacancy-page-wrapper">
                <h1>Пусто</h1>
            </div>
        )
    }

    const onSendVacancy = async () => {
        await sendVacancy()
        navigate("/vacancies")
    }

    const onDeleteVacancy = async () => {
        await deleteVacancy()
        navigate("/companies")
    }

    const onUploadReport = async () => {
        if (!reportFile) {
            alert("Выберите файл для загрузки");
            return;
        }

        let form_data = new FormData();

        // Добавляем только поле report
        form_data.append("report", reportFile, reportFile.name);

        try {
            const response = await api.patch(`vacancies/${vacancy.id}/update/`, form_data, {
                headers: {
                    "content-type": "multipart/form-data",
                    authorization: access_token,
                },
            });

            if (response.status === 200) {
                alert("Отчет успешно загружен!");
                setReportFile(null); // Очищаем выбранный файл
            }
        } catch (error) {
            console.error("Ошибка при загрузке отчета:", error);
            alert("Ошибка при загрузке отчета");
        }
    };

    const cards = vacancy.companies.map(company => (
        <CompanyCard company={company} key={company.id} />
    ))

    const ButtonsContainer = () => {
        return (
            <div className="buttons-wrapper">

                {/*<CustomButton onClick={saveVacancy} bg={variables.green}>Сохранить</CustomButton>*/}

                <CustomButton onClick={onSendVacancy} bg={variables.primary}>Отправить</CustomButton>

                <CustomButton onClick={onDeleteVacancy} bg={variables.red}>Удалить</CustomButton>

            </div>
        )
    }

    const is_draft = vacancy.status == 1

    const completed = [3, 4].includes(vacancy.status)

    const bankrupt = () => {
        if (vacancy.bankrupt == -1) {
            return "Не найден"
        }
        else if (vacancy.bankrupt == 0) {
            return "Нет"
        }

        return "Да"
    }

    return (
        <div className="vacancy-page-wrapper">

            <div className="vacancy-companies-wrapper">
                <div className="top">
                    <h3>{is_draft ? "Новая заявка" : vacancy.name}</h3>
                </div>

                <div className="vacancy-info-container">
                    <span>Статус: {STATUSES.find(status => status.id == vacancy.status).name}</span>
                    <span>Дата создания: {moment(vacancy.date_created).locale(ru()).format("D MMMM HH:mm")}</span>
                    {[2, 3, 4].includes(vacancy.status) && <span>Дата формирования: {moment(vacancy.date_formation).locale(ru()).format("D MMMM HH:mm")}</span>}
                    {completed && <span>Дата завершения: {moment(vacancy.date_complete).locale(ru()).format("D MMMM HH:mm")}</span>}
                    {is_moderator && <span>Пользователь: {vacancy.employer.name}</span>}
                    {completed && <span>Банкрот: {bankrupt()}</span>}
                </div>

                {is_draft &&
                    <div className="inputs-container">

                        <CustomInput placeholder={"Название заявки"} value={name} setValue={setName} />

                    </div>
                }


                <div className="bottom">

                    {cards}

                </div>
            </div>

            {is_draft && <ButtonsContainer />}

            {is_moderator && vacancy.status == 2 &&
                <>
                    <label className="upload-button">
                        <input
                            type="file"
                            accept=".pdf"
                            style={{ display: "none" }}
                            onChange={(e) => setReportFile(e.target.files?.[0] || null)}
                        />
                        Загрузить отчет
                    </label>
                    <CustomButton onClick={onUploadReport} bg={variables.blue}>
                        Обновить с отчетом
                    </CustomButton>
                </>
            }

        </div>
    )
}

export default VacancyPage