import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Index = (props) => {
  const [newForm, setNewForm] = useState({
    jobTitle: '',
    company: '',
    notes: '',
  });

  const handleChange = (e) => {
    setNewForm({ ...newForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.createJob(newForm);
    setNewForm({
      jobTitle: '',
      company: '',
      notes: '',
    });
  };

  const handleDelete = (id) => {
    props.deleteJob(id);
  };

  const loaded = () => {
    return props.job.map((posting) => (
      <div className='card-posting' key={posting._id}>
        <div className="posting">
          <Link to={`/jobs/${posting._id}`}>
            <h1>{posting.jobTitle}</h1>
          </Link>
          <h3>{posting.company}</h3>
          <h3>{posting.notes}</h3>
          <button onClick={() => handleDelete(posting._id)}>Delete</button>
        </div>
      </div>
    ));
  };

  const loading = () => {
    return <h1>Loading...</h1>;
  };

  return (
    <section>
      {props.user && (
        <div className='create-form'>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={newForm.jobTitle}
              name="jobTitle"
              placeholder="Job Title"
              onChange={handleChange}
            />
            <input
              type="text"
              value={newForm.company}
              name="company"
              placeholder="Company"
              onChange={handleChange}
            />
            <input
              type="text"
              value={newForm.notes}
              name="notes"
              placeholder="Notes"
              onChange={handleChange}
            />
            <button type="submit">Create Job</button>
          </form>
        </div>
      )}
      {props.job ? loaded() : loading()}
    </section>
  );
};

export default Index;
