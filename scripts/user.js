import { getData } from "./getData.js";

const usuariosForm = document.getElementById('logInForm');

usuariosForm.addEventListener('submit', async(e) => {
    e.preventDefault();

    const email = document.getElementById("inputEmailLog").value;
    const password = document.getElementById("inputPasswordLog").value;
    const usuarios = await getData('http://localhost:3000/users')
    console.log(usuarios, email, password)
    const result = usuarios.find(user => user.email === email && user.password ===password)
    
    if (result !== undefined ){
        sessionStorage.setItem("profile",JSON.stringify(result))
        usuariosForm.reset()
        sessionStorage.setItem("Authentication",'true')
        window.location.href='/scripts/index.html'
        
    } else{
        alert('Usuario no registrado')
        usuariosForm.reset()
    }



})
