import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Animated } from "react-native"

import { YELLOW_COLOR } from "../../../constants/colors"
import { SIMPLE_TEXT_SIZE } from "../../../constants/metrics"

export const HintIcon = styled(Icon)`
   font-size: 50px;
   color: ${ YELLOW_COLOR };
`

export const HintText = styled.Text`
   font-size: ${ SIMPLE_TEXT_SIZE };
   font-weight: bold;
   color: ${ YELLOW_COLOR };
`

export const HintContainer = styled(Animated.View)`
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 150px;
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 100;
    background-color: rgba(0, 0, 0, .95);
    border-radius: 50px;
    padding: 10px;
`

