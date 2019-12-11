import styled from "styled-components"
import { Platform, Animated } from 'react-native'

import { SIMPLE_TEXT_SIZE } from '../../../constants/metrics';
import {WHITE_COLOR, BLACK_COLOR, YELLOW_COLOR} from '../../../constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

export const SearchBarContainer = styled.View`
    padding: 0 15px;
    align-items: center;
    justify-content: center;
    height: 52px;
    background-color: ${ BLACK_COLOR }
`

export const SearchInputWrapper = styled.View`
   flex-direction: row;
   align-items: center;
   height: 36px;
   
   width: 100%;
   border-radius: 20px;
   background-color: rgba(255, 255, 255, 0.2)
`

export const SearchIcon = styled(Icon)`
  font-size: 20px;
  padding: 5px 10px;
  color: ${ WHITE_COLOR }; 
`

export const SearchInput = styled.TextInput`
   width: 100%;
   height: 100%;
   color: ${ WHITE_COLOR };
   font-size: ${ SIMPLE_TEXT_SIZE };
   ${ Platform.OS === 'android' &&
"position: relative;" +
" top: 2px;"
    }
`

export const AutocompliedWrapper = styled(Animated.View)`
   width: 100%;
  overflow: hidden;
   position: absolute;
   top: 50px;
   left: 0;
   right: 0;
   z-index: 100;
`

export const AutocompliedWrapperScrool = styled(Animated.ScrollView)`

width: 100%;
  overflow: hidden;
   position: absolute;
   top: 50px;
   left: 0;
   right: 0;
   z-index: 100;
  
`

export const AutocompliedItem = styled.View`
   width: 100%;
   height: 40px;
   align-items: center;
   justify-content: center;
   background-color: ${ BLACK_COLOR };
   border-bottom-width: 1px;
   border-color: ${ YELLOW_COLOR }
`

export const Name = styled.Text`
   color: ${ WHITE_COLOR };
`

export const IconLoad = styled.Image`
   width: 65px;
   height: 30px; 
`
