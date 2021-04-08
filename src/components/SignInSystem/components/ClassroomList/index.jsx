import React, { Component } from 'react'
import signInAPI from '../../../../signInAPI'
import './index.css'

export default class ClassroomList extends Component {

    state = {
        classrooms : []
    }
    componentDidMount = () => {
        signInAPI.getClassroomsRowData().then(list => {
            this.setState({classrooms : list[0].data})
        })
    }

    getClassName = (data) => {
        const {markClassroom} = this.props;
        return `classroom options ${markClassroom && (markClassroom.id == data.id) ? "mark" : ""}`
    }

    render() {
        const {classrooms} = this.state;
        return (
            <ul className='classroomList'>
            {
                classrooms.map( i =>
                    <li className={this.getClassName(i)} 
                        onClick={this.props.getClassroom.bind(this,i)}>
                            {i.name}
                    </li>
                )
            }
            </ul>
        )
    }
}
