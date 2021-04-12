import React, { Component } from 'react'
import signInAPI from '../../../../signInAPI'
import './index.css'

export default class Search extends Component {

    getGroupList = e => {
        let searchText = e.target.value
        signInAPI.searchGroupRowData(searchText)
                 .then(data => this.props.search(data))
    }

    render() {
        return (
            <div className="GroupSearch">
                <img src="../../img/Search.png" alt="search"/>
                <input type      = "text" 
                       className = "GroupSearch" 
                       onChange  = {this.getGroupList}/>
            </div>
        )
    }
}
