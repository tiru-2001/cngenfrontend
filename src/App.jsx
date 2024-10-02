import io from 'socket.io-client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
//employee imports
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
  EmployeeParent,
  Assigntask,
} from './employee/pages/index';
// user imports
import {
  ProfileDrawer,
  URegister,
  FuelPrice,
  Book,
  VehicleDetails,
} from './user/userComponents/index';
import {
  ULogin,
  NotificationPage,
  UHome,
  UserParent,
  EditLocationPage,
  Payment,
  ProfilePage,
  BookingPage,
  ServicesPage,
  SettingPage,
} from './user/userPages';

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
            <Route path="booking" element={<UHome />} />
            <Route path="notifications" element={<NotificationPage />} />
            <Route index element={<BookingPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="myprofile" element={<ProfilePage />} />
            <Route path="location" element={<EditLocationPage />} />
            <Route path="settings" element={<SettingPage />} />
            <Route path="book" element={<Book />} />
            <Route path="vehicle/:type" element={<VehicleDetails />} />
            <Route path="services/fuelprice" element={<FuelPrice />} />
            <Route path="payment" element={<Payment />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </section>
  );
};

export default App;
