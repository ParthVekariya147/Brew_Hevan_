import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AboutUs, Chef, FindUs, Footer, Gallery, Header, Intro, Laurels, SpecialMenu } from './container';
import Navbar from './components/Navbar/Navbar';
import LoginForm from './components/AuthForm/LoginForm';
import RegisterForm from './components/AuthForm/RegisterForm';
import TableBook from './container/TableBooking/TableBooking';
import MainMenu from './container/Menu/MainMenu';
import OrderPage from './components/Order/OrderPage';
// import ResetPasswordForm from './components/AuthForm/ResetPasswordForm';
import './App.css';

const App = () => (
  <Router>
    <div className='all'>
      <Navbar />
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/menu" element={<SpecialMenu />} />
        <Route path="/chef" element={<Chef />} />
        <Route path="/intro" element={<Intro />} />
        <Route path="/laurels" element={<Laurels />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/find-us" element={<FindUs />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/main-menu" element={<MainMenu  />} />
        <Route path="/book-table" element={<TableBook />} />
        <Route path="/order" element={<OrderPage />} />
        {/* <Route path='/resetpassword' element={<ResetPasswordForm />} /> */}
      </Routes>
      <Footer />
    </div>
  </Router>
);

export default App;
