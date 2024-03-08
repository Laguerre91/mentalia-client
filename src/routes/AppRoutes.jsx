import { Routes, Route } from "react-router-dom"

import SignupPage from "../pages/SignUpPage/SignupPage"
import LoginPage from "./../pages/LoginPage"
import HomePage from "./../pages/HomePage/HomePage"
import UserDashboardPage from "./../pages/UserDashboardPage/UserDashboardPage"
import PsycologistDetailsPage from './../pages/PsycologistDetailsPage/PsycologistDetailsPage'
import PsycologistsListPage from './../pages/PsycologistsListPage/PsycologistsListPage'
import CommunityPage from './../pages/CommunityPage/CommunityPage'
import AboutUsPage from './../pages/AboutUsPage/AboutUsPage'
import NotFoundPage from './../pages/NotFoundPage/NotFoundPage'
import PrivateRoute from "./PrivateRoute"

const AppRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/sobre-nosotros" element={<AboutUsPage />} />

            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />

            <Route element={<PrivateRoute />}>
                <Route path="/usuario/:userId" element={<UserDashboardPage />} />
                <Route path="/psicologo/:psycId" element={< PsycologistDetailsPage />} />
                <Route path="/psicologos" element={<PsycologistsListPage />} />
                <Route path="/comunidad" element={<CommunityPage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />

        </Routes>
    )
}

export default AppRoutes