import './Assigntask.scss';
import configuredUrl from '../../../../utilities/request';
import { useEffect, useState } from 'react';

const Assigntask = () => {
  const [assignedTask, setAssignedTask] = useState(null);

  useEffect(() => {
    getAssignedTask();
  }, []);

  const getAssignedTask = async () => {
    try {
      const { data } = await configuredUrl.get('/');
      if (data.success) {
        setAssignedTask(data.assignedTask);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <section>
      {assignedTask?.map((item, ind) => (
        <section key={ind} className="assign-task">
          <h3>
            Employee Name: <span>{item?.empName}</span>
          </h3>
          <h3>
            Status: <span>{item?.status}</span>
          </h3>
          <h3>
            Task Id: <span>{item?.taskId}</span>
          </h3>
          <h3>
            Employee Id: <span>{item?.employeeId}</span>
          </h3>
        </section>
      ))}
    </section>
  );
};

export default Assigntask;
