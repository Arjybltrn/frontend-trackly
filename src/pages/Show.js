import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
    setEditForm({ ...editForm, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.updateJob(editForm, posting._id);
    navigate("/jobs");
  }

  const removeJob = () => {
    props.deleteJob(posting._id);
    navigate("/jobs");
  }

  const handleEdit = () => {
    setisEditing(prevState => !prevState)
  }

  const loaded = () => {
    return (
      <>
        <h1>{posting.jobTitle}</h1>
        <h2>{posting.company}</h2>
        <h2>{posting.notes}</h2>
        <button onClick={handleEdit}> { isEditing ? 'Cancel Edit' : 'Edit'}</button>
        <button onClick={removeJob}>Delete</button>
      </>
    );
  };
  const loading = () => {
    return <h1>Loading ...</h1>;
  };

  return (
    <div className="posting">
      { posting ? loaded() : loading() }

      { isEditing && 
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={editForm.jobTitle}
          name="jobTitle"
          placeholder="job title"
          onChange={handleChange}
        />
        <input
          type="text"
          value={editForm.company}
          name="company"
          placeholder="company"
          onChange={handleChange}
        />
        <input
          type="text"
          value={editForm.notes}
          name="notes"
          placeholder="notes"
          onChange={handleChange}
        />
        <input type="submit" value="Update Job" />
      </form>
    }

    </div>
  );
};

export default Show;