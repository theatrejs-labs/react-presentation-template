import React, { RefObject } from 'react'

import './style.scss'
import Presentation from '../../shared/Presentation';

import background from './assets/background.svg'

export default class extends React.Component {

    presentation: RefObject<Presentation> = React.createRef();

    render () {
        return (
            <Presentation ref={this.presentation} background={background}>
                
            </Presentation>
        )
    }
}