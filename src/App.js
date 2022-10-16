import React, { useState, useRef, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import uniqid from 'uniqid';
import './App.css';
import { Overview, EducationDisplay, ExperianceDisplay } from './components/Overview';
import { PDFFormater } from './components/pdfFormatter'; 

const personalInfo ={
  first: '',
  last: '',
  title: '',
  photo: null,
  address: '',
  phone: '',
  email:'',
  description:'',
}

const school = {
  name: '',
  city: '',
  degree: '',
  subject: '',
  start : '',
  end : '',
  id : uniqid(),

}

const experiance={
  position: '',
  company : '',
  city: '',
  start: '',
  end: '',
  id : uniqid(),
}

const App = () =>{
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const [personalInformation, setPersonalInfo] = useState(personalInfo);
  const [schoolHistory, setSchoolHistory] = useState([school]);
  const [experianceHistory, setExperianceHistory] = useState([experiance]);
  
  return (
    <div className='display'>
      <h1 id='project-title'>CV Application</h1>
      <div id='save-container'>
      <button onClick={handlePrint} id='save-btn'>Save cv</button>
      </div>
      
      <PersonalInfo setPersonalInfo={setPersonalInfo}/>
      <Education setSchoolHistory={setSchoolHistory}/>
      <Experiance setExperianceHistory={setExperianceHistory}/>
      <h2 id='preview-title'>Preview</h2>
      <PDFFormater ref={componentRef} personalInfo={personalInformation} workHistory={experianceHistory} schools={schoolHistory}/>
    </div>
    
  );
}

const PersonalInfo = (props)=>{
  const [values, setValues] = useState(personalInfo);
  const [toggle, setToggle] = useState(false);
  const{setPersonalInfo} = props;

  const handleChange = (e)=>{
    const {name, value} = e.target;

    setValues({
      ...values,
      [name]: value,
    })
    // send information to parent
    setPersonalInfo({
      ...values,
      [name]: value,
    });
  }

  const toggleForm = ()=>{
    if(toggle === true){
      setToggle(false);
    }else{
      setToggle(true);
    }
  }

  const clearForm = (e)=>{
    e.preventDefault();
    setValues(personalInfo)
  }

  const onImageChange = (e)=>{
    let src = URL.createObjectURL(e.target.files[0])

    setValues({
      ...values,
      photo: src,
    })
    setPersonalInfo({
      ...values,
      photo: src,
    });
  }
    
  
  return(
    <div>
      <h3 id='personal-info-title'>Personal Information</h3>
      { toggle? <form id='personal-form' data-testid='personal-form'>
      <input type="text" id="first-name" placeholder='First Name' name="first" value={values.first} onChange={handleChange}/>
        <input type="text" id="last-name" placeholder='Last Name' name="last" value={values.last} onChange={handleChange}/>
        <input type="text" id="title" placeholder='Title' name="title" value={values.title} onChange={handleChange}/>
        <input type='file' accept='images/*' onChange={onImageChange}/>
        <input type="text" id="address" placeholder='Address' name="address" value={values.address} onChange={handleChange}/>
        <input type="tel" id="phone" placeholder='Phone' name="phone" value={values.phone} onChange={handleChange}/>
        <input type="email" id="email" placeholder='Email' name="email" value={values.email} onChange={handleChange}/>
        <input type="text" id="description" placeholder='descrption' value={values.description} name="description" onChange={handleChange}/>
        <button id="update" onClick={toggleForm}>Update</button>
        <button id="clear" onClick={clearForm}>Clear</button>
      </form>: <button id='toggle-btn'onClick={toggleForm}>+ Update Personal Information</button> }
      <Overview personalInfo = {values}/>
    </div>
  )
}

const Education = (props)=>{
  const [values, setValues] = useState(school);
  const [schools, setSchools] = useState([]);
  const [toggle, setToggle] = useState(false);
  const {setSchoolHistory} = props;

  const handleChange = (e)=>{
    const {name, value} = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    setSchools(schools => [...schools, values])
    setSchoolHistory([...schools, values])
    // reset values
    setValues({
      ...school,
        id : uniqid()})
    // reset form input
    document.getElementById('school-form').reset();
    // show btn
    toggleForm();
  }

  const toggleForm = ()=>{
    if(toggle === true){
      setToggle(false);
    }else{
      setToggle(true);
    }
  }

  const remove = (e ) =>{
    const key = e.target.id
    let arr = []
    for(let i = 0; i< schools.length; i+=1){
      if(schools[i].id === key){
        continue
      }
      arr.push(schools[i])
    }
    setSchools(arr)
  }

  return(
    <div>
      <h3 id='education-title'>Education</h3>
      {toggle ? <form id='school-form' data-testid='school-form' onSubmit={handleSubmit}>
      <input type='text' name='name' placeholder='University Name' id='school-name' value={values.name} onChange={handleChange}/>
          <input type='text' name='city' placeholder='City' id='city' value={values.city} onChange={handleChange}/>
          <input type='text' name='degree' placeholder='Degree' id='degree' value={values.degree} onChange={handleChange}/>
          <input type='text' name='subject' placeholder='Subject' id='subject' value={values.subject} onChange={handleChange}/>
          <input type='text' name='start' placeholder='From' id='start' value={values.start} onChange={handleChange}/>
          <input type='text' name='end' placeholder='To' id='end' value={values.end} onChange={handleChange}/>
          <button type='submit' id='add'>Add</button>
          <button id='cancel'onClick={toggleForm}>Cancel</button>
      </form> : <button id='toggle-btn' onClick={toggleForm}> + Add to Education</button> }
      <EducationDisplay remove = {remove} schools={schools}/>
    </div>
  )
};

const Experiance = (props) =>{
  const [values, setValues] = useState(experiance);
  const [workHistory, setWorkHistory] = useState([]);
  const [toggle, setToggle] = useState(false);
  const {setExperianceHistory} = props;
  const handleChange = (e)=>{
    const {name, value} = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    setWorkHistory(workHistory => [...workHistory, values])
    setExperianceHistory([...workHistory, values])
    // reset values
    setValues({
      ...experiance,
      id : uniqid()})
    // reset form input
    document.getElementById('experiance-form').reset();

    toggleForm();
  }

  const toggleForm = ()=>{
    if(toggle === true){
      setToggle(false);
    }else{
      setToggle(true);
    }
  }

  const remove = (e ) =>{
    const key = e.target.id
    let arr = []
    for(let i = 0; i< workHistory.length; i+=1){
      if(workHistory[i].id === key){
        continue
      }
      arr.push(workHistory[i])
    }
    setWorkHistory(arr)
  }

  

  return(
    <div>
      <h3 id='experiance-title'>Experiance</h3>
      {toggle ? <form id='experiance-form'  data-testid='experiance-form' onSubmit={handleSubmit}>
          <input type='text' name='position' id='position' placeholder='Position' value={values.position} onChange={handleChange} />
          <input type='text' name='company' id='company' placeholder='Company' value={values.company} onChange={handleChange} />
          <input type='text' name='city' id='city' placeholder='City' value={values.city} onChange={handleChange} />
          <input type='text' name='start' id='start' placeholder='From' value={values.start} onChange={handleChange} />
          <input type='text' name='end' id='end' placeholder='To' value={values.end} onChange={handleChange} />
          <button type='submit' id='add'>Add</button>
          <button id='cancel' onClick={toggleForm}>Cancel</button>
        </form>: <button id='toggle-btn' onClick={toggleForm}>+ Add to Work History</button> }
        <ExperianceDisplay remove ={remove} workHistory={workHistory}/>
    </div>
  )
}




export default App;
