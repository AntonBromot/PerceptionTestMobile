export const FETCH_CHARASTERS = "FETCH_CHARASTERS"
export const FETCH_CHARASTERS_SUCCESS = "FETCH_CHARASTERS_SUCCESS"
export const FETCH_CHARASTERS_ERROR = "FETCH_CHARASTERS_ERROR"
export const FETCH_CHARASTER_BY_ID = "FETCH_CHARASTER_BY_ID"
export const UPDATE_CHARASTER = "UPDATE_CHARASTER"
export const UPDATE_CHARASTER_SUCCESS = "UPDATE_CHARASTER_SUCCESS"
export const FIRST_ENTRY = "FIRST_ENTRY"

export const getCharasters = (offset, limit, callback=f=>f ) => ({ type: FETCH_CHARASTERS, offset, limit, callback })

export const getCharasterById = ( id, callback=f=>f ) => ({ type: FETCH_CHARASTER_BY_ID, id, callback })

export const updateCharaster = ( id, data, callback=f=>f ) => ({ type: UPDATE_CHARASTER, id, data, callback })
