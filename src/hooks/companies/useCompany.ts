import {useDispatch, useSelector} from 'react-redux';
import {
	updateCompany,
	updateName,
	updateTicker,
	updateIndustry,
	updateCapital,
	updateEnterpriseValue,
	updateRevenue,
	updateNetProfit,
	updatePE,
	updatePS,
	updatePB,
	updateEvEbitda,
	updateEbitdaMargin,
	updateDebtEbitda,
	updateReport,
	updateYear,
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

	const setName = (value) => {
		dispatch(updateName(value))
	}

	const setTicker = (value) => {
		dispatch(updateTicker(value))
	}

	const setIndustry = (value) => {
		dispatch(updateIndustry(value))
	}

	const setCapital = (value) => {
		dispatch(updateCapital(value))
	}

	const setEnterpriseValue = (value) => {
		dispatch(updateEnterpriseValue(value))
	}

	const setRevenue = (value) => {
		dispatch(updateRevenue(value))
	}

	const setNetProfit = (value) => {
		dispatch(updateNetProfit(value))
	}

	const setPE = (value) => {
		dispatch(updatePE(value))
	}

	const setPS = (value) => {
		dispatch(updatePS(value))
	}

	const setPB = (value) => {
		dispatch(updatePB(value))
	}

	const setEvEbitda = (value) => {
		dispatch(updateEvEbitda(value))
	}

	const setEbitdaMargin = (value) => {
		dispatch(updateEbitdaMargin(value))
	}

	const setDebtEbitda = (value) => {
		dispatch(updateDebtEbitda(value))
	}

	const setReport = (value) => {
		dispatch(updateReport(value))
	}

	const setYear = (value) => {
		dispatch(updateYear(value))
	}

	const setImage = (value) => {
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
		setTicker,
		setIndustry,
		setCapital,
		setEnterpriseValue,
		setRevenue,
		setNetProfit,
		setPE,
		setPS,
		setPB,
		setEvEbitda,
		setEbitdaMargin,
		setDebtEbitda,
		setReport,
		setYear,
		setImage,
		fetchCompany,
	};
}