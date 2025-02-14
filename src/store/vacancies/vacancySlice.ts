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
		updateCities(state, action){
			state.vacancy.cities = action.payload
		},
		updateVacancyName(state, action){
			state.name = action.payload
		},
		updateVacancyId(state, action){
			state.vacancy_id = action.payload
		}
	}
})

export const {updateVacancy, updateCities, updateVacancyName, updateVacancyId} = vacancySlice.actions;

export default vacancySlice.reducer;