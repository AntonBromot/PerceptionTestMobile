import React from 'react'
import PropTypes from 'prop-types';

import { CardContainer, CardImage, Cover, Content, Title, Year } from './styles'
import IMAGES from "../../../resources/images"

const CharasterCard = ({ avatar, name, id, additionStyles={} }) => (
        <CardContainer style={additionStyles}>
            <Cover>
                <CardImage source={ !avatar ? IMAGES.defaultAvatar : { uri: avatar} } />
            </Cover>
            <Content>
                <Title>{ name }</Title>
                <Year></Year>
            </Content>
        </CardContainer>
)


CharasterCard.defaultProps = {
    showFavoriteIcon: false
}

CharasterCard.propTypes = {
    mainImage: PropTypes.string,
    hierarchy: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.number,
    additionStyles: PropTypes.obj,
}

export default React.memo(CharasterCard, ()=>true)
