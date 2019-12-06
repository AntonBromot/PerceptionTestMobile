import Realm from "realm"

import { CharastersSchema, CHARASTERS_SCHEMA_NAME, CHARASTERS_SCHEMA_PROPS, CHARASTERS_SCHEMA_ARRAY_PROPS } from "../schemas/CharastersSchema"
import { filterFieldsByRows } from "../../../helpers"

const databaseOptions = { path: "starWars.realm", schema: [CharastersSchema] }

export const setAllCharasters = data  => new Promise( async ( res, rej ) => {
    let charasters = []
    try {
        Realm.deleteFile({ schema: [CharastersSchema] })
        const realm = await Realm.open(databaseOptions)
        data.forEach( item => {
            item = { ...item, id: Number( item.url.split("/").reverse()[1] ) }
            realm.write( () => {
                let charaster = realm.create(CHARASTERS_SCHEMA_NAME, item)
                charaster = filterFieldsByRows( { ...charaster }, CHARASTERS_SCHEMA_PROPS, CHARASTERS_SCHEMA_ARRAY_PROPS )
                charasters.push(charaster)
            } )
        } )

    } catch (e) {
        console.log(e)
        rej(e)
    }

    res( charasters )

} )

export const getCharastersLimit = ({ offset=0, limit=25 }) => new Promise( async ( res, rej ) => {
    let charasters
    try {
        const realm = await Realm.open(databaseOptions)
        realm.write( () => {
            const dbCharasters = realm.objects(CHARASTERS_SCHEMA_NAME )
            charasters = [ ...dbCharasters ].slice(offset, limit+offset)
            console.log("dbCharasters.length", dbCharasters.length, charasters.length)
            charasters = charasters.map( item => filterFieldsByRows( { ...item }, CHARASTERS_SCHEMA_PROPS, CHARASTERS_SCHEMA_ARRAY_PROPS ) )
        } )
    } catch (e) {
        console.log(e)
        rej(e)
    }

    res( charasters )
})

export const getAllCharasters = () => new Promise( async ( res, rej ) => {
    let charasters
    try {
        const realm = await Realm.open(databaseOptions)
        realm.write( () => {
            const dbCharasters = realm.objects(CHARASTERS_SCHEMA_NAME )
            charasters = dbCharasters.map( item => filterFieldsByRows( { ...item }, CHARASTERS_SCHEMA_PROPS, CHARASTERS_SCHEMA_ARRAY_PROPS ) )
        } )
    } catch (e) {
        console.log(e)
        rej(e)
    }

    res( charasters )
})

export const updateCharaster = ( id, data ) => new Promise( async ( res, rej ) => {
    let charaster
    try {
        const realm = await Realm.open(databaseOptions)
        realm.write( () => {
            const dbCharaster = realm.objectForPrimaryKey(CHARASTERS_SCHEMA_NAME, id )
            for ( let key in data ) dbCharaster[key] = data[key]
            charaster = filterFieldsByRows( { ...dbCharaster }, CHARASTERS_SCHEMA_PROPS, CHARASTERS_SCHEMA_ARRAY_PROPS )
        } )
    } catch (e) {
        console.log(e)
        rej(e)
    }

    res( charaster )
})

export const getCharaster = id => new Promise( async ( res, rej ) => {
    let charaster
    try {
        const realm = await Realm.open(databaseOptions)
        realm.write( () => {
            const dbCharaster = realm.objectForPrimaryKey(CHARASTERS_SCHEMA_NAME, id )
            charaster = filterFieldsByRows( { ...dbCharaster }, CHARASTERS_SCHEMA_PROPS, CHARASTERS_SCHEMA_ARRAY_PROPS )
        } )
    } catch (e) {
        console.log(e)
        rej(e)
    }

    res( charaster )
})

export const getCharastersByName = ({ name }) => new Promise( async ( res, rej ) => {
    let charasters
    try {
        const realm = await Realm.open(databaseOptions)
        realm.write( () => {
            const dbCharasters = realm.objects(CHARASTERS_SCHEMA_NAME ).filtered(`name BEGINSWITH "${name}"`)
            charasters = [ ...dbCharasters ].slice(0, 5)
            charasters = charasters.map( item => filterFieldsByRows( { ...item }, CHARASTERS_SCHEMA_PROPS, CHARASTERS_SCHEMA_ARRAY_PROPS ) )
        } )
    } catch (e) {
        console.log(e)
        rej(e)
    }

    res( charasters )
})

