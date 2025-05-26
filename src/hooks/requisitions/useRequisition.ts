import {useDispatch, useSelector} from 'react-redux';
import {
	updateRequisition,
	updateCompanies,
	updateRequisitionName, updateRequisitionId
} from "../../store/requisitions/requisitionSlice";
import {useToken} from "../users/useToken";
import {api} from "../../utils/api";

export function useRequisition() {

	const {access_token} = useToken()

	const requisition = useSelector(state => state.requisition.requisition)

	const requisition_id = useSelector(state => state.requisition.requisition_id)

	const name = useSelector(state => state.requisition.name)

	const is_draft = requisition?.status == 1

	const dispatch = useDispatch()

	const setRequisition = (value) => {
		dispatch(updateRequisition(value))
	}

	const setRequisitionId = (value) => {
		dispatch(updateRequisitionId(value))
	}

	const setCompanies = (value) => {
		dispatch(updateCompanies(value))
	}

	const setName = (value) => {
		dispatch(updateRequisitionName(value))
	}

	const sendRequisition = async () => {

		const response = await api.put(`requisitions/${requisition.id}/update_status_user/`, {}, {
			headers: {
				'authorization': access_token
			}
		})

		if (response.status == 200)
		{
			setRequisition(undefined)
			setName("")
		}
	}

	const deleteRequisition = async () => {

		const response = await api.delete(`requisitions/${requisition.id}/delete/`, {
			headers: {
				'authorization': access_token
			}
		})

		if (response.status == 200)
		{
			setRequisition(undefined)
			setName("")
		}

	}

	const saveRequisition = async () => {

		const form_data = new FormData()

		form_data.append('name', name)

		await api.put(`requisitions/${requisition.id}/update/`, form_data, {
			headers: {
				'authorization': access_token
			}
		})

	}

	const fetchRequisition = async (requisition_id) => {

		const {data} = await api.get(`requisitions/${requisition_id}/`, {
			headers: {
				'authorization': access_token
			},
		})

		setRequisition(data)
		setName(data["name"])
	}

	const addCompanyToRequisition = async (company) => {
		await api.post(`companies/${company.id}/add_to_requisition/`, {}, {
			headers: {
				'authorization': access_token
			}
		})
	}

	const deleteCompanyFromRequisition = async (company) => {
		await api.delete(`requisitions/${requisition.id}/delete_company/${company.id}/`, {
			headers: {
				'authorization': access_token
			}
		})
	}

	const handleDownloadReport = async (id) => {
        try {
            const response = await api.get(`requisitions/${id}/download_report/`, {
                headers: {
                    Authorization: access_token,
                },
                responseType: 'blob' // Указываем тип ответа как blob
            });

            if (!response.data) {
                throw new Error("Ошибка при скачивании");
            }

            const contentType = response.headers['content-type'];
            if (!contentType || !contentType.includes('application/pdf')) {
                throw new Error("Неверный формат файла");
            }

            const url = window.URL.createObjectURL(response.data);
            const link = document.createElement("a");
            link.href = url;
            link.download = `report_${id}.pdf`;
            link.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            alert("Ошибка при скачивании отчета");
            console.error(error);
        }
    };

	const onUpdateComment = async (id: number) => {
		try {
			const response = await api.patch(`requisitions/${id}/update/`, {
				comment: requisition.comment
			}, {
				headers: {
					Authorization: access_token,
				},
			});

			if (response.status === 200) {
				fetchRequisition(id);
			}
		} catch (error) {
			console.error("Ошибка при сохранении комментария:", error);
			alert("Ошибка при сохранении комментария");
		}
	}

	return {
		requisition,
		requisition_id,
		name,
		is_draft,
		setRequisition,
		setRequisitionId,
		setCompanies,
		setName,
		saveRequisition,
		sendRequisition,
		deleteRequisition,
		fetchRequisition,
		addCompanyToRequisition,
		deleteCompanyFromRequisition,
		handleDownloadReport,
		onUpdateComment
	};
}