import React from 'react'
import '../styles/about.css'

const About = () => {
  return (
    <section className="about">
      <h1>About Taskly</h1>
        <p>
        Taskly is a job application tracker designed to help you organize and manage your job search process. 
        <br/> Whether you're actively seeking new opportunities or simply want to keep track of your applications, 
        <br/>Taskly provides a convenient way to stay organized.
        </p>
        <p>
        With Taskly, you can easily add and manage job postings, 
        <br/> track your application progress, and stay on top of your job search activities.
        <br/>It offers a centralized platform where you can store essential details about each job, 
        <br/>such as job title, company, application status, and notes.
        </p>
        <p className='slogan'>
        Stay focused, stay organized, and land your dream job with Taskly!
        </p>
    </section>
  );
};

export default About
