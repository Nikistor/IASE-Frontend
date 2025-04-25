import "./CompaniesTable.sass"
import CustomTable from "../../../../components/CustomTable/CustomTable";
import {useCustomTable} from "../../../../hooks/other/useCustomTable";
import {useNavigate } from "react-router-dom";
import CompaniesFilters from "../../CompaniesFilters/CompaniesFilters";

const CompaniesTable = ({isLoading, data, isSuccess, refetch}) => {

    const columns = [
        {
            Header: "№",
            accessor: "id"
        },
        {
            Header: "Название",
            accessor: "name",
            Cell: ({ value }) => { return value }
        },
        {
            Header: "Дата основания",
            accessor: "foundation_date",
            Cell: ({ value }) => { return value + "г" }
        },
        {
            Header: "Население",
            accessor: "grp",
            Cell: ({ value }) => { return value }
        },
        {
            Header: "Климат",
            accessor: "climate",
            Cell: ({ value }) => { return value }
        },
        {
            Header: "Площадь",
            accessor: "square",
            Cell: ({ value }) => { return value }
        }
    ]

    const navigate = useNavigate()

    const {
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow
    } = useCustomTable(
        columns,
        isSuccess,
        data
    )

    const openEditCompanyPage = (company_id) => {
        navigate(`/companies/${company_id}/edit`)
    }

    return (
        <div>

            <CustomTable
                getTableBodyProps={getTableBodyProps}
                headerGroups={headerGroups}
                page={page}
                prepareRow={prepareRow}
                isLoading={isLoading}
                onClick={openEditCompanyPage}
            >
                <CompaniesFilters refetch={refetch} />
            </CustomTable>

        </div>

    )
}

export default CompaniesTable