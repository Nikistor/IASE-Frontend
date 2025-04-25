import "./CompanyCard.sass"
import {Company} from "../../utils/types";
import {Link} from "react-router-dom";
import {useAuth} from "../../hooks/users/useAuth";
import {useVacancy} from "../../hooks/vacancies/useVacancy";
import CustomButton from "../CustomButton/CustomButton";
import {variables} from "../../utils/consts";
import {useCompanies} from "../../hooks/companies/useCompanies";

const CompanyCard = ({ company }: {company:Company}) => {
    const {searchCompanies}=useCompanies()
    const {is_authenticated} = useAuth()

    const {vacancy_id, is_draft, addCompanyToVacancy, deleteCompanyFromVacancy, fetchVacancy} = useVacancy()

    const handleAddCompany = async (e: any) => {
         e.preventDefault()
        await addCompanyToVacancy(company)
        await searchCompanies()
    }

    const handleDeleteCompany = async (e: any) => {
        await deleteCompanyFromVacancy(company)
        await fetchVacancy(vacancy_id)
    }

    // Формируем URL для изображения компании
    const img = `http://127.0.0.1:8000/api/companies/${company.id}/image/`;

    return (
        <div className="card-wrapper">

            <div className="preview">
                <img src={img}  alt=""/>
            </div>

            <div className="card-content">

                <div className="content-top">

                    <h3 className="title"> {`${company.name} отчетность до ${company.foundation_date}`} </h3>

                </div>

                <div className="content-bottom">

                    <Link to={`/companies/${company.id}`}>
                        <CustomButton bg={variables.primary}>
                            Подробнее
                        </CustomButton>
                    </Link>
                    
                    {is_authenticated && location.pathname.includes("companies") &&
                        <CustomButton onClick={handleAddCompany} bg={variables.green}>Добавить</CustomButton>
                    }

                    {is_authenticated && is_draft && location.pathname.includes("vacancies") &&
                        <CustomButton onClick={handleDeleteCompany} bg={variables.red}>Удалить</CustomButton>
                    }

                </div>

            </div>

        </div>
    )
}

export default CompanyCard;