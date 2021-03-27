import React, { Component } from 'react'
import './index.css';

export default class StepState extends Component {
    render() {
        return (
            <div className='signInStepWrap'>
                <div className='signInStepBar Active Step1'><p>選擇教室</p></div>
                <div className='signInStepBar Step2'></div>
                <div className='signInStepBar Step3'></div>
                <div className='signInStepBar Step4'></div>
                <div className='signInStepBar Step5'></div>
            </div>
        )
    }
}
