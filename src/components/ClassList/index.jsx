import React, { Component } from 'react'
import Item from '../Item'

export default class ClassList extends Component {
    handleSelect = (name) => this.props.fnGetClass(name);
    
    render() {
        const {normal,special} = this.props;
        return (
            <ul className='signInClassList'>
                {normal  ? <Item fnSelect={this.handleSelect}>一般課程</Item> : null}
                {special ? <Item fnSelect={this.handleSelect}>特殊課程</Item> : null}
            </ul>
        )
    }
}
