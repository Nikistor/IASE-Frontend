import "./styles/main.sass"
import "./styles/reset.sass"
import Header from "./components/Header/Header";
import Breadcrumbs from "./components/Breadcrumbs/Breadcrumbs";
import {BrowserRouter, Route, Routes, Navigate, useLocation} from 'react-router-dom';
import CompanyPage from "./pages/CompanyPage/CompanyPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import {QueryClient, QueryClientProvider } from "react-query";
import {Provider} from "react-redux"
import store from "./store/store"
import CompaniesPage from "./pages/CompaniesPage/CompaniesPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import {useAuth} from "./hooks/users/useAuth";
import RequisitionConstructor from "./components/RequisitionConstructor/RequisitionConstructor";
import RequisitionPage from "./pages/RequisitionPage/RequisitionPage";
import RequisitionsPage from "./pages/RequisitionsPage/RequisitionsPage";
import CompanyEditPage from "./pages/CompanyEditPage/CompanyEditPage";
import CompanyAddPage from "./pages/CompanyAddPage/CompanyAddPage";
import CompaniesTableWrapper from "./pages/CompaniesPage/CompaniesTableWrapper/CompaniesTableWrapper";


const TopPanelWrapper = () => {

    const {is_authenticated, is_moderator} = useAuth()

    const location = useLocation()

    return (
        <div className="top-panel-wrapper">
            <Breadcrumbs />
            {is_authenticated && location.pathname.endsWith("companies") && <RequisitionConstructor /> }
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

                                    <Route path="/" element={<Navigate to="/companies" replace />} />

                                    <Route path="/profile" element={<ProfilePage />} />

                                    <Route path="/companies" element={<CompaniesPage />} />

                                    <Route path="/companies/:id" element={<CompanyPage />} />

                                    <Route path="/companies/:id/edit" element={<CompanyEditPage />} />

                                    <Route path="/companies/create" element={<CompanyAddPage />} />

                                    <Route path="/profile" element={<ProfilePage />} />

                                    <Route path="/requisitions/:id" element={<RequisitionPage />} />

                                    <Route path="/requisitions" element={<RequisitionsPage />} />

                                    <Route path="/login" element={<LoginPage />} />

                                    <Route path="/register" element={<RegisterPage />} />

                                    <Route path="/companies_table" element={<CompaniesTableWrapper />} />

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
