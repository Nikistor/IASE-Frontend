import { useDispatch, useSelector } from 'react-redux';
import {
	updateCompanies,
	updateQuery
} from "../../store/companies/companiesSlice";
import { api } from "../../utils/api";
import { useRequisition } from "../requisitions/useRequisition";
import { useToken } from "../users/useToken";

export function useCompanies() {
	const companies = useSelector(state => state.companies.companies);
	const query = useSelector(state => state.companies.query);

	const { access_token } = useToken()

	const { setRequisitionId, setRequisition } = useRequisition()

	const dispatch = useDispatch()

	const setCompanies = (value: any) => {
		dispatch(updateCompanies(value))
	}

	const setQuery = (value: any) => {
		dispatch(updateQuery(value))
	}

	const searchCompanies = async () => {

		const { data } = await api.get(`companies/search`, {
			params: {
				query: query
			},
			headers: {
				'authorization': access_token
			}
		})

		const draft_requisition_id = data["draft_requisition_id"]
		setRequisitionId(draft_requisition_id)

		if (!draft_requisition_id) {
			setRequisition(undefined)
		}

		return data["companies"]
	}

	const fetchCompanies = async () => {
		searchCompanies().then(data => setCompanies(data))
	}

	return {
		companies,
		setCompanies,
		query,
		setQuery,
		searchCompanies,
		fetchCompanies
	};
}