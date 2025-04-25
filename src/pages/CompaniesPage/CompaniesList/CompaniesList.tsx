import "./CompaniesList.sass"
import CompanyCard from "../../../components/CompanyCard/CompanyCard";
import {useCompanies} from "../../../hooks/companies/useCompanies";
import {useQuery} from "react-query";
import CompaniesFilters from "../CompaniesFilters/CompaniesFilters";

const CompaniesList = () => {

    const {searchCompanies} = useCompanies()

    const { isLoading, data, refetch } = useQuery(
        ["companies"],
        () => searchCompanies(),
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

    const cards = data.map(company  => (
        <CompanyCard company={company} key={company.id}/>
    ))

    return (
        <div className="companies-list-wrapper">

            <CompaniesFilters refetch={refetch} />

            <div className="companies-list">
                { cards }
            </div>

        </div>
    )
}

export default CompaniesList;