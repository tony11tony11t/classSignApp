import React, { Component } from 'react'
import "./index.css"

export default class ClassList extends Component {

    getClassName = tag=> {
        const {markClassType} = this.props;
        return `class options ${tag === markClassType ? "mark" : ""}`
    }
    
    render() {
        const {normal,special} = this.props;
        const normalTag = '一般課程';
        const specialTag = '特殊課程';
        return (
            <ul className='ClassList'>
                {normal ? 
                    <li className={this.getClassName(normalTag)} 
                        onClick={this.props.getClassType.bind(this,normalTag)}>
                            {normalTag}
                    </li> : null}
                {special ? 
                    <li className={this.getClassName(specialTag)} 
                        onClick={this.props.getClassType.bind(this,specialTag)}>
                            {specialTag}
                    </li> : null}
            </ul>
        )
    }
}
