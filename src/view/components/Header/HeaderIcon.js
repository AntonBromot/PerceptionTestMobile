import React from "react"
import PropTypes from 'prop-types';

import { StyledIcon } from './styles';

const HeaderIcon = ({ side, name, onPress }) => <StyledIcon { ...{ name, side, onPress } } />

HeaderIcon.propTypes = {
    side: PropTypes.string,
    name: PropTypes.string,
    onPress: PropTypes.func,
}

export default HeaderIcon
