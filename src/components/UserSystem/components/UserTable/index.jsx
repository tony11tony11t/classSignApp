import React, { Component } from 'react'
import './index.css'

export default class UserTable extends Component {

    render() {
        return (
            <table className="UserTable" border="0" cellspacing="0" cellpadding="0">
                <tbody>
                    <tr>
                        <td>帳號:</td>
                        <td>tony11tonny11t</td>
                    </tr>
                    <tr>
                        <td>密碼:</td>
                        <td>tony11tonny11t</td>
                    </tr>
                    <tr>
                        <td>權限:</td>
                        <td>一般會員</td>
                    </tr>
                </tbody>
            </table>
        )
    }
}
