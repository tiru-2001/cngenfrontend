import { useEffect, useState } from 'react';
import './admin.scss';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Sidenavbar } from '../../../components';
import configuredUrl from '../../../../utilities/request';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
const Admin = ({ socket }) => {
  const { employeeLoginInfo } = useSelector((state) => state.employeeslice);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const checkAdmin = async () => {
    try {
      const { data } = await configuredUrl.get('admin/checkadmin');
      console.log(data);

      if (data.success) {
        setLoading(false);
      } else {
        navigate('/');
      }
    } catch (e) {
      setLoading(false);
      navigate('/');
      console.log(e);
    }
  };
  useEffect(() => {
    checkAdmin();
    socket.emit('joinRoom', employeeLoginInfo._id);
    socket.on('accepted', () => {
      toast.success('accept');
      alert('accepted');
    });
    socket.on('rejected', () => {
      toast.error('rejected');
    });
  }, []);
  return (
    <>
      {loading ? (
        <h1>loading..</h1>
      ) : (
        <section className="admin">
          {/* {desktop} */}
          <section className="left">
            <Sidenavbar />
          </section>
          {/* {mobile nav} */}
          <section className="mobileNav">
            <Sidenavbar />
          </section>

          <section className="right">
            <Outlet />
          </section>
        </section>
      )}
    </>
  );
};

export default Admin;
