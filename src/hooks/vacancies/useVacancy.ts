import {useDispatch, useSelector} from 'react-redux';
import {
	updateVacancy,
	updateCompanies,
	updateVacancyName, updateVacancyId
} from "../../store/vacancies/vacancySlice";
import {useToken} from "../users/useToken";
import {api} from "../../utils/api";

export function useVacancy() {

	const {access_token} = useToken()

	const vacancy = useSelector(state => state.vacancy.vacancy)

	const vacancy_id = useSelector(state => state.vacancy.vacancy_id)

	const name = useSelector(state => state.vacancy.name)

	const is_draft = vacancy?.status == 1

	const dispatch = useDispatch()

	const setVacancy = (value) => {
		dispatch(updateVacancy(value))
	}

	const setVacancyId = (value) => {
		dispatch(updateVacancyId(value))
	}

	const setCompanies = (value) => {
		dispatch(updateCompanies(value))
	}

	const setName = (value) => {
		dispatch(updateVacancyName(value))
	}

	const sendVacancy = async () => {

		const response = await api.put(`vacancies/${vacancy.id}/update_status_user/`, {}, {
			headers: {
				'authorization': access_token
			}
		})

		if (response.status == 200)
		{
			setVacancy(undefined)
			setName("")
		}
	}

	const deleteVacancy = async () => {

		const response = await api.delete(`vacancies/${vacancy.id}/delete/`, {
			headers: {
				'authorization': access_token
			}
		})

		if (response.status == 200)
		{
			setVacancy(undefined)
			setName("")
		}

	}

	const saveVacancy = async () => {

		const form_data = new FormData()

		form_data.append('name', name)

		await api.put(`vacancies/${vacancy.id}/update/`, form_data, {
			headers: {
				'authorization': access_token
			}
		})

	}

	const fetchVacancy = async (vacancy_id) => {

		const {data} = await api.get(`vacancies/${vacancy_id}/`, {
			headers: {
				'authorization': access_token
			},
		})

		setVacancy(data)
		setName(data["name"])
	}

	const addCompanyToVacancy = async (company) => {
		await api.post(`companies/${company.id}/add_to_vacancy/`, {}, {
			headers: {
				'authorization': access_token
			}
		})
	}

	const deleteCompanyFromVacancy = async (company) => {
		await api.delete(`vacancies/${vacancy.id}/delete_company/${company.id}/`, {
			headers: {
				'authorization': access_token
			}
		})
	}

	return {
		vacancy,
		vacancy_id,
		name,
		is_draft,
		setVacancy,
		setVacancyId,
		setCompanies,
		setName,
		saveVacancy,
		sendVacancy,
		deleteVacancy,
		fetchVacancy,
		addCompanyToVacancy,
		deleteCompanyFromVacancy
	};
}