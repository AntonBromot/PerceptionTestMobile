import React, { useEffect, useMemo, useRef, useCallback, useState } from 'react';
import { TouchableOpacity, ScrollView } from "react-native"
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import IMAGES from '../../../resources/images';
import {ImageBackground, AvatarContainer, Avatar, AboutList, AboutItem, Named, Value, WrapperForEdit, AboutItemArray } from './styles';
import ActionSheet from 'react-native-actionsheet'
import { openCameraPhoto, openGalery } from "../../../services/camera"
import { getCharasterById, updateCharaster } from '../../../store/actions/charastersActions';
import  IconEdit  from "../../components/IconEdit"
import { YELLOW_COLOR} from '../../../constants/colors';

const ASSETS = {
    TEXT: {
        name: "Name",
        height: "Height",
        mass: "Mass",
        hair_color: "Hair color",
        skin_color: "Skin color",
        eye_color: "Eye color",
        birth_year: "Birth Year",
        gender: "Gender",
        homeworld: "Homeworld",
    },
    TEXT_FROM_ARR: {
        vehicles: "Vehicles",
        films: "Films"
    },
    noneText: "none",
    changeAvatarText: "Change avatar",
    takePhotoText: "Take photo",
    selectFromText: "Select from camera roll",
    cancelText: "Cancel"

}

const actionSheetCallback = async ( index, id, updateCharaster, setAvatar ) => {
    switch (index)  {
        case 0: {
            let image
            try {
                image = await openGalery()
                updateCharaster(id, { avatar: image.path })
                setAvatar(image.path)
            } catch (e) {
                console.log(e)
            }
            break
        }
        case 1: {
            let image
            try {
                image = await openCameraPhoto()
                updateCharaster(id, { avatar: image.path })
                setAvatar(image.path)
            } catch (e) {
                console.log(e)
            }
            break
        }
        default: return null
    }
}

const renderValues = (props) => Object.keys( ASSETS.TEXT ).map( key => (
        <AboutItem key={ key }>
            <Named>{ ASSETS.TEXT[key] }</Named>
            <Value>{ props[key] || ASSETS.noneText }</Value>
        </AboutItem>
))

const renderArrayValues = (props) => Object.keys( ASSETS.TEXT_FROM_ARR ).map( key => {
    const value = String( props[key] ).replace(/,/g, ', ')

    return (
        <AboutItemArray key={key}>
            <Named>{ASSETS.TEXT_FROM_ARR[key]}</Named>
            <Value>{value || ASSETS.noneText}</Value>
        </AboutItemArray> )
})

const CharasterItemScreen = ({ getCharasterById, updateCharaster, navigation: { state: { params: { id } } } }) => {
    const [ charaster, setCharaster ] = useState({}),
          [ avatar, setAvatar ] = useState(charaster.avatar),
          { name, height, mass, hair_color, skin_color, eye_color, birth_year, gender, homeworld, vehicles, films  } = charaster,
          aboutItems = useMemo( () => renderValues({ name, height, mass, hair_color, skin_color, eye_color, birth_year, gender, homeworld}), [charaster] ),
          aboutArrayItems = useMemo(()=> renderArrayValues({ vehicles, films }), [charaster]),
          actionSheet = useRef(null),
          showActionSheet = useCallback( () =>  actionSheet.current.show(), [] ),
          actionSheetFunc = useCallback( index =>  actionSheetCallback( index, id, updateCharaster, setAvatar ), [] ),
          actionSheetProps = {
              title: ASSETS.changeAvatarText,
              options: [ ASSETS.selectFromText, ASSETS.takePhotoText, ASSETS.cancelText ],
              cancelButtonIndex: 2,
              destructiveButtonIndex: 2,
              ref: o => actionSheet.current = o,
              onPress: actionSheetFunc
          }

    useEffect( () => {
        getCharasterById( id, charaster => { setCharaster(charaster); setAvatar(charaster.avatar)}  )
    }, [] )

    return (
        <ImageBackground source={ IMAGES.charasterItemBackground } >
            <ScrollView>
                <AvatarContainer>
                    <Avatar source={ !avatar ?  IMAGES.defaultAvatar : { uri: avatar }  }/>
                    <WrapperForEdit >
                        <IconEdit { ...{ color: YELLOW_COLOR, onPress: showActionSheet  } } />
                    </WrapperForEdit>
                </AvatarContainer>
                <AboutList>
                    { aboutItems }
                    { aboutArrayItems }
                </AboutList>
            </ScrollView>
            <ActionSheet { ...actionSheetProps }/>
        </ImageBackground>
    )
}

const mapDispatchToProps = dispatch => ({
    getCharasterById: ( id, callback ) => dispatch( getCharasterById( id, callback ) ),
    updateCharaster: ( id, data, callback ) => dispatch( updateCharaster( id, data, callback ) )
})

CharasterItemScreen.navigationOptions = ({ navigation: { getParam } }) => ({
    title: `${ getParam("name")}`
});

CharasterItemScreen.propTypes = {
    updateCharaster: PropTypes.func,
    getCharasterById: PropTypes.func,
    navigation: PropTypes.object,
}

export default connect( null, mapDispatchToProps )( CharasterItemScreen )

