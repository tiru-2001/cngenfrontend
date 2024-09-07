import './userparent.scss';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Header, Navbar } from '../../../employee/components';

const UserParent = () => {
  const { userLoginInfo } = useSelector((state) => state.userslice);
  if (!userLoginInfo) {
    return <Navigate to={'/user-login'} />;
  }

  return (
    <section className="parent">
      <Header />
      <Outlet />
      <Navbar />
    </section>
  );
};

export default UserParent;
