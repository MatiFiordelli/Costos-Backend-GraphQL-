export const argsControl = (page, amount) => {
    if(page===0) page=1
    if(page<0) page*=-1
    if(amount===0) amount=1
    if(amount<0) amount*=-1
    
    const init = {
        start: (amount * -1),
        end: 0
    }

    const start = init.start + (amount * page)
    let end = init.end + (amount * page)

    return {start, end}
}

export const findMatches = (collection, name) => {
    const result = []
    let field = null

    collection.forEach((doc)=>{
        if(collection[0].ingrediente !== undefined) field = doc.ingrediente
        if(collection[0].nombre !== undefined) field = doc.nombre

        if(field.includes(name)) result.push(doc)
    })
    return result
}