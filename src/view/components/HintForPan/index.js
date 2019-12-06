import React, { useRef, useEffect, useState, useCallback } from 'react'
import { Animated } from "react-native"

import { HintIcon, HintText, HintContainer } from './styles'

const ASSETS = {
    text1: "Drag item for",
    text2: "more EFFECT"
}

const useOpacityHook = () => {
    const [ visible, setVisible ] = useState(true),
        { current: opacity } = useRef( new Animated.Value(1) ),
        runAnimation = useCallback( () => {
            Animated.timing( opacity, { toValue: 0, duration: 2000, delay: 2000 }).start( () => setVisible( false ) )
        }, [] )

    useEffect( runAnimation, [] )

    return [ opacity, visible ]
}

const HintForPanComponent = () => {
    const [ opacity, visible ] = useOpacityHook()

    return visible && (
        <HintContainer style={{ opacity,  transform: [{ rotate: "30deg" }] }} >
            <HintText>{ ASSETS.text1 }</HintText>
            <HintIcon name="share" />
            <HintText>{ ASSETS.text2 }</HintText>
        </HintContainer>
    )
}

export default HintForPanComponent
