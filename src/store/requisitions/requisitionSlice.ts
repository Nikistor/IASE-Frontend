import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	requisition: undefined,
	requisition_id: undefined,
	name: ""
};

const requisitionSlice = createSlice({
	name: 'requisition',
	initialState: initialState,
	reducers: {
		updateRequisition(state, action) {
			state.requisition = action.payload
		},
		updateCompanies(state, action){
			state.requisition.companies = action.payload
		},
		updateRequisitionName(state, action){
			state.name = action.payload
		},
		updateRequisitionId(state, action){
			state.requisition_id = action.payload
		}
	}
})

export const {updateRequisition, updateCompanies, updateRequisitionName, updateRequisitionId} = requisitionSlice.actions;

export default requisitionSlice.reducer;