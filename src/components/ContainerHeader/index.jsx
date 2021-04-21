import React, { Component } from 'react'
import './index.css'

export default class ContainerHeader extends Component {

    /**
     * Return buttons
     * @returns {Component}
     */
    showButtons = () => {
        const {buttons} = this.props;
        
        if(buttons !== undefined){
            if(typeof buttons === Array){
                return buttons.map(btn =>
                    <img className  = {btn["className"]} 
                         src        = {btn["src"]} 
                         onClick    = {btn["onClick"]} 
                         alt        = {btn["className"]}/>)
            }else{
                return <img className = {buttons["className"]} 
                            src       = {buttons["src"]} 
                            onClick   = {buttons["onClick"]} 
                            alt       = {buttons["className"]}/>
            }
        }
    }

    render() {
        const {backPage} = this.props;
        return (
            <div className="ContainerHeader">
                <img className  = "btnBack" 
                     src        = "../img/back.png" 
                     onClick    = {backPage} 
                     alt        = "back"/>
                {this.showButtons()}
            </div>
        )
    }
}
