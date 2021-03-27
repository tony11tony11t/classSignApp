import React, { Component } from 'react'
import StepState from '../StepState'
import List from '../List'
import StepBtn from '../StepBtn'
import './index.css'

export default class SignInSystem extends Component {
    render() {
        return (
            <div className='signInContainer'>
                <div className='signInWrap'>
                    <h1>簽到系統</h1>
                    <List/>
                    <StepBtn/>
                </div>
                <StepState/>
            </div>
        )
    }
}
