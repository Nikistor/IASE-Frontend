import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	cities: [],
	query: ""
};

const citiesSlice = createSlice({
	name: 'cities',
	initialState: initialState,
	reducers: {
		updateCities(state, action) {
			state.cities = action.payload
		},
		updateQuery(state, action) {
			state.query = action.payload
		}
	}
})

export const {
	updateCities,
	updateQuery
} = citiesSlice.actions;

export default citiesSlice.reducer;