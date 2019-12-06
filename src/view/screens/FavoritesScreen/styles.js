import styled from 'styled-components';
import { Animated } from "react-native"
import { WHITE_COLOR, YELLOW_COLOR, BLACK_COLOR } from "../../../constants/colors"
import {LARGE_TEXT_SIZE, BUTTON_TEXT_SIZE, WINDOW_HEIGHT} from '../../../constants/metrics';


export const AnimatedHeaderContainer = styled(Animated.View)`
    position: absolute;
    left: 0;
    right: 0;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, .8);
`

export const ImageBackground = styled.ImageBackground`
    flex: 1;
    width: 100%;
    height: 100%;
    background-color: ${ BLACK_COLOR }
`

export const FlatListWrapper = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    padding: 0px 15px 60px 15px;
    overflow: visible;
`

export const TextForEmpty = styled.Text`
    margin-top: 30px;
    font-size: ${ LARGE_TEXT_SIZE };
    color: ${ WHITE_COLOR };
    font-weight: bold;
     text-align: center;
`

export const TextLink = styled.Text`
    font-size: ${ LARGE_TEXT_SIZE };
    color: ${ YELLOW_COLOR };
    font-weight: bold;
`

export const Container = styled.View`
    
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0 10px 0 10px;
`






