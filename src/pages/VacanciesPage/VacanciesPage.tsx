import VacanciesTable from "./VacanciesTable/VacanciesTable";
import {useAuth} from "../../hooks/users/useAuth";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom"

const VacanciesPage = () => {    

    const {is_authenticated} = useAuth()

    const navigate = useNavigate()

    useEffect(() => {
        if (!is_authenticated) {
            navigate("/cities")
        }
    }, [])

    return (
        <div>
            <VacanciesTable />
        </div>
    )
}

export default VacanciesPage;

