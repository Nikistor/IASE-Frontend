import {useDispatch, useSelector} from 'react-redux';
import {
	updateCompany,
	updateName,
	updateDescription,
	updateFoundationDate,
	updateGRP,
	updateClimate,
	updateSquare,
	updateImage
} from "../../store/companies/companySlice";
import {api} from "../../utils/api";

export function useCompany() {
	const company = useSelector(state => state.company.company)
	const image = useSelector(state => state.company.image)

	const dispatch = useDispatch()

	const setCompany = (value: any) => {
		dispatch(updateCompany(value))
	}

	const setName = (value: any) => {
		dispatch(updateName(value))
	}

	const setDescription = (value: any) => {
		dispatch(updateDescription(value))
	}

	const setFoundationDate = (value: any) => {
		dispatch(updateFoundationDate(value))
	}

	const setGRP = (value: any) => {
		dispatch(updateGRP(value))
	}

	const setClimate = (value: any) => {
		dispatch(updateClimate(value))
	}

	const setSquare = (value: any) => {
		dispatch(updateSquare(value))
	}

	const setImage = (value: any) => {
		dispatch(updateImage(value))
	}

	const fetchCompany = async (id: number) => {

		const {data} = await api.get(`companies/${id}`);

		setCompany(data)

	};

	return {
		company,
		image,
		setCompany,
		setName,
		setDescription,
		setFoundationDate,
		setGRP,
		setClimate,
		setSquare,
		setImage,
		fetchCompany,
	};
}