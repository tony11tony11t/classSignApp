import React, { Component } from 'react'
import './index.css'

export default class Header extends Component {

    showButtons = () => {
        const {buttons} = this.props;
        if(buttons != undefined){
            if(Array.isArray(buttons)){
                return buttons.map(btn =>
                    <img className={btn["className"]} src={btn["src"]} onClick={btn["onClick"]}/>)
            }else{
                return <img className={buttons["className"]} src={buttons["src"]} onClick={buttons["onClick"]}/>
            }
        }
    }

    render() {
        const {title,name} = this.props
        return (
            <div className={`${name}Header SystemHeader`}>
                <h3>{title}</h3>
                <div class="SubNavbar">
                    {this.showButtons()}
                </div>
            </div>
        )
    }
}
