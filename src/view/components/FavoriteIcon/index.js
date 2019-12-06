import React, { useState, useCallback } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import { FavoriteIcon } from './styles'
import { setFavorite, removeFavorite } from '../../../store/actions/favoritesActions';

const toggleFavoriteCallback = ( favorite, toggleFavorite, removeFavorite, setFavorite, id ) => {
    favorite ? removeFavorite( id ) : setFavorite( id ); toggleFavorite(!favorite)
}

const FavoriteIconComponent = ({ id, favoritesIds, setFavorite, removeFavorite }) => {
    const isFavorite = favoritesIds.includes( id ),
        [ favorite, toggleFavorite ] = useState(isFavorite),
        pressEffect = useCallback( () => toggleFavoriteCallback(favorite, toggleFavorite, removeFavorite, setFavorite, id), [favorite] ),
        iconProps = { name: favorite ? "heart" : "heart-o", onPress: pressEffect }

    return <FavoriteIcon { ...iconProps } />
}

const mapStateToProps = ({ favorites }) => ({ favorites })

const mapDispatchToProps = dispatch => ({
    setFavorite: ( id, callback ) => dispatch( setFavorite( id, callback ) ),
    removeFavorite: ( id, callback ) =>  dispatch( removeFavorite( id, callback ) )
})

FavoriteIconComponent.propTypes = {
    id: PropTypes.number,
    favorites: PropTypes.object,
    setFavorite: PropTypes.func,
    removeFavorite: PropTypes.func,
}

export default connect( mapStateToProps, mapDispatchToProps )( React.memo(FavoriteIconComponent, () => true) )
