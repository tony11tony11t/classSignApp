import React, { Component } from 'react'
import './index.css'

export default class Footer extends Component {

    navItem = ['group','log','signIn','class','user'];

    /**
     * Change component which can be shown
     * @param {String} system 
     */
    handleClick = system => this.props.changePage(system);

    render() {
        const {system} = this.props;
        return (
            <div className='footer'>
            {
                this.navItem.map(n =>
                    <button type = 'button' 
                            key  = {`footerBtn${n}`}>
                        <img src     = {`../img/footer_${n}${system === n ? "_select" : ""}.png`} 
                             onClick = {this.handleClick.bind(this,n)}
                             alt     = {n}/>
                    </button>
                )
            }
            </div>
        )
    }
}
