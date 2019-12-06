import React, { useRef, useEffect, useCallback, memo } from 'react';
import { Animated } from 'react-native';
import { AnimatedView } from "./styles"

const useFadeHook = ( duration=500, delay=0 ) => {
    const { current: fadeOpacity } = useRef(new Animated.Value(0)),
        runAnimation = useCallback( () => {
            Animated.timing( fadeOpacity, { toValue: 1, duration, delay, useNativeDriver: true } ).start()
        }, [])

    useEffect( runAnimation, [])
    return fadeOpacity
}

const FadeInWrapper = ({ duration, delay, children }) => {
    const opacity = useFadeHook( duration, delay )
    return <AnimatedView style={{ opacity }}>{ children }</AnimatedView>
}

export default memo(FadeInWrapper)
