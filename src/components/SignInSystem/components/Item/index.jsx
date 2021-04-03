import React, { Component } from 'react'
import './index.css'

export default class Item extends Component {

    handleClick = () =>{
        const {fnSelect , id , children} = this.props;
        fnSelect(id != undefined ? id : children);
    }

    getClassName = () => {
        const {selected , type} = this.props;
        return `signInItem ${selected ? 'selected' : ''} ${type || ""}`
    }

    render() {
        const {name , children} = this.props;
        return (
            <li className={this.getClassName()} 
                onClick={this.handleClick}>

                {name ? name : children}

            </li>
        )
    }
}
