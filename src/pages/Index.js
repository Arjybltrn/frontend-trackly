import React, { useState, useEffect } from 'react'
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
  const [rejectedJobs, setRejectedJobs] = useLocalStorage('rejectedJobs', {})

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
    const { name, checked } = event.target;
    
    if (name.includes('job-application')) {
      setCheckedJobs((prevCheckedJobs) => {
        return { ...prevCheckedJobs, [jobId]: checked };
      });
    } else if (name.includes('job-rejected')) {
      setRejectedJobs((prevRejectedJobs) => {
        return { ...prevRejectedJobs, [jobId]: checked };
      });
    }
  };

  useEffect(() => {
    const savedCheckedJobs = JSON.parse(localStorage.getItem('checkedJobs')) || {};
    setCheckedJobs(savedCheckedJobs);
  }, [setCheckedJobs]);

  useEffect(() => {
    localStorage.setItem('checkedJobs', JSON.stringify(checkedJobs));
  }, [checkedJobs]);

  useEffect(() => {
    const savedRejectedJobs = JSON.parse(localStorage.getItem('rejectedJobs')) || {};
    setRejectedJobs(savedRejectedJobs);
  }, [setRejectedJobs]);

  useEffect(() => {
    localStorage.setItem('rejectedJobs', JSON.stringify(rejectedJobs));
  }, [rejectedJobs]);

  const loaded = () => {
    return props.job.map((posting) => (
      <div className='card-posting' key={posting._id}>
        <div className="posting">
          <h1 className='job-title'>{posting.jobTitle}</h1>
          <h3 className='company'>{posting.company}</h3>
          <h4 className='notes'>{posting.notes}</h4>

          <div className='set-icons'>
            <Link to={`/jobs/${posting._id}`} className='icon-link'>
              <img className='gear' src='https://cdn-icons-png.flaticon.com/128/10686/10686053.png' alt='Gear Icon' />
            </Link>

            <button onClick={() => handleDelete(posting._id)} className='delete-button'>
              <img className='delete-icon' src='https://cdn-icons-png.flaticon.com/128/10229/10229227.png' alt='Delete Icon' />
            </button>
          </div>
          <div className='checkbox'>
            <label className="apply-checkbox">
              <input
                type="checkbox"
                name={`job-application_${posting._id}`}
                checked={checkedJobs[posting._id]}
                onChange={(event) => handleCheckboxChange(event, posting._id)}
              />
              <span>Interviewed</span>
            </label>

            <label className="rejected-checkbox">
              <input
                type="checkbox"
                name={`job-rejected_${posting._id}`}
                checked={rejectedJobs[posting._id]}
                onChange={(event) => handleCheckboxChange(event, posting._id)}
              />
              <span>Rejected</span>
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
              <div className="form-field-index">
                <input
                  type="text"
                  value={newForm.jobTitle}
                  name="jobTitle"
                  placeholder="Job Title"
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
              <div className="form-field-index">
                <input
                  type="text"
                  value={newForm.company}
                  name="company"
                  placeholder="Company"
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
              <div className="form-field-index">
                <textarea
                  type="textarea"
                  value={newForm.notes}
                  name="notes"
                  placeholder="Notes"
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
              <button className='create-button' type="submit">CREATE</button>
            </form>
          </div>
          <div className='lottie-index'>
        <lottie-player src="https://assets3.lottiefiles.com/packages/lf20_bcxe9klx.json" background="transparent"  speed="1" loop autoplay></lottie-player>
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
