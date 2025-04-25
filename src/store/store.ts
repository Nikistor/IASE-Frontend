import {configureStore} from "@reduxjs/toolkit";

import companyReducer from "./companies/companySlice"
import draftVacancyReducer from "./vacancies/vacancySlice"
import authReducer from "./users/authSlice"
import vacanciesReducer from "./vacancies/vacanciesSlice"
import companiesReducer  from "./companies/companiesSlice"

export default configureStore({
	reducer: {
		company: companyReducer,
		companies: companiesReducer,
		vacancy: draftVacancyReducer,
		vacancies: vacanciesReducer,
		user: authReducer
	}
});