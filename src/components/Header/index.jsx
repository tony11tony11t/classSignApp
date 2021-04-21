import React, { Component } from 'react'
import { v4 as uuidv4 }     from 'uuid';
import './index.css'

export default class Header extends Component {

    /**
     * Return buttons
     * @returns {Component}
     */
    showButtons = () => {
        const {buttons} = this.props;

        if(buttons){
            if(Array.isArray(buttons)){
                return buttons.map(btn =>
                    <img key        = {uuidv4()} 
                         className  = {btn["className"]} 
                         src        = {btn["src"]} 
                         onClick    = {btn["onClick"]}
                         alt        = {btn["className"]}/>)
            }else{
                return <img key         = {uuidv4()}  
                            className   = {buttons["className"]} 
                            src         = {buttons["src"]} 
                            onClick     = {buttons["onClick"]}
                            alt         = {buttons["className"]}/>
            }
        }
    }

    render() {
        const {title , name} = this.props
        return (
            <div className = {`${name}Header SystemHeader`}>
                <h3>{title}</h3>
                <div className = "SubNavbar">
                    {this.showButtons()}
                </div>
            </div>
        )
    }
}
