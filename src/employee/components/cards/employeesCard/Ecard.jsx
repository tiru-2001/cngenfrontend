import './ecard.scss';
import { useState } from 'react';
import configuredUrl from '../../../../utilities/request';
const Ecard = ({ name, location, email, phone, _id, employee_id }) => {
  const [toggle, setToggle] = useState(false);
  const [formToggle, setFormToggle] = useState(false);
  const [taskId, setTaskId] = useState('');

  const changeToggleState = () => {
    setToggle((prev) => !prev);
  };

  const submitTask = async (event) => {
    event.preventDefault(); // Prevent form submission from reloading the page
    setFormToggle(false);
    try {
      const { data } = await configuredUrl.post(`admin/assign-task/${_id}`, {
        taskId: taskId,
      });
      console.log(data); // Handle the response as needed
    } catch (e) {
      console.log(e);
    }
  };

  const changeFormToggle = (event) => {
    event.stopPropagation(); // Prevent parent onClick from firing
    setFormToggle((prev) => !prev);
  };

  const handleFormClick = (event) => {
    event.stopPropagation();
  };

  return (
    <section onClick={changeToggleState} className="ecard_container">
      {toggle ? (
        <section className="toggle_container">
          <h1>{name}</h1>
          <h2>{phone}</h2>
          <h3>{email}</h3>
          <h4>{location}</h4>
          <button onClick={changeFormToggle}>Assign Task</button>
          {formToggle && (
            <form onClick={handleFormClick} onSubmit={submitTask}>
              <input
                onChange={(e) => {
                  setTaskId(e.target.value);
                }}
                placeholder="Enter the task id"
              />
              <button type="submit">Submit</button>
            </form>
          )}
        </section>
      ) : (
        <h1>{name}</h1>
      )}
    </section>
  );
};

export default Ecard;
