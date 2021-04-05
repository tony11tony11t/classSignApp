import React, { Component } from 'react'
import './index.css'

export default class Footer extends Component {
    navItem = ['group','log','signIn','class','user'];

    handleClick = (system) => this.props.changePage(system);

    render() {
        const {system} = this.props;
        return (
            <div className='footer'>
            {
                this.navItem.map(n =>
                    <button type='button'>
                        <img src={`../img/footer_${n}${system == n ? "_select" : ""}.png`} onClick={this.handleClick.bind(this,n)}/>
                    </button>
                )
            }
            </div>
        )
    }
}
