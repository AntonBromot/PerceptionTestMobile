import React, { useCallback, useEffect } from 'react'
import Video from "react-native-video"
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import LinkedInModal from 'react-native-linkedin'

import ButtonComponent from "../../components/Button"
import VIDEOS from "../../../resources/videos"
import { videoStyles, MainText, YellowText, Container, LinkedinWrapper } from "./styles"

const TEXT = {
    welcome: "welcome to",
    bionicle: "STAR WARS",
    button: "start"
}

const HomeScreen = ({ navigation }) => {
    const navigateToDrawer = useCallback( () => navigation.push("Drawer"), [] ),
          bgVideoProps = {
              source: VIDEOS.homeBackground,
              muted: true,
              repeat: true,
              resizeMode: "cover",
              rate: 1.0,
              ignoreSilentSwitch: 'obey',
              style: videoStyles.backgroundVideo
          };

    return (
        <>
            <Video { ...bgVideoProps } />
            <Container>
                <MainText>{ TEXT.welcome } <YellowText>{ TEXT.bionicle }</YellowText></MainText>
                <ButtonComponent title={ TEXT.button } onPress={ navigateToDrawer } />
                <LoginButton onLoginFinished={ (error, result) => {
                                if (error) console.log("login has error: " + result.error);
                                else if (result.isCancelled) console.log("login is cancelled.");
                                else AccessToken.getCurrentAccessToken().then((data) => { console.log(data) } )
                            }}
                            onLogoutFinished={() => console.log("logout.")}
                />
            </Container>
        </>
    )}



export default HomeScreen
