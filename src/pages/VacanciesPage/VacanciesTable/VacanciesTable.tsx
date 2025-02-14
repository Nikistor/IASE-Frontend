import React from "react";
import "./VacanciesTable.sass"
import {STATUSES, variables} from "/src/utils/consts";
import {ru} from "/src/utils/momentLocalization";
import moment from "moment";
import {useQuery} from "react-query";
import {useVacancies} from "../../../hooks/vacancies/useVacancies";
import {useCustomTable} from "../../../hooks/other/useCustomTable";
import CustomTable from "../../../components/CustomTable/CustomTable";
import {useNavigate} from "react-router-dom"
import VacanciesFilters from "../VacanciesFilters/VacanciesFilters";
import CustomButton from "../../../components/CustomButton/CustomButton";
import {useAuth} from "../../../hooks/users/useAuth";
import {api} from "../../../utils/api";
import {useToken} from "../../../hooks/users/useToken";

const VacanciesTable = () => {

    const {access_token} = useToken()
    
    const {is_moderator} = useAuth()

    const navigate = useNavigate()

    const {searchVacancies} = useVacancies()

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
            Header: "Пользователь",
            accessor: "employer",
            Cell: ({ value }) => { return value.name }
        },
        {
            Header: "Статус",
            accessor: "status",
            Cell: ({ value }) => { return STATUSES.find(status => status.id == value).name }
        },
        {
            Header: "Дата формирования",
            accessor: "date_formation",
            Cell: ({ value }) => { return moment(value).locale(ru()).format("D MMMM HH:mm") }
        },
        {
            Header: "Банкрот",
            accessor: "bankrupt",
            Cell: ({ value }) => {
                if (value == 0) {
                    return "Нет"
                }
                else if (value == 1) {
                    return "Да"
                }

                return "Не найден"
            }
        }
    ]

    if (is_moderator) {
        columns.push({
            Header: "Действие",
            accessor: "accept_button",
            Cell: ({ cell }) => (
                is_moderator && cell.row.values.status == 2 && <CustomButton bg={variables.green} onClick={(e) => acceptVacancy(cell.row.values.id)}>Принять</CustomButton>
            )
        })

        columns.push({
            Header: "Действие",
            accessor: "dismiss_button",
            Cell: ({ cell }) => (
                is_moderator && cell.row.values.status == 2 && <CustomButton bg={variables.red} onClick={(e) => dismissVacancy(cell.row.values.id)}>Отклонить</CustomButton>
            )
        })
    }

    const acceptVacancy = async (order_id) => {

        const formData = new FormData()

        formData.append("status", "3")

        const response = await api.put(`vacancies/${order_id}/update_status_admin/`, formData, {
            headers: {
                'authorization': access_token
            }
        });

        if (response.status == 200) {
            refetch()
        }
    }

    const dismissVacancy = async (order_id) => {

        const formData = new FormData()

        formData.append("status", "4")

        const response = await api.put(`vacancies/${order_id}/update_status_admin/`, formData, {
            headers: {
                'authorization': access_token
            }
        });

        if (response.status == 200) {
            refetch()
        }
    }

    const { isLoading, data, isSuccess, refetch } = useQuery(
        ["vacancies"],
        () => searchVacancies(),
        {
            refetchInterval: 2000,
            refetchOnWindowFocus: false,
            cacheTime: 0,
            keepPreviousData: false,
        }
    );

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

    const handleClick = (vacancy_id) => {
        navigate(`/vacancies/${vacancy_id}`)
    }

    return (
        <div>

            <CustomTable
                getTableBodyProps={getTableBodyProps}
                headerGroups={headerGroups}
                page={page}
                prepareRow={prepareRow}
                isLoading={isLoading}
                onClick={handleClick}
            >
                <VacanciesFilters refetch={refetch}/>
            </CustomTable>

        </div>
    )
}

export default VacanciesTable