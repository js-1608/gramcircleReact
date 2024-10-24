import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import ForgotPassword from './ForgetPassword';

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

          {/* Signup route */}
          <Route path="/signup" element={<Signup />} />

          {/* Dashboard route (after login) */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default Home;
