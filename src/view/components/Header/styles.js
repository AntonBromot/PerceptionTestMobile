import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome';

import { HEADER_ICON_SIZE } from '../../../constants/metrics';
import {WHITE_COLOR} from '../../../constants/colors';

export const StyledIcon = styled(Icon)`
  padding: ${props => props.side === "left" ? "0 0 0 15px" : "0 15px 0 0"};
  color: ${WHITE_COLOR};
  font-size: ${ HEADER_ICON_SIZE };
`;
