import React from 'react';
import '../Overview.css'

const Overview = (props) =>{
    const {personalInfo} = props;

    return (
        <div className='personal-info'>
            <h4>First Name:</h4>
            <p id='firstname'>{personalInfo.first}</p>
            <h4>Last Name:</h4>
            <p id='lastname'>{personalInfo.last}</p>
            <h4>Title:</h4>
            <p id='title'>{personalInfo.title}</p>
            <h4>Address:</h4>
            <p id='address'>{personalInfo.address}</p>
            <h4>Phone:</h4>
            <p id='phone'>{personalInfo.phone}</p>
            <h4>Email:</h4>
            <p id='email'>{personalInfo.email}</p>
            <h4>description</h4>
            <p id='description'>{personalInfo.description}</p>
        </div>
    )
};

const EducationDisplay = (props)=>{
    const { schools } = props
    const {remove } = props;

    return(
        <div className='education'>
            {schools.map((school)=>{
                return(
                    <div id='school-info-holder'>
                        <button id ={school.id}onClick={remove}>X</button>
                        <h4>{school.name}, {school.city}</h4>
                        <p>Degree: {school.degree}</p>
                        <p>Subject: {school.subject}</p>
                        <p><span style={{fontWeight: 'bold'}}>{school.start}-{school.end}</span></p>

                    </div>
                
                ) 
            })}
        </div>
        
    )
};

const ExperianceDisplay = (props)=>{
    const { workHistory } = props
    const {remove } = props;
    return(
        <div className='experiance'>
            {workHistory.map((history)=>{
                return(
                    <div id='history-info-holder'>
                       <button id ={history.id}onClick={remove}>X</button>
                       <h4>{history.position}</h4>
                       <p>Company: {history.company} {history.city}</p>
                       <p>Location: {history.city}</p>
                       <p><span style={{fontWeight: 'bold'}}>{history.start}-{history.end}</span></p>

                    </div>
                
                ) 
            })}
        </div>
        
    )
};
export  {Overview, EducationDisplay, ExperianceDisplay} ;