import {useDispatch, useSelector} from 'react-redux';
import {
	updateCities,
	updateQuery
} from "../../store/cities/citiesSlice";
import {api} from "../../utils/api";
import {useVacancy} from "../vacancies/useVacancy";
import {useToken} from "../users/useToken";

export function useCities() {
	const cities = useSelector(state => state.cities.cities);
	const query = useSelector(state => state.cities.query);

	const {access_token} = useToken()

	const {setVacancyId, setVacancy} = useVacancy()

	const dispatch = useDispatch()

	const setCities = (value) => {
		dispatch(updateCities(value))
	}

	const setQuery = (value) => {
		dispatch(updateQuery(value))
	}

	const searchCities = async () => {

		const {data} = await api.get(`cities/search`, {
			params: {
				query: query
			},
			headers: {
				'authorization': access_token
			}
		})

		const draft_vacancy_id = data["draft_vacancy_id"]
		setVacancyId(draft_vacancy_id)

		if (!draft_vacancy_id) {
			setVacancy(undefined)
		}

		return data["cities"]
	}

	const fetchCities = async () => {
		searchCities().then(data => setCities(data))
	}

	return {
		cities,
		setCities,
		query,
		setQuery,
		searchCities,
		fetchCities
	};
}