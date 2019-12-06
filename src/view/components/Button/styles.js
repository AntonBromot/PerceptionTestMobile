import styled from "styled-components"

import { BUTTON_TEXT_SIZE } from '../../../constants/metrics';
import { YELLOW_COLOR, VALVET_COLOR, WHITE_COLOR } from '../../../constants/colors';

export const ButtonWrapper = styled.TouchableOpacity`
   margin-top: 20px;
   margin-bottom: 20px;
   min-width: 300px;
   max-width: 500px;
   height: 60px;
   border-radius: 25px;
   border: 4px solid ${ WHITE_COLOR }
   background-color: ${ props => props?.bgColor || VALVET_COLOR };
   justify-content: center;
   align-items: center;
`

export const ButtonText = styled.Text`
   text-transform: uppercase;
   color: ${ props => props?.color || WHITE_COLOR };
   font-size: ${ BUTTON_TEXT_SIZE };
   font-weight: bold;
`
