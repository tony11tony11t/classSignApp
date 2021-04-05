import React, { Component } from 'react'
import './index.css'

export default class ClassroomTable extends Component {
    getClassroom = (id,classroom,normal,special,money) => {
        return (
            <tr className="ClassroomList" onClick={this.handleClassroomClick.bind(this,id)}>
                <td>{classroom}</td>
                <td>{normal}</td>
                <td>{special}</td>
                <td>{money}</td>
            </tr>
        )
    }

    handleClassroomClick = (id) => this.props.showClassroom(id);

    render() {
        return (
            <table className="ClassroomTable" border="0" cellspacing="0" cellpadding="0">
                <thead>
                    <tr>
                        <th rowSpan="2">名稱</th>
                        <th colSpan="2" className="type">課程類型</th>
                        <th rowSpan="2" className="money">付費教室</th>
                    </tr>
                    <tr>
                        <th>一般</th>
                        <th>付費</th>
                    </tr>
                </thead>
                <tbody>
                    {this.getClassroom(0,"一號教室","O","","O")}
                    {this.getClassroom(1,"二號教室","","O","O")}
                    {this.getClassroom(2,"三號35弄教室","O","O","O")}
                </tbody>
            </table>
        )
    }
}
