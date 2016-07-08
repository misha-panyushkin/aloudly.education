import './Info.less'
import React, { Component } from 'react'
import classNames from 'classnames'
import _b from 'bem-cn'

export default class Info extends Component {
    constructor (props) {
        super(props);
        this.boxClassName = 'Info';
        this.block = _b(this.boxClassName);
    }

    render () {
        return (
            <article
                className={ this.block() }>
                <hgroup className={ this.block('header') }>
                    <img className="logo" src="/materials/images/redenergy@2x.png"/>
                    <h1 className="cHeader title">aloudly</h1>
                    <h1 className="cHeader dot">.</h1>
                    <h1 className="cHeader">educ<span className="letterA">a</span>tion</h1>
                </hgroup>
                <p className={ this.block('description').mix("cParagraph") }>
                    We bring advanced technologies to the academic world. On the way to Create an unique technique for distinguishing and eliminating human speech defects and mispronunciations. It's a startup and we are moving forward every day.
                </p>
            </article>
        )
    }
}