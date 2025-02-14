import "./CitiesFilters.sass"
import SearchBar from "../../../components/SearchBar/SearchBar";
import {useCities} from "../../../hooks/cities/useCities";
import {useAuth} from "../../../hooks/users/useAuth";
import {variables} from "../../../utils/consts";
import LinkButton from "../../../components/LinkButton/LinkButton";
import CustomButton from "../../../components/CustomButton/CustomButton";
import {useLocation} from "react-router-dom";

const CitiesFilters = ({refetch}) => {

    const {is_moderator} = useAuth()

    const {query, setQuery} = useCities()

    const location = useLocation();
    const handleSubmit = (e) => {
        e.preventDefault()
        refetch()
    }

    return (
        <div className="cities-filters">

            <h2>Поиск городов</h2>

            <div className="right-container">
                {is_moderator && (location.pathname === '/cities_table')&&
                    <LinkButton to="/cities/create" bg={variables.primary}>
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

export default CitiesFilters