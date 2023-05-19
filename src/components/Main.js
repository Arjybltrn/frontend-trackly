import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from "react-router-dom"

import Index from "../pages/Index";
import Show from "../pages/Show";
import LandingPage from './LandingPage';
import About from '../pages/About';

const Main = (props) => {
    
    const [ job, setJob ] = useState(null)
    const url = "http://localhost:4000/jobs/"
    const navigate = useNavigate()

    const getJob = async () => {
        const response = await fetch(url)
        const data = await response.json()
        console.log('data', data)
        setJob(data)
    }
    
    
    const createJob = async (posting) => {
        if (!props.user) return
        console.log('posting', posting)
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
        if (!props.user) return
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
        if (!props.user) return
        await fetch(url + id, {
            method: "DELETE",
        })
        getJob()
    }

    useEffect(() => {getJob()}, [])
    
    
    return (
    <main>
    <Routes> 
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About /> } />
        <Route exact path="/jobs" element={<Index user={props.user} job={job} createJob={createJob} updateJob={updateJob} deleteJob={deleteJob} /> } />
        <Route path="/jobs/:id"  element={ props.user ? <Show job={job} updateJob={updateJob} deleteJob={deleteJob}/> : navigate("/")  } /> 
    </Routes>
    </main>


      );
}

export default Main