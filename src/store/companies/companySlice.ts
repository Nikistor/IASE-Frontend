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
		updateDescription(state, action) {
			state.company.description = action.payload
		},
		updateFoundationDate(state, action) {
			state.company.foundation_date = action.payload
		},
		updateGRP(state, action) {
			state.company.grp = action.payload
		},
		updateClimate(state, action) {
			state.company.climate = action.payload
		},
		updateSquare(state, action) {
			state.company.square = action.payload
		},
		updateImage(state, action) {
			state.company.image = action.payload
		}
	}
})

export const {
	updateCompany,
	updateName,
	updateDescription,
	updateFoundationDate,
	updateGRP,
	updateClimate,
	updateSquare,
	updateImage
} = companySlice.actions;

export default companySlice.reducer;