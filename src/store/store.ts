import {configureStore} from "@reduxjs/toolkit";

import companyReducer from "./companies/companySlice"
import draftRequisitionReducer from "./requisitions/requisitionSlice"
import authReducer from "./users/authSlice"
import requisitionsReducer from "./requisitions/requisitionsSlice"
import companiesReducer  from "./companies/companiesSlice"

export default configureStore({
	reducer: {
		company: companyReducer,
		companies: companiesReducer,
		requisition: draftRequisitionReducer,
		requisitions: requisitionsReducer,
		user: authReducer
	}
});