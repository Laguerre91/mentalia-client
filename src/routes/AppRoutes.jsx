import { Routes, Route } from "react-router-dom"

import SignupPage from "./../pages/SignupPage"
import LoginPage from "./../pages/LoginPage"
import HomePage from "./../pages/HomePage"
import UserDashboardPage from "./../pages/UserDashboardPage"
import PsycologistDetailsPage from './../pages/PsycologistDetailsPage'
import PsycologistsListPage from './../pages/PsycologistsListPage'
import CommunityPage from './../pages/CommunityPage'
import AboutUsPage from './../pages/AboutUsPage'
import NotFoundPage from './../pages/NotFoundPage'
import PrivateRoute from "./PrivateRoute"

const AppRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />

            <Route element={<PrivateRoute />}>
                <Route path="/usuario/:userId" element={<UserDashboardPage />} />
                <Route path="/psicologo/:psycId" element={< PsycologistDetailsPage />} />
                <Route path="/psicologos" element={<PsycologistsListPage />} />
                <Route path="/comunidad" element={<CommunityPage />} />
            </Route>

            <Route path="/sobre-nosotros" element={<AboutUsPage />} />

            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />

            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    )
}

export default AppRoutes