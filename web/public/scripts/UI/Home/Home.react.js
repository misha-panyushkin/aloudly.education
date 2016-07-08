import './Home.less'
import React, { Component } from 'react'
import classNames from 'classnames'
import _b from 'bem-cn'

import RTAB from 'UI/RealTimeAudioBox/RealTimeAudioBox.react'
import Info from './Info/Info.react'

export default class Home extends Component {
    constructor (props) {
        super(props);
        this.boxClassName = 'Home';
        this.block = _b(this.boxClassName);
    }

    render () {
        return (
            <section
                className={ this.block() }>
                <RTAB/>
                <Info/>
            </section>
        )
    }
}