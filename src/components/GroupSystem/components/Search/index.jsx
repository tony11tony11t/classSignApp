import React, { Component } from 'react'
import './index.css'

export default class Search extends Component {
    render() {
        return (
            <div className="GroupSearch">
                <img src="../../img/Search.png"/>
                <input type="text" className="GroupSearch"/>
            </div>
        )
    }
}
