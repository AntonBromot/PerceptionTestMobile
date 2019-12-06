import React from 'react'
import PropTypes from 'prop-types';

import { ButtonWrapper, ButtonText } from "./styles"

const ButtonComponent = ({ color, bgColor, title, onPress }) => (
    <ButtonWrapper { ...{ color, bgColor, onPress } }>
        <ButtonText>{ title }</ButtonText>
    </ButtonWrapper>
)

ButtonComponent.propTypes = {
    color: PropTypes.string,
    bgColor: PropTypes.string,
    title: PropTypes.string,
    onPress: PropTypes.func
}

export default ButtonComponent

