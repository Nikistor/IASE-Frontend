import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	company: undefined
};

const companySlice = createSlice({
	name: 'company',
	initialState: initialState,
	reducers: {
		updateCompany(state, action) {
			state.company = action.payload
		},
		updateName(state, action) {
			state.company.name = action.payload
		},
		updateTicker(state, action) {
			state.company.ticker = action.payload
		},
		updateIndustry(state, action) {
			state.company.industry = action.payload
		},
		updateCapital(state, action) {
			state.company.capital = action.payload
		},
		updateEnterpriseValue(state, action) {
			state.company.enterprise_value = action.payload
		},
		updateRevenue(state, action) {
			state.company.revenue = action.payload
		},
		updateNetProfit(state, action) {
			state.company.net_profit = action.payload
		},
		updatePE(state, action) {
			state.company.pe = action.payload
		},
		updatePS(state, action) {
			state.company.ps = action.payload
		},
		updatePB(state, action) {
			state.company.pb = action.payload
		},
		updateEvEbitda(state, action) {
			state.company.ev_ebitda = action.payload
		},
		updateEbitdaMargin(state, action) {
			state.company.ebitda_margin = action.payload
		},
		updateDebtEbitda(state, action) {
			state.company.debt_ebitda = action.payload
		},
		updateReport(state, action) {
			state.company.report = action.payload
		},
		updateYear(state, action) {
			state.company.year = action.payload
		},
		updateImage(state, action) {
			state.company.image = action.payload
		}
	}
})

export const {
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
} = companySlice.actions;

export default companySlice.reducer;