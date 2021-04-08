import React, { Component } from 'react'
import './index.css'
import signInAPI from '../../../../signInAPI'

export default class UserTable extends Component {
    state = {
        username : null,
        password : null,
        role : null
    }

    componentDidMount = () => {
        signInAPI.getUserData(signInAPI.username).then(d => {
            const {username , password , role} = d;
            this.setState({username , password , role})
        })
    }

    render() {
        return (
            <table className="UserInfo">
                <tbody>
                    {
                        signInAPI.getUserHeadFields().map(field => (
                            <tr>
                                <td>{field[0].name}:</td>
                                <td>{this.state[field[0].className]}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        )
    }
}
