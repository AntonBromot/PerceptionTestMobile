import React, { useRef, useState, useCallback, useMemo, useEffect, memo } from 'react';
import { KeyboardAvoidingView, TouchableOpacity, FlatList, ScrollView, View, Text } from 'react-native';
import { connect } from 'react-redux'
import { Animated } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';

import { ImageBackground, AnimatedHeaderContainer, TextForEmpty, TextLink, FlatListWrapper, Container } from "./styles"
import IMAGES from "../../../resources/images"
import SearchBar from "../../components/SearchBar"
import { getFavorites, removeFavorite } from '../../../store/actions/favoritesActions';
import CharasterCard from '../../components/CharasterCard';
import Draggable from "../../components/Draggable"
import FadeInWrapper from '../../components/FadeInWrapper';
import HintForPan from "../../components/HintForPan"
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '../../../constants/metrics';

const ASSETS = {
    listEmptyText1: "Your favorites list is empty! Go to ",
    listEmptyText2: " and add who you like!",
    collectionText2: "CHARASTERS"
}

const renderCellCallback = ({ item, index } , dropZoneChange, onDragRemove, navigation ) => {
    const onDragSuccess = () => onDragRemove( item.id ),
        duration = 600,
        delay = index * 600,
        additionStyles = { height: 180, marginTop: 20, width: WINDOW_WIDTH / 2 - 20 }

    return (
        <Draggable { ...{ onDragSuccess, dropZoneChange, key: index, additionStyles } } >
            <FadeInWrapper { ...{ duration, delay }} >
                <TouchableOpacity onPress={ ()=> navigation.navigate("Item", { id: item.id, name: item.name }) } >
                    <CharasterCard { ...{ ...item, additionStyles  } } />
                </TouchableOpacity>
            </FadeInWrapper>
        </Draggable>
    )
}

const dropZoneChangeCallback = ( forShow, newPosition, scrollEnabled, setDropZonePosition, setScrollEnabled, dropZone ) => {
    const dropZoneConfig = { toValue: forShow ? 150 : 0, duration: 600 };

    setDropZonePosition( current => newPosition || current )
    setScrollEnabled(scrollEnabled)
    Animated.timing( dropZone, dropZoneConfig ).start()
}

const EmptyScreen = ({ navigation }) => {
    const goToCollections = useCallback( () => navigation.navigate("Characters"), [] )

    return (
        <ImageBackground source={ IMAGES.favoritesBackground } >
            <TouchableOpacity onPress={goToCollections}>
                <TextForEmpty>{ ASSETS.listEmptyText1 }<TextLink >{ ASSETS.collectionText2 }</TextLink>{ ASSETS.listEmptyText2 }</TextForEmpty>
            </TouchableOpacity>
        </ImageBackground>
    )
}

const FavoritesScreen = ({ favorites, favoritesIds, fetching,  getFavorites, removeFavorite, navigation }) => {
    if ( !favoritesIds.length ) return <EmptyScreen { ...{ navigation } }/>

    const [ favoritesList, setFavoritesList ] = useState([]),
        [ dropZonePosition, setDropZonePosition ] = useState(null),
        [ scrollEnabled, setScrollEnabled ] = useState(true),
        { current: dropZone } = useRef( new Animated.Value(0) ),
        dropZoneChange = useCallback( ( forShow, newPosition, scrollEnabled ) => dropZoneChangeCallback( forShow, newPosition, scrollEnabled, setDropZonePosition, setScrollEnabled, dropZone ), []),
        onDragRemove = useCallback( id => removeFavorite( id ), []),
        dataForRender = useMemo( () => favoritesList.map( ( item, index ) => renderCellCallback(({ item, index }), dropZoneChange, onDragRemove, navigation) ), [favoritesList.length] )

    const dropZoneHeight = dropZone.interpolate({ inputRange: [ 0, 150 ], outputRange: [ 0, 150 ], extrapolate: 'clamp' }),
          dropZoneOpacity = dropZone.interpolate({ inputRange: [0, 150], outputRange: [0, 1], extrapolate: 'clamp' }),
          dropZoneStyles = { ...dropZonePosition, height: dropZoneHeight, opacity: dropZoneOpacity },
          containerHeight = favoritesList.length < 5 ? { height: WINDOW_HEIGHT - 100 } : {}

    useEffect( () => { getFavorites( favorites => setFavoritesList( favorites ) ) }, [])


    return (
        <ImageBackground source={ IMAGES.favoritesBackground } >
            <KeyboardAvoidingView>
                <ScrollView scrollEnabled={scrollEnabled} contentContainerStyle={{ flexGrow: 1, paddingBottom: 60 }} >
                    <Container style={ containerHeight }>
                        { dataForRender }
                    </Container>
                </ScrollView>
                { favorites?.length ? <HintForPan /> : null }
            </KeyboardAvoidingView>
            <AnimatedHeaderContainer style={ dropZoneStyles }>
                <Icon name="trash" color="red" size={50}/>
            </AnimatedHeaderContainer>
        </ImageBackground>
    )
}

const mapStateToProps = ({ favorites: { favorites, favoritesIds, fetching } }) => ({ favorites, favoritesIds, fetching })

const mapDispatchToProps = dispatch => ({
    getFavorites: ( callback ) => dispatch( getFavorites( true, callback ) ),
    removeFavorite: ( id, callback ) =>  dispatch( removeFavorite( id, callback ) )
})

FavoritesScreen.propTypes = {
    navigation: PropTypes.object,
    favoritesIds: PropTypes.array,
    removeFavorite: PropTypes.func,
    favorites: PropTypes.array,
    getFavorites: PropTypes.func,
}

export default connect( mapStateToProps, mapDispatchToProps )( FavoritesScreen )

/*
import React, { useRef, useState, useCallback, useMemo, useEffect, memo } from 'react';
import { KeyboardAvoidingView, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux'
import { Animated } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';

import { ImageBackground, Container, YearContainer, YearContainerWithText, YearText,
    TypeContainer, TypeContainerWithText, TypeText, ItemsContainer, YearTextInContainer,
    TypeTextInContainer, AnimatedHeaderContainer, TextForEmpty, TextLink } from "./styles"
import IMAGES from "../../../resources/images"
import { BIONICLE_TYPES, BIONICLE_TYPES_BY_NUMBER } from "../../../constants/helpers"
import SearchBar from "../../components/SearchBar"
import { getFavorites, removeFavorite } from '../../../store/actions/favoritesActions';
import CharasterCard from '../../components/CharasterCard';
import Draggable from "../../components/Draggable"
import FadeInWrapper from '../../components/FadeInWrapper';
import HintForPan from "../../components/HintForPan"

const ASSETS = {
    favoritesText: "Favorites",
    collectionText: "Collection",
    listEmptyText1: "Your favorites list is empty! Go to ",
    listEmptyText2: " and add model you like!",
    collectionText2: "COLLECTION"
}


const searchData = ( list, searcheble ) => list.filter( ({type, name, year, hierarchy }) => {
    const bionicleType = BIONICLE_TYPES_BY_NUMBER[type],
        searchString = String(hierarchy + year + name + bionicleType).toLowerCase();

    searcheble = searcheble.toLowerCase()

    return searchString.includes( searcheble )
})

const RenderCards = memo(({ cards, dropZoneChange, onDragRemove })  => {
    const onDragSuccess = () => onDragRemove( item.id ),
        duration = 600,
        delay = index * 600;

    return (
        <Draggable { ...{ onDragSuccess, dropZoneChange, key: cards.id } } >
            <FadeInWrapper { ...{ duration, delay }} >
                <TouchableOpacity onPress={()=> console.log("PRESSED")} >
                    <CharasterCard { ...{ ...cards, showFavoriteIcon: false } } />
                </TouchableOpacity>
            </FadeInWrapper>
        </Draggable>
    )
})

const ItemsByType = memo( ({ items, dropZoneChange, onDragRemove }) =>  {

    console.log("ItemsByType", items)

    return (
        <ItemsContainer key={items.id}>
            <Container >
                <RenderCards { ...{ dropZoneChange, onDragRemove, cards: items } } />
            </Container>
        </ItemsContainer>
    )
})

const renderCellCallback = ({ item }, dropZoneChange, onDragRemove ) => {

    console.log("renderCellCallback", item)

    return (
        <>
            <ItemsByType { ...{ items: item, dropZoneChange, onDragRemove } } />
        </>
    )
}

const searchHandlerCallback = ( text, setFavoritesList, favorites ) => {
    const data = searchData( favorites, text )
    setFavoritesList( data  )
}

const dragRemoveCallback = ( id, getFavorites, removeFavorite ) => {
    removeFavorite( id )
    getFavorites( f=>f )
}

const dropZoneChangeCallback = ( forShow, newPosition, scrollEnabled, setDropZonePosition, setScrollEnabled, dropZone ) => {
    const dropZoneConfig = { toValue: forShow ? 150 : 0, duration: 600 };

    setDropZonePosition( current => newPosition || current )
    setScrollEnabled(scrollEnabled)
    Animated.timing( dropZone, dropZoneConfig ).start()
}

const EmptyScreen = ({ navigation }) => {
    const goToCollections = useCallback( () => navigation.push("Collections"), [] )

    return (
        <ImageBackground source={ IMAGES.collectionsBackground } >
            <TextForEmpty>{ ASSETS.listEmptyText1 }<TextLink onPress={goToCollections}>{ ASSETS.collectionText2 }</TextLink>{ ASSETS.listEmptyText2 }</TextForEmpty>
        </ImageBackground>
    )
}

const FavoritesScreen = ({ getFavorites, favorites, removeFavorite, favoritesIds, navigation }) => {
    //if ( !favoritesIds.length ) return <EmptyScreen { ...{ navigation } }/>

    const [ favoritesList, setFavoritesList ] = useState([]),
        [ dropZonePosition, setDropZonePosition ] = useState(null),
        [ scrollEnabled, setScrollEnabled ] = useState(true),
        { current: dropZone } = useRef( new Animated.Value(0) ),
        dropZoneChange = useCallback( ( forShow, newPosition, scrollEnabled ) => dropZoneChangeCallback( forShow, newPosition, scrollEnabled, setDropZonePosition, setScrollEnabled, dropZone ), []),
        onDragRemove = useCallback( id => dragRemoveCallback( id, getFavorites, removeFavorite ), []),
        searchHandler = useCallback( text => searchHandlerCallback( text, setFavoritesList, favorites ), [ favorites, favoritesList ]),
        renderItemCall = useCallback(data => renderCellCallback(data, dropZoneChange, onDragRemove), [] );
        //dataForRender = useMemo( () => get3dMatrix( favoritesList ), [favoritesList]);

    const dropZoneHeight = dropZone.interpolate({ inputRange: [ 0, 150 ], outputRange: [ 0, 150 ], extrapolate: 'clamp' }),
        dropZoneOpacity = dropZone.interpolate({ inputRange: [0, 150], outputRange: [0, 1], extrapolate: 'clamp' }),
        dropZoneStyles = { ...dropZonePosition, height: dropZoneHeight, opacity: dropZoneOpacity };

    useEffect( () => {
        getFavorites( favorites => setFavoritesList( favorites ) )
    }, [])

    return (
        <ImageBackground source={ IMAGES.favoritesBackground } >
            <KeyboardAvoidingView>
                <SearchBar searchHandler={searchHandler} />
                <FlatList scrollEnabled={scrollEnabled} data={favoritesList}
                          contentContainerStyle={{ paddingBottom: 60 }}
                          renderItem={ renderItemCall }
                          keyExtractor={(item, index) => String(index)}/>
                { favoritesList.length ? <HintForPan /> : null }
            </KeyboardAvoidingView>
            <AnimatedHeaderContainer style={ dropZoneStyles }>
                <Icon name="trash" color="red" size={50}/>
            </AnimatedHeaderContainer>
        </ImageBackground>
    )
}

const mapStateToProps = ({ favorites: { favoritesIds, favorites, fetching } }) => ({ favorites, favoritesIds, fetching })

const mapDispatchToProps = dispatch => ({
    getFavorites: ( callback ) => dispatch( getFavorites( callback ) ),
    removeFavorite: ( id, callback ) =>  dispatch( removeFavorite( id, callback ) )
})

FavoritesScreen.propTypes = {
    navigation: PropTypes.object,
    favoritesIds: PropTypes.array,
    removeFavorite: PropTypes.func,
    favorites: PropTypes.array,
    getFavorites: PropTypes.func,
}

export default connect( mapStateToProps, mapDispatchToProps )( FavoritesScreen )





*/

