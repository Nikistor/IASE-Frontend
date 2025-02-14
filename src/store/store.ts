import {configureStore} from "@reduxjs/toolkit";

import cityReducer from "./cities/citySlice"
import draftVacancyReducer from "./vacancies/vacancySlice"
import authReducer from "./users/authSlice"
import vacanciesReducer from "./vacancies/vacanciesSlice"
import citiesReducer  from "./cities/citiesSlice"

export default configureStore({
	reducer: {
		city: cityReducer,
		cities: citiesReducer,
		vacancy: draftVacancyReducer,
		vacancies: vacanciesReducer,
		user: authReducer
	}
});