import React, { Component } from 'react'
import './index.css'

export default class Item extends Component {

    handleClick = () =>{
        const {fnSelect,name} = this.props;
        fnSelect(name);
    }

    render() {
        const {name} = this.props;
        return (
            <li className='signInItem' onClick={this.handleClick}>{name}</li>
        )
    }
}
