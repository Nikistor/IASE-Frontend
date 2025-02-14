import {useDispatch, useSelector} from 'react-redux';
import {
	updateStatus,
	updateDateStart,
	updateDateEnd,
	updateUser
} from "../../store/vacancies/vacanciesSlice";
import {api} from "../../utils/api";
import {useToken} from "../users/useToken";

export function useVacancies() {
	const status = useSelector(state => state.vacancies.status)
	const date_start = useSelector(state => state.vacancies.date_start)
	const date_end = useSelector(state => state.vacancies.date_end)
	const user = useSelector(state => state.vacancies.user)

	const dispatch = useDispatch()

	const {access_token} = useToken()

	const setStatus = (value) => {
		dispatch(updateStatus(value))
	}

	const setDateStart = (value) => {
		dispatch(updateDateStart(value))
	}

	const setDateEnd = (value) => {
		dispatch(updateDateEnd(value))
	}

	const setUser = (value) => {
		dispatch(updateUser(value))
	}

	const searchVacancies = async () => {

		const {data} = await api.get(`vacancies/search/`, {
			params: {
				status: status,
				date_start: new Date(date_start),
				date_end: new Date(date_end)
			},
			headers: {
				'authorization': access_token
			}
		})

		return data.filter(vacancy => vacancy.employer.name.includes(user))

	}


	return {
		status,
		date_start,
		date_end,
		setStatus,
		searchVacancies,
		setDateStart,
		setDateEnd,
		setUser
	};
}