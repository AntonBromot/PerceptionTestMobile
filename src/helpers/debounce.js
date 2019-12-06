const debouncer = callback => {
    let timeout = null

    return args => {
        clearTimeout( timeout )
        return ( function() {
            timeout = setTimeout( () => callback(args), 1500 )
        })()
    }
}

export default debouncer
