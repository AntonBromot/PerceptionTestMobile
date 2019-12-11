import React from "react"
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from "../view/screens/HomeScreen"
import Custome from "../view/screens/screenForTest/custom"
import Drawer from "./drawer"
import CharasterItemScreen from "../view/screens/CharasterItemScreen"
import { NAVIGATION_DEFAULT_CONFIG } from '../config/navigationDefaultConfig'

const AppNavigator = createStackNavigator({
        HomeScreen: { screen: HomeScreen, navigationOptions: { header: null } },
        Drawer: { screen: Drawer, navigationOptions: { header: null } },
        Item: { screen: CharasterItemScreen }
    }, NAVIGATION_DEFAULT_CONFIG
);

export default createAppContainer(AppNavigator);
