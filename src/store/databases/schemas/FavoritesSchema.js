const FAVORITES_SCHEMA_NAME = "Favorites"

const FAVORITES_SCHEMA_PROPS = {
    favoritesIds: { type: "int[]", default: [] }
}

const FavoritesSchema = {
    name: FAVORITES_SCHEMA_NAME,
    properties: FAVORITES_SCHEMA_PROPS
}

export { FavoritesSchema, FAVORITES_SCHEMA_PROPS, FAVORITES_SCHEMA_NAME }
