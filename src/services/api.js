import { getAllDataFromRoute, linksToValues } from "../helpers"

const getCharasters = async () => {
    let result
    try {
        result = await getAllDataFromRoute("https://swapi.co/api/people/?page=")
        result = await linksToValues( result )
    } catch (e) {
        throw new Error(e)
    }

    return result
}


export default { getCharasters }
