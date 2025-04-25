import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	companies: [],
	query: ""
};

const companiesSlice = createSlice({
	name: 'companies',
	initialState: initialState,
	reducers: {
		updateCompanies(state, action) {
			state.companies = action.payload
		},
		updateQuery(state, action) {
			state.query = action.payload
		}
	}
})

export const {
	updateCompanies,
	updateQuery
} = companiesSlice.actions;

export default companiesSlice.reducer;