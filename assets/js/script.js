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
    e.preventDefault();
    const resultados= document.getElementById('resultados')
    resultados.innerHTML=''
    const usernom=document.getElementById('nombre').value
    const Npag=parseInt(document.getElementById('pagina').value)
    const Nrepo=parseInt(document.getElementById('repoPagina').value)
    if(usernom =='' || Npag=='' || Nrepo==''){
        return alert("Complete todos los campos")
    }

    Promise.all([getUser(usernom),getRepo(usernom, Npag, Nrepo)]).then(res=>{
        var datosRepos=res[1].map(p=> [p.name, p.html_url] )
        // console.log(datosRepos)
        var avatarURL = res[0].avatar_url
        var div= document.createElement('div')
        div.className = "row"
        resultados.appendChild(div)
        var divI= document.createElement('div')
        divI.className = "col-12 col-sm-6 ms-0"
        divI.id='datosUsuario'
        div.appendChild(divI)
        var h3 =document.createElement('h3')
        h3.innerHTML="Datos de Usuario"
        divI.appendChild(h3)

        var divD= document.createElement('div')
        divD.className = "col-12 col-sm-6 "
        divD.id='datosRepos'
        div.appendChild(divD)
        var h3 =document.createElement('h3')
        h3.className="text-right"
        h3.innerHTML="Nombre de Repositorios"
        divD.appendChild(h3)

        var im= document.createElement('img')
        im.setAttribute('src', avatarURL)
        im.style.width="150px"
        divI.appendChild(im)
        
        var datosUsers=[`Nombre de usuario: ${res[0].name}`, `Nombre de login: ${res[0].login}`, `Cantidad de Repositorios: ${res[0].public_repos}`, `Localidad: ${res[0].location}`, `Tipo de Usuario: ${res[0].type}`]
        datosUsers.forEach(el=>{
            var p =document.createElement('p')
            p.innerHTML=el
            divI.appendChild(p)
        })    
        datosRepos.forEach(el => {
            var p =document.createElement('p')
            p.className="text-right"
            var a= document.createElement('a')
            a.innerHTML=el[0]
            a.setAttribute('href', el[1])
            a.setAttribute('target','_blank')
            p.appendChild(a)
            divD.appendChild(p)
        });
        var inputs= document.querySelectorAll('input')
        inputs.forEach(el=>{
            el.value=''
        })
        
    }).catch(err => {
        console.log(err.message)
        console.log(err.name)
        alert("Algo salió mal. Verifique el nombre de usuario de GitHub")
        var inputs= document.querySelectorAll('input')
        inputs.forEach(el=>{
            el.value=''
        })
    })

})




