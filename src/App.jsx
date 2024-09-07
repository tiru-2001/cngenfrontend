import io from 'socket.io-client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  Register,
  Login,
  EditProfile,
  Schedules,
  Referral,
  Notification,
  Home,
  Profile,
  Tasks,
  Employees,
  MainLogin,
  Admin,
} from './employee/pages/index';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ProfileDrawer from './user/userComponents/profileDrawer/ProfileDrawer';
import Book from './user/userComponents/books/Book';
import PrivateRoute from './user/userComponents/PrivateRoute';
import Payment from './user/userPages/payment/Payment';
import NotificationPage from './user/userPages/notificationpage/NotificationPage';
import BookingPage from './user/userPages/Bookingpage/BookingPage';
import EditLocationPage from './user/userPages/editlocationpage/EditLocation';
import FuelPrice from './user/userPages/fuelprice/FuelPrice';
import UHome from './user/userPages/home/UHome';
import VehicleDetails from './user/userComponents/vehicledetails/VehicleDetails';
import ULogin from './user/userPages/login/ULogin';
import ProfilePage from './user/userPages/profilepage/ProfilePage';
import ServicesPage from './user/userPages/servicespage/ServicesPage';
import SettingPage from './user/userPages/settingspage/SettingPage';
import URegister from './user/userComponents/register/URegister';
import EmployeeParent from './employee/pages/employeeparent/EmployeeParent';
import UserParent from './user/userPages/userparent/UserParent';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Assigntask from './employee/pages/admin/assigntasks/AssignTask';

const socket = io('https://cngenbackend.onrender.com/');

const App = () => {
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to the server');
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);
  return (
    <section className="font">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLogin />} />
          <Route path="emp-register" element={<Register />} />
          <Route path="emp-login" element={<Login />} />
          <Route path="user-login" element={<ULogin />} />
          <Route path="user-register" element={<URegister />} />
          <Route path="employee/*" element={<EmployeeParent />}>
            <Route index element={<Home socket={socket} />} />
            <Route path="profile" element={<Profile />} />
            <Route path="profile/editprofile" element={<EditProfile />} />
            <Route path="schedule" element={<Schedules />} />
            <Route path="performance" element={<Performance />} />
            <Route path="referral" element={<Referral />} />
            <Route path="notification" element={<Notification />} />
            <Route path="admin/*" element={<Admin socket={socket} />}>
              <Route path="employees" element={<Employees />} />
              <Route path="tasks" element={<Tasks />} />
              <Route path="assigntasks" element={<Assigntask />} />
            </Route>
          </Route>
          <Route path="user/*" element={<UserParent />}>
            <Route index element={<UHome />} />
            <Route path="notifications" element={<NotificationPage />} />
            <Route path="booking" element={<BookingPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="myprofile" element={<ProfilePage />} />
            <Route path="location" element={<EditLocationPage />} />
            <Route path="settings" element={<SettingPage />} />
            <Route path="book" element={<Book />} />
            <Route path="vehicle/:type" element={<VehicleDetails />} />
            <Route path="fuelprice" element={<FuelPrice />} />
            <Route path="profile" element={<ProfileDrawer />} />
            <Route path="payment" element={<Payment />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </section>
  );
};

export default App;
