import React, { useState, useEffect } from 'react';
import './Home.scss';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { TaskCard, Card } from '../../../employee/components/index';
import { useSelector } from 'react-redux';
const Home = ({ socket }) => {
  const { employeeLoginInfo } = useSelector((state) => state.employeeslice);
  const [showMoreCards, setShowMoreCards] = useState(false);
  const [task, setTask] = useState(null);
  const handleToggleCards = () => {
    setShowMoreCards((prevShowMoreCards) => !prevShowMoreCards);
  };
  useEffect(() => {
    socket.emit('joinRoom', employeeLoginInfo._id);
    socket.on('taskAssigned', (data) => {
      setTask(data);
      alert('task received');
    });
  }, [socket]);
  return (
    <>
      <section className="home-container">
        <section className="home-mid">
          <section className="home-mid-child">
            <section className="home-mid-heading">
              <h2>Dashboard</h2>
              <p>Tuesday, 23/05/2024 10:02 AM</p>
            </section>
            {task && <Card {...task} />}
          </section>
        </section>
      </section>
    </>
  );
};

export default Home;
