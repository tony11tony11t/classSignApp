import React, { Component } from 'react'
import './index.css'
import signInAPI from '../../../../signInAPI'

export default class StudentList extends Component {
    state = {
        students : [],
        unfoldGroup : null
    }
    componentDidMount = () => {
        signInAPI.getGroupRowData().then(students => this.setState({students}))
    }
    showStudents = i => this.setState({unfoldGroup : this.state.unfoldGroup === i ? null : i})

    getClassName = (data) => {
        const {markStudents} = this.props;
        return `student options ${markStudents && [...markStudents].find(mark => mark.id === data.id) ? "mark" : ""}`
    }

    render() {
        const {students,unfoldGroup} = this.state;
        return (
            <ul className='GroupsList'>
            {
                students.map((group,index) => {
                    return (
                        <li className="group options">
                            <span onClick={this.showStudents.bind(this,index)}>{group.content}</span>
                            {
                                unfoldGroup === index ? (
                                    <ul className='StudentsList'>
                                        {
                                            group.data.map(student => 
                                                <li className={this.getClassName(student)}
                                                    onClick = {this.props.getStudents.bind(this,student)}>
                                                        {student.name}
                                                </li>
                                            )
                                        }
                                    </ul>
                                ) : null
                            }
                        </li>
                    )
                })
            }
            </ul>
        )
    }
}
