import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import car from '../../../assets/images/car.png';
import bike from '../../../assets/images/bike.png';
import './BookingPage.scss';

const BookingPage = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const handleCarClick = () => {
    navigate('/user/booking');
  };

  const handleBikeClick = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 1000);
  };

  return (
    <div className="booking-page min-h-screen">
      <div className="title-container text-center">
        <h1 className="title">Subscription Options</h1>
        <p className="subtitle">
          Choose From Our Range Of Subscription Options To Unlock Exclusive
          Features And Benefits Tailored To Your Needs
        </p>
      </div>

      <div className="options-container">
        <div onClick={handleCarClick} className="option">
          <img src={car} alt="Car" className="option-image" />
        </div>
        <div onClick={handleBikeClick} className="option">
          <img src={bike} alt="Bike" className="option-image" />
        </div>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <p className="popup-text">Coming Soon</p>
          </div>
        </div>
      )}
      <div className="booking_footer">
        <small>
          Developed by{' '}
          <a href="https://thewebsort.com" target="_blank">
            Websort
          </a>
        </small>
      </div>
    </div>
  );
};

export default BookingPage;
