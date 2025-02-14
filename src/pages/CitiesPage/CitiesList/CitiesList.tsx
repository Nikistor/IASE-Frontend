import "./CitiesList.sass"
import CityCard from "../../../components/CityCard/CityCard";
import {useCities} from "../../../hooks/cities/useCities";
import {useQuery} from "react-query";
import CitiesFilters from "../CitiesFilters/CitiesFilters";

const CitiesList = () => {

    const {searchCities} = useCities()

    const { isLoading, data, refetch } = useQuery(
        ["cities"],
        () => searchCities(),
        {
            keepPreviousData: true,
        }
    )

    if (isLoading) {
        return (
            <div>

            </div>
        )
    }

    const cards = data.map(city  => (
        <CityCard city={city} key={city.id}/>
    ))

    return (
        <div className="cities-list-wrapper">

            <CitiesFilters refetch={refetch} />

            <div className="cities-list">
                { cards }
            </div>

        </div>
    )
}

export default CitiesList;