import "./CitiesTable.sass"
import CustomTable from "../../../../components/CustomTable/CustomTable";
import {useCustomTable} from "../../../../hooks/other/useCustomTable";
import {useNavigate } from "react-router-dom";
import CitiesFilters from "../../CitiesFilters/CitiesFilters";

const CitiesTable = ({isLoading, data, isSuccess, refetch}) => {

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

    const openEditCityPage = (city_id) => {
        navigate(`/cities/${city_id}/edit`)
    }

    return (
        <div>

            <CustomTable
                getTableBodyProps={getTableBodyProps}
                headerGroups={headerGroups}
                page={page}
                prepareRow={prepareRow}
                isLoading={isLoading}
                onClick={openEditCityPage}
            >
                <CitiesFilters refetch={refetch} />
            </CustomTable>

        </div>

    )
}

export default CitiesTable