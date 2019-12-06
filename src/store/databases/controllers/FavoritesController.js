import Realm from "realm"

import { FavoritesSchema, FAVORITES_SCHEMA_NAME } from "../schemas/FavoritesSchema"

const databaseOptions = { path: "favorites.realm", schema: [FavoritesSchema] }

export const getFavoritesIds = () => new Promise( async ( res, rej ) => {
    let favoritesIds
    try {
        const realm = await Realm.open(databaseOptions)
        let list = realm.objects(FAVORITES_SCHEMA_NAME)[0]

        if ( !list ) realm.write( () => {
            list = realm.create(FAVORITES_SCHEMA_NAME, { favoritesIds: [] })
        } )

        favoritesIds = Array.from(list.favoritesIds)
    } catch (e) {
        console.log(e)
        rej(e)
    }

    res( favoritesIds )
})

export const setFavoriteId = id => new Promise( async ( res, rej ) => {
    let favoritesIds
    try {
        const realm = await Realm.open(databaseOptions)
        realm.write( () => {
            const list = realm.objects(FAVORITES_SCHEMA_NAME)[0]
            list.favoritesIds.push(id)
            favoritesIds = Array.from(list.favoritesIds)
        } )
    } catch (e) {
        console.log(e)
        rej(e)
    }

    res( favoritesIds )
} )

export const removeFavoriteId = id => new Promise( async ( res, rej ) => {
    let favoritesIds
    try {
        const realm = await Realm.open(databaseOptions)
        realm.write( () => {
            const list = realm.objects(FAVORITES_SCHEMA_NAME)[0];
            list.favoritesIds = list.favoritesIds.filter( item => item !== id )
            favoritesIds = Array.from(list.favoritesIds)
        } )
    } catch (e) {
        console.log(e)
        rej(e)
    }

    res( favoritesIds )
} )
