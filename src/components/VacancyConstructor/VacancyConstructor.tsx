import "./VacancyConstructor.sass"
import {useVacancy} from "../../hooks/vacancies/useVacancy";
import {Link} from "react-router-dom";

const VacancyConstructor = () => {

    const {vacancy_id} = useVacancy()

    if (vacancy_id == undefined) {
        return (
            <div className="constructor-container disabled">
                <span className="title">Новая заявка</span>
            </div>
        )
    }

    return (
        <Link to={`/vacancies/${vacancy_id}`} className="constructor-container">
            <span className="title">Новая заявка</span>
        </Link>
    )
}

export default VacancyConstructor