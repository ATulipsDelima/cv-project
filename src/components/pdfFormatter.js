import React, {Component} from "react";
import '../pdfFormatter.css'


class PDFFormater extends Component{
    constructor(props){
        super(props);
    }

    printName = () =>{
        console.log(this.props.personalInfo.first)
  }

    render(){
        return(
            <div className="pdf-view">
                <header>
                    <h1 id='name'>{this.props.personalInfo.first} {this.props.personalInfo.last}</h1>
                    <p>{this.props.personalInfo.title}</p>
                </header>
                <div className="main">
                    <section className="description">
                        <h3 id='title2'>description</h3>
                        <div>
                            <p>{this.props.personalInfo.description}</p>
                        </div>
                    </section>
                    <section className="experiance">
                    <h3 id='title2'>Experiance</h3>
                    <div id='experiance-holder'>
                        {this.props.workHistory.map((history)=>{
                            return(
                                <div id='history-info-holder2'>
                                    <div id='years'><span style={{fontWeight: 'bold'}}>{history.start}-{history.end}</span></div>
                                    <div id='job-info'>
                                        <h4>{history.position}</h4>
                                        <p>{history.company}, {history.city}</p>
                                    </div>
                                </div>
                            
                            ) 
                        })}
                    </div>

                    </section>
                    <section className="education">
                    <h3 id='title2'>Education</h3>
                    <div className="education-holder">
                    {this.props.schools.map((school)=>{
                        return(
                            <div id='school-info-holder2'>
                                <div id='years'><span style={{fontWeight: 'bold'}}>{school.start}-{school.end}</span></div>
                                <div id='school-info'>
                                    <h4>{school.name}, {school.city}</h4>
                                    <p>Degree: {school.degree}</p>
                                    <p>Subject: {school.subject}</p>
                                    </div>
                                
                                

                            </div>
                        
                        ) 
                    })}
                    </div>
                    </section>
                </div>
                <div className="side-bar">
                    {this.props.personalInfo.photo === null? <img src={require('../images/avatar.png') } id='pdf-img'/>: <img src={this.props.personalInfo.photo } id='pdf-img'/>}
                    <section className="personal-detail">
                        <h3 id='title2'>Personal Details</h3>
                        <div id='personal-detail-info'>
                            <div id='address-holder'>
                                <h4>Address</h4>
                                <p>{}</p>
                            </div>
                            <div id='phone-holder'>
                                <h4>Phone</h4>
                                <p>{this.props.personalInfo.phone}</p>
                            </div>
                            <div id='address-holder'>
                                <h4>Email</h4>
                                <p>{this.props.personalInfo.email}</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            
        )
    }
}

export {PDFFormater} 