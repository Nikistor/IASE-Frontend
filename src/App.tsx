import "./styles/Main.sass"
import "./styles/Reset.sass"
import Header from "./components/Header/Header";
import Breadcrumbs from "./components/Breadcrumbs/Breadcrumbs";
import {BrowserRouter, Route, Routes, Navigate, useLocation} from 'react-router-dom';
import CityPage from "./pages/CityPage/CityPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import {QueryClient, QueryClientProvider } from "react-query";
import {Provider} from "react-redux"
import store from "./store/store"
import CitiesPage from "./pages/CitiesPage/CitiesPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import {useAuth} from "./hooks/users/useAuth";
import VacancyConstructor from "./components/VacancyConstructor/VacancyConstructor";
import VacancyPage from "./pages/VacancyPage/VacancyPage";
import VacanciesPage from "./pages/VacanciesPage/VacanciesPage";
import CityEditPage from "./pages/CityEditPage/CityEditPage";
import CityAddPage from "./pages/CityAddPage/CityAddPage";
import CitiesTableWrapper from "./pages/CitiesPage/CitiesTableWrapper/CitiesTableWrapper";


const TopPanelWrapper = () => {

    const {is_authenticated, is_moderator} = useAuth()

    const location = useLocation()

    return (
        <div className="top-panel-wrapper">
            <Breadcrumbs />
            {is_authenticated && location.pathname.endsWith("cities") && <VacancyConstructor /> }
        </div>
    )
}


function App() {

    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>

            <Provider store={store}>

                <BrowserRouter basename="/work">

                    <div className="App">

                        <div className="wrapper">

                            <Header />

                            <div className={"content-wrapper"}>

                                <TopPanelWrapper />

                                <Routes>

                                    <Route path="/" element={<Navigate to="/cities" replace />} />

                                    <Route path="/profile" element={<ProfilePage />} />

                                    <Route path="/cities" element={<CitiesPage />} />

                                    <Route path="/cities/:id" element={<CityPage />} />

                                    <Route path="/cities/:id/edit" element={<CityEditPage />} />

                                    <Route path="/cities/create" element={<CityAddPage />} />

                                    <Route path="/profile" element={<ProfilePage />} />

                                    <Route path="/vacancies/:id" element={<VacancyPage />} />

                                    <Route path="/vacancies" element={<VacanciesPage />} />

                                    <Route path="/login" element={<LoginPage />} />

                                    <Route path="/register" element={<RegisterPage />} />

                                    <Route path="/cities_table" element={<CitiesTableWrapper />} />

                                </Routes>

                            </div>

                        </div>

                    </div>

                </BrowserRouter>

            </Provider>

        </QueryClientProvider>
    )
}

export default App
