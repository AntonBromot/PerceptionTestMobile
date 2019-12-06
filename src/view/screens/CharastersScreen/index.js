import React, { useEffect, useRef, useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import {Animated, FlatList, KeyboardAvoidingView, RefreshControl, Text, TouchableOpacity, View} from 'react-native';

import { ImageBackground, FooterWrapper, LoadingIndicator, FirstEntryText} from './styles';
import IMAGES from "../../../resources/images.js"
import {connect} from 'react-redux';
import { getCharasters, updateCharaster } from '../../../store/actions/charastersActions';
import { getFavorites } from '../../../store/actions/favoritesActions';
import CharasterCard from '../../components/CharasterCard';
import FadeInWrapper from '../../components/FadeInWrapper';
import CharasterItemList from "../../components/CharasterItemList"
import SearchBar from '../../components/SearchBar';
import {getCharastersByName} from '../../../store/databases/controllers/CharastersController';
import FavoritesAnimatedLink from '../../components/FavoritesAnimatedLink'
import { HEADER_MAX_HEIGHT, LIMIT } from "../../../constants/metrics"
import {openCameraPhoto, openGalery} from '../../../services/camera';
import ActionSheet from 'react-native-actionsheet';

const ASSETS = {
    changeAvatarText: "Change avatar",
    takePhotoText: "Take photo",
    selectFromText: "Select from camera roll",
    cancelText: "Cancel",
    firstEntryText: "Is tour first entry to application. We load data from internet, please wait"
}

const RenderCardsAnimated  = ({data, handler}) => data.map( ( item, index ) => {
    const duration = 600,
        delay = index * 600;

    return (
        <TouchableOpacity onPress={ handler } key={ index }>
            <FadeInWrapper { ...{ duration, delay }} >
                <CharasterCard { ...item } showFavoriteIcon />
            </FadeInWrapper>
        </TouchableOpacity>
    )
})

const actionSheetCallback = async ( index, id, updateCharaster ) => {
    switch (index)  {
        case 0: {
            let image
            try {
                image = await openGalery()
                updateCharaster(id, { avatar: image.path })

            } catch (e) {
                console.log(e)
            }
            break
        }
        case 1: {
            let image
            try {
                image = await openCameraPhoto()
                updateCharaster(id, { avatar: image.path })

            } catch (e) {
                console.log(e)
            }
            break
        }
        default: return null
    }
}

const FooterComponent = ({ fetching, firstEntry }) => ( !fetching ? null :
        <FooterWrapper>
            <LoadingIndicator source={IMAGES.loading} />
            { firstEntry && <FirstEntryText>{ ASSETS.firstEntryText }</FirstEntryText> }
        </FooterWrapper>
)

const onRefreshCallback = ( offset, loading, getCharasters, setLoading ) => {
    if ( loading ) return
    setLoading( true )
    getCharasters( offset, LIMIT, () => setLoading(false) )
}

const searchHandlerCallback = async ( text, setAutocomplitValues ) => {
    if ( !text ) return  setAutocomplitValues([])
    const data = await getCharastersByName({ name: text })

    setAutocomplitValues(data)
}

const CharastersScreen = ({ collections, fetching, firstEntry, favoritesIds, getFavorites, getCharasters, updateCharaster }) => {
    const { current: scrollY } = useRef( new Animated.Value(0) ),
          [ idForAction, setIdForAction ] = useState(null),
          actionSheet = useRef(null),
          [ loading, setLoading ] = useState( false ),
          [ autocomplitValues, setAutocomplitValues ] = useState([]),
          onScroll = Animated.event( [{ nativeEvent: { contentOffset: { y: scrollY } } }] ),
          searchHandler = useCallback( text => searchHandlerCallback( text, setAutocomplitValues ), []),
          memoFooter = useMemo( () => <FooterComponent { ...{ fetching: fetching || loading, firstEntry } } />, [fetching, loading, firstEntry] ),
          showActionSheet = useCallback( id => { setIdForAction(id); actionSheet.current.show() }, [] ),
          actionSheetFunc = useCallback(   ( index )  =>  actionSheetCallback( index, idForAction, updateCharaster  ), [ idForAction] ),
          itemCell = useCallback( ({item}) => <CharasterItemList { ...{ item, favoritesIds, showActionSheet } } />, [collections.length] ),
          loadMore = useCallback( () => onRefreshCallback( collections.length, loading, getCharasters, setLoading ), [collections.length, loading] ),
          actionSheetProps = {
                title: ASSETS.changeAvatarText,
                options: [ ASSETS.selectFromText, ASSETS.takePhotoText, ASSETS.cancelText ],
                cancelButtonIndex: 2,
                destructiveButtonIndex: 2,
                ref: o => actionSheet.current = o,
                onPress: actionSheetFunc
         }

    useEffect(() => { getCharasters(); getFavorites() }, [])

    return (
        <ImageBackground source={ IMAGES.charastersBackground } >
            <KeyboardAvoidingView>
                <SearchBar searchHandler={searchHandler} autocomplitValues={autocomplitValues} />
                <FavoritesAnimatedLink { ...{ scrollY } } />
                <FlatList  data={ collections }
                           contentContainerStyle={{  marginTop: HEADER_MAX_HEIGHT, paddingBottom: HEADER_MAX_HEIGHT+60  }}
                           onScroll={ onScroll}
                           renderItem={ itemCell }
                           initialNumToRender={15}
                           removeClippedSubviews={true}
                           ListFooterComponent={ memoFooter }
                           onEndReached={ loadMore }
                           onEndReachedThreshold={0.1}
                           keyExtractor={({ id }) => String(id)} />
            </KeyboardAvoidingView>
            <ActionSheet { ...actionSheetProps }/>
        </ImageBackground>
    )
}

const mapStateToProps = ({ characters: { collections, fetching, firstEntry }, favorites: { favoritesIds } }) => ({ firstEntry, collections, fetching, favoritesIds })

const mapDispatchToProps = dispatch => ({
    getCharasters: ( offset, limit, callback ) => dispatch( getCharasters( offset, limit, callback ) ),
    getFavorites: callback => dispatch( getFavorites( false, callback ) ),
    updateCharaster: ( id, data, callback ) => dispatch( updateCharaster( id, data, callback ) )

})



CharastersScreen.propTypes = {
    collections: PropTypes.array,
    fetching: PropTypes.bool,
    favoritesIds: PropTypes.array,
    getFavorites: PropTypes.func,
    getCharasters: PropTypes.func,
    updateCharaster : PropTypes.func
}

export default connect( mapStateToProps, mapDispatchToProps )( CharastersScreen )

