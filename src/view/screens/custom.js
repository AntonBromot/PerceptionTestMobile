import React, { Component } from 'react';
import { View } from 'react-native';
import { LoginButton, AccessToken } from 'react-native-fbsdk';

export default class Login extends Component {
    state = {
        val: null
    }


    render() {

        console.log(this.state.val)
        return (
            <View>
                <LoginButton
                    onLoginFinished={ (error, result) => {
                        console.log("!!!!!!!!!!!!!!!!!!!!!!")
                            if (error) console.log("login has error: " + result.error);
                            else if (result.isCancelled) console.log("login is cancelled.");
                            else AccessToken.getCurrentAccessToken().then((data) => { this.setState({ val: data} ) } )
                    }}
                    onLogoutFinished={() => console.log("logout.")}/>
            </View>
        );
    }
};
