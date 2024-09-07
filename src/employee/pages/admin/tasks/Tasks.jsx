import { useEffect, useState } from 'react';
import './tasks.scss';
import { TaskCard } from '../../../components';
import configuredUrl from '../../../../utilities/request';
const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState([]);
  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    try {
      const { data } = await configuredUrl.get('tasks/get-tasks');

      console.log(data);
      if (data.success) {
        setTasks(data.tasks);
      }
    } catch (e) {
      console.log(e);
    }
  };
  console.log(tasks);
  return (
    <section className="tasks_container">
      <h1>Tasks</h1>
      <section className="bottom">
        {/* {tasks?.map((item, ind) => (
          <TaskCard key={ind} {...item} />
        ))} */}
        {tasks.map((item, ind) => (
          <section key={ind} className="task_card">
            <h3>
              Task-Id:
              <span>{item?._id}</span>
            </h3>
            <h3>
              Location:
              <span>{item?.location}</span>
            </h3>
            <h3>{item?.phone}</h3>
            <h3>{item?.date}</h3>
            <h3>
              Amount:
              <span>{item?.amount}</span>
            </h3>
            <h3>
              Assign Time:
              <span>{item?.assignTime}</span>
            </h3>
            <h3>
              status:
              <span>{item?.status}</span>
            </h3>
            <h3>
              Car Wash:
              <span>{item?.carwash}</span>
            </h3>
          </section>
        ))}
      </section>
    </section>
  );
};

export default Tasks;
// "66cc10ebd59703bfa2f12f93"
