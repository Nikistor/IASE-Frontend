import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	vacancy: undefined,
	vacancy_id: undefined,
	name: ""
};

const vacancySlice = createSlice({
	name: 'vacancy',
	initialState: initialState,
	reducers: {
		updateVacancy(state, action) {
			state.vacancy = action.payload
		},
		updateCompanies(state, action){
			state.vacancy.companies = action.payload
		},
		updateVacancyName(state, action){
			state.name = action.payload
		},
		updateVacancyId(state, action){
			state.vacancy_id = action.payload
		}
	}
})

export const {updateVacancy, updateCompanies, updateVacancyName, updateVacancyId} = vacancySlice.actions;

export default vacancySlice.reducer;