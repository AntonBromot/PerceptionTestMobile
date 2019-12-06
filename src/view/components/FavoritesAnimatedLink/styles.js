import styled from 'styled-components';
import {Animated} from 'react-native';

import {BLACK_COLOR, WHITE_COLOR, YELLOW_COLOR} from '../../../constants/colors';
import {LARGE_TEXT_SIZE, TITLE_TEXT_SIZE, WINDOW_WIDTH} from '../../../constants/metrics';

export const ImageWrapper = styled(Animated.View)`
  width: ${WINDOW_WIDTH}
`

export const AnimatedImage =  styled.Image`
    resize-mode: cover;
    width: 100%;
    height: 100%;
`

export const AnimatedLegendTextContainer = styled(Animated.View)`
    position: absolute;
    left: 15px;
`

export const LegendText = styled.Text`
    font-size: ${ LARGE_TEXT_SIZE };
    color: ${ WHITE_COLOR };
    font-weight: bold;
`

export const AnimatedLegendText = styled(Animated.Text)`
    font-size: ${ TITLE_TEXT_SIZE };
    color: ${ YELLOW_COLOR };
    font-weight: bold;
`

export const AnimatedHeader = styled(Animated.View)`
    position: absolute;
    top: 52;
    left: 0;
    right: 0;
    background-color: ${BLACK_COLOR};
    overflow: hidden;
    align-items: center;
    justify-content: center;
    z-index: 10;
 
`
