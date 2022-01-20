//Bloque 1
const baseUrl = 'https://api.github.com/users';
//bloque 2
const request = async(url)=>{
    const results=await fetch(url)
    const response =await results.json()
    return response
}
//bloque 3
const getRepo = async(user,pagina, cantidad_repos )=>{
    const url=`https://api.github.com/users/${user}/repos?page=${pagina}&per_page=${cantidad_repos}`
    return request(url)
    
}
//bloque 4
const getUser = async(userName)=>{
    const url = `${baseUrl}/${userName}`
    return request(url)
}
//bloque 5
const usernom='fidonoso'
const Nrepo=2
const Npag=1
Promise.all([getUser(usernom),getRepo(usernom, Npag, Nrepo)]).then(res=>{
    var datosUsuario=res[0]
    var datosRepos=res[1]
    console.log(datosUsuario)
    console.log(datosRepos)
}).catch(err => console.log('err', err))
