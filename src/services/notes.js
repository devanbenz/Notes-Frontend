const baseUrl = `/api/notes`
const loginUrl = `/api/login`
let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const request = fetch(baseUrl, {method: 'GET'})
    return request.then(data => data.json())
}

const create = async newObj => {
    const request = await fetch(baseUrl, {
        method: 'POST',
        body: JSON.stringify(newObj),
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        }
    })
    console.log(token)
    return request.json()
}

const update = (id, newObj) => {
    const request = fetch(`${baseUrl}/${id}`, {method:'PUT', body: JSON.stringify(newObj), headers:{
        'Content-Type': 'application/json'}})
    
    return request.then(res => res.json())
}

const login = async credentials => {
    const req = await fetch(loginUrl, {
        method: 'POST', 
        body: JSON.stringify(credentials),
        headers: {'Content-Type': 'application/json'}
    })
    if(!req.ok){
        throw Error
    }
    return req.json()
}


export default { getAll, create, update, login, setToken }