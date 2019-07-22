import React from 'react'

import './style.scss'

import Slide from '../../shared/Slide'

import title from './assets/Title-Part1.svg'
import title2 from './assets/Title-Part2.svg'

import row1 from './assets/row1.svg'
import row2 from './assets/row2.svg'
import row3 from './assets/row3.svg'

export default class extends Slide {

    state = {
        appear: false,
        showTable: false,
        rowsToShow: 1
    }

    steps = [
        () => this.setState({ appear: true }),
        () => {
            const { changeBackgroundStyle } = this.props
            if (changeBackgroundStyle) changeBackgroundStyle({ filter: `blur(35px)`, transform: `translate(-50%, -70%)` })
            this.setState({ showTable: true })
        },
        () => this.setState({ rowsToShow: 2 }),
        () => this.setState({ rowsToShow: 3 }),
    ]
    backwardSteps = [
        () => this.setState({ appear: false }),
        () => {
            const { changeBackgroundStyle } = this.props
            if (changeBackgroundStyle) changeBackgroundStyle({})
            this.setState({ showTable: false })
        },
        () => this.setState({ rowsToShow: 1 }),
        () => this.setState({ rowsToShow: 2 }),
    ]

    get content () {
        const { appear, showTable, rowsToShow } = this.state
        return (
            <div className={'Intro' + (appear ? ' appear' : '') + (showTable ? ' showTable' : '')}>
                <div className="point">
                    <div className="line left" />
                    <div className="line right" />
                    <img className="Intro__title Intro__title__part1" src={title} alt="Design for a" />
                    <img className="Intro__title Intro__title__part2" src={title2} alt="Dynamic Medium" />
                </div>
                <div className="point">
                    <div className="Intro__table">
                        <img src={row1} alt="Computers"/>
                        <img className={rowsToShow > 1 ? '' : 'hide'} src={row2} alt="Internet"/>
                        <img className={rowsToShow > 2 ? '' : 'hide'} src={row3} alt="Design Tools"/>
                    </div>
                </div>
            </div>
        )
    }

}