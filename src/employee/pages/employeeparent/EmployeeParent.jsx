import { Header, Navbar } from '../../components';
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './employeeparent.scss';

const Parent = () => {
  const { employeeLoginInfo } = useSelector((state) => state.employeeslice);
  if (!employeeLoginInfo) {
    return <Navigate to="/" />;
  }
  return (
    <section className="parent">
      <Header />
      <Outlet />
      <Navbar />
    </section>
  );
};

export default Parent;
