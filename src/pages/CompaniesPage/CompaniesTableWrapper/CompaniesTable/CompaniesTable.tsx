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
            Header: "Тикер",
            accessor: "ticker",
            Cell: ({ value }) => { return value }
        },
        {
            Header: "Отрасль",
            accessor: "industry",
            Cell: ({ value }) => { return value }
        },
        {
            Header: "Капитализация",
            accessor: "capital",
            Cell: ({ value }) => { return value + " млрд руб" }
        },
        {
            Header: "Стоимость компании",
            accessor: "enterprise_value",
            Cell: ({ value }) => { return value + " млрд руб" }
        },
        {
            Header: "Выручка",
            accessor: "revenue",
            Cell: ({ value }) => { return value + " млрд руб"}
        },
        {
            Header: "Чистая прибыль",
            accessor: "net_profit",
            Cell: ({ value }) => { return value + " млрд руб"}
        },
        {
            Header: "P/E",
            accessor: "pe",
            Cell: ({ value }) => { return value }
        },
        {
            Header: "P/S",
            accessor: "ps",
            Cell: ({ value }) => { return value }
        },
        {
            Header: "P/B",
            accessor: "pb",
            Cell: ({ value }) => { return value }
        },
        {
            Header: "EV/EBITDA",
            accessor: "ev_ebitda",
            Cell: ({ value }) => { return value }
        },
        {
            Header: "Рентабельность, EBITDA",
            accessor: "ebitda_margin",
            Cell: ({ value }) => { return value }
        },
        {
            Header: "долг/EBITDA",
            accessor: "debt_ebitda",
            Cell: ({ value }) => { return value }
        },
        {
            Header: "Отчетность",
            accessor: "report",
            Cell: ({ value }) => { return value }
        },
        {
            Header: "Год отчетности",
            accessor: "year",
            Cell: ({ value }) => { return value }
        },
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