import {useDispatch, useSelector} from 'react-redux';
import {
	updateStatus,
	updateDateStart,
	updateDateEnd,
	updateUser
} from "../../store/requisitions/requisitionsSlice";
import {api} from "../../utils/api";
import {useToken} from "../users/useToken";

export function useRequisitions() {
	const status = useSelector(state => state.requisitions.status)
	const date_start = useSelector(state => state.requisitions.date_start)
	const date_end = useSelector(state => state.requisitions.date_end)
	const user = useSelector(state => state.requisitions.user)

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

	const searchRequisitions = async () => {

		const {data} = await api.get(`requisitions/search/`, {
			params: {
				status: status,
				date_start: new Date(date_start),
				date_end: new Date(date_end)
			},
			headers: {
				'authorization': access_token
			}
		})

		return data.filter(requisition => requisition.employer.name.includes(user))

	}


	return {
		status,
		date_start,
		date_end,
		setStatus,
		searchRequisitions,
		setDateStart,
		setDateEnd,
		setUser
	};
}