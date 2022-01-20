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
var btnEnviar=document.querySelector('button')
//operacion
btnEnviar.addEventListener('click',(e)=>{
    // alert("hola")
    e.preventDefault();
    const resultados= document.getElementById('resultados')
    const usernom=document.getElementById('nombre').value
    const Npag=parseInt(document.getElementById('pagina').value)
    const Nrepo=parseInt(document.getElementById('repoPagina').value)
    if(usernom =='' || Npag=='' || Nrepo==''){
        return alert("Complete todos los campos")
    }
    // alert("hola")
   
    Promise.all([getUser(usernom),getRepo(usernom, Npag, Nrepo)]).then(res=>{
        // var datosUsuario=res[0]
        var datosRepos=res[1].map(p=>p.name)
        // console.log(datosUsuario)
        console.log(datosRepos)
        var avatarURL = res[0].avatar_url
        // var nombreUsuario = res[0].name
        // var loginUsuario = res[0].login
        // var numeroRepos = res[0].public_repos
        // var ubicacion = res[0].location
        // var typeuser = res[0].type
        //  console.log(avatarURL, nombreUsuario, loginUsuario, numeroRepos, ubicacion, typeuser)
         var div= document.createElement('div')
         div.className = "row"
         resultados.appendChild(div)
         var divI= document.createElement('div')
         divI.className = "col-12 col-sm-6 ms-0"
         divI.id='datosUsuario'
         div.appendChild(divI)
         var h2 =document.createElement('h3')
         h2.innerHTML="Datos de Usuario"
         divI.appendChild(h2)

         var divD= document.createElement('div')
         divD.className = "col-12 col-sm-6 me-0"
         divD.id='datosRepos'
         div.appendChild(divD)
         var h2 =document.createElement('h3')
         h2.innerHTML="Nombre de Repositorios"
         divD.appendChild(h2)

         var im= document.createElement('img')
         im.setAttribute('src', avatarURL)
         im.style.width="200px"
         divI.appendChild(im)
        
         var datosUsers=[`Nombre de usuario: ${res[0].name}`, `Nombre de login: ${res[0].login}`, `Cantidad de Repositorios: ${res[0].public_repos}`, `Localidad: ${res[0].location}`, `Tipo de Usuario: ${res[0].type}`]
        datosUsers.forEach(el=>{
            var p =document.createElement('p')
            p.innerHTML=el
            divI.appendChild(p)
        })    
         datosRepos.forEach(el => {
             var p =document.createElement('p')
             p.innerHTML=el
             divD.appendChild(p)
         });

        
    }).catch(err => console.log('err', err))




})




