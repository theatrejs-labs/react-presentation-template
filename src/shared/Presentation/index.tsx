import React, { RefObject } from 'react'
import socket from '../socket'

import './style.scss'

interface IProps {
    background: string
}
interface IState {
    backgroundStyle: any,
    connectedToRemote: boolean
    currentSlide: number
}

interface IRemoteSignal {
    type: 'command' | 'controller-ready',
    command: string | any
}

class Presentation extends React.PureComponent<IProps, IState> {

    state = {
        backgroundStyle: {},
        connectedToRemote: false,
        currentSlide: 0
    }

    slidesRefs: RefObject<any>[] = []

    constructor (props: IProps) {
        super(props)
        let connectionTimeout: any = null
        socket.on('remote-control', (data: IRemoteSignal) => {
            if (data.type === 'command') this.onControlCommand(data.command)
            if (data.type === 'controller-ready') {
                if (connectionTimeout) clearTimeout(connectionTimeout)
                socket.emit('remote-control', { type: 'presentation-ready' })
                this.setState({ connectedToRemote: true })
                connectionTimeout = setTimeout(() => { this.setState({ connectedToRemote: false }) }, 4000)
            }
        });
    }

    componentDidMount () {
        window.addEventListener('keyup', (e) => {
            if (e.key === ' ' || e.key === 'ArrowRight') this.next()
            else if (e.key === 'ArrowLeft') this.prev()
        })
    }

    onControlCommand (command: string) {
        if (command === 'next') this.next()
        if (command === 'prev') this.prev()
    }

    private get slides () {
        const { children } = this.props
        const { currentSlide } = this.state
        return React.Children.map(children, (slide, index) => {
            this.slidesRefs[index] = React.createRef()
            if (slide) return React.cloneElement(slide as any, {
                ref: this.slidesRefs[index],
                selected: index === currentSlide,
                changeBackgroundStyle: this.changeBackgroundStyle.bind(this)
            })
        })
    }

    public changeBackgroundStyle (style: any) {
        this.setState({ backgroundStyle: style })
    }

    public next () {
        const { currentSlide } = this.state
        const slidesCount: number = this.slidesRefs.length
        const slide = this.slidesRefs[currentSlide].current
        if (slide) {
            if (slide.steps.length > slide.currentStep) {
                slide.currentStep++
                const step = slide.steps[slide.currentStep - 1]
                if (typeof step === 'function') step()
            } else {
                if (slidesCount > currentSlide + 1) {
                    this.setState({ currentSlide: currentSlide + 1 })
                }
            }
        }
    }

    public prev () {
        const { currentSlide } = this.state
        const slide = this.slidesRefs[currentSlide].current
        if (slide) {
            if (0 < slide.currentStep) {
                slide.currentStep--
                const backwardStep = slide.backwardSteps[slide.currentStep]
                const step = slide.steps[slide.currentStep - 1]
                if (typeof backwardStep === 'function') backwardStep()
                else if (typeof step === 'function') step()
            } else {
                if (0 < currentSlide) {
                    this.setState({ currentSlide: currentSlide - 1 })
                }
            }
        }    
    }

    public goto (i: number) {
        this.setState({ currentSlide: i })
    }

    render () {
        const { background } = this.props
        const { backgroundStyle } = this.state
        return (
            <div className="presentation">
                {this.slides}
                {background && <img className="presentation__background" style={backgroundStyle} src={background} alt="Background" />}
            </div>
        )
    }

}

export default Presentation