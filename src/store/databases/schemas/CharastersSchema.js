const CHARASTERS_SCHEMA_NAME = "Charasters"

const CHARASTERS_SCHEMA_ARRAY_PROPS = {
    films: "string[]",
    vehicles: "string[]",
}

const CHARASTERS_SCHEMA_PROPS = {
    id: "int",
    name: "string",
    avatar: { type: "string", default: "" },
    height: "string",
    mass: "string",
    hair_color: "string",
    skin_color: "string",
    eye_color: "string",
    birth_year: "string",
    gender: "string",
    homeworld: "string",
    url: "string",
    ...CHARASTERS_SCHEMA_ARRAY_PROPS
}

const CharastersSchema = {
    name: CHARASTERS_SCHEMA_NAME,
    primaryKey: "id",
    properties: CHARASTERS_SCHEMA_PROPS
}

export { CharastersSchema, CHARASTERS_SCHEMA_PROPS, CHARASTERS_SCHEMA_NAME, CHARASTERS_SCHEMA_ARRAY_PROPS }
