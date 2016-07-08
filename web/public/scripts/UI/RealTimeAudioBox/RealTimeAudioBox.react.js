import './RealTimeAudioBox.less'
import React, { Component } from 'react'
import classNames from 'classnames'
import _b from 'bem-cn'

import S2CL from 'Helpers/Sound2CanvasLibrary'

const RED = 'rgb(255, 0, 0)';
const BLACK = 'rgb(0, 0, 0)';

export default class RealTimeAudioBox extends Component {
    constructor (props) {
        super(props);
        this.boxClassName = 'RealTimeAudioBox';
        this.block = _b(this.boxClassName);
    }

    render () {
        const { recording } = this.props;

        return (
            <section className={this.block()}>
                <canvas className={this.block('canvas')}
                        ref="visualStage" 
                        height="100"
                        width="1024">
                </canvas>
            </section>
        )
    }

    componentDidMount () {
        const { recording } = this.props;
        this._S2CL = new S2CL(this.refs.visualStage, 'sinewave', {
            strokeColor: recording ? RED : BLACK
        });
    }

    componentWillReceiveProps (nextProps) {
        const { recording } = nextProps;
        this._S2CL.setParameters({
            strokeColor: recording ? RED : BLACK
        });
    }
}