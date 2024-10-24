import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import ForgotPassword from './ForgetPassword';
import Profile from './Profile';
import ResetPassword from './ReasetPassword';
import OTPverification from './OTPverification';

const Home = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          {/* Home page with hero section */}
          <Route path="/" element={<HeroSection />} />

          {/* Login route */}
          <Route path="/login" element={<Login />} />
          <Route path='/forget_password' element={<ForgotPassword/>}/>
          <Route path="/otp-verification" element={<OTPverification />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Signup route */}
          <Route path="/signup" element={<Signup />} />

          {/* profile route */}
          <Route path="/profile" element={<Profile />} />

          {/* Dashboard route (after login) */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default Home;
