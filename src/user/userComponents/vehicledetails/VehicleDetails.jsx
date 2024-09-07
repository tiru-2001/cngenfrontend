import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import hatchback from '../../../assets/images/hatchback.png';
import sedan from '../../../assets/images/sedan.png';
import midsuv from '../../../assets/images/midsuv.png';
import suv from '../../../assets/images/suv.png';
import luxury from '../../../assets/images/luxury.png';
import exterior from '../../../assets/images/exterior.png';
import interior from '../../../assets/images/interior.png';
import { useDispatch, useSelector } from 'react-redux';
import './VehicleDetails.scss';
import { addBookingInfo } from '../../../redux/slices/userslice';

const VehicleDetails = () => {
  const dispatch = useDispatch();
  const { type } = useParams();
  console.log(type);
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const vehicleData = [
    {
      type: 'hatchback',
      name: 'Hatchback',
      image: hatchback,
      description: 'i.e alto, i10, i20, etc.',
    },
    {
      type: 'sedan',
      name: 'Sedan',
      image: sedan,
      description: 'i.e ford, toyota, corolla, honda civic, etc.',
    },
    {
      type: 'mid-suv',
      name: 'Mid-SUV',
      image: midsuv,
      description: 'i.e thar, kia, seltos, creta, xuv 300, etc.',
    },
    {
      type: 'suv',
      name: 'SUV',
      image: suv,
      description: 'i.e kia carnival, fortuner, tata hexa, etc.',
    },
    {
      type: 'luxury',
      name: 'Luxury Vehicle',
      image: luxury,
      description: 'i.e mercedes, bmw, audi, etc.',
    },
  ];

  const bookingData = [
    {
      title: 'Daily',
      exterior: 'Waterless cleaning 6 days...',
      interior: 'Vacuum cleaning once a week...',
      price: 1350,
    },
    {
      title: 'Weekly',
      exterior: 'Full exterior wash once a week...',
      interior: 'Complete interior cleaning every week...',
      price: 670,
    },
    {
      title: 'Alternative',
      exterior: 'Exterior wax and polish once in 2 days...',
      interior: 'Detailed interior cleaning every month...',
      price: 950,
    },
  ];

  const currentVehicleIndex = vehicleData.findIndex(
    (vehicle) => vehicle.type === type
  );
  const [currentVehicle, setCurrentVehicle] = useState(
    vehicleData[currentVehicleIndex]
  );
  const [currentBookingIndex, setCurrentBookingIndex] = useState(0);

  const handleChangeBooking = (direction) => {
    let newBookingIndex = currentBookingIndex + direction;
    if (newBookingIndex < 0) newBookingIndex = bookingData.length - 1;
    if (newBookingIndex >= bookingData.length) newBookingIndex = 0;
    setCurrentBookingIndex(newBookingIndex);
  };

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -300 : 300,
        behavior: 'smooth',
      });
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    let startX = e.pageX || e.touches[0].pageX;
    const scrollLeft = scrollRef.current.scrollLeft;

    const mouseMoveHandler = (moveEvent) => {
      const x = moveEvent.pageX || moveEvent.touches[0].pageX;
      const walk = (x - startX) * 2;
      scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    const mouseUpHandler = () => {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
      document.removeEventListener('touchmove', mouseMoveHandler);
      document.removeEventListener('touchend', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
    document.addEventListener('touchmove', mouseMoveHandler);
    document.addEventListener('touchend', mouseUpHandler);
  };

  const handleBookingClick = (bookingType, bookingPrice) => {
    navigate('/user/book', { state: { bookingType, vehicle: currentVehicle } });
    dispatch(addBookingInfo({ bookingPrice: bookingPrice }));
  };

  if (!currentVehicle) {
    return <div className="error-message">Vehicle not found</div>;
  }

  return (
    <div>
      <div className="vehicle-details-container">
        <div className="header">
          <button onClick={() => navigate(-1)} className="back-button">
            <FaArrowLeft />
          </button>
          <h2 className="title">Subscription booking</h2>
        </div>

        <div className="vehicle-info">
          <img
            src={currentVehicle.image}
            alt={currentVehicle.name}
            className="vehicle-image"
          />
          <h3 className="vehicle-name">{currentVehicle.name}</h3>
          <p className="vehicle-description">{currentVehicle.description}</p>
        </div>

        <button
          onClick={() => navigate('/user')}
          className="change-vehicle-button"
        >
          Change Vehicle
        </button>

        <div className="booking-container">
          <FaArrowLeft
            className="scroll-left"
            size={20}
            onClick={() => handleScroll('left')}
          />
          <div
            ref={scrollRef}
            onMouseDown={handleDrag}
            onTouchStart={handleDrag}
            className="booking-scroll"
          >
            {bookingData.map((booking, index) => (
              <div key={index} className="booking-item">
                <h4 className="booking-title">{booking.title}</h4>
                <div className="booking-details">
                  <div className="detail-item">
                    <img
                      src={exterior}
                      alt="Exterior"
                      className="detail-image"
                    />
                    <p className="detail-text">{booking.exterior}</p>
                  </div>
                  <div className="detail-item">
                    <img
                      src={interior}
                      alt="Interior"
                      className="detail-image"
                    />
                    <p className="detail-text">{booking.interior}</p>
                  </div>
                </div>
                <p className="booking-price">{booking.price} / per month</p>
                <button
                  className="booking-button"
                  onClick={() =>
                    handleBookingClick(booking.title, booking.price)
                  }
                >
                  BOOK {booking.title.toUpperCase()}
                </button>
              </div>
            ))}
          </div>
          <FaArrowRight
            className="scroll-right"
            size={20}
            onClick={() => handleScroll('right')}
          />
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;
