import styled from 'styled-components';
import { Animated } from "react-native"
import {BLACK_COLOR, WHITE_COLOR, YELLOW_COLOR} from '../../../constants/colors';
import {HEADER_MAX_HEIGHT, SIMPLE_TEXT_SIZE, WINDOW_WIDTH} from '../../../constants/metrics';

export const Container = styled.View`
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0 10px 0 10px;
`

export const ScrollView = styled.ScrollView`
    flex: 1;
`

export const ImageBackground = styled.ImageBackground`
    width: 100%;
    background-color: ${ BLACK_COLOR }
    height: 100%;
`

export const FooterWrapper = styled.View`
   width: 100%;
  
   height: 60px;
   justify-content: center;
   align-items: center;
`

export const FirstEntryText = styled.Text`
   color: ${YELLOW_COLOR};
   font-size: ${SIMPLE_TEXT_SIZE};
   position: absolute;
   font-weight: bold;
   top: 60px;
   width: 300px;
   text-align: center;
`

export const LoadingIndicator = styled.Image`
   width: 180px;
   height: 180px;
`
