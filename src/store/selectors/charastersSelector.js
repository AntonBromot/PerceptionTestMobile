export const getAllCharastersSelector = ({ characters })  => characters.collections

export const getAllCharasterByIdSelector = ({ characters }, id) => characters.collections.find( item => item.id === id )
