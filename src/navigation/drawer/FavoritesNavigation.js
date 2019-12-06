import React from "react"
import { createStackNavigator } from 'react-navigation-stack';

import FavoritesScreen from '../../view/screens/FavoritesScreen';
import {HeaderIcon} from '../../view/components/Header';
import { NAVIGATION_DEFAULT_CONFIG } from '../../config/navigationDefaultConfig'

const FavoritesRoutes = {
    Favorites: {
        screen: FavoritesScreen,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <HeaderIcon  { ...{ name: "align-left", onPress: navigation.toggleDrawer, side: "left" } } />,
            title: navigation.state.routeName
        })
    },
}

const FavoritesNavigation = createStackNavigator( FavoritesRoutes, NAVIGATION_DEFAULT_CONFIG );

export default FavoritesNavigation;
