import React, { useRef, useState, useCallback, useMemo, useEffect } from "react";
import {Animated, Easing, PanResponder, StyleSheet} from 'react-native';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '../../../constants/metrics';

const isDropAreaCallback = ( gesture, position ) =>  {
    const isTop = position.hasOwnProperty( "top" ),
        { moveY } = gesture;

    return isTop ? moveY > WINDOW_HEIGHT - 150 : moveY < 150;
}

const spinOnDragCallback = ( spinValue, isDragging ) => {
    if ( !isDragging ) return Animated.timing( spinValue, { toValue: 0, duration: 100, easing: Easing.linear } ).start()

    const runTimer = ( toValue, duration ) => Animated.timing( spinValue, { toValue, duration, easing: Easing.linear })

    Animated.loop(
        Animated.sequence([ runTimer(1.0, 100), runTimer(-1.0, 150), runTimer(0, 100) ])
    ).start( )
}

const panResponderMemo = ({ pan, setIsDragging, dropZoneChange, isDropArea, setVisible, onDragSuccess, opacity }) => (
    PanResponder.create({
        onStartShouldSetPanResponder: ( e, g ) => true,
        onMoveShouldSetPanResponderCapture: (e, g) => g.dx !== 0 && g.dy !== 0,
        onShouldBlockNativeResponder: () => false,
        onPanResponderMove: Animated.event([ null, { dx: pan.x, dy: pan.y } ]),
        onPanResponderGrant: ( e, g ) => {
            const dropZonePosition = WINDOW_HEIGHT / 2 < g.y0 ? { top: 0 } : { bottom: 0 }
            setIsDragging( true )
            dropZoneChange( true, dropZonePosition, false )
        },
        onPanResponderTerminate: () => {
            const animatedGoBackConf = { toValue: {x: 0, y: 0}, friction: 5 };

            setIsDragging( false )
            Animated.spring( pan, animatedGoBackConf ).start()
            dropZoneChange( false, null, true )
        },
        onPanResponderRelease: (e, g) => {
            const dropZonePosition = WINDOW_HEIGHT / 2 > g.y0 ? { top: 0 } : { bottom: 0 },
                inDropArea =  isDropArea(g, dropZonePosition),
                dragSuccessCallback = () => { setIsDragging(false); setVisible(false); onDragSuccess() },
                dragBackCallback = () => setIsDragging(false),
                animatedGoBackConf = { toValue: {x: 0, y: 0}, friction: 5 },
                animatedSuccessConf = { toValue: 0, duration: 1000 }

            if ( !inDropArea ) Animated.spring(pan, animatedGoBackConf ).start( dragBackCallback )
            else Animated.timing( opacity, animatedSuccessConf).start( dragSuccessCallback )

            dropZoneChange( false, null, true )
        }
    })
)

const Draggable = ({ dropZoneChange, onDragSuccess, children, additionStyles={} }) => {
    const [ isDragging, setIsDragging] = useState( false ),
        [ visible, setVisible ] = useState( true ),
        pan = useRef( new Animated.ValueXY() ).current,
        opacity = useRef( new Animated.Value(1) ).current,
        spinValue = useRef( new Animated.Value(0) ).current,
        isDropArea = useCallback( isDropAreaCallback, [] )

    const spin = spinValue.interpolate({ inputRange: [-1, 0, 1], outputRange: [ '-0.1rad', '0rad', '0.1rad' ] }),
        panStyle = { transform: [ ...pan.getTranslateTransform(), { rotate: spin }], opacity },
        allStyles = [ panStyle, { ...additionStyles, zIndex: isDragging ? 100 : 0, ...( !visible && { display: "none" } ) } ],
        panResponderArgs = { pan, setIsDragging, dropZoneChange, isDropArea, setVisible, onDragSuccess, opacity }

    const spinOnDrag = useCallback( () => spinOnDragCallback( spinValue, isDragging ), [isDragging] ),
        panResponder = useMemo( () => panResponderMemo(panResponderArgs), [])

    useEffect( spinOnDrag, [isDragging] )

    return (
        <Animated.View  { ...panResponder.panHandlers } style={ allStyles } >
            { children }
        </Animated.View>
    )
}

export default Draggable

