import React from "react";
import "./RequisitionsTable.sass"
import { STATUSES, variables } from "/src/utils/consts";
import { ru } from "/src/utils/momentLocalization";
import moment from "moment";
import { useQuery } from "react-query";
import { useRequisitions } from "../../../hooks/requisitions/useRequisitions";
import { useCustomTable } from "../../../hooks/other/useCustomTable";
import CustomTable from "../../../components/CustomTable/CustomTable";
import { useNavigate } from "react-router-dom"
import RequisitionsFilters from "../RequisitionsFilters/RequisitionsFilters";
import CustomButton from "../../../components/CustomButton/CustomButton";
import ReportDownloadButton from '../../../components/ReportDownloadButton/ReportDownloadButton';
import { useAuth } from "../../../hooks/users/useAuth";
import { api } from "../../../utils/api";
import { useToken } from "../../../hooks/users/useToken";

const RequisitionsTable = () => {

    const { access_token } = useToken()

    const { is_moderator } = useAuth()

    const navigate = useNavigate()

    const { searchRequisitions } = useRequisitions()

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
            Header: "Отчет",
            accessor: "report_url",
            Cell: ({ row }) => {
                return <ReportDownloadButton row={row} />;
            }
        }
    ]

    if (is_moderator) {
        columns.push({
            Header: "Действие",
            accessor: "accept_button",
            Cell: ({ cell }) => (
                is_moderator && cell.row.values.status == 2 && <CustomButton bg={variables.green} onClick={(e) => acceptRequisition(cell.row.values.id)}>Отправить</CustomButton>
            )
        })

        columns.push({
            Header: "Действие",
            accessor: "dismiss_button",
            Cell: ({ cell }) => (
                is_moderator && cell.row.values.status == 2 && <CustomButton bg={variables.red} onClick={(e) => dismissRequisition(cell.row.values.id)}>Отклонить</CustomButton>
            )
        })
    }

    const acceptRequisition = async (order_id) => {

        const formData = new FormData()

        formData.append("status", "3")

        const response = await api.put(`requisitions/${order_id}/update_status_admin/`, formData, {
            headers: {
                'authorization': access_token
            }
        });

        if (response.status == 200) {
            refetch()
        }
    }

    const dismissRequisition = async (order_id) => {

        const formData = new FormData()

        formData.append("status", "4")

        const response = await api.put(`requisitions/${order_id}/update_status_admin/`, formData, {
            headers: {
                'authorization': access_token
            }
        });

        if (response.status == 200) {
            refetch()
        }
    }

    const { isLoading, data, isSuccess, refetch } = useQuery(
        ["requisitions"],
        () => searchRequisitions(),
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

    const handleClick = (requisition_id) => {
        navigate(`/requisitions/${requisition_id}`)
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
                <RequisitionsFilters refetch={refetch} />
            </CustomTable>

        </div>
    )
}

export default RequisitionsTable