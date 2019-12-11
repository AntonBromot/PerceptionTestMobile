import React, { useRef, useEffect, useCallback, useState, useMemo } from 'react'
import PropTypes from 'prop-types';
import { TouchableOpacity, Keyboard } from "react-native"
import { withNavigation } from "react-navigation"

import { SearchBarContainer, SearchInputWrapper, SearchIcon, SearchInput, AutocompliedWrapper, AutocompliedItem, Name, AutocompliedWrapperScrool, IconLoad } from "./styles"
import { WHITE_COLOR } from '../../../constants/colors';
import {debounce} from '../../../helpers';
import {Animated} from 'react-native';
import IMAGES from '../../../resources/images';
import {WINDOW_HEIGHT} from '../../../constants/metrics';

const ASSETS = {
    placeholderText: "Search..."
}

const keyboardDidShowCallback = ( { endCoordinates: { height } }, setWindowWithKeyboardHeight ) => {
    console.log('Keyboard Shown HEIGHT', height);
    setWindowWithKeyboardHeight(height)
}

const keyboardDidHideCallback = ( { endCoordinates: { height } }, setWindowWithKeyboardHeight ) => {
    console.log('Keyboard Hidden', height);
    setWindowWithKeyboardHeight(0)
}

const MAX_HEIGHT = 350,
    HEADER_HEIGHT = 125

const AutocompliedFields = ({ data, inputValue, searching, windowWithKeyboardHeight, navigation }) => {
    const heightWithKb = WINDOW_HEIGHT - HEADER_HEIGHT - windowWithKeyboardHeight,
          visibleHeight = heightWithKb > MAX_HEIGHT ? MAX_HEIGHT : heightWithKb,
          goToItemScreen = useCallback( (id, name) => navigation.navigate("Item", { id, name }), [] )

        if ( !inputValue ) return null

    if ( searching ) return (
        <AutocompliedWrapper>
            <AutocompliedItem >
                <IconLoad source={ IMAGES.searchLoad } />
            </AutocompliedItem>
        </AutocompliedWrapper>
    )

    console.log("visibleHeight", visibleHeight)

    return (
        <AutocompliedWrapperScrool dataLength={data.length}  style={{ height: visibleHeight }} >
            { data.map( ({ name, id }) => (
                <TouchableOpacity key={id} onPress={ () => goToItemScreen(id, name) }>
                <AutocompliedItem>
                        <Name>{ name }</Name>
                </AutocompliedItem>
                </TouchableOpacity>
            ))}
        </AutocompliedWrapperScrool>
    )
}

const SearchBar = ({ searchHandler, autocomplitValues = [], showAutocompliet=false, navigation }) => {
    const [ inputValue, setInputValue ] = useState(""),
        [ searching, setSearching ] = useState( false ),
        [ windowWithKeyboardHeight, setWindowWithKeyboardHeight ] = useState(0),
        [ autocomplietData, setAutocomplitData ] = useState(autocomplitValues),
        debauncedHendler = useMemo( () => debounce( searchHandler ), [] ),
        keyboardDidShow = useCallback( e => keyboardDidShowCallback(e,setWindowWithKeyboardHeight), [ windowWithKeyboardHeight ] ),
        keyboardDidHide = useCallback( e => keyboardDidHideCallback(e,setWindowWithKeyboardHeight), [ windowWithKeyboardHeight ] ),
        onChangeText = useCallback( text => { debauncedHendler(text); setInputValue(text); setAutocomplitData([]); setSearching(true) }, []),
        autocomplietProps = { data: autocomplietData, inputValue, searching, setSearching, navigation, windowWithKeyboardHeight }

    useEffect(() => {
        setAutocomplitData(autocomplitValues)
        setSearching(false)
    }, [autocomplitValues])

    useEffect( () => {
        Keyboard.addListener('keyboardDidShow', keyboardDidShow );
        Keyboard.addListener('keyboardDidHide', keyboardDidHide );
        return () => {
            Keyboard.removeListener('keyboardDidShow', keyboardDidShow );
            Keyboard.removeListener('keyboardDidHide', keyboardDidHide );
        }
    }, [])


    return (
        <>
            <SearchBarContainer  >
                <SearchInputWrapper>
                    <SearchIcon name="search" />
                    <SearchInput placeholder={ASSETS.placeholderText} onChangeText={ onChangeText } placeholderTextColor={ WHITE_COLOR } />
                </SearchInputWrapper>
            </SearchBarContainer>
            { showAutocompliet && <AutocompliedFields { ...autocomplietProps } />}
        </>
    )
}

SearchBar.propTypes = {
    searchHandler: PropTypes.func,
    autocomplitValues: PropTypes.array,
    showAutocompliet: PropTypes.bool
}

export default withNavigation(SearchBar)

