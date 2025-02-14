import {useDispatch, useSelector} from 'react-redux';
import {
	updateCity,
	updateName,
	updateDescription,
	updateFoundationDate,
	updateGRP,
	updateClimate,
	updateSquare,
	updateImage
} from "../../store/cities/citySlice";
import {api} from "../../utils/api";

export function useCity() {
	const city = useSelector(state => state.city.city)
	const image = useSelector(state => state.city.image)

	const dispatch = useDispatch()

	const setCity = (value) => {
		dispatch(updateCity(value))
	}

	const setName = (value) => {
		dispatch(updateName(value))
	}

	const setDescription = (value) => {
		dispatch(updateDescription(value))
	}

	const setFoundationDate = (value) => {
		dispatch(updateFoundationDate(value))
	}

	const setGRP = (value) => {
		dispatch(updateGRP(value))
	}

	const setClimate = (value) => {
		dispatch(updateClimate(value))
	}

	const setSquare = (value) => {
		dispatch(updateSquare(value))
	}

	const setImage = (value) => {
		dispatch(updateImage(value))
	}

	const fetchCity = async (id) => {

		const {data} = await api.get(`cities/${id}`);

		setCity(data)

	};

	return {
		city,
		image,
		setCity,
		setName,
		setDescription,
		setFoundationDate,
		setGRP,
		setClimate,
		setSquare,
		setImage,
		fetchCity,
	};
}