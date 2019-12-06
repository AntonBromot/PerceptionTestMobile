import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';

import CharactersNavigation from "./CharactersNavigation"
import FavoritesNavigation from "./FavoritesNavigation"
import { DRAWER_CONFIG } from '../../config/navigationDefaultConfig'


const DrawerRoutes = {
    Characters: CharactersNavigation,
    Favorites:  FavoritesNavigation,
};

const Drawer = createDrawerNavigator( DrawerRoutes, DRAWER_CONFIG );


export default Drawer;
