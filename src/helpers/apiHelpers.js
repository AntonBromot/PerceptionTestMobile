const linksToValues = async dataArr => {
    const vehiclesUniqueLinks = [],
          homeworldsUniqueLinks = [],
          filmsUniqueLinks = [],
          vehilesKeyValue = {},
          homeworldsKeyValue = {},
          filmsKeyValue = {}

    for ( let item of dataArr ) {
        const { vehicles, homeworld, films } = item

        if ( homeworld && !homeworldsUniqueLinks.includes(homeworld) ) homeworldsUniqueLinks.push(homeworld)
        if ( vehicles.length ) vehicles.forEach( vehLink => !vehiclesUniqueLinks.includes(vehLink) && vehiclesUniqueLinks.push( vehLink ) )
        if ( films.length ) films.forEach( filmLink => !filmsUniqueLinks.includes(filmLink) && filmsUniqueLinks.push( filmLink ) )
    }

    try {
        for ( let link of vehiclesUniqueLinks ) {
            let vehicleData = await fetch(link);
            vehicleData = await vehicleData.json()
            vehilesKeyValue[link] = vehicleData.name
        }

        for ( let link of homeworldsUniqueLinks ) {
            let homeworldData = await fetch(link);
            homeworldData = await homeworldData.json()
            homeworldsKeyValue[link] = homeworldData.name
        }

        for ( let link of filmsUniqueLinks ) {
            let filmData = await fetch(link);
            filmData = await filmData.json()
            filmsKeyValue[link] = filmData.title
        }
    } catch (e) {
        throw e
    }

    try {
        for ( let [ index, item ] of dataArr.entries() ) {
            if ( item.homeworld ) dataArr[index].homeworld = homeworldsKeyValue[ item.homeworld ]
            if ( item.vehicles.length ) dataArr[index].vehicles = item.vehicles.map( link => vehilesKeyValue[link] )
            if ( item.films.length ) dataArr[index].films = item.films.map( link => filmsKeyValue[link] )
        }
    } catch (e) {
        console.log(e)
    }

    return dataArr
}


const getAllDataFromRoute = route => new Promise( ( res, rej ) => {
    const getPage = async ( prevValues=[], page=1 ) => {
        console.log("geting page", page)
        let result
        try {
            result = await fetch(`${route}${page}`)
            result = await result.json()
        } catch (e) {
            console.log(e)
            rej(e)
        }

        const values = [...prevValues, ...result.results]

        if (!result.next || page >= 3) return res( values )
        getPage(values, page + 1)
    }

    getPage()
})




const filterFieldsByRows = ( fields={}, rows={}, arrayRows={} ) => {
    const schemaKeys = Object.keys( rows ),
          arrayRowsKeys =  Object.keys( arrayRows )

    for ( let key in fields ) {
        if ( !schemaKeys.includes(key)  ) delete fields[key]
        if ( arrayRowsKeys.includes(key) ) fields[key] = Array.from(fields[key])
    }

    return fields
}

export { getAllDataFromRoute, filterFieldsByRows, linksToValues }
