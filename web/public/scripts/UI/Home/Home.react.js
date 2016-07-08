import './Home.less'
import React, { Component } from 'react'
import classNames from 'classnames'
import _b from 'bem-cn'

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
                <hgroup className={ this.block('header') }>
                    <img className="logo" src="/materials/images/redenergy@2x.png"/>
                    <h1 className="cHeader title">aloudly</h1>
                    <h1 className="cHeader dot">.</h1>
                    <h1 className="cHeader">educ<span className="letterA">a</span>tion</h1>
                </hgroup>
                <article className={ this.block('description') }>
                    <p className="cParagraph paragraph">
                        We bring advanced technologies to the academic world. On the way to Create an unique technique for distinguishing and eliminating human speech defects and mispronunciations. It's a startup and we are moving forward every day.
                    </p>
                </article>
            </section>
        )
    }
}