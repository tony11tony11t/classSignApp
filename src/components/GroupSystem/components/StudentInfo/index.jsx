import React, { Component } from 'react'
import Info from './components/Info'
import Log from './components/Log'
import Edit from './components/Edit'
import './index.css'

export default class StudentInfo extends Component {

    state = {
        page : "info" //"info" | "log" | "edit"
    }
    
    handleClickBack = () => {
        const {page} = this.state;
        if(page != "info"){
            this.setState({page:"info"});
        }else{
            this.props.back();
        }
    }
    getContent = () => {
        switch(this.state.page){
            case "info":
                return <Info showLog={this.showLog}/>
            case "log":
                return <Log />
            case "edit":
                return <Edit />
        }
    }
    showLog = () => this.setState({page:"log"});
    showEdit = () => this.setState({page:"edit"});

    getSubNavBtn = () => {
        switch(this.state.page){
            case "info":
                return <img className="btnEdit" src="../img/edit.png" onClick={this.showEdit}/>
            case "log":
                return <img className="btnChoose" src="../img/choose.png" />
            case "edit":
                return;
        }
    }

    render() { 
        return (
            <div className="StudentInfo">
                <div className="header">
                    <img className="btnBack" src="../img/back.png" onClick={this.handleClickBack}/>
                    {this.getSubNavBtn()}
                </div>
                {this.getContent()}
            </div>
        )
    }
}
