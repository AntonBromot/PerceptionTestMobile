import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome';

import { WINDOW_WIDTH } from "../../../constants/metrics"
import { YELLOW_COLOR, LIGHT_GRAY_COLOR, DEEP_GRAY_COLOR  } from "../../../constants/colors"


export const CardContainer = styled.View`
   width: ${ WINDOW_WIDTH / 2 - 20 }px;
   background: #F7F7F7;
   border-radius: 14px;
   margin-top: 20px;
   box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
   height: 180px;
`

export const Cover = styled.View`
    
	width: 100%;
	height: 120px;
	border-top-left-radius: 14px;
	border-top-right-radius: 14px;
	overflow: hidden;
`

export const CardImage = styled.Image`
	width: 100%;
	height: 100%;
`

export const Content = styled.View`
    padding-top: 5px;
	flex-direction: column;
	align-items: center;
	height: 60px;
`;

export const Title = styled.Text`
	color: ${ DEEP_GRAY_COLOR };
	font-size: 20px;
	font-weight: 600;
`;

export const Year = styled.Text`
	color: ${ LIGHT_GRAY_COLOR };
	font-size: 15px;
	font-weight: 600;
	margin-top: 4px;
`;
