import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Book.scss'; // Import the SCSS file
import { useDispatch } from 'react-redux';
import { addBookingInfo } from '../../../redux/slices/userslice';

const Book = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(null);
  const [address, setAddress] = useState('');
  const [selectedAddressType, setSelectedAddressType] = useState('');

  const today = new Date();

  const handlePlaceSelected = (place) => {
    const formattedAddress = place.formatted_address;
    setAddress(formattedAddress);
  };

  const handlePayment = () => {
    dispatch(
      addBookingInfo({
        startDate: startDate.toISOString(),
        address,
        selectedAddressType,
      })
    );
    navigate('/user/payment');
  };

  return (
    <div className="book-container">
      <div className="header">
        <button onClick={() => navigate(-1)} className="back-button">
          <FaArrowLeft className="back-icon" />
        </button>
        <h2 className="checkout-title">Checkout</h2>
      </div>

      <div className="form-container">
        <h3 className="section-title">When do you want the service?</h3>

        <h4 className="input-label">Select Date</h4>
        <div className="input-group">
          <FaCalendarAlt className="input-icon" />
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="date-picker"
            placeholderText="Select a date"
            minDate={today}
          />
        </div>

        <h3 className="section-title">Pick-up Address</h3>
        <div className="input-group">
          <FaMapMarkerAlt className="input-icon" />
          <input
            className="pickup_address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter the address"
          />
        </div>

        <h4 className="input-label">Pick-up Address Type</h4>
        <div className="address-type-options">
          <label className="radio-option">
            <input
              type="radio"
              name="addressType"
              value="home"
              checked={selectedAddressType === 'home'}
              onChange={(e) => setSelectedAddressType(e.target.value)}
              className="radio-input"
            />
            Home
          </label>
          <label className="radio-option">
            <input
              type="radio"
              name="addressType"
              value="work"
              checked={selectedAddressType === 'work'}
              onChange={(e) => setSelectedAddressType(e.target.value)}
              className="radio-input"
            />
            Work
          </label>
          <label className="radio-option">
            <input
              type="radio"
              name="addressType"
              value="others"
              checked={selectedAddressType === 'others'}
              onChange={(e) => setSelectedAddressType(e.target.value)}
              className="radio-input"
            />
            Others
          </label>
        </div>
      </div>

      <button className="proceed-button" onClick={handlePayment}>
        PROCEED
      </button>
    </div>
  );
};

export default Book;
