import React, { Component } from 'react'
import Item from '../Item'

export default class ClassList extends Component {
    handleSelect = name => this.props.fnGetClass(name);

    isSelected = classType => classType == this.props.selectClassType;
    
    render() {
        const {normal,special} = this.props;
        const normalTag = '一般課程';
        const specialTag = '特殊課程';
        return (
            <ul className='signInClassList'>
                {normal  ? <Item type='class' selected={this.isSelected(normalTag)} fnSelect={this.handleSelect}>{normalTag}</Item> : null}
                {special ? <Item type='class' selected={this.isSelected(specialTag)} fnSelect={this.handleSelect}>{specialTag}</Item> : null}
            </ul>
        )
    }
}
