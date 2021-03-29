import React, { Component } from 'react'
import './index.css'

export default class Item extends Component {

    handleClick = () =>{
        const {fnSelect,id,children} = this.props;
        fnSelect(id != undefined ? id : children);
    }

    render() {
        const {name , children} = this.props;
        return (
            <li className='signInItem' onClick={this.handleClick}>{name ? name : children}</li>
        )
    }
}
