import ImagePicker from 'react-native-image-crop-picker';
import { checkPermissions } from "./permissions"
import { PERMISSIONS } from 'react-native-permissions';
import { Platform } from 'react-native'

export const openGalery = async () => {
    let image
    try {
        image = await ImagePicker.openPicker({ width: 300, height: 400, cropping: true })
    } catch (e) {
        throw e
    }

    return(image)

}

export const openCameraPhoto = async () => {
    let image
    try {
        const type = Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA,
              allowed = await checkPermissions( type )

        if ( !allowed ) throw "Permission blocked"
        image = await ImagePicker.openCamera({ width: 300, height: 400, cropping: true })
    } catch (e) {
        throw e
    }

    return(image)
}
