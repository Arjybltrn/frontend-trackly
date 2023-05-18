import { useEffect, useState } from 'react'
import { Routes, Route } from "react-router-dom";
import Index from "../pages/Index";
import Show from "../pages/Show";

const Main = (props) => {
    
    const [ job, setJob ] = useState(null)
    const url = "http://localhost:4000/jobs/"

    const getJob = async () => {
        const response = await fetch(url)
        const data = await response.json()
        setJob(data)
    }
    
    
    const createJob = async (posting) => {
        await fetch(url, { 
            method: "POST",
            headers: { 
                "Content-Type": "Application/json"
            },
            body: JSON.stringify(posting),
            
        })
        getJob()
    }


    const updateJob = async (posting, id) => {
        await fetch (url + id, {
            method: "PUT", 
            headers: {
                "Content-Type": "Application/json",
            },
            body: JSON.stringify(posting),
        })
        getJob()
    }

    const deleteJob = async (id) => {
        await fetch(url + id, {
            method: "DELETE",
        })
        getJob()
    }

    useEffect(() => {getJob()}, [])
    
    
    return (
    <main>
    <Routes> 
        <Route exact path="/jobs" element={<Index job={job} createJob={createJob} />} />
        <Route path="/jobs/:id" element={<Show job={job} updateJob={updateJob} deleteJob={deleteJob}/> } /> 
    </Routes>
    </main>


      );
}

export default Main