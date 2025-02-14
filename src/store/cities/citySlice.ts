import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	city: undefined
};

const citySlice = createSlice({
	name: 'city',
	initialState: initialState,
	reducers: {
		updateCity(state, action) {
			state.city = action.payload
		},
		updateName(state, action) {
			state.city.name = action.payload
		},
		updateDescription(state, action) {
			state.city.description = action.payload
		},
		updateFoundationDate(state, action) {
			state.city.foundation_date = action.payload
		},
		updateGRP(state, action) {
			state.city.grp = action.payload
		},
		updateClimate(state, action) {
			state.city.climate = action.payload
		},
		updateSquare(state, action) {
			state.city.square = action.payload
		},
		updateImage(state, action) {
			state.city.image = action.payload
		}
	}
})

export const {
	updateCity,
	updateName,
	updateDescription,
	updateFoundationDate,
	updateGRP,
	updateClimate,
	updateSquare,
	updateImage
} = citySlice.actions;

export default citySlice.reducer;