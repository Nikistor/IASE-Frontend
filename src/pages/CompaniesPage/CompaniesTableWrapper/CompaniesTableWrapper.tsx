import {useCompanies} from "../../../hooks/companies/useCompanies";
import {useQuery} from "react-query";
import CompaniesTable from "./CompaniesTable/CompaniesTable";

const CompaniesTableWrapper = () => {

    const {searchCompanies} = useCompanies()

    const { isLoading, data, isSuccess, refetch } = useQuery(
        ["companies"],
        () => searchCompanies(),
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
            <CompaniesTable isLoading={isLoading} data={data} isSuccess={isSuccess} refetch={refetch} />
        </div>
    )
}

export default CompaniesTableWrapper