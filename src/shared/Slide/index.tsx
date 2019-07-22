import React from 'react'

import './style.scss'

interface IProps {
    selected?: boolean
    changeBackgroundStyle?: (object: any) => void
}
interface IState {}

class Slide extends React.Component<IProps, IState> {

    currentStep: number = 0
    steps: (() => void)[] = []
    backwardSteps: (() => void)[] = []

    get content () {
        return (<></>)
    }

    render () {
        const { selected } = this.props
        return (
            <div className={`slide` + (selected ? ' current' : '')}>
                { this.content }
            </div>
        )
    }

}

export default Slide