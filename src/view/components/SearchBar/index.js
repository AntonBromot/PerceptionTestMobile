import React, { useRef, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types';
import { TouchableOpacity } from "react-native"
import { withNavigation } from "react-navigation"

import { SearchBarContainer, SearchInputWrapper, SearchIcon, SearchInput, AutocompliedWrapper, AutocompliedItem, Name } from "./styles"
import { WHITE_COLOR } from '../../../constants/colors';
import {debounce} from '../../../helpers';
import {Animated} from 'react-native';

const ASSETS = {
    placeholderText: "Search..."
}

const AutocompliedFields = ({ data, navigation }) => {
    const { current: autocompileHeight } = useRef( new Animated.Value(0) ),
          goToItemScreen = useCallback( (id, name) => {
              autocompileHeight.setValue(0);
              navigation.navigate("Item", { id, name })
          }, [] ),
          height = 40

    useEffect( () => {
        Animated.spring( autocompileHeight, { toValue: data.length * 40, duration: 2000 } ).start()
    }, [data.length] )

    return (
        <AutocompliedWrapper dataLength={data.length}  style={{ height: autocompileHeight }} >
            { data.map( ({ name, id }) => (
                <TouchableOpacity key={id}  onPress={() => goToItemScreen( id, name )}>
                    <AutocompliedItem style={{ height }}><Name>{ name }</Name></AutocompliedItem>
                </TouchableOpacity>
            ))}
        </AutocompliedWrapper>
    )
}

const SearchBar = ({ searchHandler, autocomplitValues, navigation }) => {

    return (
        <>
            <SearchBarContainer  >
                <SearchInputWrapper>
                    <SearchIcon name="search" />
                    <SearchInput placeholder={ ASSETS.placeholderText } onChangeText={ debounce(searchHandler) } placeholderTextColor={ WHITE_COLOR } />
                </SearchInputWrapper>
            </SearchBarContainer>
            { Boolean(autocomplitValues?.length ) && <AutocompliedFields { ...{ data: autocomplitValues, navigation } } />}
        </>
    )
}

SearchBar.propTypes = {
    searchHandler: PropTypes.func,
}

export default withNavigation(SearchBar)

