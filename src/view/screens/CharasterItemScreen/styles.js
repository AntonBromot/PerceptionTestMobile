import styled from 'styled-components';
import {BUTTON_TEXT_SIZE} from '../../../constants/metrics';
import {BLACK_COLOR, VALVET_COLOR, WHITE_COLOR, YELLOW_COLOR} from '../../../constants/colors';

export const ImageBackground = styled.ImageBackground`
    width: 100%;
    height: 100%;
    background-color: ${ BLACK_COLOR }
`

export const AvatarContainer = styled.View`
   width: 100%;
   height: 200px;
   align-items: center;
   justify-content: center;
`

export const WrapperForEdit = styled.View`
   position: absolute;
   top: 20px;
   right: 20px;
`

export const Avatar = styled.Image`
   width: 160px;
   height: 160px;
   resize-mode: cover;
   border-radius: 80px; 
`

export const AboutList = styled.View`
   padding: 15px;
   background-color: rgba( 0,0,0,.85 )
`

export const AboutItem = styled.View`
   flex-direction: row;
   align-items: center;
   justify-content: space-between;
   border-bottom-width: 1px;
   min-height: 60px;
   border-color: ${ VALVET_COLOR } 
  
`

export const Named = styled.Text`
   font-size: ${ BUTTON_TEXT_SIZE }
   color: ${ YELLOW_COLOR };
  
`

export const Value = styled.Text`
   font-size: ${ BUTTON_TEXT_SIZE }
   color: ${ WHITE_COLOR }
 
`

export const AboutItemArray = styled.View`
   flex-direction: column;
   border-color: ${ VALVET_COLOR }
    border-bottom-width: 1px;
    padding-top:10px;
    padding-bottom: 10px;
`

export const LoadingIndicator = styled.Image`
   width: 180px;
   height: 180px;
`

