import React, { Component } from 'react'
import './index.css'

export default class Footer extends Component {
    navItem = ['group','log','signIn','class','user'];
    state = {
        group : false,
        log : false,
        signIn : true,
        class : false,
        user : false
    }
    handleClick = (system) => {
        this.navItem.forEach(n => {
            this.setState({[n] : system == n ? true : false})
        });
        const {changePage} = this.props;
        changePage(system);
    }
    render() {
        return (
            <div className='footer'>
            {
                this.navItem.map(n =>
                    <button type='button'>
                        <img src={`../img/footer_${n}${this.state[n] ? "_select" : ""}.png`} onClick={this.handleClick.bind(this,n)}/>
                    </button>
                )
            }
            </div>
        )
    }
}
