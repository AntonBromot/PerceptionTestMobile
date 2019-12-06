import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity} from 'react-native';
import { withNavigation } from 'react-navigation'

import FadeInWrapper from '../FadeInWrapper';
import { AnimatedImage, AnimatedLegendText, AnimatedLegendTextContainer, AnimatedHeader, LegendText, ImageWrapper } from './styles';
import IMAGES from '../../../resources/images';
import { HEADER_MAX_HEIGHT, HEADER_SCROLL_DISTANCE, HEADER_MIN_HEIGHT } from "../../../constants/metrics"


const ASSETS = {
    mainText: "FAVORITES LIST",
    titleText: "Go to your favorites!"
}

const FavoritesAnimatedLink = ({ scrollY, navigation }) => {
    const goToFavorites = useCallback( () => navigation.navigate("Favorites"), [] )

    const headerHeight = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
        extrapolate: 'clamp',
        useNativeDriver: true
    });

    const
        imageOpacity = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [1, 0.3],
            extrapolate: 'clamp',
            useNativeDriver: true
        }),
        textContainerPositionTop = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, 6],
            extrapolate: 'clamp',
            useNativeDriver: true
        }),
        textTranslatePosition = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, 300],
            extrapolate: 'clamp',
            useNativeDriver: true
        }),
        textTranslateOpacity = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [1, 0],
            extrapolate: 'clamp',
            useNativeDriver: true
        })


    return (
        <AnimatedHeader style={{ height: headerHeight }}>
            <FadeInWrapper>
                <ImageWrapper style={{ opacity: imageOpacity } } >
                     <AnimatedImage  source={ IMAGES.favoriteLink } />
                </ImageWrapper>
            </FadeInWrapper>
            <AnimatedLegendTextContainer style={{ top: textContainerPositionTop }}>
                <TouchableOpacity onPress={ goToFavorites } >
                    <LegendText>{ ASSETS.mainText }</LegendText>
                    <AnimatedLegendText style={{ opacity: textTranslateOpacity, transform:[{ translateX: textTranslatePosition }] }}>
                        { ASSETS.titleText}
                    </AnimatedLegendText>
                </TouchableOpacity>
            </AnimatedLegendTextContainer>
        </AnimatedHeader>
    )
}

FavoritesAnimatedLink.propTypes = {
    scrollY: PropTypes.object,
}

export default withNavigation(FavoritesAnimatedLink)
