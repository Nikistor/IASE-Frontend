import "./CompaniesFilters.sass"
import SearchBar from "../../../components/SearchBar/SearchBar";
import {useCompanies} from "../../../hooks/companies/useCompanies";
import {useAuth} from "../../../hooks/users/useAuth";
import {variables} from "../../../utils/consts";
import LinkButton from "../../../components/LinkButton/LinkButton";
import CustomButton from "../../../components/CustomButton/CustomButton";
import {useLocation} from "react-router-dom";

const CompaniesFilters = ({refetch}) => {

    const {is_moderator} = useAuth()

    const {query, setQuery} = useCompanies()

    const location = useLocation();
    const handleSubmit = (e) => {
        e.preventDefault()
        refetch()
    }

    return (
        <div className="companies-filters">

            <h2>Поиск городов</h2>

            <div className="right-container">
                {is_moderator && (location.pathname === '/companies_table')&&
                    <LinkButton to="/companies/create" bg={variables.primary}>
                        Добавить город
                    </LinkButton>
                }

                <form className="search-form" onSubmit={handleSubmit}>

                    <SearchBar query={query} setQuery={setQuery} placeholder={"Поиск..."} />

                    <CustomButton bg={variables.primary}>
                        Применить
                    </CustomButton>

                </form>
            </div>


        </div>
    )
}

export default CompaniesFilters