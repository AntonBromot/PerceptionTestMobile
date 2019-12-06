import React, { useCallback, useState, useEffect } from 'react';
import Swipeable from 'react-native-swipeable';
import { TouchableOpacity } from "react-native"
import { withNavigation } from 'react-navigation';

import {Avatar, DataWrapper, FlatListItem, IconGo, Name, RightButtonWrapper, Wrapper} from './styles';
import IMAGES from '../../../resources/images';
import {YELLOW_COLOR, VALVET_COLOR, WHITE_COLOR} from '../../../constants/colors';
import FavoriteIcon from "../../components/FavoriteIcon"
import IconEdit from "../../components/IconEdit"

const CharasterItemList = ({ item: { name, id, avatar }, showActionSheet, favoritesIds, navigation }) => {
    const goToItemScreen = useCallback( () => navigation.navigate("Item", { id, name }), [] ),
          onEditPress = useCallback( () => showActionSheet(id),[]),
          rightButtons = [
              <RightButtonWrapper bgColor={VALVET_COLOR} ><FavoriteIcon {  ...{ id, favoritesIds } } /></RightButtonWrapper>,
              <RightButtonWrapper bgColor={YELLOW_COLOR} ><IconEdit { ...{ color: WHITE_COLOR, onPress: onEditPress  } } /></RightButtonWrapper>
          ];

    return (
        <Wrapper>

        <Swipeable rightButtons={rightButtons} >
            <TouchableOpacity onPress={goToItemScreen}>
            <FlatListItem>
                <DataWrapper>
                    <Avatar source= { !avatar ? IMAGES.defaultAvatar : { uri: avatar } } />
                    <Name>{ name }</Name>
                </DataWrapper>
                <IconGo { ...{ name: "chevron-right" } } />
            </FlatListItem>
            </TouchableOpacity>
        </Swipeable>

        </Wrapper>
    );
}

const shouldUpdate = ( { item: { id, avatar: prevAvatar } }, { item: { avatar: nextAvatar } } ) => !( prevAvatar !== nextAvatar )

export default withNavigation( React.memo(CharasterItemList, shouldUpdate) )
