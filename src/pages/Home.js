import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import { useAuth } from '../context/AuthContext';
import Dashboard from './Dashboard';
import ForgotenPassword from './ForgetPassword';
import Login from './Login';
import PersonalDetail from './Profile';
import ResetPassword from './ResetPassword';
import Signup from './Signup';
import VerifyEmail from './VerifyEmail';
const Home = () => {
    const { isLoggedIn } = useAuth();

    // Protected route component
    const ProtectedRoute = ({ children }) => {
        return isLoggedIn ? children : <Navigate to="/login" />;
    };

    return (
        <Router>
            <div className="App">
                <Header />
                <Routes>
                    {isLoggedIn ? (
                        <>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/personal-detail" element={<PersonalDetail />} />
                            <Route path="*" element={<Navigate to="/" />} />
                        </>
                    ) : (
                        <>
                            <Route path="/" element={<HeroSection />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Signup />} />
                            <Route path="/forgotPassword" element={<ForgotenPassword />} />
                            <Route path="*" element={<Navigate to="/login" />} />
                        </>
                    )}
                    <Route path="/verify-email/:token" element={<VerifyEmail />} />
                    <Route path="/reset-password/:token" element={<ResetPassword />} />
                </Routes>
            </div>
        </Router>
    );
};

export default Home;
