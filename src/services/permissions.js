import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';


const requestPermission = async type => {
    const rationale = {
        title: "Permission required",
        message: `Access Bromotec to ${type}`,
        buttonPositive: "Access",
        buttonNegative: "Deny"
    }

    let result
    try {
        result = await request( type, rationale )
    } catch (e) {
        throw e
    }

    return result

}

const checkPermissions = async ( type ) => {
    let result = false
    try {
        const permission = await check(type)
        switch (permission) {
            case RESULTS.UNAVAILABLE:
                console.log('This feature is not available (on this device / in this context)');
                break;
            case RESULTS.DENIED:
                console.log('The permission has not been requested / is denied but requestable');
                result = await requestPermission(type)
                break;
            case RESULTS.GRANTED:
                console.log('The permission is granted');
                result = true
                break;
            case RESULTS.BLOCKED:
                console.log('The permission is denied and not requestable anymore');
                break;
        }
    } catch (e) {
        result = false
    }

    return result
}

export { checkPermissions }
