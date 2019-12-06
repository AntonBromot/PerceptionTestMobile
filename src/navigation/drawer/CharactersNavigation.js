import React from "react"
import { createStackNavigator } from 'react-navigation-stack';

import { NAVIGATION_DEFAULT_CONFIG } from '../../config/navigationDefaultConfig'
import CharactersScreen from '../../view/screens/CharastersScreen';
import { HeaderIcon } from "../../view/components/Header"


const CharactersRoutes = {
    Characters:  {
        screen: CharactersScreen,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <HeaderIcon  { ...{ name: "align-left", onPress: navigation.toggleDrawer, side: "left" } } />,
            title: navigation.state.routeName
        })
    },
}

const CharastersNavigation = createStackNavigator( CharactersRoutes, NAVIGATION_DEFAULT_CONFIG );

export default CharastersNavigation;
