import {BLACK_COLOR, HEADER_COLOR, WHITE_COLOR} from '../constants/colors';
import {TITLE_TEXT_SIZE, WINDOW_WIDTH} from '../constants/metrics';

const NAVIGATION_DEFAULT_CONFIG = {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: HEADER_COLOR,
        },
        headerTintColor: WHITE_COLOR,
        headerTitleStyle: {
            fontWeight: 'bold',
            color: WHITE_COLOR
        },
    }
}

const DRAWER_CONFIG = {
    drawerWidth: WINDOW_WIDTH * 0.85,
    drawerType: "back",
    headerMode: "none",
    drawerBackgroundColor: BLACK_COLOR,
    unmountInactiveRoutes: true,
    contentOptions: {
        activeTintColor: HEADER_COLOR,
        inactiveTintColor: WHITE_COLOR,
        labelStyle: {
            fontSize: parseInt(TITLE_TEXT_SIZE)
        }
    }
};

export { NAVIGATION_DEFAULT_CONFIG, DRAWER_CONFIG }
