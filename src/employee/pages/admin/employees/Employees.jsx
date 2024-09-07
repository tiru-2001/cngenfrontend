import { useEffect, useState } from 'react';
import './employees.scss';
import configuredUrl from '../../../../utilities/request';
import Ecard from '../../../components/cards/employeesCard/Ecard';

const Employees = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState(null);
  useEffect(() => {
    getEmployees();
  }, []);
  const getEmployees = async () => {
    try {
      const { data } = await configuredUrl.get('/admin/get-employees');
      if (data.success) {
        setLoading(false);
        setEmployees(data.employees);
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };
  return (
    <section className="employees">
      {loading ? (
        <h1>loading...</h1>
      ) : (
        <section className="employees_innercontainer">
          <h1>Employees List</h1>
          <section className="bottom">
            {employees?.map((item, ind) => (
              <Ecard key={ind} {...item} />
            ))}
          </section>
        </section>
      )}
    </section>
  );
};

export default Employees;
