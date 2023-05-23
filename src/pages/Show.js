import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import '../styles/show.css'

const Show = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = props.job;
  const posting = job.find((p) => p._id === id)

  const [ editForm, setEditForm ] = useState(posting)
  const [ isEditing, setisEditing ] = useState(false) 
  
  useEffect(() => {
    if (posting) {
      setEditForm(posting)
    } 
  }, [posting])

  const handleChange = (event) => {
    setEditForm({ ...editForm, [event.target.name]: event.target.value })
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    props.updateJob(editForm, posting._id)
    navigate("/jobs")
  }

  const removeJob = () => {
    props.deleteJob(posting._id)
    navigate("/jobs")
  }

  const handleEdit = () => {
    setisEditing(prevState => !prevState)
  }

  const loaded = () => {
    return (
      <div className="show-card">
          <h1 className="show-jobtitle">{posting.jobTitle}</h1>
          <h2 className="show-company">{posting.company}</h2>
          <h2 className="show-notes">{posting.notes}</h2>
        <div className="controls show-controls">
  <button onClick={handleEdit} className="edit-show-button">
    {isEditing ? (
      <img className='cancel-gear-show' src='https://cdn-icons-png.flaticon.com/128/1276/1276453.png' alt='Gear Icon' />
    ) : (
      <img className='gear-show' src='https://cdn-icons-png.flaticon.com/128/10686/10686053.png' alt='Gear Icon' />
    )}
  </button>

  <button onClick={removeJob} className="delete-show-button">
    <img className='delete-show-icon' src='https://cdn-icons-png.flaticon.com/128/10229/10229227.png' alt='Delete Icon' />
  </button>
</div>
      </div>
    )
  }
  const loading = () => {
    return <h1>Loading ...</h1>
  };

  return (
    <div className="posting-show box2">
      { posting ? loaded() : loading() }

      { isEditing && 
      <div className="update-form">
          <form onSubmit={handleSubmit}>
          <div className="form-field">
                <input
                  className="form-input"
                  type="text"
                  value={editForm.jobTitle}
                  name="jobTitle"
                  placeholder="job title"
                  onChange={handleChange}
                />
            </div>
          <div className="form-field">
                <input
                  className="form-input"
                  type="text"
                  value={editForm.company}
                  name="company"
                  placeholder="company"
                  onChange={handleChange}
                />
            </div>
            <div className="form-field">
                <textarea
                  className="form-input"
                  type="textarea"
                  defaultValue={editForm.notes}
                  name="notes"
                  placeholder="notes"
                  onChange={handleChange}
                  />
            </div> 
                <button type="submit" value="Update Job" className="show-update-button" >
                  <img className="show-update" src="https://cdn-icons-png.flaticon.com/128/10371/10371913.png" alt="Update" />
                </button>
            </form>
      </div>
    }
    </div>
  )
}

export default Show