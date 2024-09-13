
import { postData } from "./postData.js";

const registerForm = document.getElementById('signUpForm');

registerForm.addEventListener('submit', function(e){
    e.preventDefault();

    const nameUser = document.getElementById("inputName").value;
    const emailUser = document.getElementById("inputEmail").value;
    const passwordUser = document.getElementById("inputPassword").value;
    
    let ArrayUser ={
        id: Math.floor(Math.random()*100),
        name:nameUser,
        email:emailUser,
        password:passwordUser
    };

    console.log(ArrayUser);
    postData('http://localhost:3000/users',ArrayUser);

    const modalsignUp = new bootstrap.Modal(document.getElementById('signUpModal'))
    modalsignUp.show();

})
