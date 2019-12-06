import styled from 'styled-components';
import {WHITE_COLOR, YELLOW_COLOR} from '../../../constants/colors';
import {SIMPLE_TEXT_SIZE} from '../../../constants/metrics';
import Icon from 'react-native-vector-icons/FontAwesome';

export const FlatListItem = styled.View`
    height: 40px;
   
    background-color: rgba(0,0,0,.9);
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    height: 60px;
    padding: 15px;
`

export const Avatar = styled.Image`
    width: 40px;
    height: 40px;
    border-radius: 20px;
    overflow: hidden;
`

export const Name = styled.Text`
    color: ${WHITE_COLOR};
    font-size: ${SIMPLE_TEXT_SIZE};
    margin-left: 20px;
`

export const DataWrapper = styled.View`
    width: 90%;
    flex-direction: row;
    align-items: center;
`

export const IconGo = styled(Icon)`
   font-size: 20px;
   color: ${ YELLOW_COLOR };
`

export const RightButtonWrapper = styled.View`
 
   height: 60px;
   padding-left: 23px;
   padding-top: 15px;
   background-color: ${ props => props.bgColor };
`

export const IconEdit = styled(Icon)`
   font-size: 30px;
   color: ${WHITE_COLOR}
`

export const Wrapper = styled.View`
   width: 100%;
   height: 80px;
   align-items: center;
   justify-content: center;
`
