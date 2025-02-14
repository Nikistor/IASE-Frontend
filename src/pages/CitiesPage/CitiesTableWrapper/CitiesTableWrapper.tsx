import {useCities} from "../../../hooks/cities/useCities";
import {useQuery} from "react-query";
import CitiesTable from "./CitiesTable/CitiesTable";

const CitiesTableWrapper = () => {

    const {searchCities} = useCities()

    const { isLoading, data, isSuccess, refetch } = useQuery(
        ["cities"],
        () => searchCities(),
        {
            keepPreviousData: true,
        }
    )

    if (data == undefined) {
        return (
            <div>

            </div>
        )
    }

    return (
        <div>
            <CitiesTable isLoading={isLoading} data={data} isSuccess={isSuccess} refetch={refetch} />
        </div>
    )
}

export default CitiesTableWrapper