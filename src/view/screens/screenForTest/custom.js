import React, { Component, useEffect, useCallback, useRef, useState, useMemo } from 'react';
import {Animated, Keyboard, TextInput, ScrollView, View, Image} from 'react-native';
import {
    AutocompliedItem,
    AutocompliedWrapper, IconLoad,
    Name,
    SearchBarContainer, SearchIcon, SearchInput,
    SearchInputWrapper,
    AutocompliedWrapperScrool
} from './customeStyles';
import {debounce} from '../../../helpers';
import {WHITE_COLOR} from '../../../constants/colors';
import {WINDOW_HEIGHT} from '../../../constants/metrics';
import {getCharastersByName} from '../../../store/databases/controllers/CharastersController';
import IMAGES from '../../../resources/images';

const searchHandlerCallback = async ( text, setAutocomplitValues ) => {
    if (!text) return setAutocomplitValues([])

    let data = []
    try {
        data = await getCharastersByName({ name: text })
    } catch (e) {
        console.log(e)
    }
    setAutocomplitValues( data )

}

const Example = () => {
    const [ searchedData, setSearchedData ] = useState([]),
          searchHandler = useCallback( text => searchHandlerCallback( text, setSearchedData ), [])

    console.log("searchedData length", searchedData.length)

        return  (
        <View flex={1}>
            <SearchBar showAutocompliet  { ...{ searchHandler, autocomplitValues: searchedData } } />
            <ScrollView>
                <View style={{ width: "100%", height: 200, backgroundColor: "green" }} />
                <View style={{ width: "100%", height: 200, backgroundColor: "blue" }} />
                <View style={{ width: "100%", height: 200, backgroundColor: "orange" }} />
                <View style={{ width: "100%", height: 200, backgroundColor: "yellow" }} />
                <View style={{ width: "100%", height: 200, backgroundColor: "gray" }} />
                <View style={{ width: "100%", height: 200, backgroundColor: "red" }} />
            </ScrollView>
        </View>
    )
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

const AutocompliedFields = ({ data, inputValue, searching }) => {
    if ( !inputValue ) return null

    if ( searching ) return (
        <AutocompliedWrapper>
            <AutocompliedItem style={{ height: 40 }}>
                <IconLoad source={ IMAGES.searchLoad } />
            </AutocompliedItem>
        </AutocompliedWrapper>
    )

    const [ windowWithKeyboardHeight, setWindowWithKeyboardHeight ] = useState(0),
        heightWithKb = WINDOW_HEIGHT - HEADER_HEIGHT - windowWithKeyboardHeight,
        visibleHeight = heightWithKb > MAX_HEIGHT ? MAX_HEIGHT : heightWithKb,
        keyboardDidShow = useCallback( e => keyboardDidShowCallback(e,setWindowWithKeyboardHeight), [ windowWithKeyboardHeight ] ),
        keyboardDidHide = useCallback( e => keyboardDidHideCallback(e,setWindowWithKeyboardHeight), [ windowWithKeyboardHeight ] )

    useEffect( () => {
        Keyboard.addListener('keyboardDidShow', keyboardDidShow );
        Keyboard.addListener('keyboardDidHide', keyboardDidHide );
        return () => {
            Keyboard.removeListener('keyboardDidShow', keyboardDidShow );
            Keyboard.removeListener('keyboardDidHide', keyboardDidHide );
        }
    }, [])


    return (
        <AutocompliedWrapperScrool dataLength={data.length}  style={{ height: visibleHeight }} >
            { data.map( ({ name, id }) => <AutocompliedItem key={id}><Name>{ name }</Name></AutocompliedItem> ) }
        </AutocompliedWrapperScrool>
    )
}









const SearchBar = ({ searchHandler, autocomplitValues = [], showAutocompliet=false }) => {
    const [ inputValue, setInputValue ] = useState(""),
          [ searching, setSearching ] = useState( false ),
          [ autocomplietData, setAutocomplitData ] = useState(autocomplitValues),
           debauncedHendler = useMemo( () => debounce( searchHandler ), [] ),
           onChangeText = useCallback( text => { debauncedHendler(text); setInputValue(text); setAutocomplitData([]); setSearching(true) }, []);

    useEffect(() => {
        setAutocomplitData(autocomplitValues)
        setSearching(false)
    }, [autocomplitValues])


    console.log("inputValue", inputValue)

    return (
        <>
            <SearchBarContainer  >
                <SearchInputWrapper>
                    <SearchIcon name="search" />
                    <SearchInput placeholder="placeholder" onChangeText={ onChangeText } placeholderTextColor={ WHITE_COLOR } />
                </SearchInputWrapper>
            </SearchBarContainer>
            { showAutocompliet && <AutocompliedFields { ...{ data: autocomplietData, inputValue, searching, setSearching } } />}
        </>
    )
}

export default Example

