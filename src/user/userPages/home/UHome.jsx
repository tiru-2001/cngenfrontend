import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import hatchback from '../../../assets/images/hatchback.png';
import sedan from '../../../assets/images/sedan.png';
import midsuv from '../../../assets/images/midsuv.png';
import suv from '../../../assets/images/suv.png';
import luxury from '../../../assets/images/luxury.png';
import { useSelector, useDispatch } from 'react-redux';
import './UHome.scss';
import { addBookingInfo } from '../../../redux/slices/userslice';

const Home = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const vehicles = [
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

  const handleNavigate = (vehicleType) => {
    navigate(`/user/vehicle/${vehicleType}`);
    dispatch(addBookingInfo({ vehicleType: vehicleType }));
  };

  const filteredVehicles = vehicles.filter((vehicle) =>
    vehicle.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="home-page-container">
        <header className="home-header">
          <h2 className="header-title">Please select vehicle</h2>
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </header>

        <main className="vehicle-list">
          {filteredVehicles.length > 0 ? (
            filteredVehicles.map((vehicle, index) => (
              <div
                key={index}
                className="vehicle-card"
                onClick={() => handleNavigate(vehicle.type)}
              >
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="vehicle-image"
                />
                <div>
                  <h3 className="vehicle-name">{vehicle.name}</h3>
                  <p className="vehicle-description">{vehicle.description}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="no-vehicles-text">No vehicles found</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default Home;
