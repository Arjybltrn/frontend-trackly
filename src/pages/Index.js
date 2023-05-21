import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useLocalStorage from '../components/useLocalStorage'
import '../styles/index.css'

const Index = (props) => {
  const [newForm, setNewForm] = useState({
    jobTitle: '',
    company: '',
    notes: '',
  });

  const [checkedJobs, setCheckedJobs] = useLocalStorage('checkedJobs', {})

  const handleChange = (e) => {
    setNewForm({ ...newForm, [e.target.name]: e.target.value })
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

  const handleCheckboxChange = (event, jobId) => {
    const { checked } = event.target;
    setCheckedJobs((prevCheckedJobs) => {
      return { ...prevCheckedJobs, [jobId]: checked };
    });
  };

  const loaded = () => {
    return props.job.map((posting) => (
      <div className='card-posting' key={posting._id}>
        <div className="posting">
          <h1 className='job-title'>{posting.jobTitle}</h1>
          <h3>{posting.company}</h3>
          <h4>{posting.notes}</h4>

          <div className='set-icons'>
            <Link to={`/jobs/${posting._id}`} className='icon-link'>
              <img className='gear' src='https://cdn-icons-png.flaticon.com/128/10686/10686053.png' alt='Gear Icon' />
            </Link>

            <button onClick={() => handleDelete(posting._id)} className='delete-button'>
              <img className='delete-icon' src='https://cdn-icons-png.flaticon.com/128/10229/10229227.png' alt='Delete Icon' />
            </button>
          </div>
          <div>
            <label className="apply-checkbox">
              <input
                type="checkbox"
                name={`job-application_${posting._id}`}
                checked={checkedJobs[posting._id]}
                onChange={(event) => handleCheckboxChange(event, posting._id)}
              />
              <span>Applied</span>
            </label>
          </div>
        </div>
      </div>
    ));
  };

  const loading = () => {
    return <h1>Loading...</h1>
  };

  return (
    <div className='index-content'>
      {props.user && (
        <div className='create-form box3'>
          <div className="oddboxinner">
            <form onSubmit={handleSubmit}>
              <div className="form-field">
                <label className="form-label">Job Title:</label>
                <input
                  type="text"
                  value={newForm.jobTitle}
                  name="jobTitle"
                  placeholder="Job Title"
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
              <div className="form-field">
                <label className="form-label">Company:</label>
                <input
                  type="text"
                  value={newForm.company}
                  name="company"
                  placeholder="Company"
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
              <div className="form-field">
                <label className="form-label">Notes:</label>
                <textarea
                  type="textarea"
                  value={newForm.notes}
                  name="notes"
                  placeholder="Notes"
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
              <button type="submit">Create Job</button>
            </form>
          </div>
        </div>
      )}
      <div className='cards'>
        {props.job ? loaded() : loading()}
      </div>
    </div>
  )
}

export default Index
