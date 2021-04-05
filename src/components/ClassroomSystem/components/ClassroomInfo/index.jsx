import React, { Component } from 'react'
import Edit from './components/Edit'
import './index.css'

export default class StudentInfo extends Component {
    
    handleClickBack = () => this.props.back();
    
    render() { 
        return (
            <div className="ClassroomInfo">
                <div className="header">
                    <img className="btnBack" src="../img/back.png" onClick={this.handleClickBack}/>
                </div>
                <Edit />
            </div>
        )
    }
}
